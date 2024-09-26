import { useEffect } from 'react'
import './HeaderStyles.css'





// prompting for date and day information 
function Header(props) {





    return (

        <>


            <div className="session">
                <div className="sf-container">

                    <div className="date">
                        <label htmlFor="">Date</label>
                        <input value={props.date} onChange={props.updateDate} />
                    </div>

                    <div className="day-buttons">
                        <button onClick={() => props.updateDay("Push")} className = {props.day === "Push" ? 'active' : 'inactive'}>Push</button>
                        <button onClick={() => props.updateDay("Pull")} className={props.day === "Pull" ? 'active' : 'inactive'}>Pull</button>
                        <button onClick={() => props.updateDay("Legs")} className={props.day === "Legs" ? 'active' : 'inactive'}>Legs</button>
                    </div>

                </div>

            </div>



        </>
    );
}

export default Header

