import React, {useEffect, useState} from 'react'
import { User } from '../Models/User';
import authService from '../services/auth.service';
import dataService from '../services/data.service';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import '../Styles/dashboard.css';
import WorkoutProgramComponent from './WorkoutProgram';


function Dashboard() {
    const [user, setUser] = useState<User>();
    

    return (
        <div className="list row">
            <h3>Hi {user?.firstName}!</h3>
            <div className="gridcontainer">
                <div className="grid-item">
                <WorkoutProgramComponent></WorkoutProgramComponent>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard
