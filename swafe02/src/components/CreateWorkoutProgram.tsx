import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import dataService from '../services/data.service';
import authService from '../services/auth.service';
import {exercise} from '../Models/exercise';
import { User } from '../Models/User';

function CreateWorkoutProgram(this: any) {
    const {register, handleSubmit, reset} = useForm();
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [importedExercises, setImportedExercises] = useState<exercise[]>([]);
    const [importedClients, setImportedClients] = useState<User[]>([]);
    const [exercises, setExercises] = useState<exercise[]>([]);
    const [client, setClient] = useState<number>();

    const onCreate = async (data: {name: string, description: string}) => {
        console.log(exercises);
        exercises.forEach(x => x.exerciseId = 0);
        dataService.CreateWorkout(data.name, data.description, exercises, user.UserId, client);
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
    function handleChangeExercise(event: any){
        setExercises(oldArray => [...oldArray, importedExercises[event.target.value]]);
        console.log(importedExercises[event.target.value])
    }
    function handleChangeClient(event: any){
        console.log(event.target.value);
        setClient(event.target.value);
    }

    
    return (
        <div className="react-hooks-form">
      <form onSubmit={handleSubmit(onCreate)}>
        <div>
          <label htmlFor="name">Name of workout program</label>
          <input placeholder="WorkoutProgram" {...register("name")} />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input placeholder="description" {...register("description")} />
        </div>
        <div>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.exerciseId}>
                        {exercise.name}
                        <p>
                            Sets: {exercise.sets}
                            Repetitions: {exercise.repetitions}
                        </p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
          <label htmlFor="exercises">Exercises</label>
          <select onChange={(event) => handleChangeExercise(event)}>
              {importedExercises.map((exercise, index) => (
                  <option key={index} value={index}>{exercise.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="ClientId">ClientId</label>
          <select onChange={(event) => handleChangeClient(event)}>
              {importedClients.map((Client) => (
                  <option value={Client.userId}>{Client.firstName} {Client.lastName}</option>
              ))}
          </select>
        </div>
        <div>
            <button onClick={() => setExercises([])}>Reset</button>
        </div>
        <input type="submit" />
      </form>
    </div>
    )
}

export default CreateWorkoutProgram
