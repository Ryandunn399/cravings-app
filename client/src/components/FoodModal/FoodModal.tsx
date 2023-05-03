import React, { useRef, } from 'react';
import './FoodModal.css';
import FoodModalContent from '../../components/FoodModalContent/FoodModalContent'
import RecipeInstructions from '../../components/RecipeInstructions/RecipeInstructions'
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients'
import { IonLabel, IonListHeader, IonList, IonTitle, IonHeader, IonButtons, IonButton, IonContent, IonToolbar, IonModal } from '@ionic/react';
import { getRecipeInformation } from '../../utilities/SearchUtilities';

/**
 * The food modal properties interface. 
 * Right now it only has the id of the recipe
 */
interface FoodModalProps {
    id: number, 
}

/**
 * This will be the modal displayed to the user after they click on a recipe
 * @returns food modal component. 
 */
const FoodModal: React.FC<FoodModalProps> = ({id}) => {
    const foodmodal = useRef<HTMLIonModalElement>(null);
    let trig:string = "foodmodal" + id;

    const [recipe, setRecipe] = React.useState<any>({
      "id": "",
      "image": "",
      "title": ""
    })

    const [instructions, setInstructions] = React.useState<any[]>([{}]);
    const [ingredients, setIngredients] = React.useState<any[]>([]);

    function close() {
       foodmodal.current?.dismiss('confirm');
    }

    /* React hook to grab the recipe information and 
    then set the instructions and ingredients arrays */
    React.useEffect(() => {
      if(id !== 0) {
        getRecipeInformation(id).then(data => {
          setRecipe(data)
          if(data.analyzedInstructions[0] !== undefined) {
            setInstructions(data.analyzedInstructions[0].steps)
          } else {
            setInstructions([])
          }
          if(data.analyzedInstructions !== undefined) {
            setIngredients(data.extendedIngredients)
          }
        });
      }
    })

    function log(a:any) {
      console.log(a);
    }

    //map the instructions onto RecipeInstructions component
    const inst = instructions.map((item, key) => {
      return (
        <RecipeInstructions key={key} id={id} num={item.number} step={item.step} />
        )
    });

    //map the ingredients onto RecipeIngredients component
    const ing = ingredients.map(item => {
      return (
        <RecipeIngredients key={item.id} id={item.id} name={item.name} amount={item.original} />
        )
    })

    return (
    <IonModal ref={foodmodal} trigger={trig}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle>Information</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => close()}>Close</IonButton>
            <IonButton onClick={() => log(recipe)}>Log Recipe</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonList inset>
          <FoodModalContent id={id} img={recipe.image} title={recipe.title} servings={recipe.servings} readyIn={recipe.readyInMinutes} />
        </IonList>

        <IonList inset>
        <IonListHeader>
          <IonLabel>
          Ingredients
          </IonLabel>
        </IonListHeader>
       {ing}
        </IonList>

        {instructions.length > 0 && 
        <IonList inset>
        <IonListHeader>
          <IonLabel>
          Instructions
          </IonLabel>
        </IonListHeader>
       {inst}
        </IonList>
      }

      {instructions.length === 0 &&
        <IonList inset>
        <IonListHeader>
          <IonLabel>
          No instructions available :(
          </IonLabel>
        </IonListHeader>
        </IonList>
      }

      </IonContent>

    </IonModal>

    );
}

export default FoodModal