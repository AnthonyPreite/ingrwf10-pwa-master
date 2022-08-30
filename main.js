let testAjax = false
axios.get("https://api.irail.be/stations/?format=json")
      .then( (response) => { 
          testAjax = true
          console.log(testAjax)
          //console.log(response.data.station)
          let liste = ''
          let i = 0
          let gares = response.data.station
          gares = gares.slice(0,25)
           
              gares.forEach(element => {
                  if (typeof element.name != 'undefined') {
                  liste += `<li class="card" data-id="${element.id}">
                              <header class="card-header">
                                  <h2 class="card-header-title">${element.name}</h2>
                                  <a href="#" class="card-header-icon" aria-label="more options">
                                          <span class="icon">
                                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                                          </span>
                                      </a>
                              </header>
                                  <div class="card-content hidden">
                                      <div class="content">
                                         
                                      </div>
                              </div>
                          </li> `
                  }
                  i++
              })
      document.querySelector(".gares").innerHTML = liste
      
  if (testAjax) {
      links = document.querySelectorAll('.card')
      links.forEach(element => {
          element.addEventListener("click", function() {
          //alert(this.dataset.id)
          url = `https://api.irail.be/liveboard/?id=${this.dataset.id}&format=json`
          //request vers la gare
          axios.get(url)
          .then((response) => {
              //console.log(trains = response.data.departures.departure)
              listeTrains = ''
              trains.forEach(element => {
                  departDate = new Date(element.time*1000)
                  minutes = (departDate.getMinutes() < 10) ? '0' + departDate.getMinutes() : departDate.getMinutes();
                  heure = `${departDate.getHours()}:${minutes}`
                  listeTrains+= `<tr><th>${element.station}</th><td>${heure}</td><td class="quai">${element.platform}</td><td>${element.delay/60} min.</td></tr>`
                  console.log(element)
              });
              ulTrains = document.querySelector(`li[data-id="${this.dataset.id}"] div.card-content`)
              ulTrains.innerHTML = `<table class="trains table is-striped"><tr><th>Destination</th><th>Départ</th><th class="quai">Quai</th><th>Retard</th></tr>${listeTrains}</table>`
              ulTrains.classList.toggle('hidden')
          })
          .catch((error) => {
                   if(navigator.offLine) {
                    ulTrains = document.querySelector(`li[data-id="${this.dataset.id}"] div.card-content`)
                  ulTrains.innerHTML = `Pas de trains en mode offline`
                  ulTrains.classList.toggle('hidden')
                   } else {
                      document.querySelector(".modal").classList.add("is-active")
                  document.querySelector(".modal-close").addEventListener("click", function() {
                  document.querySelector(".modal").classList.remove("is-active")
                  })
                }
          })

      })
      });
  } //endif
      
      })// first axios
      //.catch(console.log("error"));
     // console.log("end"+testAjax)
      //doc api
      //https://docs.irail.be/#liveboard