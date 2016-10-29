function submit() {
    var title = $('#title').val();
    var content = $('#content').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Version/submitVersion",
        data: JSON.stringify({
            title: title,
            content:content,
        }),
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            alert("err:" + err);
        }
    });
}

function pull() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Version/pullVersion",
        success: function (data) {
            console.log(data);
            var body = $("#body");
            var string = "";
            for(x in data){
                string = string +"<br/>" +data[x].title +"<br/>"+data[x].content+"<br/><br/>";
            }
            body.append(string)
        },
        error: function (err) {
            alert("err:" + err);
        }
    });
}