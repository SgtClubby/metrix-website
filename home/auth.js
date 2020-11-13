$(function() {
    $(body).hide()
    let un;
    const token = localStorage.getItem('token');
    if (!token){
        return window.location.replace("../login")
    }
    const url = "https://api.metrix.pw/api/user/me"
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'token': token
        },
        redirect: 'follow',
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if(json._id){
                let un = json.username
                getUsername = () => {
                    return un
                }

                $(body).show()
                $("#idGSlogin").append(un)
            } else {
                window.location.replace("../login")
            }
    })
    
    logout = () => {
        localStorage.removeItem("token");
        window.location.replace("../login")
    }
})