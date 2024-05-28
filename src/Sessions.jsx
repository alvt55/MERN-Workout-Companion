
import { useState, useRef, createContext, useEffect } from 'react'
import './SessionsStyles.css';
import SessionCard from './SessionCard';


// displays sessions 
function Sessions(props) {


    const sessions = props.sessions;


    // TODO: reverse map 
    const sessionElements = sessions.map((session, idx) => {
        return <SessionCard key={idx} session={session} />
    }).reverse()


    return (

        <div className="sessionsText">
            {sessionElements}
        </div>




    );
}

export default Sessions