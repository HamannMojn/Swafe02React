import React, {useState, useEffect} from 'react'
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import { User } from '../Models/User';
import jwtDecode from 'jwt-decode';

function WorkoutProgramComponent() {
    const [user, setUser] = useState<User>();
    const [programs, setPrograms] = useState<Array<WorkoutProgram>>([]);

    useEffect(() => {
        getData();
    }, [programs]);

    const getData = async () => {
        await dataService.getWorkoutPrograms()
        .then((response: any) => {
            setPrograms(response.data);
            console.log(response.data);
        });
    }

    return (
        <div>
            <h4>WorkoutPrograms</h4>
                <ul>
                    {programs.map((program) => (
                        <li className="card">
                            {program.workoutProgramId} {program.name}
                            <p>
                                {program.description}
                            </p>
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default WorkoutProgramComponent
