import React from 'react'
import Widget from '../Widget/Widget'
import './Container.css'
export default function Container({list}) {
    return (
        <section id="container">
           {list.map((item) =>
            <Widget city={item.city} temperature={item.temp}></Widget>
           )}
        </section>
    )
}
