import { exercise } from "./exercise";
export interface WorkoutProgram{
    workoutProgramId: number | null;
    name: string;
    description: string;
    exercises: exercise[];
    personalTrainerId: string;
    clientId: number;
}