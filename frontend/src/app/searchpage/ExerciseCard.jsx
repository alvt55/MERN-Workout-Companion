import styles from '../styles/searchpage.module.css'

export default function ExerciseCard(props) {


    const name = props.exerciseObj.name;
    const capital = name[0].toUpperCase() + name.slice(1);

    // formats the instructions for the exercise card from API
    const steps = props.exerciseObj.instructions.map((i, idx) => {
        return <li key={idx}>{i}</li>
    })


    return (
        <div className={styles.exercisecard}>
            <h3>{capital}</h3>

            <div className={styles.exerciseinfo}>

                <img src={props.exerciseObj.gifUrl} />

                <ol>
                    {steps}
                </ol>
            </div>

        </div>
    );
}