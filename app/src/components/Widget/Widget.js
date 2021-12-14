import React from 'react'
import './Widget.css'

export default function Widget({city,temperature}) {

    return (
        <div className="widget">
           <h1>{city}</h1>
           <h2>{temperature}</h2>
        </div>
    )
}
