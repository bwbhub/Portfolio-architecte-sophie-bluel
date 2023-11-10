import { fermetureCadrePhoto } from "./modale.js"
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
        imageElement.alt = `${article.title}`
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
        imageElement.alt = `${article.title}`
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
function suppressionProjets(e){
    e.addEventListener("click", (event) => {
        event.preventDefault()
        const imageId = event.target.id
        let monToken = localStorage.getItem("token")
        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${monToken}`,},
        })
        .then((response) => {
            if (response.ok) {
                const elementGallery = document.querySelector(`.projet${imageId}`)
                elementGallery.remove()
                const elementModale = document.querySelector(`.modale${imageId}`)
                elementModale.remove()
            } else {
                console.error("Erreur lors de la suppression de l'élement")
            }
        })
    })
}
const buttonElement = document.querySelectorAll(".fa-trash-can")
buttonElement.forEach(suppressionProjets)

// Fonction ajout dynamique des photos ajoutées
function modaleDynamique (data) {
    const sectionModale = document.querySelector(".js-delete-photo")
    const projetElement = document.createElement("figure")
    projetElement.className = `modale${data.id}`
    const imageElement = document.createElement("img")
    imageElement.src = data.imageUrl
    imageElement.alt = data.title
    const buttonElement = document.createElement("span")
    buttonElement.setAttribute("class", "fa-solid fa-trash-can")
    buttonElement.id = data.id
    sectionModale.appendChild(projetElement)
    projetElement.appendChild(buttonElement)
    projetElement.appendChild(imageElement)
}
function galleryDynamique (data) {
    const sectionGallery = document.querySelector(".gallery")
    const projetElement = document.createElement("figure")
    projetElement.className = `projet${data.id}`
    const imageElement = document.createElement("img")
    imageElement.src = data.imageUrl
    imageElement.alt = data.title
    const titleElement = document.createElement("figcaption")
    titleElement.innerText = data.title
    sectionGallery.appendChild(projetElement)
    projetElement.appendChild(imageElement)
    projetElement.appendChild(titleElement)
}

// Fonction Ajout Photo
function ajouterPhoto() {
    const formNewWork = document.querySelector(".formulaire-ajout-photo")
    let monToken = localStorage.getItem("token")
    formNewWork.addEventListener("submit", (e) => {
        e.preventDefault()
        const newProjet = new FormData()
        newProjet.append("image", e.target.querySelector("[name=file-input]").files[0])
        newProjet.append("title", e.target.querySelector("[name=title-photo]").value)
        newProjet.append("category", e.target.querySelector("[name=categorie-photo]").value)
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${monToken}`,
                Accept: "application/json",
                Content: "multipart/form-data"
            },
            body: newProjet
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            alert("Photo ajoutée avec succès !")
            fermetureCadrePhoto()
            modaleDynamique(data)
            galleryDynamique(data)
            const newButtonElement = document.querySelectorAll(".fa-trash-can")
            newButtonElement.forEach(suppressionProjets)
        })
        .catch((error) => {
            console.error("Erreur : ", error);
        })
    })
}


ajouterPhoto()