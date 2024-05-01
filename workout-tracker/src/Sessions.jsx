
import { useState, useRef, createContext } from 'react'


function Sessions(prop) {

    function display() {
        console.log(prop.date); 
    }

    return(
       <p>{prop.date}</p>
    )
}

export default Sessions 