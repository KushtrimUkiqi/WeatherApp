import React from 'react'
import Widget from '../Widget/Widget'
import './Container.css'
export default function Container({list,celciusAsUnit}) {
    return (
        <section id="container">
            <div id='currentStats'>
            <div id="left">
                <img src={list.currentWeather.icon} alt=""></img>
                <h1>{celciusAsUnit ? list.currentWeather.temp_celcius + ' \u00b0 C':  list.currentWeather.temp_fahrenheit + ' \u00b0 F'}</h1>
                <p>{list.currentWeather.weather_description}</p>

            </div>
            <div id="right">
                <p>{list.location}
                <br/>
                {list.localtime}</p>
            </div>
            </div>
            <div id='widgets'>
           {    list.forecastDays
                    .map((item,index) =>
                            <Widget key = {index} datetime={item.date} daysummary={item.day_summary} alt="" celciusAsUnit={celciusAsUnit}>
                            </Widget>
           )}
           </div>
        </section>
    )
}
