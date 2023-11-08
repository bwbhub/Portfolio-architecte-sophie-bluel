const reponse = await fetch("http://localhost:5678/api/works")
const travaux = await reponse.json()

function genererTravaux(travaux){
    for(let i = 0 ; i < travaux.length ; i++){
        
        const article = travaux[i]
        // Récupération de l'élement DOM qui accueilllera les fiches
        const sectionGallery = document.querySelector(".gallery")
        // Balise dédiée à un projet
        const projetElement = document.createElement("figure")
        projetElement.className = `projet${article.id}`
        // Création des balises
        const imageElement = document.createElement("img")
        imageElement.src = article.imageUrl
        imageElement.alt = `${article.title} | ID: ${article.id}`
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
// Affichage gallery dans Modale
function genererTravauxModale(travaux){
    for(let i = 0 ; i < travaux.length ; i++){
        const article = travaux[i]
        // Récupération de l'élement DOM qui accueilllera les fiches
        const sectionModale = document.querySelector(".js-delete-photo")
        // Balise dédiée à un projet
        const projetElement = document.createElement("figure")
        projetElement.className = `modale${article.id}`
        // Création des balises
        const imageElement = document.createElement("img")
        imageElement.src = article.imageUrl
        imageElement.alt = `${article.title} | ID: ${article.id}`
        const buttonElement = document.createElement("span")
        buttonElement.setAttribute("class", "fa-solid fa-trash-can")
        buttonElement.id = article.id
        
        // Attachement des balises
        sectionModale.appendChild(projetElement)
        projetElement.appendChild(imageElement)
        projetElement.appendChild(buttonElement)
        
    }
}
genererTravauxModale(travaux)

// Suppression work
const buttonElement = document.querySelectorAll(".fa-trash-can")
buttonElement.forEach( a => {
    a.addEventListener("click", (event) => {
        event.preventDefault()
        const imageId = event.target.id
        let monToken = localStorage.getItem("token")
        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${monToken}`,},
        })
        .then((response) => {
            if (response.ok) {
                const sectionGallery = document.querySelector(`.projet${imageId}`)
                sectionGallery.remove()
                const sectionModale = document.querySelector(`.modale${imageId}`)
                sectionModale.remove()
            } else {
                console.error("Erreur lors de la suppression de l'élement")
            }
        })
    })
})