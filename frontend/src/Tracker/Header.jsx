import { useEffect } from 'react'
import './HeaderStyles.css'

import { useSelector, useDispatch } from 'react-redux'
import { updateDay, updateDate } from '../SessionSlice';



// prompting for date and day information 
function Header(props) {

    const sessionSlice = useSelector(state => state.session)
    const dispatch = useDispatch() // access to store.dispatch without "store"



    return (

        <>


            <div className="session">
                <div className="sf-container">

                    <div className="date">
                        <label htmlFor="">Date</label>
                        <input value={sessionSlice.date} onChange={e => dispatch(updateDate(e.target.value))} />
                    </div>

                    <div className="day-buttons">
                        <button onClick={() => dispatch(updateDay("Push"))} className={props.day === "Push" ? 'active' : 'inactive'}>Push</button>
                        <button onClick={() => dispatch(updateDay("Pull"))} className={props.day === "Pull" ? 'active' : 'inactive'}>Pull</button>
                        <button onClick={() => dispatch(updateDay("Legs"))} className={props.day === "Legs" ? 'active' : 'inactive'}>Legs</button>
                        {/* <button onClick={() => props.updateDay("Push")} className={props.day === "Push" ? 'active' : 'inactive'}>Push</button>
                        <button onClick={() => props.updateDay("Pull")} className={props.day === "Pull" ? 'active' : 'inactive'}>Pull</button>
                        <button onClick={() => props.updateDay("Legs")} className={props.day === "Legs" ? 'active' : 'inactive'}>Legs</button> */}

                        {sessionSlice.day}
                        {sessionSlice.date}
                    </div>

                </div>

            </div>



        </>
    );
}

export default Header

