import React from 'react'
import './RecipeIngredients.css';
import {  IonItem, IonLabel } from '@ionic/react';
/**
 * The recipe ingredients properties interface. Right now we are passing
 * id, name, and amount values to the component.
 */
interface RecipeIngredientsProps {
    id: number, 
    name: string,
    amount: string
}


/**
 * Component that displays Recipe Ingredients 
 * to the user after they open a FoodModal
 * @returns Recipe Ingredients component. 
 */
const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({id, name, amount}) => {


    return (
           <IonItem>
                <IonLabel class="ion-text-wrap">
                    {name}
                </IonLabel>
                <p>{amount}</p>
            </IonItem>
    )
}

export default RecipeIngredients