import './App.css';
import Container from './components/Container/Container';
import Input from './components/Input/Input';
import changeVideoSpeed from './index';
import { useState ,useEffect} from 'react';
import axios from 'axios';


const weatherApi = {

  url: `https://api.weatherapi.com/v1/forecast.json`,
  key: `9c1199b65355418b8fb150557211312`,
  createUrl : function  (city,days) 
  {return `${this.url}?key=${this.key}&q=${city}&days=${days}`;}
}

function forecast(temp_celcius , temp_fahrenheit ,icon , weather_description)
{
  //represents the temperature in celcius (example: 4.0)
  this.temp_celcius = temp_celcius; // string
  //represents the temperature in fahrenheit (example: 39.2)
  this.temp_fahrenheit = temp_fahrenheit; // string
  //represents the icon (example: //cdn.weatherapi.com/weather/64x64/night/122.png)
  this.icon = icon; //string
  //represents the weather description (example: Overcast)
  this.weather_description = weather_description; //string
}

function daySummary(maxtemp_c,maxtemp_f,mintemp_c,mintemp_f,avgtemp_c,avgtemp_f,icon,description)
{
  this.maxtemp_c = maxtemp_c;
  this.maxtemp_f = maxtemp_f;
  this.mintemp_c = mintemp_c;
  this.mintemp_f = mintemp_f;
  this.avgtemp_c = avgtemp_c;
  this.avgtemp_f = avgtemp_f
  this.icon = icon;
  this.description = description;
}

function forecastDay(date,day_summary,day)
{
  //represents the date (example: 2021.12.14)
  this.date = date; //string
  //represents the summary of the day  , an object with attributes : maxtemp_c,maxtemp_f,mintemp_c,mintemp_f,avgtemp_c,avgtemp_f,icon,description
  this.day_summary = day_summary;
  //represents the an array of the weather on each hour , an array of 24 objects(forecast object is used) with attributes : temp_celcius , tmep_fahrenheit ,icon , weather_description (example: 4.0,39.2,//cdn.weatherapi.com/weather/64x64/night/122.png,Overcast)  
  this.day = day; //forecast objects
}

function weatherData (location,localtime,currentWeather,forecastDays)
{
  //represents the location (example: Skopje/Macedonia ,Kumanovo/Macedonia , Tetovo/Macedonia)
  this.location = location; // string
  //represents the local date and time the request was made (example: 2021-12-14 22:09)
  this.localtime = localtime; //string
  //represents the current weather , an object(forecast object is used) with attributes : temp_celcius , tmep_fahrenheit ,icon , weather_description (example: 4.0,39.2,//cdn.weatherapi.com/weather/64x64/night/122.png,Overcast)  
  this.currentWeather = currentWeather; // forecast
  //represents an array of objects(forecastDay is used)  with attributes : date , an array of 24 objects called *days* (forecast object is used) with attributes : temp_celcius,temp_fahrenheit,time,icon,weather_description 
  this.forecastDays = forecastDays; // forecastDay object
}

function generateWeatherDataFromApi(data)
{
  let location = `${data.location.name},${data.location.country}`;
  let localtime = data.location.localtime;
  let currentWeather = new forecast(data.current.temp_c,data.current.temp_f,data.current.condition.icon,data.current.condition.text);
  let days = generateWeatherDay(data.forecast.forecastday);

  return new weatherData(location,localtime,currentWeather,[...days]);
  
}

function generateWeatherDay(days)
{
   return days.map
   (day =>
    {
      let date = day.date;
      let day_summary = new daySummary(day.day.maxtemp_c ,day.day.maxtemp_f ,day.day.mintemp_c ,day.day.mintemp_f , day.day.avgtemp_c, day.day.avgtemp_f,day.day.condition.icon,day.day.condition.text)
      let hours = day.hour.map
      (hour => new forecast (hour.temp_c,hour.temp_f,hour.condition.icon,hour.condition.text))
      return new forecastDay(date,day_summary,[...hours]);
    })
}




function App() {

  const [city,setCity] = useState("");
  const [days,setDays] = useState(1); 
  const [celciusAsUnit,setCelciusAsUnit] = useState(true);
  const [location,setLocation] = useState({lat: '' , long: ''});
  const [weather,setWeather] = useState
  (
    new weatherData
      (
        'skopje',
        `${new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})}`,
        new forecast('no temp','no temp','',''),
        [new forecastDay('date',new daySummary('0','0','0','0','0','0','',''),'')]
      )
    
  );



  function search(c=city,days_from_input=days)
  {
    changeVideoSpeed();
    if(c==null || c === "")
    c = location.lat+","+location.long;
    console.log("1. "+c);
    setCity(c);    
    setDays(days_from_input);
    axios.get(weatherApi.createUrl(c,days_from_input)).then(
      resp => setWeather(generateWeatherDataFromApi(resp.data))
    ).catch(error => {
      console.log(error)
    });
  }

  
function getLocation() 
{
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  
  else 
  {
    window.alert("Your browser does not support geolocation");
  }
}

function showPosition(position) 
{
  search(`${position.coords.latitude},${position.coords.longitude}`);
  setLocation({lat: position.coords.latitude , long: position.coords.longitude});
}

useEffect(()=>
{
    getLocation();
},[]);

  return (
    <section className="App">
      <Input search={search}></Input>
      <Container className="main" list={weather} celciusAsUnit={celciusAsUnit}>
      </Container>
    </section>
  );
}

export default App;
