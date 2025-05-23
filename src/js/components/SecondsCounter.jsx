import React from 'react';
import { FaClock } from 'react-icons/fa';

const SecondsCounter = ({seconds}) => {
    const padded = String(seconds).padStart(6, '0').split('');
    return (
        <div className="counter-container">
            <div><FaClock/></div>
            {padded.map((digit, index) =>(
                <div key= {index} className="digit">
                    {digit}
                </div>
            ))}
        </div>
    );
};


export default SecondsCounter;
