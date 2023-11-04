let loginOut = document.getElementById("login-out");

function changeLogin() {
    if (localStorage.token) {
        loginOut.innerHTML = `<a href="index.html">logout</a>`;
        loginOut.addEventListener("click", () => {
            localStorage.clear();
        })
    } else {
        loginOut.innerHTML = `<a href="login.html">login</a>`;
    }
}


changeLogin();