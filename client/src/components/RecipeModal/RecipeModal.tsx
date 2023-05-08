import './RecipeModal.css';
import React, { useRef, } from 'react';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients'
import { IonItem, IonLabel, IonListHeader, IonList, IonTitle, IonHeader, IonButtons, IonButton, IonContent, IonToolbar, IonModal } from '@ionic/react';

/**
 * The recipe modal properties interface. 
 */
interface RecipeModalProps {
    id: string, 
    name: string,
    comments: string,
    ingredients: string[],
    instructions: string,
}

/**
 * This will be the modal displayed to the user after they click on a recipe
 * @returns recipe modal component. 
 */
const RecipeModal: React.FC<RecipeModalProps> = ({id, name, comments, ingredients, instructions}) => {
    const foodmodal = useRef<HTMLIonModalElement>(null);
    let trig:string = id;

    const [inst, setInst] = React.useState<any[]>([]);

    /**
     * Function to close the modal
     */
    function close() {
       foodmodal.current?.dismiss('confirm');
    }

    /**
     * const used to map all of the ingredients onto
     * the RecipeIngredients component
     * (Also removes invalid html tags)
     */
    const ing = ingredients.map((item, index) => {
      if(/<[a-z][\s\S]*>/i.test(item)) {
        return (<div key={index} />)        
      } else {
        return (<RecipeIngredients key={index} id={index} name={item} amount="" />)
      }

    })

    /**
     * Reach hook to set the intructions constant
     * Formats the paragraph into an array of strings
     */
    React.useEffect(() => {
      var result = instructions.split(".")
      for(let i=0; i<result.length; i++) {
        result[i] = result[i].trim();
      }
      setInst(result);
    }, [instructions, setInst])

    /**
     * const used to map the individual instructions onto an IonItem
     */
    const instMapped = inst.map((item, index) => {
      if(isNaN(item)) {
        return (
            <IonItem key={index} >
            <IonLabel class="ion-text-wrap">
            {index+1}: {item}
            </IonLabel>
            </IonItem>
          )        
      } else {
        return(<div key={index} /> )
      }
    })
    

    return (
    <IonModal ref={foodmodal} trigger={trig}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle>Information</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => close()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList inset>
      <IonListHeader>Name</IonListHeader>
        <IonItem>
        {name}
        </IonItem>
      </IonList>
        {comments !== "" && 
        <IonList inset>
        <IonListHeader>Comments</IonListHeader> 
        <IonItem>
          <IonLabel class="ion-text-wrap">{comments}</IonLabel>
        </IonItem>
      </IonList>}
      <IonList inset>
      <IonListHeader>Ingredients</IonListHeader>
      {ing}
      </IonList>
      <IonList inset>
      <IonListHeader>Instructions</IonListHeader>
        
          {instMapped}
        
      </IonList>

      </IonContent>

    </IonModal>

    );
}

export default RecipeModal