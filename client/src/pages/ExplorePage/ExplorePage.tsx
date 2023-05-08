import React from 'react';
import { IonPopover, IonText, IonIcon, IonButton, IonButtons, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonItem } from '@ionic/react';
import UserModal from '../../components/UserModal/UserModal';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import ExploreThumbnailCard from '../../components/ExploreThumbnailCard/ExploreThumbnailCard'
import { accessibility, accessibilityOutline, globe, personCircle, personCircleOutline } from 'ionicons/icons';
import { ExploreOptions, ExploreCardData, getExploreCardData, getExploreVideoData } from '../../utilities/ExploreUtilities';
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
    const [exploreCardData, setExploreCardData] = React.useState<any[]>([]);
    const [exploreData, setExploreData] = React.useState<any[]>([]);

    React.useEffect(() => {
        getExploreCardData().then(data => {
            setExploreCardData(data);
            console.log(data);
        });
        getExploreVideoData().then(data => {
            setExploreData(data.results);
            console.log(data.results);
        })
    }, [])

    //map the card to a constant
    //map the card to a constant
//     const exploreCard1 = exploreCardData.slice(0, exploreCardData.length/2).map((exp:ExploreCardData, index: number) => {
//         return (
//             <ExploreCard 
//                 key={index}
//                 image={exp.image} 
//                 title={exp.title}
//                 description={exp.duration}
//             />

//         )
// })

// const exploreCard2 = exploreCardData.slice(exploreCardData.length/2,exploreCardData.length).map((exp:ExploreCardData, index: number) => {
//     return (

//         <ExploreCard 
//             key={index}
//             image={exp.image} 
//             title={exp.title}
//             description={exp.duration}

//         />

//     )
// })

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