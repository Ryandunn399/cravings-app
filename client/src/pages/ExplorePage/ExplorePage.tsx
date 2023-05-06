import React from 'react';
import { IonText, IonIcon, IonButton, IonButtons, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonItem } from '@ionic/react';
import UserModal from '../../components/UserModal/UserModal';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import { accessibility, accessibilityOutline, globe, personCircle, personCircleOutline } from 'ionicons/icons';
import { ExploreOptions, ExploreCardData, getExploreCardData } from '../../utilities/ExploreUtilities';
import './ExplorePage.css';
import { url } from 'inspector';

/*
 * Basic interface for our ExplorePage properties.
 */
interface ExplorePageOptions {
    exploreOptions: ExploreOptions
}

/**
 * ExplorePage.
 * @return explore page
 */
const ExplorePage: React.FC<ExplorePageOptions> = ({exploreOptions}) => { 
    const [exploreCardData, setExploreCardData] = React.useState<any[]>([]);

    React.useEffect(() => {
        getExploreCardData().then(data => {setExploreCardData(data);console.log(data);});
    }, [])

    //map the card to a constant
    //map the card to a constant
    const exploreCard = exploreCardData.slice(0, exploreCardData.length/2).map((exp:ExploreCardData, index: number) => {
        return (
            <ExploreCard 
                key={index}
                image={exp.image} 
                url={exp.url}
                title={exp.title}
                title_url={exp.title_url}
                duration={exp.duration}
                duration_url={exp.duration_url}
            />
        )
})

const exploreCard1 = exploreCardData.slice(exploreCardData.length/2,exploreCardData.length).map((exp:ExploreCardData, index: number) => {
    return (
        <ExploreCard 
            key={index}
            image={exp.image} 
            url={exp.url}
            title={exp.title}
            title_url={exp.title_url}
            duration={exp.duration}
            duration_url={exp.duration_url}
        />
    )
})
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class = 'cravings-header'>Cravings</IonTitle>
                    <IonButtons slot="end">
                    <IonButton id="usermodalfromexplore" slot="primary">
                        <IonIcon class = 'account-icon' slot="icon-only" icon={personCircleOutline}></IonIcon>
                    </IonButton>
                    </IonButtons>
                    <UserModal trigger="usermodalfromexplore"/>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen color={'light'}>
                
                <br/>
                <IonLabel class = 'explore-content'>Explore new recipes</IonLabel>
                <IonLabel class = 'explore-text ion-text-wrap'>Discover new and personalized recipes with the Cravings app</IonLabel>
                <IonGrid>
                    <IonRow>
                        <IonCol style={{width: "100%"}}>
                            {exploreCard}
                        </IonCol>
                        <IonCol style={{width: "100%"}}>
                            {exploreCard1}
                        </IonCol>
                    </IonRow>
                </IonGrid>
      
            </IonContent>

        </IonPage>
    )

}

export default ExplorePage