<?php
// https://www.w3.org/wiki/WebAccessControl#Setting_.22Access-Control-Allow-Methods.22_for_a_particular_Agent
header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-type: application/json;charset=utf-8');

require_once 'database.php';

// $headers = apache_request_headers();
// print json_encode($headers);
if (!(isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_USER'] == 'panchai' && $_SERVER['PHP_AUTH_PW'] == '489329')) {
    header('WWW-Authenticate: Basic realm="Restricted area"');
    header('HTTP/1.1 401 Unauthorized');
    exit;
} else {
    $std_id = explode('/', $_POST['std_id'])[3];
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