'use client'

import styles from '../styles/signup.module.css'

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
                <h2>Sign up</h2>
                <div className={styles.labelinput}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" required />
                </div>
                <div className={styles.labelinput}>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required />
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );



}