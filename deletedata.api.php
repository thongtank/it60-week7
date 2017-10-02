<?php
// https://www.w3.org/wiki/WebAccessControl#Setting_.22Access-Control-Allow-Methods.22_for_a_particular_Agent
header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	}
	exit(0);
}
header('Content-type: application/json;charset=utf-8');

require_once 'database.php';

if (!(isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_USER'] == 'panchai' && $_SERVER['PHP_AUTH_PW'] == '489329')) {
	header('WWW-Authenticate: Basic realm="Restricted area"');
	header('HTTP/1.1 401 Unauthorized');
	exit;
} else {
	// $std_id = explode('/', $_POST['std_id'])[3];
	$std_id = $_POST['std_id'];
	$sql = sprintf('DELETE FROM `tb_students` WHERE std_id = \'%s\';', $std_id);
	$rs = mysqli_query($link, $sql);
	$response = array('message' => '', 'code' => 0);
	if ($rs) {
		$response['message'] = 'success';
		$response['code'] = 200;
	} else {
		$response['message'] = mysqli_error($link);
		$response['code'] = 500;
	}
	mysqli_close($link);
	print json_encode($response);
}
exit();