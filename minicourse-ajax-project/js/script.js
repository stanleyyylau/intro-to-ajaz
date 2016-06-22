
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();
    var apiKEY = "AIzaSyA3BTvbQnCDrQTnMnGbp8K2jLlyqM-JUgs"
    var link = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+ street + "," + city + "&key=" + apiKEY;
    console.log(link);
    //now let's append that photo as background
    $body.append('<img class="bgimg" src="'+ link + '">');
    //finish fecthing image and load image as background

    //this is the new york times ajax call
    var newYorkUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    newYorkUrl += '?' + $.param({
      'api-key': "5895a92406b1e7bc7046dc543e66acfb:18:75029923",
      'q': city
    });

    $.ajax({
      url: newYorkUrl,
      method: 'GET',
    }).done(function(data) {
      console.log(data);
      $nytHeaderElem.text("New York Times Articles about " + city);
      for(var i=0;i<data.response.docs.length;i++){
        var title = data.response.docs[i].headline.main;
        var urlToTitle = data.response.docs[i].web_url;
        var snippet = data.response.docs[i].snippet;
        $nytElem.append('<li class="article"><a href="'+urlToTitle+'">'+title+'</a><p>'+snippet+'</p></li>');
      }
    }).fail(function() {
      $nytHeaderElem.text("Fail to load New York Times articles about " + city);
    });

    // YOUR CODE GOES HERE!
    // I will handle the wiki articles here
    var wikiApi = "https://en.wikipedia.org/w/api.php?callback=?&action=opensearch&limit=20&namespace=0&format=json&search="+city;
    $.getJSON(wikiApi,function(data){
      for (var i = 0; i<data[1].length; i++){
        var article = '<li><a href="'+data[3][i]+'">'+data[1][i]+'</a></li>';
        $wikiElem.append(article);
      }
    })

    return false;
};

$('#form-container').submit(loadData);
