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
    }, []);

    const getUserRole = () => {
        const user = authService.getCurrentUser();

        switch (user.role) {
            case "Client":
                console.log(user.role);
                break;
            
                case "PersonalTrainer":
                console.log(user.role);
                break;
            default:
                break;
        }
    }
    const getData = () => {
        dataService.getWorkoutPrograms()
        .then((response: any) => {
            setPrograms(response.data);
            console.log(response.data);
        });
    }

    return (
        <div>
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
    )
}

export default WorkoutProgramComponent
