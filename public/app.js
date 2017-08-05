var app = function(){
  var url = "https://netflixroulette.net/api/api.php?actor=Chuck%20Norris";
  makeRequest(url, requestComplete);
  var quoteUrl = "http://api.icndb.com/jokes/random";
  makeRequest(quoteUrl, quoteRequestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var films = JSON.parse(jsonString);
  populateSelect(films);
  populateChart(films);
}

var quoteRequestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var quote = JSON.parse(jsonString);
  populateQuote(quote);
}

var populateQuote = function(quote){
  var quoteDiv = document.getElementById('quote-div');
  var quoteHeader = document.createElement('h3');
  quoteHeader.innerText = quote.value.joke;
  quoteDiv.appendChild(quoteHeader);
}

var populateSelect = function(films){

  var select = document.getElementById('film-select');

  var defaultOption = document.createElement('option');
  defaultOption.innerText = "Select a film";
  select.appendChild(defaultOption);

  films.forEach(function(film, index){
    var option = document.createElement('option');
    option.innerText = film.show_title;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    var film = films[this.value];
    var ul = document.getElementById('film-details');

    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    }

    var h2Li = document.createElement('h2');
    h2Li.innerText = film.show_title;
    ul.appendChild(h2Li);

    var urlLi = document.createElement('p');
    var image = new Image(200);
    image.src = film.poster;
    urlLi.appendChild(image);
    ul.appendChild(urlLi);

    var year = document.createElement('p');
    year.innerText = film.release_year;
    ul.appendChild(year);

    var summary = document.createElement('p');
    summary.innerText = film.summary;
    ul.appendChild(summary);

    var runtime = document.createElement('p');
    runtime.innerText = film.runtime;
    ul.appendChild(runtime);

  });
}

var showTitlesAsCategories = [];
var ratingsAsCategories = [];

var populateChart = function(films) {
  films.forEach(function(film, index){
    showTitlesAsCategories.push(film.show_title);
    ratingsAsCategories.push(parseFloat(film.rating));
  })
  new BarChart();
}

var BarChart = function(){

  var container = document.getElementById('bar-chart');

  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container,
      backgroundColor: 'transparent'
    },
    title: {
      text: "Film Ratings"
    },
    colors: ["firebrick"], 
    series: [{
      name: "Films",
      data: ratingsAsCategories
    }],
    xAxis: {
      categories: showTitlesAsCategories
    },
    yAxis: {
      title: {text: "Ratings"}
    }
  })
}

window.addEventListener('load', app);