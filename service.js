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

self.addEventListener('fetch', event => {
    const requestUrl = new URL(
        event.request.url
    )
})