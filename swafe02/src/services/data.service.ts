import axios from 'axios';
import { User } from '../Models/User';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import authHeader from './api-header';
import authService from './auth.service';

const URL = "https://afe2021fitness.azurewebsites.net/api/";

class DataService {
    async getWorkoutPrograms() {
        return await axios.get(URL + "workoutprograms", {headers: authHeader()});
    }

    createUser(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        ptId : number | null)
        {
        const user = authService.getCurrentUser();
        let type = "";
        if(user.Role == "PersonalTrainer"){
            type = "Client";
        } else {
            type = "PersonalTrainer";
        }

        const newUser = <User>{
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            personalTrainerId: ptId,
            accountType: type
        }
        console.log(newUser)

        return axios.post(URL+"users", newUser, {headers: authHeader()}).then((response) => {
            console.log(response.data);
        }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response)}})
    }

    CreateWorkout(){
        
    }
}
export default new DataService();