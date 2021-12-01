import axios from 'axios';
import { exercise } from '../Models/exercise';
import { User } from '../Models/User';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import authHeader from './api-header';
import authService from './auth.service';

const URL = "https://afe2021fitness.azurewebsites.net/api/";

class DataService {
    async getWorkoutPrograms() {
        return await axios.get(URL + "workoutprograms", {headers: authHeader()});
    }
    async getExercises() {
        return await axios.get(URL + "exercises", {headers: authHeader()});
    }

    async createUser(
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

    CreateWorkout(name: string, description: string, exercises: exercise[], personalTrainerId: string, clientId: any){
        const newWorkout = <WorkoutProgram>{
            name: name,
            description: description,
            exercises: exercises,
            personalTrainerId: personalTrainerId,
            clientId: clientId
        }

        return axios.post(URL+"WorkoutPrograms", newWorkout, {headers: authHeader()}).then((response) => {
            console.log(response.data);
        }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response)}})
    }

    async getPtClients() {
        return await axios.get(URL + "Users/Clients", {headers: authHeader()})
    }

    CreateExercise(name: string, description: string, sets: number, repetitions: number, time: string, personalTrainerId: number, workoutProgramId: number){
        const newExercise = <exercise>{
            name: name,
            description: description,
            sets: sets,
            repetitions: repetitions,
            time: time,
            personalTrainerId: personalTrainerId,
            workoutProgramId: workoutProgramId,
        }

        return axios.post(URL+"Exercises", newExercise, {headers: authHeader()}).then((response) => {
            console.log(response.data);
        }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response)}})
    }
}
export default new DataService();