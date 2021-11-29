export interface User{
    UserId?: number | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId?: number | null;
    accountType: string;
}