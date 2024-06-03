import { useState, useRef, useContext, createContext, useEffect } from 'react'
import './HeaderStyles.css'
import Navbar from '../Navbar';




// prompting for workout info beforehand - date and day of split 
function Header(props) {


    useEffect(() =>{
        switch(props.day) {
            case "":
                document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("legs-button").style.backgroundColor = "#1f1f1f";
                break; 
            case "Push":
                document.getElementById("push-button").style.backgroundColor = "#c8b1e4";
                document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("legs-button").style.backgroundColor = "#1f1f1f";
              break;
             
            case "Pull":
                document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("pull-button").style.backgroundColor = "#c8b1e4";
                document.getElementById("legs-button").style.backgroundColor = "#1f1f1f";
              break;
              
            case "Legs":
                document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
                document.getElementById("legs-button").style.backgroundColor = "#c8b1e4";
              break;
             
          }
    }, [props.day])




    return (

        <>


            <Navbar></Navbar>
            

            <div className="session">
                <div className="sf-container">

                    <div className="date">
                        <label htmlFor="">Date</label>
                        <input value={props.date} onChange={props.updateDate} />
                    </div>

                    <div className="day-buttons">

                        <button onClick={() => props.updateDay("Push")} id='push-button'>Push</button>
                        <button onClick={() => props.updateDay("Pull")} id='pull-button'>Pull</button>
                        <button onClick={() => props.updateDay("Legs")} id='legs-button'>Legs</button>
                    </div>

                </div>

            </div>



        </>
    );
}

export default Header

