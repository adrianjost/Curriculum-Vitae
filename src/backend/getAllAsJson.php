<?php
header("Content-Type: application/json");

//including the database connection file
include_once("config.php");

//fetching data in descending order (lastest entry first)
//$result = mysql_query("SELECT * FROM aj_cv ORDER BY id DESC"); // mysql_query is deprecated
$result = mysqli_query($mysqli, "SELECT * FROM aj_cv ORDER BY date_to DESC"); // using mysqli_query instead
?>

	<?php 
  $first = true;
	//while($res = mysql_fetch_array($result)) { // mysql_fetch_array is deprecated, we need to use mysqli_fetch_array 
  echo '[';
	while($res = mysqli_fetch_array($result)) {
    if(!$first){
      echo ",";
    }
    $first = false;
		echo '{';
		echo '"id":"'.$res["id"].'",';
		echo '"title":"'.$res["title"].'",';
		echo '"icon":"'.$res["icon"].'",';
		echo '"categorie":'.$res["categorie"].',';
		echo '"date":{';
      echo '"from":'.($res["date_from"]*1000);
      echo (($res["date_to"])?(',"to":'.($res["date_to"]*1000)):'');
		echo '},';
    echo '"article":{';
      echo '"url":"'.$res["article_url"].'",';
      echo '"image":"'.$res["article_image"].'"';
      // echo '"description":'.json_encode($res["article_description"]);
		echo '}}';
	}
  echo ']';
	?>
