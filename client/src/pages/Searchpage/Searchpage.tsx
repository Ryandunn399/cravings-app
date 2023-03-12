import React, {useCallback} from 'react'
import FoodCard from '../../components/FoodCard/FoodCard'
import './SearchPage.css'
import { SearchOptions, sendSearchCall } from '../../utilities/SearchUtilities'
import { IonListHeader, IonLabel, IonIcon, IonPage, IonContent, IonHeader, IonItem, IonToolbar, IonTitle, IonList,  IonButtons, IonButton, IonSearchbar} from '@ionic/react'
import { personCircle } from 'ionicons/icons';
import FoodModal from '../../components/FoodModal/FoodModal';
import UserModal from '../../components/UserModal/UserModal';

/*
 * Basic interface for our searchbar properties.
 */
interface SearchPageProps{
    searchOptions: SearchOptions
}

/**
 * The search page component.  Will take the search options as the properties
 * and will render the JSON results obtained from making an API call.
 * 
 * @returns Searchpage component.
 */
const SearchPage: React.FC<SearchPageProps> = ({searchOptions}) => {

    const [meals, setMeals] = React.useState<any[]>([])
    const [query, setSearchQuery] = React.useState('');
    const [curr_id, setCurrId] = React.useState(0);
    const [trig, setTrig] = React.useState('foodmodal0');


    /**
     * HandleSubmit callback function.
     * Updates meals with given query
     */

    const handleSubmit = useCallback(async (value: string) => {
      try {
        searchOptions['query'] = value;
        const data = await sendSearchCall(searchOptions)
        setMeals(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setSearchQuery(value); // <-- set loading false when done no matter what
      }
    }, [searchOptions]); 

    // React hook to make API call.
    React.useEffect(() => {
        handleSubmit(searchOptions['query']);
    }, [handleSubmit, searchOptions])

    //map the meals onto a foodcard
    const foodmeal = meals.map(item => {
                    return (
                    <div key={item.id} onClick={() => {
                        setCurrId(item.id);
                        setTrig("foodmodal" + item.id);
                    }}>
                        <FoodCard 
                                key={item.id}
                                id={item.id}
                                img={item.image}
                                title={item.title}
                        /> 
                    </div>
                    )
                });

    
    return (
         <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
                    <IonButtons slot="end">
                      <IonButton id="usermodalfromsearch" slot="primary" fill="clear">
                        <IonIcon slot="icon-only" icon={personCircle} color="medium"></IonIcon>
                      </IonButton>
                    </IonButtons>
                    <UserModal trigger="usermodalfromsearch"/>
                </IonToolbar>
     
            </IonHeader>
             
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">Search</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonList>
                <IonSearchbar value={query} onIonChange={e => {
                            setSearchQuery(e.detail.value!);
                            handleSubmit(e.detail.value!);
                        }} placeholder="What are you craving?.." 
                        showClearButton="focus"
                        showCancelButton="focus">
                </IonSearchbar>
                </IonList>
            {query === "" && 
            <IonList lines="none">
            <IonListHeader>
            <IonLabel>Discover</IonLabel>
            </IonListHeader>
                <IonItem onClick={() => handleSubmit("chicken alfredo")}>
                <IonLabel color="primary">chicken alfredo</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleSubmit("fruit punch")}>
                <IonLabel color="primary">fruit punch</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleSubmit("sugar free")}>
                <IonLabel color="primary">sugar free</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleSubmit("keto friendly")}>
                <IonLabel color="primary">keto friendly</IonLabel>
                </IonItem>
            </IonList>}
            <br />
            <IonList>
                <div id={trig}>
                {foodmeal}
                </div>
            </IonList>
            
            <FoodModal id={curr_id}/>
            </IonContent>
        </IonPage>
    )
}

export default SearchPage
