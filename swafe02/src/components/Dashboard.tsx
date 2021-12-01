import React, {useEffect, useState} from 'react'
import authService from '../services/auth.service';
import WorkoutProgramComponent from './WorkoutProgram';
import CreateUser from './CreateUser';
import CreateWorkoutProgram from './CreateWorkoutProgram';
import ClientList from './ClientList';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/dashboard.module.scss';

function Dashboard() {

    const initialState = {
        isManager: false,
        isPersonalTrainer: false,
        isClient: false
    }

    const [state, setState] = useState(initialState);
    const [user, setUser] = useState(() => authService.getCurrentUser().Role);
    const navigate = useNavigate();
    useEffect(() => {
        if(user){
            setUser(()=> authService.getCurrentUser().Role);
            console.log(user);
        }

        
        console.log(user)
        if(user){
            switch (user) {
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

    const logout = () => {
        authService.logout();
        navigate("/");
    }

    return (
        <div className="list row">
            <div className="gridcontainer">
                <div>
                    <button className={styles.standardButton} onClick={() => logout()}>Logout</button>
                </div>
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
                        <CreateWorkoutProgram/>
                        <WorkoutProgramComponent/>
                        <ClientList/>
                </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
