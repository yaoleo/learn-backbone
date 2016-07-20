require(["json", "../Script/jquery-1.8.2.min"], function (json) {
    $("#tip").html(json.name + "<br/>" + json.sex + "<br/>" + json.email);
});