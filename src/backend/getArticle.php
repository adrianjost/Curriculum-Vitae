<?php
header("Content-Type: text/html");

//including the database connection file
include_once("config.php");

//fetching data in descending order (lastest entry first)
$result = mysqli_query($mysqli, "SELECT article_description FROM aj_cv WHERE id = ".$_GET["load"]); // using mysqli_query instead

$first = true;

while($res = mysqli_fetch_array($result)) {
  echo $res[0];
}
?>
