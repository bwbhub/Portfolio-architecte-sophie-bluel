const reponse = await fetch("http://localhost:5678/api/works")
const travaux = await reponse.json()

function genererTravaux(travaux){
    for(let i = 0 ; i < travaux.length ; i++){
        
        const article = travaux[i]
        // Récupération de l'élement DOM qui accueilllera les fiches
        const sectionGallery = document.querySelector(".gallery")
        // Balise dédiée à un projet
        const projetElement = document.createElement("figure")
        // Création des balises
        const imageElement = document.createElement("img")
        imageElement.src = article.imageUrl
        imageElement.alt = article.title
        const titleElement = document.createElement("figcaption")
        titleElement.innerText = article.title
        
        // Attachement des balises
        sectionGallery.appendChild(projetElement)
        projetElement.appendChild(imageElement)
        projetElement.appendChild(titleElement)
    }
}

genererTravaux(travaux)

// Style Bouton
const btnElList = document.querySelectorAll(".btn")
btnElList.forEach(btnEl => {
    btnEl.addEventListener("click", () => {
        document.querySelector(".special")?.classList.remove("special")
        btnEl.classList.add("special")
    })
})

// Bouton Tous
const boutonAll = document.querySelector("#tousTravaux")
boutonAll.addEventListener("click", function() {
    const tousTravaux = Array.from(travaux)
    document.querySelector(".gallery").innerHTML = ""
    genererTravaux(tousTravaux)
})

// Bouton Objets
const boutonObjets = document.querySelector("#objetsTravaux")
boutonObjets.addEventListener("click", function() {
    const objetsTravaux = travaux.filter(function (categories){
        return categories.categoryId == 1
    })
    document.querySelector(".gallery").innerHTML = ""
    genererTravaux(objetsTravaux)
})

// Bouton Appartements
const boutonAppt = document.querySelector("#apptTravaux")
boutonAppt.addEventListener("click", function() {
    const apptTravaux = travaux.filter(function (categories){
        return categories.categoryId == 2
    })
    document.querySelector(".gallery").innerHTML = ""
    genererTravaux(apptTravaux)
})

// Bouton Hôtels & restaurants
const boutonHotelRestau = document.querySelector("#hotresTravaux")
boutonHotelRestau.addEventListener("click", function() {
    const hotresTravaux = travaux.filter(function (categories){
        return categories.categoryId == 3
    })
    document.querySelector(".gallery").innerHTML = ""
    genererTravaux(hotresTravaux)
})