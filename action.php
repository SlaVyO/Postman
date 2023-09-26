<?php
$method = $_SERVER['REQUEST_METHOD'];
if (isset($_GET)) {
$url = (array_key_first($_GET)!="param1" ? array_key_first($_GET) : Null);}
$result = array(
        'method' => $method,
        'requrl'  => $url,
    ); 
if (isset($_POST["param1"]) && isset($_POST["param2"]) ) { 

	// Формируем массив для JSON ответа
    $result  += array(
    	'first' => $_POST["param1"],
    	'second' => $_POST["param2"]
    ); 

}
if ('PUT' === $method) {
    parse_str(file_get_contents('php://input'), $_PUT);
}// Function Edit Data
if(!empty($_PUT['param1']) && !empty($_PUT['param2'])) {
$result  += array(
        'first' => $_PUT["param1"],
        'second' => $_PUT["param2"]
    ); 
}
if(!empty($_GET['param1']) && !empty($_GET['param2']) ){
$result  += array(
        'first' => $_GET["param1"],
        'second' => $_GET["param2"]
    ); 
}


http_response_code(200);
echo json_encode($result); 

?>