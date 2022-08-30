//En changeant de version, il mettra a jour dans la console le numéro de la version
const vers = 0.1

self.addEventListener('install', event => {
    console.log("Log from event 'INSTALL' in SW version " + vers)
    // on skip le temps d'attente
    return self.skipWaiting()
})

self.addEventListener('activate', event => {
    console.log("Log from event 'ACTIVATE' in SW version "+ vers)
    //claim permet d'activer les contrôles
    return self.clients.claim()
})

//simple fetch général pour le InstallBtn
// on écoute chaque requête
/*
self.addEventListener('fetch', event => {
    const requestUrl = new URL(
        event.request.url
    )
})
*/

// définition d'un cache pour les assets

const ASSETS_CACHE_NAME = "assets"

// 2 méthodes : getter et setter pour le cache

// GETTER
const getResponseFromCache = (
    cacheName,
    request
) => {
    // on ouvre le bon cache
    return caches.open(cacheName)
    // on récupère le cache
    .then( cache => {
        // on returne le fichier qui correspond à la requête
        return cache.match(request)
    })
}

const setResponseCache = (
    cacheName,
    request,
    response
) => {
     // on ouvre le bon cache
     return caches.open(cacheName)
     .then(cache => {
        return cache.put(request, response)
     })

}


// stratégie de cache
// Méthode de stratégie de cache first

const getResponseFromCacheFirst = (
    cacheName,
    request
) => {
  //on exécute le getter en premier
    const response = getResponseFromCache(
      cacheName, request
    )
    .then( response => {
      //est ce que la réponse existe dans le cache
      if(response) {
        // on retourne la réponse à la stratégie
        return response
      }
      else { // le fichier correspondante à request n'est pas dans le cache
        return fetch(request)     //requête sur le serveur asynchrone
        .then( response => {
          setResponseCache(
            cacheName,
            request,
            response.clone()
          )
          // on envois la réponse a la stratégie
          return response
        }) 
      }
    })
    // on renvoie au fetch
    return response
}
// si request, on l'intercept
self.addEventListener("fetch", event => {
  //on récupère l'url de la requête éxécutée par le navigateur
  const requestUrl = new URL(
    event.request.url
  )
  console.log(requestUrl.pathname)
  // on intercepte la requête et on applique la stratégie cacheFirst
  if(requestUrl.pathname.startsWith('/assets')){
    // répond au navigateur avec le résultat de la stratégie
    event.respondWith(
      getResponseFromCacheFirst(ASSETS_CACHE_NAME, event.request)
    )
  }
})