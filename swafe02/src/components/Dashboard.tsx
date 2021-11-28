import React, {useEffect, useState} from 'react'
import { User } from '../Models/User';
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import '../Styles/dashboard.css';


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
            <h3>Hi {user?.firstName}!</h3>
            <div className="col-md-6">
                <h4>WorkoutPrograms</h4>
                <ul>
                    {programs && programs.map((program) => (
                        <li className="card">
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
