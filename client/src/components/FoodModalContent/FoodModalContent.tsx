import React from 'react'
import './FoodModalContent.css';
import {  IonImg, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
/**
 * The Food Modal Content properties interface. Right now we are passing
 * id, image, and title values to the component.
 */
interface FoodModalContentProps {
    id: number, 
    img: string,
    title: string,
    servings: string,
    readyIn: string
}


/**
 * The component that displays the basic recipe information 
 * on the FoodModal 
 * @returns FoodModalContent component. 
 */
const FoodModalContent: React.FC<FoodModalContentProps> = ({id, img, title, servings, readyIn}) => {

    return (
           <IonItem>
                <IonThumbnail slot="start">
                    <IonImg alt='food' src={`${img}`} style={{
                    borderRadius: 10,
            }}></IonImg>
                </IonThumbnail>
                <IonLabel class="ion-text-wrap">
                    <h2>{title}</h2>
                    <p>Ready in {readyIn} minutes</p>
                    <p>{servings} servings</p>    
                </IonLabel>
                
            </IonItem>
    )
}

export default FoodModalContent