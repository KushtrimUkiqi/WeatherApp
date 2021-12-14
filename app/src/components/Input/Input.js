import React from 'react';
import './Input.css';

export default function Input({search}) {
 

    return (
        <div id="input">
            <input id="input" type="search" placeholder="City/Country"/>
            <select name="Days" id="days">
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
            </select>
            <button onClick={(e)=>search(document.getElementById("input").value)}>Search</button>
        </div>
    )
}
