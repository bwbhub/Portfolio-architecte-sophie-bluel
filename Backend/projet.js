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