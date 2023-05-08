import React, { useRef, } from 'react';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients'
import RecipeInstructions from '../../components/RecipeInstructions/RecipeInstructions'
import { IonItem, IonLabel, IonListHeader, IonList, IonTitle, IonHeader, IonButtons, IonButton, IonContent, IonToolbar, IonModal } from '@ionic/react';
import FoodModalContent from '../../components/FoodModalContent/FoodModalContent'
/**
 * The recipe modal properties interface. 
 */
interface ExploreModalProps {
    id: string,
    title: string,
    img: string,
    description: string,
    instructions: any[],
    ingredients: any[],
    servings: string,
    readyIn: string,
}

/**
 * This will be the modal displayed to the user after they click on a recipe
 * @returns recipe modal component. 
 */
const ExploreModal: React.FC<ExploreModalProps> = ({id, title, img, description, instructions, ingredients, servings, readyIn}) => {
    const foodmodal = useRef<HTMLIonModalElement>(null);
    let trig:string = id;
    var a:number = +id;
    /**
     * Function to close the modal
     */
    function close() {
       foodmodal.current?.dismiss('confirm');
    }

    /**
     * Function that remove html tags from string
     */
    function removeTags(str:string) {
      if ((str===null) || (str===''))
          return false;
      else
          str = str.toString();
            
      // REGEX to find HTML tags in and replace with '' string.
      return str.replace( /(<([^>]+)>)/ig, '');
    }
    
    var desc = removeTags(description)

    const ing = ingredients.map((item, index) => {
      if(item.measurements[0].quantity === "0") {
        var measurements = "Optional"
      } else {
        var measurements = item.measurements[0].quantity + " " + item.measurements[0].unit.display_plural
      }
      return (
        <RecipeIngredients key={index} id={index} name={item.ingredient.name} amount={measurements} />
      )
    })

    const inst = instructions.map((item, index) => {
      return (
        <RecipeInstructions key={index} id={item.id} num={index+1} step={item.display_text} />
      )
    })

    return (
    <IonModal ref={foodmodal} trigger={trig}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle class = 'cravings-header'>Information</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => close()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList lines="none" inset>
        <FoodModalContent id={a} img={img} title={title} servings={servings} readyIn={readyIn} />
      
        <IonItem>
          <IonLabel class="ion-text-wrap">
          {desc}
          </IonLabel>
        </IonItem> 
      </IonList>

      <IonList inset>
        {ing}
      </IonList>

      <IonList inset>
        {inst}
      </IonList>


      </IonContent>

    </IonModal>

    );
}

export default ExploreModal