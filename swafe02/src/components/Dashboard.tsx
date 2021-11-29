import React, {useEffect, useState} from 'react'
import { User } from '../Models/User';
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import styles from '../Styles/dashboard.module.scss';
import WorkoutProgramComponent from './WorkoutProgram';
import CreateUser from './CreateUser';

function Dashboard() {

    const initialState = {
        isManager: false,
        isPersonalTrainer: false,
        isClient: false
    }

    const [state, setState] = useState(initialState);
    const [user, setUser] = useState(() => authService.getCurrentUser());

    useEffect(() => {
        setUser(()=> authService.getCurrentUser());
        console.log(user)
        if(user){
            switch (user.Role) {
                case "Client":
                    setState({isManager: false, isPersonalTrainer: false, isClient: true});
                    break;
    
                case "Manager":
                    setState({isManager: true, isPersonalTrainer: false, isClient: false})
                    break;
                
                case "PersonalTrainer":
                    setState({isManager: false, isPersonalTrainer: true, isClient: false})
                    break;
            
                default:
                    break;
            }
        }
    }, [user])

    return (
        <div className="list row">
            <div className="gridcontainer">
                {state.isClient &&(
                    <div>
                    <WorkoutProgramComponent/>
                </div>
                )} 
                
                {state.isManager && (
                    <div>
                    <CreateUser/>
                </div>
                )}

                {state.isPersonalTrainer && (
                    <div>
                        <CreateUser/>
                        <WorkoutProgramComponent/>
                    {/* <CreateWorkoutProgram/> */}
                </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
