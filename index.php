<!-- 
	* Personal Cards 1.0 by Luca Cassani *
	
	You can copy, modify, publish, use, sell, 
	or distribute this template for any purpose,
	commercial or non-commercial, and by any means. 
	It requires no special copyright notes nor attribution.
-->

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Adrian Jost | HackedIT.de</title>
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<meta name="description" content="Your meta-description here">
	<meta name="author" content="Adrian Jost">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="theme-color" content="#F44336">
</head>
<body>
<div id="blue_bg"></div>
<header>
	<div id="quick_card" class="card">
		<div><img id="photo" src="img/adrianjost.jpg" /></div> <!-- replace photo in /img/ 705x705 -->
		<h1 id="name">Adrian Jost</h1>
		<h2 id="description">Student - Designer - Developer</h2>
	</div>
</header>
<main>
<div id="about_card" class="card">
	<!-- <section class="tab">
		<div class="title"><i class="fa fa-globe"></i>Websites</div>
		<div class="content">
			<section class="element"> 
						<div class="name"><a href="https://hackedit.de" target="_blank">HackedIT.de</a></div>
						<div class="info">Tutorials about projects of me</div>
			</section>
			<hr align="left"/>
			<section class="element"> 
					<div class="name"><a href="http://websnooze.com" target="_blank">Websnooze.com</a></div>
					<div class="info">The best site to relax!</div>
			</section>
			<hr align="left"/>
			<section class="element"> 
					<div class="name"><a href="http://archenhold.de" target="_blank">Websnooze.com</a></div>
					<div class="info">Website of my old school</div>
			</section>
		</div>
	</section> -->
	<section class="tab">
		<div class="title"><i class="fa fa-graduation-cap"></i>Education</div>
		<div class="content">
			<section class="element">
				<div class="name">Hasso Plattner Institut, Potsdam (GER)</div>
				<div class="info">Oct 2016 - <span id="now"></span> </div>
			</section>
			<section class="element">
				<div class="name">Archenhold-Gymnasium, Berlin (GER)</div>
				<div class="info">Jul 2010 - Jul 2016 </div>
			</section>
			<!-- You can add more education details! -->
		</div>
	</section>
	<section class="tab">
		<div class="title"><i class="fa fa-suitcase"></i>My Work</div>
		<div class="content">
			<section class="element"> 
					<div class="name">hackedit.de</div>
					<div class="info">My Website: <a href="https://hackedit.de" target="_blank">HackedIT.de</a></div>
			</section>
			<hr align="left"/>
			<section class="element">
				<div class="name">websnooze.com</div>
				<div class="info">Awesome photos everywhere at <a href="https://websnooze.com" target="_blank">Websnooze.com</a></div>
			</section>
			<hr align="left"/>
			<section class="element">
				<div class="name">m.archenhold.de</div>
				<div class="info">Mobile version of <a href="http://m.archenhold.de" target="_blank">archenhold.de</a></div>
			</section>
			<hr align="left"/>
			<section class="element">
				<div class="name">more</div>
				<div class="info">find more <a href="https://hackedit.de/references/" target="_blank">on my website</a></div>
			</section>
			<!-- You can add more work details ! -->
		</div>
	</section>
</div>
<div id="contact_card" class="card">
	<section class="tab">
		<div class="title"><i class="fa fa-smile-o"></i>Social</div>
		<div class="content">
			<div class="contacts"><a href="https://hackedit.de/contact" target="_blank"><i class="fa fa-envelope"></i>&nbsp; E-Mail</a></div>
			<div class="contacts"><a href="https://plus.google.com/+AdrianJostProjects" target="_blank"><i class="fa fa-google-plus"></i>&nbsp; Google+</a></div>
			<div class="contacts"><a href="https://hackedit.de/references" target="_blank"><i class="fa fa-instagram"></i>&nbsp; Instagram</a></div>
			<!-- You can add more contacts! -->
		</div>
	</section>
</div>
<a href="https://hackedit.de/contact">
	<div id="fab">&nbsp;<i class="fa fa-envelope"></i>&nbsp;</div>
</a>
</main>
<footer>
  <small><a class="text" href="http://lucacassani.me/personalcards/" target="_blank">Personal Cards</a>, <a href="http://hackedit.de" target="_blank">Adrian Jost</a></small>
</footer>
<script>
function newnow(){
	var today = new Date();
	document.getElementById("now").innerHTML = today.toLocaleString();
}newnow();
setInterval(newnow, 1e3);
</script>
</body>
</html>