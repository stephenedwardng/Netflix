// netflix

var app = function(){
  var url = "https://netflixroulette.net/api/api.php?actor=Arnold%20Schwarzenegger";
  makeRequest(url, requestComplete);
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

    var li = document.createElement('h2');
    li.innerText = film.show_title;
    ul.appendChild(li);

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

window.addEventListener('load', app);