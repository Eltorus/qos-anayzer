function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "" + "/user");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        console.log("result : " + result);
        if(result) {
            window.location = "admin.html";
        }
    };
    xhr.send();
}

function login() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "" + "/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        if(result) {
            window.location = "admin.html";
        } else {
            window.location = "/";
        }
    };
    xhr.send();
}

getUser();