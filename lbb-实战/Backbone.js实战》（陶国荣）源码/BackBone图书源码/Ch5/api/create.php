<?php
    //设置接收数据的格式
	header('Content-Type: application/json; charset=utf-8'); 
    //获取客户端发送来的数据	
	$data = json_decode(file_get_contents("php://input"));
	/*
	 获取各个属性值，保存至服务器中
	 ...
	*/
	//返回更新成功的标志
	die(json_encode(array('code'=>'206')));
?>
