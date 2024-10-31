'use client'

import styles from '../styles/signup.module.css' // uses the same css as signup

export default function Page() {


    const signup = (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
    }


    return (
        <div className={styles.container}>


            <form onSubmit={signup} className={styles.form}>
                <h2>Login</h2>
                <div className='labelinput'>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" required />
                </div>
                <div className='labelinput'>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required />
                </div>
                <button type="submit" id="button">Sign up</button>
            </form>
        </div>
    );



}