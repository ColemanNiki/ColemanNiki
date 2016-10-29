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