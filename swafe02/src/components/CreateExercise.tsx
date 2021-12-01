import React, { useState, useEffect } from 'react'
import dataService from '../services/data.service';
import authService from '../services/auth.service';
import { resetMemoizations } from '@fluentui/react';

function CreateExercise(this: any){

    const onCreate = async(data: {name: string, description: string, sets: number, repetitions: number, time: string}) => {
        dataService.CreateExercise(data.name, data.description, data.sets, data.repetitions, data.time);
    }
}