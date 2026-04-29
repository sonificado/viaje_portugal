// Main application logic
const app = {
  currentDay: 1,
  daysData: [],

  async init() {
    try {
      // Load all day data
      await this.loadAllDays();
      // Render UI
      this.renderDayNav();
      this.renderDayContent();
      // Initialize route cities
      this.updateRouteCities(1);
    } catch (error) {
      console.error('Error initializing app:', error);
      document.getElementById('main-content').innerHTML = '<p style="text-align:center;padding:2rem;">Error loading data. Please refresh the page.</p>';
    }
  },

  async loadAllDays() {
    try {
      // Try to load from JSON files first
      const promises = [];
      for (let i = 1; i <= 8; i++) {
        promises.push(fetch(`js/data/day${i}.json`)
          .then(res => {
            if (!res.ok) throw new Error(`Failed to load day${i}.json`);
            return res.json();
          })
          .catch(() => null));
      }
      const results = await Promise.all(promises);

      // Filter out null results and check if we got any data
      const validResults = results.filter(r => r !== null);
      if (validResults.length > 0) {
        this.daysData = results;
      } else {
        // If JSON loading failed, use embedded data
        console.log('JSON loading failed, using embedded data');
        this.daysData = this.getEmbeddedData();
      }
    } catch (error) {
      console.log('Using embedded data due to:', error.message);
      this.daysData = this.getEmbeddedData();
    }
  },

  getEmbeddedData() {
    return [
      // Day 1 data
      {
        "navLabel": "DÍA 1 · SAB 15 AGO",
        "navName": "Mérida",
        "ready": true,
        "title": "Redován → Mérida",
        "date": "Sábado, 15 de agosto de 2026",
        "subtitle": "La antigua Augusta Emerita, capital de la Lusitania romana y Patrimonio de la Humanidad. Una de las ciudades con más densidad de restos romanos del mundo.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 1 en orden: desde Redován hasta Mérida, pasando por todos los monumentos visitados.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Redován,+España/Mérida,+España/Termas+de+San+Lázaro,+Mérida/Cripta+Arqueológica+de+Santa+Eulalia,+Mérida/Teatro+Romano+Mérida/Pórtico+del+Foro+Municipal,+Mérida/Templo+de+Diana,+Mérida/Arco+de+Trajano,+Mérida/Plaza+de+España,+Mérida/Puente+Romano+Mérida" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          },
          {
            "name": "El viaje",
            "distance": "≈ 620 km · 6h 45min",
            "stops": [
              {
                "icon": "🚗",
                "iconClass": "icon-walk",
                "name": "Redován → Mérida",
                "pills": [{"type": "blue", "text": "6h 45min aprox."}],
                "meta": ["📍 A-7 / A-30 / A-4 / A-5", "~620 km"],
                "description": "Ruta más habitual: salir por la A-7 dirección Murcia → tomar la A-30 hacia Albacete → conectar con la A-4 hacia Madrid → desviarse por la A-43 hacia Mérida via Badajoz. Es un trayecto largo, recomendable hacer paradas para descansar.",
                "items": ["Salida recomendada: 7h00–7h30 para llegar a Mérida a eso de las 14h", "Peajes: la ruta no tiene peajes significativos en España", "Aparcamiento en Mérida: hay parking gratuito cerca del Teatro Romano (Av. Margarita Xirgu) y aparcamiento en el Paseo de Roma"],
                "mapsLink": "https://maps.google.com/?saddr=Redován,+España&daddr=Mérida,+España",
                "mapsText": "Ruta en Google Maps"
              }
            ],
            "driveTime": "🚶 ~13 min a pie"
          },
          {
            "name": "1ª parada — Termas de San Lázaro",
            "distance": "Al llegar a Mérida · Norte de la ciudad",
            "stops": [
              {
                "icon": "♨️",
                "iconClass": "icon-free",
                "name": "Termas de San Lázaro",
                "pills": [{"type": "free", "text": "Entrada gratuita"}],
                "meta": ["⏱ 10–15 min", "🕐 Abierto 24h"],
                "description": "Restos de un complejo termal público construido a principios del siglo II d.C. sobre unas instalaciones industriales anteriores. Se abastecía del agua que transportaba el cercano Acueducto de San Lázaro. Las termas estuvieron en funcionamiento hasta el siglo III. Aunque los restos son modestos comparados con otros monumentos de la ciudad, merece la pena la parada rápida ya que están de camino y son gratuitas.",
                "items": ["Podían apreciarse distintas estancias: vestuario, sala de vapor, dos piscinas de agua caliente y una de agua fría", "A pocos metros se encuentran las columnas originales del Acueducto de San Lázaro — también gratuito y muy fotogénico", "Están junto al Circo Romano, también visitable", "Honestamente: los restos son escasos. Es parada de 10 minutos, no más"],
                "ticketBox": "<strong>Precio:</strong> Gratuito · Visita libre · Abierto 24h<br><strong>Dirección:</strong> Av. Juan Carlos I, Mérida (junto al Acueducto de San Lázaro)",
                "mapsLink": "https://maps.google.com/?q=Termas+de+San+Lázaro+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 10 min a pie"
          },
          {
            "name": "2ª parada — Cripta de Santa Eulalia",
            "distance": "Av. de Extremadura · ~10 min de las Termas",
            "stops": [
              {
                "icon": "⛪",
                "iconClass": "icon-pay",
                "name": "Cripta Arqueológica de Santa Eulalia",
                "pills": [{"type": "price", "text": "Incluido en combo 15 €"}],
                "meta": ["⏱ 25–35 min", "🕐 9h–21h"],
                "description": "Bajo la actual basílica dedicada a la patrona de Mérida se esconden más de 2.000 años de historia apilados en capas. Es uno de los yacimientos arqueológicos más fascinantes de España: puedes ver, literalmente, una casa romana del siglo I, encima un martyrium paleocristiano del siglo IV, encima una iglesia visigoda del siglo V, y encima la basílica actual.",
                "items": ["<strong>Eulalia</strong> fue una joven de 12 años martirizada bajo el emperador Diocleciano en el 304 d.C. por negarse a rendir culto a los dioses romanos. Desde entonces es una de las santas más veneradas de Hispania", "El recorrido subterráneo muestra la superposición de las distintas épocas históricas", "Hay piezas de gran valor: capiteles, sepulturas, mosaicos y cerámica romana"],
                "ticketBox": "<strong>Horario:</strong> 9h–21h (verano) · <strong>Incluido</strong> en el ticket combinado del Consorcio (15 €)",
                "mapsLink": "https://maps.google.com/?q=Cripta+Basílica+Santa+Eulalia+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 ~5 min a pie"
          },
          {
            "name": "3ª parada — Teatro y Anfiteatro Romano",
            "distance": "C/ José Ramón Mélida · ~8 min de la Cripta",
            "stops": [
              {
                "icon": "🎭",
                "iconClass": "icon-pay",
                "name": "Teatro Romano de Mérida",
                "pills": [{"type": "price", "text": "Incluido en combo 15 €"}],
                "meta": ["⏱ 1h–1h 30min (ambos)", "🕐 9h–21h · Última entrada 20h30", "🏛 UNESCO"],
                "description": "Construido entre los años 16 y 15 a.C. bajo el patrocinio de Marco Agripa, yerno del emperador Augusto. Es uno de los teatros romanos mejor conservados del mundo. La scaenae frons — el fondo escénico con dos pisos de columnas corintias y estatuas originales — es literalmente deslumbrante. Tenía capacidad para 6.000 espectadores distribuidos en tres sectores de gradas según el rango social.",
                "items": ["La mayoría de las columnas del frente escénico son originales romanas, no reconstrucciones", "Sigue en uso: cada verano el Festival de Teatro Clásico llena sus gradas con obras de Sófocles, Eurípides o Aristófanes", "Bajo la orchestra quedan restos de mosaicos de mármol originales", "El acceso a los restos de la Casa del Anfiteatro (con mosaicos) también está incluido en el combo"],
                "ticketBox": "<strong>💡 Compra el ticket combinado (15 €):</strong> cubre Teatro, Anfiteatro, Cripta de Santa Eulalia y Templo de Diana (todos los que visitáis hoy). Individualmente costaría ~22 €. Ahorro de 7 € por persona.<br><strong>Horario:</strong> 9h–21h (abr–sep) · Última entrada 20h30<br><strong>Reducida:</strong> 8 € (jóvenes 13–17 años, estudiantes hasta 25, mayores de 65, discapacidad)<br><strong>Gratis:</strong> menores de 13 años acompañados<br><a href=\"https://www.consorciomerida.org/conjunto/visita/entradas\" target=\"_blank\">→ Comprar online en consorciomerida.org</a>",
                "mapsLink": "https://maps.google.com/?q=Teatro+Romano+Mérida",
                "mapsText": "Ver en Google Maps"
              },
              {
                "icon": "⚔️",
                "iconClass": "icon-pay",
                "name": "Anfiteatro Romano",
                "pills": [{"type": "price", "text": "Incluido en combo 15 €"}],
                "meta": ["⏱ 20–30 min", "🕐 9h–21h", "🏛 UNESCO"],
                "description": "Construido en el año 8 a.C., era el lugar donde se celebraban los espectáculos más brutales del mundo romano: luchas de gladiadores, caza de animales salvajes y ejecuciones públicas. Tenía capacidad para 15.000 espectadores. Los restos son menos espectaculares que los del teatro, pero la visita merece la pena por la atmósfera y por ver la Casa del Anfiteatro.",
                "items": ["El anfiteatro tenía forma elíptica y estaba rodeado por un muro de 3 metros de altura", "En el centro se encontraba la arena, donde se desarrollaban los espectáculos", "Bajo la arena había pasillos y cámaras donde se guardaban los gladiadores y los animales", "La Casa del Anfiteatro, adyacente, tiene mosaicos bien conservados"],
                "mapsLink": "https://maps.google.com/?q=Anfiteatro+Romano+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 ~2 min a pie"
          },
          {
            "name": "4ª parada — Pórtico del Foro Municipal",
            "distance": "Calle Sagasta · ~5 min del Teatro",
            "stops": [
              {
                "icon": "🏺",
                "iconClass": "icon-free",
                "name": "Pórtico del Foro Municipal",
                "pills": [{"type": "free", "text": "Entrada gratuita"}],
                "meta": ["⏱ 10 min", "🕐 9h–21h"],
                "description": "Restos del pórtico que rodeaba el Foro Municipal de Augusta Emerita, el centro administrativo y judicial de la ciudad romana. Se pueden ver columnas y fragmentos arquitectónicos del siglo I d.C. asomando entre los edificios actuales de la Calle Sagasta — uno de esos momentos en que la historia literalmente emerge del asfalto.",
                "items": ["El Foro Municipal era el equivalente al ayuntamiento romano: aquí se impartía justicia y se tomaban decisiones políticas", "Los restos son accesibles y visibles desde la calle, perfectamente señalizados", "Merece la pena pararse a leer los paneles explicativos para entender la magnitud de lo que hubo aquí"],
                "mapsLink": "https://maps.google.com/?q=Pórtico+del+Foro+Municipal+Mérida+Calle+Sagasta",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 5 min a pie"
          },
          {
            "name": "5ª parada — Templo de Diana",
            "distance": "2 min del Pórtico",
            "stops": [
              {
                "icon": "🏛️",
                "iconClass": "icon-pay",
                "name": "Templo de Diana",
                "pills": [{"type": "price", "text": "Incluido en combo 15 €"}],
                "meta": ["⏱ 20 min", "🕐 9h–21h · Última entrada 20h30"],
                "description": "Uno de los templos romanos mejor conservados de España, del siglo I a.C. La razón de su supervivencia es curiosa y fascinante: en el siglo XVI un noble renacentista, el Conde de los Corbos, construyó su palacio directamente dentro del templo, incorporando las columnas romanas como parte de su estructura. Eso lo protegió de ser desmontado para usar sus piedras en otras construcciones.",
                "items": ["El nombre 'Templo de Diana' es un error del Renacimiento — en realidad estaba dedicado al culto imperial, no a la diosa Diana", "Quedan en pie 11 columnas corintias con arquitrabas y parte del pódium original", "Dentro del recinto se puede ver perfectamente la superposición del palacio renacentista sobre la estructura romana", "El interior alberga hoy el Centro de Interpretación, incluido en el combo"],
                "ticketBox": "<strong>Nota:</strong> La taquilla del Templo de Diana solo vende la entrada individual de este monumento. Para el combo de 15 € hay que comprarlo en la taquilla del Teatro Romano o en la web.",
                "mapsLink": "https://maps.google.com/?q=Templo+de+Diana+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 ~3 min a pie"
          },
          {
            "name": "6ª parada — Arco de Trajano",
            "distance": "2 min del Templo de Diana",
            "stops": [
              {
                "icon": "🏟️",
                "iconClass": "icon-free",
                "name": "Arco de Trajano",
                "pills": [{"type": "free", "text": "Entrada gratuita"}],
                "meta": ["⏱ 10 min", "🕐 Acceso libre"],
                "description": "Un arco monumental de más de 15 metros de altura, construido en el siglo I d.C. A pesar de su nombre popular, probablemente no tiene relación directa con el emperador Trajano. Era la puerta de acceso al témenos, el recinto sagrado que rodeaba el gran templo del foro de Mérida. Impresiona ver cómo el arco se integra en la trama urbana actual, con casas literalmente apoyadas en él durante siglos.",
                "items": ["Construido en granito local con sillares perfectamente encajados, sin argamasa", "Es un arco de un solo vano, de estilo austero y muy diferente a los arcos triunfales ornamentados típicos de Roma", "Durante siglos sirvió como puerta de entrada a la ciudad medieval"],
                "mapsLink": "https://maps.google.com/?q=Arco+de+Trajano+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 5 min a pie"
          },
          {
            "name": "7ª parada — Plaza de España",
            "distance": "3 min del Arco",
            "stops": [
              {
                "icon": "🏛️",
                "iconClass": "icon-free",
                "name": "Plaza de España y sus monumentos",
                "pills": [{"type": "free", "text": "Entrada gratuita"}],
                "meta": ["⏱ 20–30 min"],
                "description": "La plaza mayor de Mérida, rodeada de edificios históricos de distintas épocas. Es el corazón social y político de la ciudad, con terrazas y ambiente especialmente animado en verano. Todos los edificios son para ver desde el exterior.",
                "items": ["<strong>Palacio de los Mendoza</strong> — Edificio renacentista del siglo XVI, hoy sede del Ayuntamiento. Fachada con escudo heráldico monumental", "<strong>Casa de los Pacheco</strong> — Palacio nobiliario del siglo XVI con hermosa portada", "<strong>Círculo Emeritense</strong> — Casino y club social del siglo XIX, con fachada modernista muy decorada", "<strong>Concatedral de Santa María la Mayor</strong> — Heredera de la antigua catedral visigoda. Interior renacentista con elementos medievales. Vale la pena entrar si está abierta"],
                "mapsLink": "https://maps.google.com/?q=Plaza+de+España+Mérida+España",
                "mapsText": "Ver en Google Maps"
              }
            ],
            "driveTime": "🚶 5 min a pie"
          },
          {
            "name": "8ª parada — Puente Romano",
            "distance": "Río Guadiana · 8 min de Plaza de España",
            "stops": [
              {
                "icon": "🌉",
                "iconClass": "icon-free",
                "name": "Puente Romano sobre el Guadiana",
                "pills": [{"type": "free", "text": "Entrada gratuita"}],
                "meta": ["⏱ 20–30 min", "🕐 Peatonal, acceso libre"],
                "description": "El puente más largo de todos los que se conservan de la antigua Roma: 792 metros de longitud y 60 arcos. Construido en el siglo I d.C., sigue en uso hoy en día — eso sí, solo para peatones. Es una de las imágenes más icónicas de Mérida, especialmente al atardecer cuando el sol se pone tras el puente.",
                "items": ["El puente formaba parte de la Vía de la Plata, la calzada romana que unía Mérida con Astorga", "En el centro del puente hay una torre fortificada medieval añadida posteriormente", "Desde el puente se tienen las mejores vistas de la ciudad y del río Guadiana", "Es el lugar perfecto para terminar el día con un paseo y fotos al atardecer"],
                "mapsLink": "https://maps.google.com/?q=Puente+Romano+Mérida",
                "mapsText": "Ver en Google Maps"
              }
            ]
          }
        ],
        "timeline": [
          "Llegada a Mérida · Aparcamiento y Termas de San Lázaro (15 min)",
          "Cripta de Santa Eulalia — 30 min",
          "Teatro Romano + Anfiteatro — 1h 30min · Comprar combo aquí",
          "Pórtico del Foro Municipal — 10 min",
          "Templo de Diana — 20 min",
          "Arco de Trajano — 10 min",
          "Plaza de España + monumentos alrededor — 25 min",
          "Puente Romano sobre el Guadiana — 25 min",
          "✅ Fin del recorrido · Descanso / Cena / Noche en Mérida"
        ],
        "summary": {
          "title": "Entradas · Día 1 · por persona",
          "rows": [
            {"label": "Termas de San Lázaro", "value": "Gratis"},
            {"label": "Teatro Romano + Anfiteatro + Cripta + Templo Diana", "value": "15 € (combo)"},
            {"label": "Plaza de España, Arco de Trajano, Foro Municipal, Puente Romano", "value": "Gratis"}
          ],
          "total": {"label": "Total entradas por persona", "value": "15 €"}
        }
      },
      // Day 2 data
      {
        "navLabel": "DÍA 2 · DOM 16 AGO",
        "navName": "→ Lisboa",
        "ready": false,
        "title": "Mérida → Évora → Lisboa",
        "date": "Domingo, 16 de agosto de 2026",
        "subtitle": "Évora, ciudad museo declarada Patrimonio de la Humanidad, y llegada a Lisboa. Salida recomendada: 8h–8h30. Llegada a Lisboa: ~19h30.",
        "alerts": [
          {
            "type": "warn",
            "icon": "⚠️",
            "title": "Monasterio de los Jerónimos",
            "content": "Las visitas guiadas son cada hora (9h30, 10h30, 11h30, 12h30, 13h30, 14h30, 15h30). Llegar con tiempo para no perder el turno."
          }
        ],
        "sections": [
          {
            "name": "Ruta completa — Évora",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas de Évora en orden: Templo Romano, Catedral, Plaza de Giraldo, Iglesia de San Francisco y Crómlech de los Almendros.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Templo+Romano+Évora/Catedral+de+Évora/Praça+do+Giraldo+Évora/Igreja+de+São+Francisco+Évora/Cromlech+dos+Almendres+Évora" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa de Évora en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Llegada a Évora · Templo Romano — 20 min",
          "Catedral de Évora — 35 min",
          "Praça do Giraldo — 20 min",
          "Iglesia de San Francisco y Capilla de los Huesos — 35 min",
          "Crómlech de los Almendros — 35 min",
          "Llegada a Lisboa · Torre de Belém — 35 min",
          "Monumento a los Descubrimientos — 25 min",
          "Monasterio de los Jerónimos — 1h 15min (visita guiada)",
          "Palacio Nacional de Belém — 35 min",
          "✅ Fin del recorrido · Noche en Lisboa"
        ],
        "summary": {
          "title": "Entradas · Día 2 · por persona",
          "rows": [
            {"label": "Templo Romano, Praça do Giraldo, Crómlech", "value": "Gratis"},
            {"label": "Catedral de Évora", "value": "2,50 €"},
            {"label": "Iglesia de San Francisco y Capilla de los Huesos", "value": "7 €"},
            {"label": "Torre de Belém", "value": "6 €"},
            {"label": "Monumento a los Descubrimientos", "value": "5 €"},
            {"label": "Monasterio de los Jerónimos (visita guiada)", "value": "18 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "38,50 €"}
        }
      },
      // Day 3 data
      {
        "navLabel": "DÍA 3 · LUN 17 AGO",
        "navName": "Lisboa",
        "ready": false,
        "title": "Lisboa — Centro histórico",
        "date": "Lunes, 17 de agosto de 2026",
        "subtitle": "Recorrido por el centro histórico de Lisboa: Alfama, el castillo, los barrios típicos y los monumentos más emblemáticos de la capital portuguesa.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 3 en orden: Cais das Naus, Panteão Nacional, Igreja de São Miguel, Sé de Lisboa, Castelo de São Jorge, Praça do Rossio, Elevador de Santa Justa, Convento do Carmo, Café A Brasileira, Arco da Rua Augusta, Praça do Comércio y Puente 25 de Abril.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Cais+das+Naus+Lisboa/Panteão+Nacional+Lisboa/Igreja+de+São+Miguel+Lisboa/Sé+de+Lisboa/Castelo+de+São+Jorge/Praça+do+Rossio+Lisboa/Elevador+de+Santa+Justa/Convento+do+Carmo/Café+A+Brasileira/Arco+da+Rua+Augusta/Praça+do+Comércio+Lisboa/Puente+25+de+Abril" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Cais das Naus — 20 min",
          "Panteão Nacional — 35 min",
          "Igreja de São Miguel — 20 min",
          "Sé de Lisboa — 30 min",
          "Castelo de São Jorge — 1h 15min",
          "Praça do Rossio + Café da Nicola — 25 min",
          "Elevador de Santa Justa — 25 min",
          "Convento do Carmo — 35 min",
          "Café A Brasileira — 20 min",
          "Arco da Rua Augusta — 25 min",
          "Praça do Comércio — 25 min",
          "Puente 25 de Abril — 20 min",
          "✅ Fin del recorrido · Noche en Lisboa"
        ],
        "summary": {
          "title": "Entradas · Día 3 · por persona",
          "rows": [
            {"label": "Cais das Naus, São Miguel, Rossio, Praça do Comércio, Puente 25 de Abril", "value": "Gratis"},
            {"label": "Panteão Nacional", "value": "4 €"},
            {"label": "Castelo de São Jorge", "value": "10 €"},
            {"label": "Elevador de Santa Justa", "value": "5,30 €"},
            {"label": "Convento do Carmo", "value": "5 €"},
            {"label": "Arco da Rua Augusta", "value": "3,50 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "27,80 €"}
        }
      },
      // Day 4 data
      {
        "navLabel": "DÍA 4 · MAR 18 AGO",
        "navName": "Lisboa",
        "ready": false,
        "title": "Sintra y Costa del Sol",
        "date": "Martes, 18 de agosto de 2026",
        "subtitle": "Un día mágico en la villa de Sintra, Patrimonio de la Humanidad, con sus palacios de cuento de hadas, jardines encantados y el punto más occidental de Europa continental.",
        "alerts": [
          {
            "type": "warn",
            "icon": "⚠️",
            "title": "Sintra en agosto",
            "content": "Es muy popular y puede haber colas largas. Recomendamos comprar entradas online con antelación."
          },
          {
            "type": "gold",
            "icon": "🥧",
            "title": "Especialidades de Sintra",
            "content": "No os vayáis sin probar las queijadas (tarta de queso) y los travesseiros (pastel de hojaldre con crema de almendra)."
          }
        ],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 4 en orden: desde Lisboa hasta Cabo da Roca, pasando por los palacios de Sintra.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Lisboa,+Portugal/Sintra,+Portugal/Cabo+da+Roca" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Llegada a Sintra · Castelo dos Mouros — 50 min",
          "Palácio Nacional de Sintra — 1h 15min",
          "Quinta da Regaleira — 1h 45min",
          "Palácio Nacional da Pena — 1h 45min",
          "Cabo da Roca — 40 min",
          "✅ Fin del recorrido · Regreso a Lisboa"
        ],
        "summary": {
          "title": "Entradas · Día 4 · por persona",
          "rows": [
            {"label": "Cabo da Roca", "value": "Gratis"},
            {"label": "Castelo dos Mouros", "value": "8 €"},
            {"label": "Palácio Nacional de Sintra", "value": "10 €"},
            {"label": "Quinta da Regaleira", "value": "11 €"},
            {"label": "Palácio Nacional da Pena", "value": "14 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "43 €"}
        }
      },
      // Day 5 data
      {
        "navLabel": "DÍA 5 · MIÉ 19 AGO",
        "navName": "Lisboa → Oporto",
        "ready": true,
        "title": "Lisboa → Oporto",
        "date": "Miércoles, 19 de agosto de 2026",
        "subtitle": "Un día de ruta por el centro de Portugal con paradas en monasterios históricos, el santuario de Fátima, la universitaria Coímbra y la colorida Aveiro antes de llegar a Oporto.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 5 en orden: desde Lisboa hasta Oporto, pasando por Alcobaça, Batalha, Fátima, Coímbra y Aveiro.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Lisboa,+Portugal/Alcobaça,+Portugal/Batalha,+Portugal/Fátima,+Portugal/Coimbra,+Portugal/Aveiro,+Portugal/Porto,+Portugal" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Salida desde Lisboa",
          "Monasterio de Alcobaça · 1h visita",
          "Monasterio de Batalha · 1h visita",
          "Santuario de Fátima · 1h visita",
          "Coímbra — Universidad + centro · 2h 15min",
          "Aveiro — moliceiro, canales, Costa Nova · 2h 30min",
          "🎉 Llegada a Oporto"
        ],
        "summary": {
          "title": "Entradas · Día 5 · por persona",
          "rows": [
            {"label": "Monasterio de Alcobaça", "value": "6 €"},
            {"label": "Monasterio de Batalha", "value": "6 €"},
            {"label": "Santuario de Fátima", "value": "Gratis"},
            {"label": "Universidad de Coímbra (ticket completo)", "value": "12,50 €"},
            {"label": "Paseo en moliceiro · Aveiro", "value": "13–15 €"}
          ],
          "total": {"label": "Total sin opcionales", "value": "≈ 37–40 €"}
        }
      },
      // Day 6 data
      {
        "navLabel": "DÍA 6 · JUE 20 AGO",
        "navName": "Oporto / Salamanca",
        "ready": false,
        "title": "Oporto — Centro histórico",
        "date": "Jueves, 20 de agosto de 2026",
        "subtitle": "Descubrimiento del centro histórico de Oporto, Patrimonio de la Humanidad, con sus iglesias barrocas, la famosa librería Lello, el puente Luis I y el pintoresco barrio de Ribeira.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 6 en orden: Estação de São Bento, Sé do Porto, Igreja de São Francisco, Palácio da Bolsa, Ribeira, Ponte Dom Luís I, Livraria Lello, Torre dos Clérigos y Palácio de Cristal.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Estação+de+São+Bento+Oporto/Sé+do+Porto/Igreja+de+São+Francisco+Oporto/Palácio+da+Bolsa+Oporto/Ribeira+Oporto/Ponte+Dom+Luís+I+Oporto/Livraria+Lello+Oporto/Torre+dos+Clérigos+Oporto/Palácio+de+Cristal+Oporto" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Estação de São Bento — 20 min",
          "Sé do Porto — 30 min",
          "Igreja de São Francisco — 35 min",
          "Palácio da Bolsa — 50 min",
          "Ribeira — 40 min",
          "Ponte Dom Luís I — 25 min",
          "Livraria Lello e Irmão — 25 min",
          "Torre dos Clérigos — 35 min",
          "Igrejas do Carmo e dos Carmelitas — 25 min",
          "Palácio de Cristal — 40 min",
          "✅ Fin del recorrido · Tarde libre en Oporto"
        ],
        "summary": {
          "title": "Entradas · Día 6 · por persona",
          "rows": [
            {"label": "Estação de São Bento, Sé, Ribeira, Puente Luis I, Iglesias Siamesas, Palácio de Cristal", "value": "Gratis"},
            {"label": "Igreja de São Francisco", "value": "6 €"},
            {"label": "Palácio da Bolsa", "value": "12 €"},
            {"label": "Livraria Lello", "value": "8 € (con reserva)"},
            {"label": "Torre dos Clérigos", "value": "6 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "32 €"}
        }
      },
      // Day 7 data
      {
        "navLabel": "DÍA 7 · VIE 21 AGO",
        "navName": "Oporto → Salamanca",
        "ready": false,
        "title": "Oporto → Braga → Salamanca",
        "date": "Viernes, 21 de agosto de 2026",
        "subtitle": "Visita a Braga con su santuario del Bom Jesus, y ruta hacia Salamanca, ciudad universitaria y Patrimonio de la Humanidad.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 7 en orden: desde Oporto hasta Salamanca, pasando por Braga y Guimarães.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Porto,+Portugal/Braga,+Portugal/Guimarães,+Portugal/Salamanca,+España" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Llegada a Braga · Santuário do Bom Jesus — 1h 15min",
          "Sé de Braga — 35 min",
          "Arco da Porta Nova — 15 min",
          "Guimarães · Castillo y centro histórico — 1h 30min",
          "🚗 Salida hacia Salamanca (~350 km · 3h 30min)",
          "🏠 Llegada a Salamanca · Noche en Salamanca"
        ],
        "summary": {
          "title": "Entradas · Día 7 · por persona",
          "rows": [
            {"label": "Santuário do Bom Jesus", "value": "3 €"},
            {"label": "Sé de Braga", "value": "2,50 €"},
            {"label": "Guimarães (castillo + palacio)", "value": "7 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "12,50 €"}
        }
      },
      // Day 8 data
      {
        "navLabel": "DÍA 8 · SÁB 22 AGO",
        "navName": "Salamanca → Redován",
        "ready": false,
        "title": "Salamanca → Redován",
        "date": "Sábado, 22 de agosto de 2026",
        "subtitle": "Descubrimiento de Salamanca, ciudad universitaria y Patrimonio de la Humanidad, con su catedral, universidad y plaza mayor antes del regreso a Redován.",
        "alerts": [],
        "sections": [
          {
            "name": "Ruta completa del día",
            "content": `<div class="stop"><div class="stop-body" style="display: block; padding: 1rem;"><div class="stop-desc" style="margin: 0;">Ruta de Google Maps con todas las paradas del día 8 en orden: Plaza Mayor, Universidad, Catedrales, Casa de las Conchas y Puente Romano antes de regresar a Redován.</div><a class="maps-btn" href="https://www.google.com/maps/dir/Plaza+Mayor+Salamanca/Universidad+de+Salamanca/Catedrales+Vieja+y+Nueva+Salamanca/Casa+de+las+Conchas+Salamanca/Puente+Romano+Salamanca/Redován,+España" target="_blank" style="margin-top: 1rem;">📍 Ver ruta completa en Google Maps</a></div></div>`
          }
        ],
        "timeline": [
          "Plaza Mayor de Salamanca — 25 min",
          "Universidad de Salamanca — 50 min",
          "Catedrales Vieja y Nueva — 1h 15min",
          "Casa de las Conchas — 20 min",
          "Puente Romano — 20 min",
          "🍽️ Comida en Salamanca",
          "🏠 Llegada a Redován · Fin del viaje"
        ],
        "summary": {
          "title": "Entradas · Día 8 · por persona",
          "rows": [
            {"label": "Plaza Mayor, Casa de las Conchas, Puente Romano", "value": "Gratis"},
            {"label": "Universidad de Salamanca", "value": "10 €"},
            {"label": "Catedrales Vieja y Nueva", "value": "8 €"}
          ],
          "total": {"label": "Total entradas por persona", "value": "18 €"}
        }
      }
    ];
  },

  renderDayNav() {
    const nav = document.getElementById('day-nav');
    nav.innerHTML = this.daysData.map((day, index) => {
      const dayNum = index + 1;
      const isActive = dayNum === this.currentDay ? 'active' : '';
      const isReady = day.ready ? 'ready' : '';
      return `
        <button class="day-btn ${isActive} ${isReady}" id="btn-${dayNum}" onclick="app.showDay(${dayNum})">
          <span class="day-btn-num">${day.navLabel}</span>
          <span class="day-btn-name">${day.navName}</span>
        </button>
      `;
    }).join('');
  },

  renderDayContent() {
    const main = document.getElementById('main-content');
    const dayData = this.daysData[this.currentDay - 1];

    main.innerHTML = `
      <div class="day-content active" id="day-${this.currentDay}">
        ${this.renderDayHeader(dayData)}
        ${this.renderAlerts(dayData)}
        ${this.renderSections(dayData)}
        ${this.renderTimeline(dayData)}
        ${this.renderSummary(dayData)}
      </div>
    `;
  },

  renderDayHeader(day) {
    return `
      <div class="day-header">
        <div class="day-header-top">
          <h2 class="day-title">${day.title}</h2>
          <span class="day-date">${day.date}</span>
        </div>
        <p class="day-subtitle">${day.subtitle}</p>
      </div>
    `;
  },

  renderAlerts(day) {
    if (!day.alerts || day.alerts.length === 0) return '';
    return day.alerts.map(alert => `
      <div class="alert alert-${alert.type}">
        <strong>${alert.icon} ${alert.title}:</strong> ${alert.content}
      </div>
    `).join('');
  },

  renderSections(day) {
    if (!day.sections || day.sections.length === 0) return '';
    return day.sections.map((section, index) => {
      const driveTimeHtml = section.driveTime ? `
        <div class="drive-row">
          <div class="drive-line"></div>
          <div class="drive-label">${section.driveTime}</div>
          <div class="drive-line"></div>
        </div>
      ` : '';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-dot"></div>
            <div class="section-name">${section.name}</div>
            ${section.distance ? `<div class="section-dist">${section.distance}</div>` : ''}
          </div>
          ${section.stops ? this.renderStops(section.stops) : ''}
          ${section.content ? section.content : ''}
        </div>
        ${driveTimeHtml}
      `;
    }).join('');
  },

  renderStops(stops) {
    return stops.map(stop => `
      <div class="stop">
        <div class="stop-header" onclick="app.toggle(this.parentElement)">
          <div class="stop-icon ${stop.iconClass}">${stop.icon}</div>
          <div class="stop-top">
            <div class="stop-name-row">
              <span class="stop-name">${stop.name}</span>
              ${stop.pills ? stop.pills.map(pill => `<span class="pill pill-${pill.type}">${pill.text}</span>`).join('') : ''}
            </div>
            <div class="stop-meta">
              ${stop.meta ? stop.meta.map(item => `<span class="meta-item">${item}</span>`).join('') : ''}
            </div>
          </div>
          <div class="chevron">▼</div>
        </div>
        <div class="stop-body">
          ${stop.description ? `<div class="stop-desc">${stop.description}</div>` : ''}
          ${stop.items ? `<div class="stop-items">${stop.items.map(item => `<div class="stop-item">${item}</div>`).join('')}</div>` : ''}
          ${stop.ticketBox ? `<div class="ticket-box">${stop.ticketBox}</div>` : ''}
          ${stop.mapsLink ? `<a class="maps-btn" href="${stop.mapsLink}" target="_blank">📍 ${stop.mapsText || 'Ver en Google Maps'}</a>` : ''}
        </div>
      </div>
    `).join('');
  },

  renderTimeline(day) {
    if (!day.timeline || day.timeline.length === 0) return '';
    return `
      <div class="timeline">
        <div class="tl-title">Itinerario del día</div>
        ${day.timeline.map(item => `
          <div class="tl-row">
            <div class="tl-time"></div>
            <div class="tl-dot"></div>
            <div class="tl-name">${item}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderSummary(day) {
    if (!day.summary || !day.summary.title) return '';
    return `
      <div class="summary">
        <div class="summary-title">${day.summary.title}</div>
        ${day.summary.rows ? day.summary.rows.map(row => `
          <div class="summary-row">
            <span class="summary-label">${row.label}</span>
            <span class="summary-val">${row.value}</span>
          </div>
        `).join('') : ''}
        ${day.summary.total ? `
          <div class="summary-total">
            <span class="summary-total-lbl">${day.summary.total.label}</span>
            <span class="summary-total-val">${day.summary.total.value}</span>
          </div>
        ` : ''}
      </div>
    `;
  },

  showDay(dayNum) {
    this.currentDay = dayNum;
    this.renderDayNav();
    this.renderDayContent();
    this.updateRouteCities(dayNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  toggle(element) {
    element.classList.toggle('open');
  },

  updateRouteCities(dayNum) {
    const cityDayMap = {
      1: [0, 1],
      2: [1, 2],
      3: [2],
      4: [2],
      5: [2, 3],
      6: [3],
      7: [3, 4],
      8: [4, 5]
    };
    const cities = document.querySelectorAll('.route-city');
    cities.forEach(c => c.classList.remove('active'));
    const indices = cityDayMap[dayNum] || [];
    indices.forEach(i => { if (cities[i]) cities[i].classList.add('active'); });
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());