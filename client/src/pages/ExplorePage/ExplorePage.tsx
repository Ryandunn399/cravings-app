import React from 'react';
import { IonIcon, IonButton, IonButtons, IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import UserModal from '../../components/UserModal/UserModal';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import { personCircle } from 'ionicons/icons';
import { ExploreOptions, ExploreCardData, getExploreCardData } from '../../utilities/ExploreUtilities';


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
    const [isVisible, setIsVisible] = React.useState(true);
    const [exploreCardData, setExploreCardData] = React.useState<any[]>([]);

    React.useEffect(() => {
        getExploreCardData().then(data => {setExploreCardData(data);console.log(data);});
    }, [])

    //map the card to a constant
    const exploreCard = exploreCardData.map((exp:ExploreCardData, index: number) => {
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
                    <IonTitle>Explore</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">Explore</IonTitle>
                  <IonButton id="usermodalfromexplore" slot="primary" fill="clear">
                    <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                  </IonButton>
                  </IonToolbar>
                </IonHeader>
                <UserModal trigger="usermodalfromexplore"/>
  
                {exploreCard}
      
            </IonContent>

        </IonPage>
	)

}

export default ExplorePage