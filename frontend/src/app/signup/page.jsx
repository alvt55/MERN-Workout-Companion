'use client'

import styles from '../styles/signup.module.css'

export default function Page() {


     const signup = async (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        try {
            const res = await fetch('http://localhost:4000/auth/signup', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }); 
            
        } catch (err) {
            console.log(err); 
        }
        
    }


    return (
        <div className={styles.container}>


            <form onSubmit={signup} className={styles.form}>
                <h2>Sign up</h2>
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