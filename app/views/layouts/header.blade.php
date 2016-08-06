<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Map Based Search | Jojoee</title>
<meta name="description" content="simple responsive website that allows the user to search for a city  and displays tweets that mention the city on a map.">
<meta name="keywords" content="Map Based Search, Twitter">
<meta name="viewport" content="width=device-width, initial-scale=1">
{{ HTML::style('css/reset.min.css') }}
{{ HTML::style('https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css') }}
{{ HTML::style('css/style.css') }}
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '{{ $googleAnalyticsKey }}', 'auto');
  ga('send', 'pageview');
</script>
</head>
<body>
<div class="container">
	<div class="row">