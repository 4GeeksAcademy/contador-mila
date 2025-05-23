import React, { useState, useEffect, useRef } from "react";
import SecondsCounter from "./SecondsCounter";

const App = () => {
    const [initialTime, setInitialTime] = useState(0);
    const [alertAt, setAlertAt] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = () => {
        if (intervalRef.current !== null || seconds <= 0) return;
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(prev => { 
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const pause = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSeconds(initialTime);
        setIsRunning(false);
    };

    useEffect(() => {
        if (seconds === alertAt && seconds > 0) {
            alert(`⏰ ¡Has alcanzado el segundo ${alertAt}!`);
        }
    }, [seconds, alertAt]);

    const handleSetInitialTime = (e) => {
        const value = parseInt(e.target.value);
        setInitialTime(value || 0);
        setSeconds(value || 0);
    };

    const handleSetAlertAt = (e) => {
        const value = parseInt(e.target.value);
        setAlertAt(value || null);
    };
    return (
    <div class="header">
        <h1>Cuenta regresiva</h1>
        <div class="input-time">
            <label> Tiempo inicial: 
                <input type="number" class="form-control" onChange={handleSetInitialTime}disabled={isRunning} value={initialTime}/>
            </label>
        </div>
        <div class="input-alert"> 
            <label> Alerta en el segundo: 
                <input type="number" class="form-control" onChange={handleSetAlertAt}disabled={isRunning}value={alertAt || ""}/>
            </label>
        </div>
        <SecondsCounter seconds={seconds} />
        <div class="buttons"> 
            <button class="btn btn-outline-light" onClick={start} disabled={isRunning || seconds === 0}>Iniciar</button>
            <button class="btn btn-outline-light" onClick={pause} disabled={!isRunning}>Pausar</button>
            <button class="btn btn-outline-light" onClick={reset}>Reiniciar</button>
        </div>
    </div>
    );
};


export default App;