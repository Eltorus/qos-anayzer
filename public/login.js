function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "" + "/user");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var result = xhr.response;
        if(result) {
            window.location = "admin.html";
        }
    };
    xhr.send();
}

function login() {
    var name = $("#name").val();
    var pswrd = $("#pswrd").val();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "" + "/login");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        var result = JSON.parse(xhr.response);
        if(result[name] !== undefined && result[name] === pswrd) {
            window.location.replace("admin.html");
        } else {
            window.location.reload("index.html");
        }
    };
    xhr.send(JSON.stringify({ name: name, pswrd: pswrd}));
}

getUser();