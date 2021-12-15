import React from 'react';
import './Input.css';

export default function Input({search}) {
    function searchCityAndDays()
    {
        search
        (
            document.getElementById("input").value,
            document.getElementById("days").options[document.getElementById("days").selectedIndex].value
        );
    }

    return (
        <div id="control">
            <input id="input" type="search" placeholder="City/Country"/>
            <select name="Days" id="days">
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
            </select>
            <button onClick={searchCityAndDays}>Search</button>
        </div>
    )
}
