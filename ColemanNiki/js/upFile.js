var file, fd = new FormData, xhr = new XMLHttpRequest(),input;

window.onload = function () {
    input = document.getElementById("input");
    input.onchange = function () {
        document.getElementById("submit").disabled = false;
    }
}
function submit() {
    file = input.files[0];
    fd.append('file', file);
    xhr.onreadystatechange = callBack;
    xhr.open("POST", '/User/getImg',true);
    xhr.send(fd);
}

//回调函数
function callBack(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        var x = xhr.responseText;
        alert(x);
    }
}