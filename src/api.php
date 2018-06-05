<?php 
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if($_GET['load'] == "all"){
    include_once("backend/getAllAsJson.php");
} else {
    include_once("backend/getArticle.php");
}
?>
