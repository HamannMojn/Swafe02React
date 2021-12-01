import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import dataService from '../services/data.service';
import authService from '../services/auth.service';
import { exercise } from '../Models/exercise';
import { User } from '../Models/User';
import styles from '../Styles/createWorkoutProgram.module.scss';

function CreateWorkoutProgram(this: any) {
    const { register, handleSubmit, reset } = useForm();
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [importedExercises, setImportedExercises] = useState<exercise[]>([]);
    const [importedClients, setImportedClients] = useState<User[]>([]);
    const [exercises, setExercises] = useState<exercise[]>([]);
    const [client, setClient] = useState<User>();

    const onCreate = async (data: { name: string, description: string }) => {
        if (client?.UserId != null) {
            dataService.CreateWorkout(data.name, data.description, exercises, parseInt(user.UserId), client!.UserId);
        }
        reset();
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await dataService.getExercises().then((response: any) => {
            setImportedExercises(response.data);
            console.log(response.data);
        })
        await dataService.getPtClients().then((response: any) => {
            setImportedClients(response.data);
            console.log(response.data);
        })
    }
    function handleChangeExercise(event: any) {
        console.log(event.target.value);
        setExercises(oldArray => [...oldArray, importedExercises[event.target.value]]);
        console.log(exercises);
    }
    function handleChangeClient(event: any) {
        console.log(event.target.value);
        setClient(importedClients[event.target.value]);
    }

    const listItems = exercises.map((exercise) => <tr className={styles.td}>
    <td>{exercise.name}</td>
    <td>Sets: {exercise.sets} </td>
    <td>Repetitions: {exercise.repetitions} </td>
    </tr>);

    return (
        <div className="react-hooks-form" style={{ float: 'right', marginRight: '15%' }}>
            <h2>
                Create workout program
            </h2>
            <form onSubmit={handleSubmit(onCreate)}>
                <div>
                    <input placeholder="Name of workout program" {...register("name")} className={styles.inputField}/>
                </div>

                <div>
                    <input placeholder="Description" {...register("description")} className={styles.inputField}/>
                </div>
                <div>
                    <table>
                        {listItems}
                    </table>
                </div>

                <div>
                    <label htmlFor="exercises">Exercises</label>
                    <br></br>
                    <select onChange={(event) => handleChangeExercise(event)}>
                        {importedExercises.map((exercise, index) => (
                            <option key={index} value={index}>{exercise.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="ClientId">ClientId</label>
                    <br></br>
                    <select onChange={(event) => handleChangeClient(event)}>
                        {importedClients.map((Client, index) => (
                            <option key={index} value={index}>{Client.firstName},{Client.lastName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className={styles.standardButton} onClick={() => setExercises([])}>Reset</button>
                </div>
                <input className={styles.standardButton} type="submit" onClick={() => setExercises([])}/>
            </form>
        </div>
    )
}

export default CreateWorkoutProgram
