'use client'
import { Provider } from "react-redux";
import store from "../../store";
import Temp from './Temp'
import Navbar from "../Navbar/Navbar";



export default function Page() {


    return(
        <Provider store={store}>
            <Temp></Temp>
        </Provider>
    )
}