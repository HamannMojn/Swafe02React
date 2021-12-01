import React, { useState, useEffect } from 'react'
import dataService from '../services/data.service';
import { useForm } from 'react-hook-form';
import authService from '../services/auth.service';
import { resetMemoizations } from '@fluentui/react';
import styles from '../Styles/createExercise.module.scss';

function CreateExercise(this: any){
    const { register, handleSubmit, reset } = useForm();
    const [user, setUser] = useState(() => authService.getCurrentUser());

    const onCreate = async(data: {name: string, description: string, sets: number, repetitions: number, time: string, personalTrainerId: number}) => {
        dataService.CreateExercise(data.name, data.description, data.sets, data.repetitions, data.time, data.personalTrainerId);
    }

    useEffect(() => {

    })

    return(
        <div className="react-hooks-form">
            <h2>
                Create exercise
            </h2>

            <form onSubmit={handleSubmit(onCreate)}>
                <div>
                    <input className={styles.inputField} placeholder="Name of exercise" {...register("name")}></input>
                </div>
                <div>
                    <input className={styles.inputField} placeholder="Description" {...register("description")}></input>
                </div>
                <div>
                    <input className={styles.inputField} placeholder="Number of sets" {...register("sets")}></input>
                </div>
                <div>
                    <input className={styles.inputField} placeholder="Number of reps" {...register("repetitions")}></input>
                </div>
                <div>
                    <input className={styles.inputField} placeholder="Input time" {...register("time")}></input>
                </div>
                <div>
                    <input className={styles.inputField} placeholder ="Personal trainer id" {...register("personalTrainerId")}></input>
                </div>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default CreateExercise