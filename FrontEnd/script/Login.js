function authentification(){
    
    // Récupération du formulaire
    const loginForm = document.querySelector(".login-form")
    const inputEmail = document.getElementById("umail")
    let emailError = document.getElementById("email-error")
    const inputPsw = document.getElementById("upsw")
    let passwordError = document.getElementById("password-error")

    // Eventlistener du SUBMIT
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        // Récupération des données inscrite par l'utilisateur
        const logs = {
            email: document.getElementById("umail").value,
            password: document.getElementById("upsw").value
        }
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { 
                Accept: "appplication/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logs)
        })
        .then(async (response) => {
            if (response.status == 200) {
                const data = await response.json()
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.userId)
                window.location = "index.html"
            } else if (response.status == 404){
                const errorData = await response.json()
                emailError.textContent = "Identifiant incorrect"
            } else if (response.status == 401){
                const errorData = await response.json()
                passwordError.textContent = "Mot de passe incorrect"
            } else {
                throw Error(response.statusText)
            }
        })
        .catch((err) => {
            console.error("Erreur :", err)
        })
        // Nettoyage messages d'erreur
        inputEmail.addEventListener("click", (e) => {
            e.preventDefault()
            emailError.textContent = ""
        })
        inputPsw.addEventListener("click", (e) => {
            e.preventDefault()
            passwordError.textContent = ""
        })
    })
}

authentification()