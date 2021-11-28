import axios from 'axios';
import { WorkoutProgram } from '../Models/WorkoutProgram';
import authHeader from './api-header';

const URL = "https://afe2021fitness.azurewebsites.net/api/";

class DataService {
    getWorkoutPrograms() {
        return axios.get(URL + "workoutprograms", {headers: authHeader()});
    }
}
export default new DataService();