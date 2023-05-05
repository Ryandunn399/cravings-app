import React, {useCallback} from 'react'
import FoodCard from '../../components/FoodCard/FoodCard'
import './SearchPage.css'
import { SearchOptions, sendSearchCall } from '../../utilities/SearchUtilities'
import { IonListHeader, IonLabel, IonIcon, IonPage, IonContent, IonHeader, IonItem, IonToolbar, IonTitle, IonList,  IonButtons, IonButton, IonSearchbar} from '@ionic/react'
import { personCircleOutline, searchCircle, searchOutline } from 'ionicons/icons';
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
     * updateSearchOptionsQuery callback function.
     */
    const updateSearchOptionsQuery = useCallback((value: string) => {
        console.log("from update " + value);
        searchOptions['query'] = value
    }, [searchOptions]);

    /**
     * HandleSubmit callback function.
     * Updates meals with given query
     */
    const handleSubmit = useCallback(async (value: string) => {
        console.log("from handleSubmit " + value);
      try {
        const data = await sendSearchCall(searchOptions)
        setMeals(data.results);
        console.log(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setSearchQuery(value); 
      }
    }, [searchOptions]); 



    // React hook to make API call.
    React.useEffect(() => {
        console.log("from hook " + searchOptions['query']);
        handleSubmit(searchOptions['query']);
        // console.log(meals);
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
                    <IonTitle class = 'cravings-header'>Search</IonTitle>
                    <IonButtons slot="end">
                      <IonButton id="usermodalfromsearch" slot="primary" fill="clear">
                        <IonIcon slot="icon-only" icon={personCircleOutline} color="light"></IonIcon>
                      </IonButton>
                    </IonButtons>
                    <UserModal trigger="usermodalfromsearch"/>
                </IonToolbar>
     
            </IonHeader>
             
            <IonContent fullscreen>
             
               <IonItem>
                <IonSearchbar value={query} onIonChange={ e => {
                    updateSearchOptionsQuery(e.detail.value!)
                    if(e.detail.value! === "")
                        handleSubmit(searchOptions['query'])
                }} placeholder="What are you craving?.." 
                    showClearButton="focus">
                </IonSearchbar>
                <IonButton size = 'default' slot="end" onClick={() => handleSubmit(searchOptions['query'])}>
                    Go
                </IonButton>
                </IonItem>
              
            {query === "" && 
            <IonList lines="none">
            <IonListHeader>
            </IonListHeader>
                <IonButton class = 'discover-button'onClick={() => {
                    updateSearchOptionsQuery("chicken alfredo");
                    handleSubmit(searchOptions['query'])}}>
                <IonLabel><IonIcon class = 'search-icon' slot="icon-only" icon={searchOutline} color="light"></IonIcon>chicken alfredo</IonLabel>
                </IonButton>
                <IonButton onClick={() => {
                    updateSearchOptionsQuery("fruit punch");
                    handleSubmit(searchOptions['query'])}}>
                <IonLabel><IonIcon class = 'search-icon' slot="icon-only" icon={searchOutline} color="light"></IonIcon>fruit punch</IonLabel>
                </IonButton>
                <IonButton class = 'discover-button' onClick={() => {
                    updateSearchOptionsQuery("sugar free");
                    handleSubmit(searchOptions['query'])}}>
                <IonLabel><IonIcon class = 'search-icon' slot="icon-only" icon={searchOutline} color="light"></IonIcon>sugar free</IonLabel>
                </IonButton>
                <IonButton class = 'discover-button'onClick={() => {
                    updateSearchOptionsQuery("keto friendly");
                    handleSubmit(searchOptions['query'])}}>
                <IonLabel><IonIcon class = 'search-icon' slot="icon-only" icon={searchOutline} color="light"></IonIcon>keto friendly</IonLabel>
                </IonButton>
            </IonList>}
            <br />

            <IonList >
            <IonListHeader class = 'discover-text'>Discover</IonListHeader>
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
