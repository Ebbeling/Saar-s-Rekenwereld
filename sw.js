/* Service worker voor Saar's Rekenwereld.
   Verhoog VERSIE na elke wijziging aan index.html of vragen.js, dan halen tablets de nieuwe versie op. */
var VERSIE = "rekenwereld-v15";

var SCHIL = [
  "./",
  "./index.html",
  "./vragen.js",
  "./manifest.webmanifest",
  "./fonts/nunito-latin.woff2",
  "./fonts/lilita-one-latin.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSIE).then(function(cache){
      /* per bestand, zodat één ontbrekend bestand de installatie niet sloopt */
      return Promise.all(SCHIL.map(function(pad){
        return cache.add(new Request(pad, {cache:"reload"})).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

/* De pagina kan vragen of een wachtende versie het meteen mag overnemen. */
self.addEventListener("message", function(e){
  if(e.data === "neem-over") self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(namen){
      return Promise.all(namen.map(function(naam){
        if(naam !== VERSIE) return caches.delete(naam);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var verzoek = e.request;
  if(verzoek.method !== "GET") return;

  /* De pagina zelf: eerst uit de cache, zodat de app ook zonder internet meteen opent
     en niet op een trage of halve verbinding blijft wachten. Op de achtergrond wordt
     wel een verse versie opgehaald; die is bij de volgende start aan de beurt. */
  if(verzoek.mode === "navigate"){
    e.respondWith(
      caches.match("./index.html").then(function(hit){
        var vanNet = fetch(verzoek).then(function(res){
          if(res && res.ok){
            var kopie = res.clone();
            caches.open(VERSIE).then(function(c){ c.put("./index.html", kopie).catch(function(){}); });
          }
          return res;
        }).catch(function(){ return hit; });
        return hit || vanNet;
      })
    );
    return;
  }

  /* vragen.js hoort bij index.html: dezelfde behandeling, dus op de achtergrond
     verversen. Anders kan een verse index.html naast een verouderde vragen.js
     belanden als iemand vergeet VERSIE op te hogen — een stille, lastige fout. */
  if(verzoek.url.indexOf("vragen.js") !== -1){
    e.respondWith(
      caches.match("./vragen.js").then(function(hit){
        var vanNet = fetch(verzoek).then(function(res){
          if(res && res.ok){
            var kopie = res.clone();
            caches.open(VERSIE).then(function(c){ c.put("./vragen.js", kopie).catch(function(){}); });
          }
          return res;
        }).catch(function(){ return hit; });
        return hit || vanNet;
      })
    );
    return;
  }

  /* alles verder (iconen, lettertypes): eerst de cache, daarna pas het net */
  e.respondWith(
    caches.match(verzoek).then(function(hit){
      if(hit) return hit;
      return fetch(verzoek).then(function(res){
        if(res && (res.ok || res.type === "opaque")){
          var kopie = res.clone();
          caches.open(VERSIE).then(function(c){ c.put(verzoek, kopie).catch(function(){}); });
        }
        return res;
      }).catch(function(){ return hit; });
    })
  );
});
