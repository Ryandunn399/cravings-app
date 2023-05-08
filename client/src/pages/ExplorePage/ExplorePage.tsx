import React from 'react';
import { IonPopover, IonText, IonIcon, IonButton, IonButtons, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonItem } from '@ionic/react';
import UserModal from '../../components/UserModal/UserModal';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import ExploreThumbnailCard from '../../components/ExploreThumbnailCard/ExploreThumbnailCard'
import { accessibility, accessibilityOutline, globe, personCircle, personCircleOutline } from 'ionicons/icons';
import { ExploreOptions, getExploreData } from '../../utilities/ExploreUtilities';
import './ExplorePage.css';
import ExploreModal from '../../components/ExploreModal/ExploreModal';

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
    const [exploreData, setExploreData] = React.useState<any[]>([]);

    React.useEffect(() => {
        getExploreData().then(data => {
            setExploreData(data.results);
            console.log(data.results);
        })
    }, [])

    var len = exploreData.length;
    const exploreThumbnail1 = exploreData.slice(0,(len/2)-5).map((exp, index) => {
        if(!exp.seo_title || !exp.thumbnail_url) {
            return (<div key={index} />)
        } else {
            var trig = exp.canonical_id
                return (
                    <div key={index} id={exp.id}>
                    <ExploreCard key={index} title={exp.seo_title} image={exp.thumbnail_url} description={exp.total_time_tier.display_tier} id={exp.id} />
                    </div>
                )
        }
    })
    const exploreThumbnail2 = exploreData.slice((len/2)-5, len-2).map((exp, index) => {
        if(!exp.seo_title || !exp.thumbnail_url) {
            return (<div key={index} />)
        } else {
                return (
                    <div key={index} id={exp.id}>
                    <ExploreCard key={index} title={exp.seo_title} image={exp.thumbnail_url} description={exp.total_time_tier.display_tier} id={exp.id} />  
                    </div>
                )
        }
    })

    const exploreModals = exploreData.map((exp, index) => {
        if(!exp.seo_title || !exp.thumbnail_url || exp.id === 8441) {
            return (<div key={index} />)
        } else {
            return (
                
                <ExploreModal key={index} id={exp.id} title={exp.seo_title} img={exp.thumbnail_url} description={exp.description} instructions={exp.instructions} ingredients={exp.sections[0].components} readyIn={exp.total_time_minutes} servings={exp.num_servings} />
     
            )
        }
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

            <IonContent fullscreen >
                
                <br/>
                <IonLabel class = 'explore-content'>Explore new recipes</IonLabel>
                <IonLabel class = 'explore-text ion-text-wrap'>Discover new and personalized recipes with the Cravings app</IonLabel>
                <IonGrid>
                    <IonRow>
                        <IonCol style={{width: "100%"}}>
                            {exploreThumbnail1}
                        </IonCol>
                        <IonCol style={{width: "100%"}}>
                            {exploreThumbnail2}
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {exploreModals}
            </IonContent>
        </IonPage>
    )

}

export default ExplorePage