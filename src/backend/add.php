<html>
<head>
	<title>Add Data</title>
</head>

<body>
<?php
//including the database connection file
include_once("config.php");

if(isset($_POST['Submit'])) {	
	$title = mysqli_real_escape_string($mysqli, $_POST['title']);
	$icon = mysqli_real_escape_string($mysqli, $_POST['icon']);
	$categorie = mysqli_real_escape_string($mysqli, $_POST['categorie']);
	$date_from = strtotime(mysqli_real_escape_string($mysqli, $_POST['date_from']));
	$date_to = strtotime(mysqli_real_escape_string($mysqli, $_POST['date_to']));
	$article_url = mysqli_real_escape_string($mysqli, $_POST['article_url']);
	$article_image = mysqli_real_escape_string($mysqli, $_POST['article_image']);
	$article_description = mysqli_real_escape_string($mysqli, $_POST['article_description']);

  // if all the fields are filled (not empty) 
    
  //insert data to database	
  $result = mysqli_query($mysqli, "INSERT INTO aj_cv( title,icon,categorie,date_from,date_to,article_url,article_image,article_description) VALUES('$title','$icon','$categorie','$date_from','$date_to','$article_url','$article_image','$article_description')");
  
  //display success message
  echo "<font color='green'>Data added successfully.";
  echo "<br/><a href='index.php'>View Result</a>";
}
?>
</body>
</html>
