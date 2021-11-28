import { exercise } from "./exercise";
export interface WorkoutProgram{
    workoutProgramId: number;
    name: string;
    description: string;
    exercises: exercise[];
    personalTrainerId: number;
    clientId: number;
}