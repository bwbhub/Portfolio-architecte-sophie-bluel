// Fetch travaux pour affichage dynamique modale
const reponse = await fetch("http://localhost:5678/api/works")
const travauxModale = await reponse.json()

// Fonction appel dynamique des travaux via API
function genererTravauxModale(travauxModale){
    for(let i = 0 ; i < travauxModale.length ; i++){
        
        const article = travauxModale[i]
        // Récupération de l'élement DOM qui accueilllera les fiches
        const sectionModale = document.querySelector(".modale-box-js")
        // Balise dédiée à un projet
        const projetElement = document.createElement("figure")
        // Création des balises
        const imageElement = document.createElement("img")
        imageElement.src = article.imageUrl
        imageElement.alt = article.title
        const buttonElement = document.createElement("span")
        buttonElement.setAttribute("class", "fa-solid fa-trash-can")
        
        // Attachement des balises
        sectionModale.appendChild(projetElement)
        projetElement.appendChild(imageElement)
        projetElement.appendChild(buttonElement)
    }
}
// Appel de la fonction
genererTravauxModale(travauxModale)

// Changement de display du lien modale
const modaleLink = document.querySelector(".lien-modale")
function showModaleLink() {
    if (localStorage.token) {
        modaleLink.removeAttribute("style")
    }
}
// Appel de la fonction
showModaleLink()

// Variable choix fenetre modale
let modal = null
// Fonction ouverture modale
const openModale = function (e) {
    e.preventDefault()
    const target = document.querySelector(".modal1")
    target.setAttribute("style", "display: null;")
    target.setAttribute("aria-hidden", "false")
    target.setAttribute("aria-modale", "true")
    modal = target
    modal.addEventListener("click", closeModale)
    modal.querySelector(".container-modale").addEventListener("click", stopPropagation)
    modal.querySelector(".js-close-modale").addEventListener("click", closeModale)
}
// Fonction fermeture modale
const closeModale = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.setAttribute("style", "display: none;")
    modal.setAttribute("aria-hidden", "true")
    modal.setAttribute("aria-modale", "false")
    modal.removeEventListener("click", closeModale)
    modal.querySelector(".container-modale").removeEventListener("click", stopPropagation)
    modal.querySelector(".js-close-modale").removeEventListener("click", closeModale)
    modal = null
}
// Stop de la propagation de la fermeture au click sur le parent
const stopPropagation = function (e) {
    e.stopPropagation()
}
// Event listener lien modale
modaleLink.addEventListener("click", openModale)