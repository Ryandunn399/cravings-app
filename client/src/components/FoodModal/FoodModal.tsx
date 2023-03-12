import React, { useRef, } from 'react';
import './FoodModal.css';
import {   IonList, IonTitle, IonHeader, IonButtons, IonButton, IonContent, IonToolbar, IonModal, IonItem } from '@ionic/react';
import { getRecipeInformation } from '../../utilities/SearchUtilities';

/**
 * The food modal properties interface. 
 * Right now it only has the id of the recipe
 */
interface FoodModalProps {
  id:number;
}

/**
 * This will be the modal displayed to the user after they click on a recipe
 * @returns food modal component. 
 */
const FoodModal: React.FC<FoodModalProps> = ({id}) => {
    const foodmodal = useRef<HTMLIonModalElement>(null);
    let trig:string = "foodmodal" + id;

    const [recipe, setRecipe] = React.useState<any[]>([])

    function close() {
       foodmodal.current?.dismiss('confirm');
    }

    React.useEffect(() => {
      if(id !== 0) {
        getRecipeInformation(id).then(data => setRecipe(data));
      }
    })

    function log(a:any) {
      console.log(a);
    }

    return (
    <IonModal ref={foodmodal} trigger={trig}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle>Information</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => close()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonTitle>Id: {id}</IonTitle>
        </IonItem>
        <IonButton onClick={() => log(recipe)}>Log Recipe</IonButton>
        <IonList>

        </IonList>
      </IonContent>
    </IonModal>

    );
}

export default FoodModal