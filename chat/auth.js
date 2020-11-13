$(function() {
    $(body).hide()
    let un;
    const url = "https://api.metrix.pw/api/user/me"
    const token = localStorage.getItem('token');
    if (!token){
        return window.location.replace("../login")
    }
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