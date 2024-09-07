
import { useState } from 'react'
import './SessionsStyles.css';
import SessionCard from './SessionCard';


// displays sessions 
function Sessions(props) {


    const sessions = props.sessions;
    const [selectedDay, setSelectedDay] = useState("All");





    // maps through all sessions - filters by day 
    const createSessionElements = sessions.map((session, idx) => {

        if (session.day === selectedDay) {
            return <SessionCard key={idx} session={session} />
        } else if (selectedDay === "All") {
            return <SessionCard key={idx} session={session} />
        }

    }).reverse()


    return (

        <>
            <div className="session-sort">

                <button onClick={() => setSelectedDay("All")}>All</button>
                <button onClick={() => setSelectedDay("Push")}>Push</button>
                <button onClick={() => setSelectedDay("Pull")}>Pull</button>
                <button onClick={() => setSelectedDay("Legs")}>Legs</button>
            </div>
            <div className="sessionsText">




                {createSessionElements}

            </div>
        </>





    );
}

export default Sessions