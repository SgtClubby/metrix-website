function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
  
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }
$(function() {
    const logintoken = localStorage.getItem('token');
    
    addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            if ($(submit).is(":hidden")) {
                event.preventDefault();
                document.getElementById("conf").click();
            } else {
                event.preventDefault();
                document.getElementById("submit").click();
            }
        }
    })

    $("img, #error, #form_id").hide()
    $("#form_id").fadeIn(1000)
    $("img").fadeIn(400)
    $("#username, #canc, #conf").hide()
    
    if (detectMob() === true) {
        return $("#particles-js").remove()
    } 

    const validateToken = document.getElementById('submit')
    const registerButton = document.getElementById('register')
    const registerCancel = document.getElementById('canc')
    const registerConfrim = document.getElementById('conf')
    

    validateToken.addEventListener("click", async function() {
        $(error).empty()
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        const url = "https://api.metrix.pw/api/user/login"
        
        const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({'email': email, 'password': password})
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if(json.token){
                const logintoken = json.token
                localStorage.setItem('token', logintoken)
                window.location.replace("../home")
            } else {
                $("#error").show()
                try {
                    let errors = json.errors
                    if (!errors) {
                        if ($("#error").is(':empty')) {
                            $("#error").append("Invalid email/password")
                            window.setTimeout(function(){$("#error").empty()},3000)
                        }
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    })
    
    registerButton.addEventListener("click", async function() {
        $("#submit, #register, #form_id").hide()
        $("#form_id").fadeIn(400)
        $("#username, #conf, #canc").show()
        $("#username, #password, #email, #error").empty()
    })

    registerCancel.addEventListener("click", async function() {
        $("#conf, #canc, #username, #form_id").hide()
        $("#form_id").fadeIn(400)
        $("#submit, #register").show()
        $("#error").empty()
    })

    registerConfrim.addEventListener("click", async function() {
        $("#error").empty()
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var username = document.getElementById("username").value;

        const url = "https://api.metrix.pw/api/user/signup"
        
        const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({'username': username, 'email': email, 'password': password})
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if(json.token){
                $("#error").show()
                if ($("#error").is(':empty')) {
                    $("#error").append("Succesfully created account! <br> Please log in!")
                    window.setTimeout(function(){location.reload()},1500)
                }
            } else {
                $("#error").show()
                try {
                    errors = json.errors
                    if (!errors) {
                        userexist = json.msg
                        if ($("#error").is(':empty')) {
                            $("#error").append(userexist + "<br>")
                            window.setTimeout(function(){$("#error").empty()},3000)
                        }
                    }
                    if ($("#error").is(':empty')) {
                        errors.forEach(fault => {
                            $(error).append(fault.msg + "<br>")
                            window.setTimeout(function(){$(error).empty()},3000)
                        });
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    })  
});