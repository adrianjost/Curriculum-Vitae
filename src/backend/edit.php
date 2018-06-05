<?php
// including the database connection file
include_once("config.php");

if(isset($_POST['update']))
{	

	$id = mysqli_real_escape_string($mysqli, $_POST['id']);
	
	$title = mysqli_real_escape_string($mysqli, $_POST['title']);
	$icon = mysqli_real_escape_string($mysqli, $_POST['icon']);
	$categorie = mysqli_real_escape_string($mysqli, $_POST['categorie']);
	$date_from = strtotime(mysqli_real_escape_string($mysqli, $_POST['date_from']));
	$date_to = strtotime(mysqli_real_escape_string($mysqli, $_POST['date_to']));
	$article_url = mysqli_real_escape_string($mysqli, $_POST['article_url']);
	$article_image = mysqli_real_escape_string($mysqli, $_POST['article_image']);
	$article_description = mysqli_real_escape_string($mysqli, $_POST['article_description']);
	
  //updating the table
  $result = mysqli_query($mysqli, "UPDATE aj_cv SET title='$title',icon='$icon',categorie='$categorie',date_from='$date_from',date_to='$date_to',article_url='$article_url',article_image='$article_image',article_description='$article_description' WHERE id=$id");
  
  //redirectig to the display page. In our case, it is index.php
  header("Location: index.php");
}
?>
<?php
//getting id from url
$id = $_GET['id'];

//selecting data associated with this particular id
$result = mysqli_query($mysqli, "SELECT * FROM aj_cv WHERE id=$id");

while($res = mysqli_fetch_array($result))
{
  $title = $res['title'];
	$icon = $res['icon'];
	$categorie = $res['categorie'];
	$date_from = $res['date_from'];
	$date_to = $res['date_to'];
	$article_url = $res['article_url'];
	$article_image = $res['article_image'];
	$article_description = $res['article_description'];
}
?>
<html>
<head>	
	<title>Edit Data</title>
</head>

<body>
	<a href="index.php">Home</a>
	<br/><br/>
	
	<form name="form1" method="post" action="edit.php">
		<table border="0">
      <tr> 
				<td>Title</td>
				<td><input type="text" name="title" value="<?php echo $title;?>"></td>
			</tr>
			<tr> 
				<td>Icon</td>
				<td><input type="text" name="icon" value="<?php echo $icon;?>"></td>
			</tr>
			<tr> 
				<td>categorie</td>
				<td>
          <select name="categorie">
            <option value="1" <?php echo ($categorie == 1)?'selected':'';?>>Education</option>
            <option value="2" <?php echo ($categorie == 2)?'selected':'';?>>Work</option>
            <option value="3" <?php echo ($categorie == 3)?'selected':'';?>>Projects</option>
            <option value="4" <?php echo ($categorie == 4)?'selected':'';?>>Competitions</option>
            <option value="5" <?php echo ($categorie == 5)?'selected':'';?>>Prices</option>
          </select>
        </td>
			</tr>
      <tr> 
				<td>date_from</td>
				<td><input type="date" name="date_from" value="<?php echo gmdate("Y-m-d", $date_from);?>"></td>
			</tr>
      <tr> 
				<td>date_to</td>
				<td><input type="date" name="date_to" value="<?php echo gmdate("Y-m-d", $date_to);?>"></td>
			</tr>
      <tr> 
				<td>article_url</td>
				<td><input type="text" name="article_url" value="<?php echo $article_url;?>"></td>
			</tr>
      <tr> 
				<td>article_image</td>
				<td><input type="text" name="article_image" value="<?php echo $article_image;?>"></td>
			</tr>
      <tr> 
				<td>article_description</td>
				<td><textarea name="article_description"><?php echo ($article_description);?></textarea></td>
			</tr>
			<tr>
				<td><input type="hidden" name="id" value=<?php echo $_GET['id'];?>></td>
				<td><input type="submit" name="update" value="Update"></td>
			</tr>
		</table>
	</form>
	<!-- Include CSS for icons. -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<!-- Include Editor style. -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />
	<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1/css/froala_style.min.css" rel="stylesheet" type="text/css" />
	<!-- Include jQuery lib. -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<!-- Include Editor JS files. -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1//js/froala_editor.pkgd.min.js"></script>
	<!-- Initialize the editor. -->
	<script>
		$(function() {
			$('textarea').froalaEditor();
		});
		function hideDemo()
		{
			$("a:contains('Unlicensed Froala Editor')").css("display", "none");
		}
		setInterval(hideDemo, 20);
		
	</script>
</body>
</html>
