import React from 'react'
import { IonButtons, IonIcon, IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { RecipeOptions } from '../../utilities/SearchUtilities'
import UserModal from '../../components/UserModal/UserModal';
import { personCircle } from 'ionicons/icons';
/*
 * Basic interface for our RecipePage.
 */
interface RecipePageProps {
    recipeOptions: RecipeOptions
}

/**
 * RecipePage
 * 
 * @return RecipePage
 */
const RecipePage: React.FC<RecipePageProps> = ({recipeOptions}) => { 

	return(
		<IonPage>
            <IonHeader>
                  <IonToolbar>
                    <IonTitle size="large">Recipes</IonTitle>
                    <IonButtons slot="end">
                    <IonButton id="usermodalfromrecipe" slot="primary" fill="clear">
                      <IonIcon slot="icon-only" icon={personCircle} color="medium"></IonIcon>
                    </IonButton>   
                    </IonButtons>                 
                    <UserModal trigger="usermodalfromrecipe"/>
                  </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">Recipes</IonTitle>

                  </IonToolbar>
            </IonHeader>
            
            
            </IonContent>

        </IonPage>
	)

}

export default RecipePage