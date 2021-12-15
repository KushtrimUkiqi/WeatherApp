import React from 'react'
import './Widget.css'
import { useState } from 'react';
export default function Widget({datetime,daysummary,alt,celciusAsUnit}) {

    return (
        <div className="widget">
                <div id='temperature'>
                    <img src = {"https:"+daysummary.icon} alt={alt}/>
                    <h1>{celciusAsUnit ? daysummary.avgtemp_c + ' \u00b0 C' : daysummary.avgtemp_f + + ' \u00b0 f'}</h1>
                    <h4>{daysummary.description}</h4>
                </div>
                <div className="statistics">
                    <h5>{datetime}</h5>
                    <p>Maxi day temperature: <span>{celciusAsUnit ? daysummary.maxtemp_c + ' \u00b0 C' : daysummary.maxtemp_f + ' \u00b0 f'}</span></p>
                    <p>Min  day temperature: <span>{celciusAsUnit ? daysummary.mintemp_c + ' \u00b0 C' : daysummary.mintemp_F + ' \u00b0 f'}</span></p>
                </div>
        </div>
    )
}
