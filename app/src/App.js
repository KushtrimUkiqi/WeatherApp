import './App.css';
import Container from './components/Container/Container';
import Input from './components/Input/Input';

import { useState } from 'react';
import axios from 'axios';


const weatherApi = {
 // http://api.weatherapi.com/v1/current.json?q=Skopje&key=9c1199b65355418b8fb150557211312
  url: `http://api.weatherapi.com/v1/current.json`,
  key: `9c1199b65355418b8fb150557211312`,
  createUrl : function  (city) 
  {return `${this.url}?q=${city}&key=${this.key}`;}
}

function App() {
  const [city,setCity] = useState("Skopje");
  const [weather,setWeather] = useState([{ city: city,temp: '20'}]);

  function search(city)
  {

    setCity(city);
    axios.get(weatherApi.createUrl(city)).then(data => setWeather({
      city: data.location.name,
      temp: data.current.temp_c
    })).catch(error => {
      console.log(error)
    });
  }



  return (
    <section className="App">
     <Input search={search}></Input>
      <Container className="main" list={weather}>
      </Container>
    </section>
  );
}

export default App;
