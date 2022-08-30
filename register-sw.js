if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service.js')
      .then((reg) => {
        console.log('notify', 'service worker is started @ scope' + reg.scope)
      })
      // en cas d'erreur
      .catch( (error) => {
        console.log('alerte', 'service worker registration failed with' + error)
      })
    })
  }

  const installBtn = document.querySelector('.install')
  let deferredPrompt
  //definir une variable globale pour pouvoir l'appeler en dehors des fonctions

  window.addEventListener('beforeinstallprompt', (event) => {  //le preventDefault neutralise le "beforinstallprompt"
    event.preventDefault() 
    deferredPrompt = event
    installBtn.classList.remove('hidden')
  })

  installBtn.addEventListener('click', (event) => {
    deferredPrompt.prompt()
    installBtn.classList.add('hidden')
    deferredPrompt.userChoice.then(choice => {
      if(choice === 'accepted') {
        console.log("Installation acceptée")
      }
      else {
        console.log("Installation denied")
      }
      deferredPrompt = null
    }) 
  })