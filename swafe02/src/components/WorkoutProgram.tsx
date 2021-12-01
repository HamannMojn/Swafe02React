import React, { useState, useEffect } from 'react'
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import { User } from '../Models/User';
import styles from '../Styles/dashboard.module.scss';
import WorkoutDialog from './WorkoutDialog';
import jwtDecode from 'jwt-decode';
import { exercise } from '../Models/exercise';

function WorkoutProgramComponent() {
    const [user, setUser] = useState<User>();
    const [programs, setPrograms] = useState<Array<WorkoutProgram>>([]);
    const [currentWorkout, setCurrentWorkout] = useState<Array<WorkoutProgram>>([]);;
    const [workoutTitle, setWorkoutTitle] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [exercises, setExercises] = useState<Array<exercise>>([]);

    useEffect(() => {
        getData();
    }, []);
    const [modalVisible, setModalVisible] = useState(false);

    const getData = () => {
        dataService.getWorkoutPrograms()
            .then((response: any) => {
                setPrograms(response.data);
                // console.log(response.data);
            });
    }


    function toggleModal() {
        setModalVisible(!modalVisible);
    }


    function testFunction(workout: any) {
        setCurrentWorkout(workout.workoutProgramId);
        setExercises(workout.exercises);
        setWorkoutTitle(workout.name);
        setWorkoutDescription(workout.description);
        console.log(workout.exercises);
        toggleModal();
    }

    const listItems = exercises.map((d) => <tr><td>{d.name}</td> <td>{d.repetitions}</td> <td>{d.sets}</td><td>{d.time}</td></tr>)


    let dialogContent: JSX.Element =
        <>
            <h3>
                Program id: {currentWorkout}
            </h3>
            <h3>
                Beskrivelse: {workoutDescription}
            </h3>
            <table style={{ width: '100%' }}>
                <tr><td>Exercises:</td> <td>reps:</td> <td>sets:</td> <td>time:</td></tr>
                {listItems}
            </table>
        </>;


    return (
        <div style={{float:'left'}}>
            <h4>WorkoutPrograms</h4>
            <ul>
                {programs && programs.map((program) => (
                    <li className={styles.card} onClick={() => testFunction(program)} >
                        {program.workoutProgramId} {program.name}
                        <p>
                            {program.description}
                        </p>
                        {/* {console.log(program.exercises)} */}
                    </li>
                ))}
            </ul>
            <WorkoutDialog hidden={!modalVisible} onDismiss={toggleModal} dialogTitle={workoutTitle} dialogContent={dialogContent}></WorkoutDialog>
        </div>
    )
}

export default WorkoutProgramComponent
