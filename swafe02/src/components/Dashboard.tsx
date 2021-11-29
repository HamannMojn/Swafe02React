import React, {useEffect, useState} from 'react'
import { User } from '../Models/User';
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import styles from '../Styles/dashboard.module.scss';


function Dashboard() {
    const [user, setUser] = useState<User>();
    const [programs, setPrograms] = useState<Array<WorkoutProgram>>([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setUser(authService.getCurrentUser());
        dataService.getWorkoutPrograms()
        .then((response: any) => {
            setPrograms(response.data);
            console.log(response.data);
        });
    }

    return (
        <div className="list row">
            <h1>Hi {user?.firstName}!</h1>
            <div>
                <h4>WorkoutPrograms</h4>
                <ul>
                    {programs && programs.map((program) => (
                        <li className={styles.card}>
                            {program.workoutProgramId} {program.name}
                            <p>
                                {program.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard
