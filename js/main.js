
let dataCountries=[
    {
      "id": 707860,
      "name": "Hurzuf",
      "country": "UA",
      "coord": {
        "lon": 34.283333,
        "lat": 44.549999
      }
    },
    {
      "id": 616052,
      "name": "Yerevan",
      "country": "AM",
      "coord": {
        "lon": 44.513611,
        "lat": 40.18111
      }
    },
    {
      "id": 519188,
      "name": "Novinki",
      "country": "RU",
      "coord": {
        "lon": 37.666668,
        "lat": 55.683334
      }
    },
    {
      "id": 1283378,
      "name": "Gorkhā",
      "country": "NP",
      "coord": {
        "lon": 84.633331,
        "lat": 28
      }
    },
    {
      "id": 1270260,
      "name": "State of Haryāna",
      "country": "IN",
      "coord": {
        "lon": 76,
        "lat": 29
      }
    },
    {
      "id": 708546,
      "name": "Holubynka",
      "country": "UA",
      "coord": {
        "lon": 33.900002,
        "lat": 44.599998
      }
    },
    {
      "id": 1283710,
      "name": "Bāgmatī Zone",
      "country": "NP",
      "coord": {
        "lon": 85.416664,
        "lat": 28
      }
    },
    {
      "id": 529334,
      "name": "Mar’ina Roshcha",
      "country": "RU",
      "coord": {
        "lon": 37.611111,
        "lat": 55.796391
      }
    },
    {
      "id": 1269750,
      "name": "Republic of India",
      "country": "IN",
      "coord": {
        "lon": 77,
        "lat": 20
      }
    },
    {
      "id": 1283240,
      "name": "Kathmandu",
      "country": "NP",
      "coord": {
        "lon": 85.316666,
        "lat": 27.716667
      }
    },
    {
      "id": 3632308,
      "name": "Merida",
      "country": "VE",
      "coord": {
        "lon": -71.144997,
        "lat": 8.598333
      }
    },
    {
      "id": 473537,
      "name": "Vinogradovo",
      "country": "RU",
      "coord": {
        "lon": 38.545555,
        "lat": 55.423332
      }
    },
    {
      "id": 384848,
      "name": "Qarah Gawl al ‘Ulyā",
      "country": "IQ",
      "coord": {
        "lon": 45.6325,
        "lat": 35.353889
      }
    },
    {
      "id": 569143,
      "name": "Cherkizovo",
      "country": "RU",
      "coord": {
        "lon": 37.728889,
        "lat": 55.800835
      }
    }];


var cityList = document.getElementById('mycountry');
var Geolocation=(function() {
     var createCityList=function() {
     let datalist=document.getElementById("countries");
        for(let i=0; i<dataCountries.length;i++){
            let option=document.createElement("option");
            let city=document.createTextNode(dataCountries[i].name);
            option.appendChild(city);
            datalist.appendChild(option);
  }
}
  var sendRequest=function(url) {
    let weather = new XMLHttpRequest();
    weather.open("GET", url, false);
    weather.send(null);
    var r = JSON.parse(weather.response);
    return r;
    

 }
  var getCurrentPosition=function() {

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    function showPosition(position)
    {
        let latt=position.coords.latitude;
        let long=position.coords.longitude;
        let url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+latt+","+long+"&sensor=true";
        let resultOfCurrentPosition=sendRequest(url);
        addCurrentPosition(resultOfCurrentPosition); 
    }
  }
  
  var getResponse=function() {
    let city=this.value;
    let country;
    for(let i in dataCountries)
    {
       if(dataCountries[i].name===city)
       {
         country=dataCountries[i].country;
       } 
    }
    let url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+city+"+%2C%20"+country+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    let result= sendRequest(url);
    addInformation(result);
 }

  var addCurrentPosition=function(result) {
    let cityName=result.results[0].address_components[3].long_name;
    let countryName=result.results[0].address_components[4].short_name;
    cityList.value=cityName;
    let url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+cityName+"+%2C%20"+countryName+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    let resultOfCurrentCity=sendRequest(url);
    addInformation(resultOfCurrentCity); 
  }

  var addInformation=function(result) {
   let forecast =result.query.results.channel.item.forecast;
   let date=[];
   let day=[];
   let highTemp=[];
   let lowTemp=[];
   let text=[];
 
             
   for(let i=0;i<forecast.length;i++){
 
        date.push(forecast[i].date);
        day.push(forecast[i].day);
        highTemp.push(forecast[i].high);
        lowTemp.push(forecast[i].low);
        text.push(forecast[i].text);
       
   }
 
 let itemsArray=[date,day,highTemp,lowTemp,text];
 createNodes(itemsArray);
  }

 var addArray=function(items){
   let span=document.querySelectorAll('.information');
   for(let i=0;i<items[0].length;i++){
    for(let j=0;j<items.length;j++){
      let dayText=document.createTextNode(items[j][i])
      span.appendChild(dayText);
   }
  }
 }
  var createNodes=function(items) {
    let divContent=document.getElementById("div1");
    
    for(let i=0;i<10;i++){
      let div=document.createElement('div'); 
      div.classList.add('flex-item'); 
     for(let j=0;j<5;j++){
          let daySpan=document.createElement('span');
          daySpan.classList.add('information');
          let dayText=document.createTextNode(items[j][i])
         daySpan.appendChild(dayText);
          div.appendChild(daySpan);
         
      }
      divContent.appendChild(div);
    }
  }
 
 return  {
  createCityList,
  getResponse,
  getCurrentPosition,
 }
  
})();



Geolocation.getCurrentPosition();
cityList.addEventListener('change',Geolocation.getResponse );