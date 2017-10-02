<?php
// https://www.w3.org/wiki/WebAccessControl#Setting_.22Access-Control-Allow-Methods.22_for_a_particular_Agent
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-type: application/json;charset=utf-8');

require_once 'database.php';

$rt = array();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	$rt = array('code' => 500, 'msg' => 'Not PUT Method');
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
	parse_str(file_get_contents("php://input"), $post_vars);
	$sql = sprintf('UPDATE `tb_students` SET `std_fname`="%s",`std_lname`="%s",`std_gender`="%s",`std_age`=%d,`date_added`=NOW() WHERE `std_id`="%s" LIMIT 1;',
		$post_vars['d']['std_fname'],
		$post_vars['d']['std_lname'],
		$post_vars['d']['std_gender'],
		$post_vars['d']['std_age'],
		$post_vars['d']['std_id']
	);
	$rs = mysqli_query($link, $sql);
	if ($rs) {
		$rt = array('code' => 200, 'msg' => 'success');
	} else {
		$rt = array('code' => 500, 'msg' => mysqli_error($link));
	}
	mysqli_close($link);
}
print json_encode($rt);
exit;
