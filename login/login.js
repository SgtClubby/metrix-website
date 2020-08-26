function validate(){
var email = document.getElementById("username").value;
var password = document.getElementById("password").value;

const url = "http://localhost:4242/api/user/login"
try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "email" : email,
        "password" : password
        })
    );
    xhr.onload = function () {
        var data = JSON.parse(this.response)
        if (xhr.status >= 200 && xhr.status < 400) {
            token = data.token
            console.log(token)
            localStorage.setItem('token', token)
            window.location.replace("../home/index.htm")
        } else {
            alert("Incorrect email or password!")
        }
        }
        
} catch (error) {
    console.log(error)
}

}