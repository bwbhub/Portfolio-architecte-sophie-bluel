// Changement de display du lien modale
function showModaleLink() {
    const modaleLink = document.querySelector(".lien-modale")
    if (localStorage.token) {
        modaleLink.removeAttribute("style")
    }
    modaleLink.addEventListener("click", openModale)
}
// Variable choix fenetre modale
let modal = null
// Fonction ouverture modale 1
const openModale = function (e) {
    e.preventDefault()
    modal = document.querySelector(".modal1")
    modal.setAttribute("style", "display: null;")
    modal.setAttribute("aria-hidden", "false")
    modal.setAttribute("aria-modale", "true")
    modal.addEventListener("click", closeModale)
    modal.querySelector(".delete-photo").addEventListener("click", stopPropagation)
    modal.querySelector(".ajout-photo").addEventListener("click", stopPropagation)
    modal.querySelectorAll(".js-close-modale").forEach(a => { a.addEventListener("click", fermerToutesModales)})
}
// Fonction fermeture modale
const closeModale = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.setAttribute("style", "display: none;")
    modal.setAttribute("aria-hidden", "true")
    modal.setAttribute("aria-modale", "false")
    modal.removeEventListener("click", closeModale)
    modal.querySelector(".delete-photo").removeEventListener("click", stopPropagation)
    modal.querySelector(".ajout-photo").removeEventListener("click", stopPropagation)
    modal.querySelectorAll(".js-close-modale").forEach(a => { a.removeEventListener("click", fermerToutesModales)})
    fermetureCadrePhoto()
    modal = null
}
// Stop de la propagation de la fermeture au click sur le parent
const stopPropagation = function (e) {
    e.stopPropagation()
}
// Event listener lien modale
// Réponse à la touche Esc
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
}) 
// Ouverture et fermeture modale 2
const modalePhotoLink = document.getElementById("js-add-photo")
const fenetreAjoutPhoto = document.querySelector(".ajout-photo")
modalePhotoLink.addEventListener("click", (e) => {
    e.preventDefault()
    fenetreAjoutPhoto.setAttribute("style", "display: null;")
})
const btnPreviousModale = document.querySelector(".js-previous-modale")
btnPreviousModale.addEventListener("click", (e) => {
    fenetreAjoutPhoto.setAttribute("style", "display: none;")
    fermetureCadrePhoto()
})
const fermerToutesModales = function (e) {
    e.preventDefault()
    fenetreAjoutPhoto.setAttribute("style", "display: none;")
    closeModale(e)
}

// Options Formulaire ajout
const reponseCate = await fetch("http://localhost:5678/api/categories")
const categoriePhoto = await reponseCate.json()
function genererOptionCate(categoriePhoto){
    for(let i = 0 ; i < categoriePhoto.length ; i++){
        const article = categoriePhoto[i]
        // Récupération de l'élement DOM qui accueilllera les fiches
        const selectForm = document.getElementById("categorie-photo")
        // Balise dédiée à un projet
        const optionform = document.createElement("option")
        optionform.innerText = `${article.name}`
        optionform.setAttribute("Value", `${article.id}`)
        // Attachement des balises
        selectForm.appendChild(optionform)
    }
}

genererOptionCate(categoriePhoto)
showModaleLink()

// Chargement Photo dans le cadre & clear à la fermeture
function chargementPhoto () {
    const input = document.getElementById("file-input")
    const image = document.getElementById("uploaded-img")
    input.addEventListener("change", () =>{
        image.src = URL.createObjectURL(input.files[0])
        document.querySelector(".inner-cadre-ajouter-photo").setAttribute("style", "display: none;")
        image.setAttribute("style", "display: flex;")
    })
}

export function fermetureCadrePhoto () {
    const input = document.getElementById("file-input")
    const image = document.getElementById("uploaded-img")
    const titre = document.getElementById("title-photo")
    image.src = ""
    input.value = ""
    titre.value = ""
    document.querySelector(".inner-cadre-ajouter-photo").removeAttribute("style")
    image.setAttribute("style", "display: none;")
}

// Bouton submit Ajout Photo
const formNewWork = document.getElementById("form-new-work")
formNewWork.addEventListener("change", () => {
    const btn = document.getElementById("js-valider-photo")
    if (formNewWork.checkValidity()) {
        btn.removeAttribute("disabled")
        btn.setAttribute("class", "btn-modale")
    }
})


chargementPhoto()
fermetureCadrePhoto()