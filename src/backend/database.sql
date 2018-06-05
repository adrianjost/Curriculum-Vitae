create database test;

use test;

/*
{
  categorie: 1,
  title: 'Photography',
  icon: '',
  date:{
    from: 1360577940,
    to: 1518346131 , 
  }
}
*/
CREATE TABLE `aj_cv` (
  `id` int(16) NOT NULL auto_increment,
  `title` varchar(256) NOT NULL,
  `icon` varchar(128) NOT NULL,
  `categorie` int(2) NOT NULL,
  `date_from` int(16),
  `date_to` int(16),
  `article_url` varchar(1024),
  `article_image` varchar(1024),
  `article_description` varchar(4096),
  PRIMARY KEY  (`id`)
);