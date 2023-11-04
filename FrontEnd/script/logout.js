let loginOut = document.getElementById("login-out")

function changeLogin() {
    if (localStorage.token) {
        loginOut.innerHTML = `<a href="index.html" onClick="logout()">logout</a>`
    } else {
        loginOut.innerHTML = `<a href="login.html">login</a>`
    }
}

function logout(){
    localStorage.clear()
    changeLogin()
}

changeLogin()