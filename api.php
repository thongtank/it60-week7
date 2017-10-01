<?php
// https://www.w3.org/wiki/WebAccessControl#Setting_.22Access-Control-Allow-Methods.22_for_a_particular_Agent
header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-type: application/json;charset=utf-8');
// $db = 'it60';
// $user = 'root';
// $password = '489329';
// $host = 'localhost';

// $link = mysqli_connect($host, $user, $password, $db);
// if (!$link) {
//     print mysqli_connect_error();
//     exit;
// } else {
//     mysqli_set_charset($link, 'UTF8');
// }
require_once 'database.php';

$std_id = $_POST['std_id'];
$std_fname = $_POST['std_fname'];
$std_lname = $_POST['std_lname'];
$std_gender = $_POST['std_gender'];
$std_age = $_POST['std_age'];
$sql = sprintf('INSERT INTO `tb_students`(`std_id`, `std_fname`, `std_lname`, `std_gender`, `std_age`, `date_added`) VALUES (\'%s\',\'%s\',\'%s\',\'%s\',\'%d\',NOW())', $std_id, $std_fname, $std_lname, $std_gender, $std_age);
$rs = mysqli_query($link, $sql);
if ($rs) {
    $rt = array('code' => 200, 'msg' => 'success');
} else {
    $rt = array('code' => 500, 'msg' => mysqli_error($link));
}
mysqli_close($link);
print json_encode($rt);
exit();
