import { exercise } from "./exercise";
export interface WorkoutProgram{
    workoutProgramId: number | null;
    name: string;
    description: string;
    exercises: exercise[];
    personalTrainerId: number;
    clientId: number;
}