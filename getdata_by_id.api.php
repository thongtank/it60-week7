<?php
// https://www.w3.org/wiki/WebAccessControl#Setting_.22Access-Control-Allow-Methods.22_for_a_particular_Agent
header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-type: application/json;charset=utf-8');

require_once 'database.php';

$sql = sprintf('SELECT * FROM `tb_students` where std_id = \'%s\' LIMIT 1;', trim($_POST['std_id']));
$rs = mysqli_query($link, $sql);
if ($rs) {
    $arr_json = array();
    while ($row = mysqli_fetch_assoc($rs)) {
        $arr_json[] = $row;
    }
    mysqli_close($link);
    print json_encode($arr_json[0]);
}
exit();
