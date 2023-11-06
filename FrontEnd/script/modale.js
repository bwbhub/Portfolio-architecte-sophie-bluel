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
        imageElement.alt = `${article.title} | ID: ${article.id}`
        const buttonElement = document.createElement("span")
        buttonElement.setAttribute("class", "fa-solid fa-trash-can fa-xs")
        
        // Attachement des balises
        sectionModale.appendChild(projetElement)
        projetElement.appendChild(imageElement)
        projetElement.appendChild(buttonElement)
        
        // Event listener button delete
        buttonElement.addEventListener("click", async (e) => {
            e.preventDefault()
            e.stopPropagation()
            const imageId = article.id
            let monToken = localStorage.getItem("token")
            let response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                method: "DELETE",
                headers: {accept:"*/*", Authorization: `Bearer: ${monToken}`,},
            })
            .then(async (response)=> {
                if (response.status == 200) {
                    alert("Photo supprimé avec succès.")
                } else if (response.status == 401) {
                    alert("Action non autorisée.")
                } else if (response.status == 500) {
                    alert("Erreur inattendue.")
                } else {
                    throw Error(response.statusText)
                }
            })
            .catch((err) => {
                console.log("Erreur :", err)
            })
        })
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
// Déclaration de variables pour focus Tab
const focusableSelector = "a, span, button"
let focusables = []
// Fonction ouverture modale
const openModale = function (e) {
    e.preventDefault()
    modal = document.querySelector(".modal1")
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.setAttribute("style", "display: null;")
    modal.setAttribute("aria-hidden", "false")
    modal.setAttribute("aria-modale", "true")
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
// Fonction Tab focus Modale
const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    index++
    if(index >= focusables.length) {
        index= 0
    }
    focusables[index].focus()
}
// Event listener lien modale
modaleLink.addEventListener("click", openModale)
// Réponse à la touche Esc puis Tab
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})