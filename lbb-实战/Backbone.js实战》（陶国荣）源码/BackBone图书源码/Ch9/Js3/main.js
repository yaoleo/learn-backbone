require(["max", "../Script/jquery-1.8.2.min"], function (max) {
    $("#Button1").bind("click", function () {
        var $a = $("#Text1").val();
        var $b = $("#Text2").val();
        var $m = max.Max($a, $b);
        $("#tip").show().html("最大值是：" + $m);
    });
});