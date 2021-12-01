import * as React from 'react';
import {
    Dialog,
    DialogType,
    IDialogStyles
} from '@fluentui/react';
import { exercise } from "../Models/exercise";
import { useState } from "react";
import { isNonNullExpression } from 'typescript';


interface IWorkoutDialog {
    hidden: boolean;
    onDismiss: () => void;
    dialogTitle: string;
    dialogContent: JSX.Element;   
}

const DialogStyling: IDialogStyles = {
    root: {
    },
    main: {
        backgroundColor: "#FCB98A",
        borderRadius: "25px",
        width: 'fit-content'
    }
};

export default function WorkoutDialog(props: IWorkoutDialog): JSX.Element {
    return (
        <div>
            <Dialog
                onDismiss={props.onDismiss}
                isBlocking={false}
                hidden={props.hidden}
                dialogContentProps={{type: DialogType.normal, title: props.dialogTitle}}
                styles = {DialogStyling}
                maxWidth = {'700px'}
            >
                {props.dialogContent}
            </Dialog>
        </div>
    );
};