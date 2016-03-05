$(document).ready(function(){

var count=0;
var premadeGifs=["The Artist","Ocean","Flowers","Lemons","Muscle Cars","Gardens","Fish","Balloons","The Beatles"];

//ON-CLICK EVENT FOR THE "SUBMIT" BUTTON
$("#SUBMIT").on("click",function(){
	makeButton();})

//MAKES A BUTTON FROM THE ARRAY AND PLACES DATA INTO IT
for (var i = 0; i<premadeGifs.length; i++){
	count++;
	$("#GIFView").append("<button class='Button"+i+"'>"+premadeGifs[i]+"</button>");
	$(".Button"+i).data("GIF",premadeGifs[i]);
	$(".Button"+i).on("click",function(){
		$("#Preview").html("");
		var GIF=$(this).data("GIF");
		var GIFurl= "http://api.giphy.com/v1/gifs/search?q="+GIF+"&api_key=dc6zaTOxFJmzC";
//DOES AN AJAX CALL ON THE GIPHY API FOR THE BUTTON CLICKED
		$.ajax({url:GIFurl, method:'GET'})
			.done(function(response){
//PRINTS THE 10 MOST POPULAR GIFS ASSOCIATED TO THE SEARCH TERM
				for(var i=0;i<response.data.length && i<10;i++){
//DETERMINES THE RATING OF THE GIF AND PRINTS "NONE" IF THERE IS NO RATING GIVEN
					if(response.data[i].rating!=""){
						$("#Preview").append("<div id='block'><img id='StillGIF"+i+"' src='"+response.data[i].images.original_still.url+"'><p>Rating: "+response.data[i].rating+"</p></div>");}
					else if(response.data[i].rating==""){
						$("#Preview").append("<div id='block'><img id='StillGIF"+i+"' src='"+response.data[i].images.original_still.url+"'><p>Rating: None</p></div>");}
//SETS THE DATA OF EACH ELEMENT TO THE LIVE AND STILL URLS AND THEN SWITCHES BETWEEN THE TWO ON CLICK
					$("#StillGIF"+i).data("liveGIF",response.data[i].images.original.url);
					$("#StillGIF"+i).data("stillGIF",response.data[i].images.original_still.url);
					$("#StillGIF"+i).on("click",function(){
						if($(this).attr("src")==$(this).data("stillGIF")){
							$(this).attr("src",$(this).data("liveGIF"));}
						else if($(this).attr("src")==$(this).data("liveGIF")){
							$(this).attr("src",$(this).data("stillGIF"));}}
				)}
			})
	})
}

//MAKES A BUTTON AND PLACES DATA INTO IT
var makeButton=function(){
	count++;
	var text=$("input:text").val();
	$("input:text").val('');
	$("#GIFView").append("<button class='Button"+count+"'>"+text+"</button>");
	$(".Button"+count).data("GIF",text);
//DOES AN AJAX CALL ON THE GIPHY API FOR THE BUTTON CLICKED
	$(".Button"+count).on("click",function(){
		$("#Preview").html("");
		var GIF=$(this).data("GIF");
		var GIFurl= "http://api.giphy.com/v1/gifs/search?q="+text+"&api_key=dc6zaTOxFJmzC";
		$.ajax({url:GIFurl, method:'GET'})
			.done(function(response){
//PRINTS THE 10 MOST POPULAR GIFS ASSOCIATED TO THE SEARCH TERM
				for(var i=0;i<response.data.length && i<10;i++){
//DETERMINES THE RATING OF THE GIF AND PRINTS "NONE" IF THERE IS NO RATING GIVEN
					if(response.data[i].rating!=""){
						$("#Preview").append("<img id='StillGIF"+i+"' src='"+response.data[i].images.original_still.url+"'><p>Rating: "+response.data[i].rating+"</p>");}
					else if(response.data[i].rating==""){
						$("#Preview").append("<img id='StillGIF"+i+"' src='"+response.data[i].images.original_still.url+"'><p>Rating: None</p>");}
//SETS THE DATA OF EACH ELEMENT TO THE LIVE AND STILL URLS AND THEN SWITCHES BETWEEN THE TWO ON CLICK
					$("#StillGIF"+i).data("liveGIF",response.data[i].images.original.url);
					$("#StillGIF"+i).data("stillGIF",response.data[i].images.original_still.url);
					$("#StillGIF"+i).on("click",function(){
						if($(this).attr("src")==$(this).data("stillGIF")){
							$(this).attr("src",$(this).data("liveGIF"));}
						else if($(this).attr("src")==$(this).data("liveGIF")){
							$(this).attr("src",$(this).data("stillGIF"));}}
				)}
			})
	})
}
})