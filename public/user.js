function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "" + "/user");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        console.log("result : " + result);
        if(!result) {
            window.location.replace("login.html");
        }
    };
    xhr.send();
}

getUser();