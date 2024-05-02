
import { useState, useRef, createContext, useEffect } from 'react'


function Sessions(prop) {

    useEffect(() => {
        display
    }, []);

    function display() {
        console.log(prop.date); 
    }

    return(
        
    <button onClick={display}>yes</button>
       
    ); 
}

export default Sessions 