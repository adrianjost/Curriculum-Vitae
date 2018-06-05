<?php
//including the database connection file
include_once("config.php");

//fetching data in descending order (lastest entry first)
//$result = mysql_query("SELECT * FROM aj_cv ORDER BY id DESC"); // mysql_query is deprecated
$result = mysqli_query($mysqli, "SELECT * FROM aj_cv ORDER BY date_to DESC"); // using mysqli_query instead
?>

<html>
<head>	
	<title>Homepage</title>
</head>

<body>
<a href="add.html">Add New Data</a><br/><br/>

  <table width='80%'>
    <tr style='background: #2d95bf; color: #fff'>
      <th>Titel</th>
      <th>Icon</th>
      <th>Categorie</th>
      <th>From</th>
      <th>To</th>
    </tr>
    <?php 
    //while($res = mysql_fetch_array($result)) { // mysql_fetch_array is deprecated, we need to use mysqli_fetch_array 
    while($res = mysqli_fetch_array($result)) { 		
      echo "<tr>";
      echo "<td>".$res['title']."</td>";
      echo "<td>".$res['icon']."</td>";
      echo "<td>".$res['categorie']."</td>";	
      echo "<td>".gmdate("d.m.Y", $res['date_from'])."</td>";	
      echo "<td>".gmdate("d.m.Y", $res['date_to'])."</td>";	
      echo "<td><a href=\"edit.php?id=$res[id]\">Edit</a> | <a href=\"delete.php?id=$res[id]\" onClick=\"return confirm('Are you sure you want to delete?')\">Delete</a></td>";		
    }
    ?>
	</table>
</body>
</html>