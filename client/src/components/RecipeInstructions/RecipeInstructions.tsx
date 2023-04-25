import React from 'react'
import './RecipeInstructions.css';
import {  IonItem, IonLabel } from '@ionic/react';
/**
 * The Recipe Ingredients properties interface. Right now we are passing
 * id, num, and step values to the component.
 */
interface RecipeInstructionsProps {
    id: number, 
    num: number,
    step: string
}


/**
 * The component that displays the recipe instructions 
 * to the user after opening a modal
 * @returns RecipeInstructions component. 
 */
const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({id, num, step}) => {

    return (
           <IonItem>
                <IonLabel class="ion-text-wrap">
                {num}: {step}
                </IonLabel>
            </IonItem>
    )
}

export default RecipeInstructions