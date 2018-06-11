function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "" + "/user");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        if(result) {
            window.location = "/"
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
            window.location = "/"
        } else {

        }
    };
    xhr.send();
}

function saveUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "" + "/user");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        if(result !== "Not logged") {
            window.location = "/"
        }
    };
    xhr.send();
}

getUser();