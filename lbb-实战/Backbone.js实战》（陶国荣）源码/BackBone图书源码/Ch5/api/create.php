<?php
    //���ý������ݵĸ�ʽ
	header('Content-Type: application/json; charset=utf-8'); 
    //��ȡ�ͻ��˷�����������	
	$data = json_decode(file_get_contents("php://input"));
	/*
	 ��ȡ��������ֵ����������������
	 ...
	*/
	//���ظ��³ɹ��ı�־
	die(json_encode(array('code'=>'206')));
?>
