import React from 'react'
import { IonLabel, IonImg, IonCard, IonCardContent, IonListHeader, IonList, IonButtons, IonIcon, IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import UserModal from '../../components/UserModal/UserModal';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import FoodModal from '../../components/FoodModal/FoodModal';
import { personCircleOutline } from 'ionicons/icons';
import { RecipeOptions, RecipeListData, getRecipeListData } from '../../utilities/RecipeUtilities';
import { SearchOptions, sendSearchCall } from '../../utilities/SearchUtilities';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


/*
 * Basic interface for our RecipePage.
 */
interface RecipePageProps {
    recipeOptions: RecipeOptions;
}

/**
 * RecipePage
 * @return RecipePage
 */
const RecipePage: React.FC<RecipePageProps> = ({recipeOptions}) => { 

    const [recipes, setRecipes] = React.useState<any[]>([]);
    const [vegan, setVegan] = React.useState<any[]>([]);
    const [keto, setKeto] = React.useState<any[]>([]);
    const [nutFree, setNutFree] = React.useState<any[]>([]);
    const [veganOps] = React.useState<SearchOptions>({query: "vegan", number: 50});
    const [ketoOps] = React.useState<SearchOptions>({query: "keto", number: 50});
    const [nutFreeOps] = React.useState<SearchOptions>({query: "nut free", number: 50});
    
    function toTitleCase(str:string) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    /*
      React hook to get data and parse it into proper format 
      (object of objects to array of objects)
    */
    React.useEffect(() => {
        getRecipeListData().then(data => {
        const formattedData = Object.keys(data).map(key => data[key]);
        setRecipes(formattedData);
        console.log(formattedData);
      });
    }, [setRecipes])


    /**
     * React hook to make the calls to get the
     * vegan, keto, and nut free recipes
     */
    React.useEffect(() => {
      sendSearchCall(veganOps).then(data => {
        console.log(data);
        setVegan(data.results);
      });
      sendSearchCall(ketoOps).then(data => {
        console.log(data);
        setKeto(data.results);
      });
      sendSearchCall(nutFreeOps).then(data => {
        console.log(data);
        setNutFree(data.results);
      });
    }, [veganOps, ketoOps, nutFreeOps, setVegan, setKeto, setNutFree])

    /*
      const used to map the recipe items
      (removes the test recipe)
    */
    const recipeItem = recipes.map((recp:RecipeListData, index: number) => {
      if(recp.name === "test") {
        return (<div key={index} /> )
      } else {
            return (
              <div key={index} id={recp.id}>
                <RecipeItem 
                    key={index}
                    id={recp.id}
                    name={recp.name}
                />
              </div>
            )
      }
    })

    /*
      const used to map each recipe with its modal
      (removes the test recipe)
    */
    const recpModal = recipes.map((recp:RecipeListData, index: number) => {
      if(recp.name === "test") {
        return (<div key={index} /> )
      } else {
        return (
          <RecipeModal key={index} id={recp.id} name={recp.name} comments={recp.comments} ingredients={recp.ingredients} instructions={recp.instructions} />
          )
      }
    })

    /**
     * const used to map the swipable cards for vegan recipes
     */
    const veganCards = vegan.map((item, index) => {
      const id = "foodmodal" + item.id ;
      return (
                <SwiperSlide key={index} >
                  <IonCard id={id} button>
                        <img src={item.image}/>
                    <IonCardContent>
                    <IonLabel>{item.title}</IonLabel>
                   
                    </IonCardContent>
                  </IonCard>
                  </SwiperSlide>
        )
    })

    /**
     * const used to map the modals for vegan cards
     */
    const veganModals = vegan.map((item, index) => {
      return (
          <FoodModal key={index} id={item.id}/>
        )
    })

    /**
     * const used to map the swipable cards for keto recipes
     */
    const ketoCards = keto.map((item, index) => {
      const id = "foodmodal" + item.id ;
      return (
                <SwiperSlide key={index} >
                  <IonCard id={id} button>
                        <img src={item.image}/>
                    <IonCardContent>
                    <IonLabel>{item.title}</IonLabel>
                    </IonCardContent>
                  </IonCard>
                  </SwiperSlide>
        )
    })

    /**
     * const used to map the modals for keto cards
     */
    const ketoModals = keto.map((item, index) => {
      return (
          <FoodModal key={index} id={item.id}/>
        )
    })

    /**
     * const used to map the swipable cards for nut free recipes
     */
    const nutFreeCards = nutFree.map((item, index) => {
      const id = "foodmodal" + item.id ;
      var title = item.title
      if(title.includes("Nut-free"))
        title = title.replaceAll("Nut-free", "")
      else if(title.includes("Nut Free"))
        title = title.replaceAll("Nut Free", "")
      else if(title.includes("Nut-Free"))
        title = title.replaceAll("Nut-Free", "")
      title = toTitleCase(title)
      return (
                <SwiperSlide key={index} >
                  <IonCard id={id} button>
                        <img src={item.image}/>
                    <IonCardContent>
                    <IonLabel>{title}</IonLabel>
                    </IonCardContent>
                  </IonCard>
                  </SwiperSlide>
        )
    })

    /**
     * const used to map the modals for nut free cards
     */
    const nutFreeModals = nutFree.map((item, index) => {
      return (
          <FoodModal key={index} id={item.id}/>
        )
    })

	return(
		<IonPage>
            <IonHeader>
                  <IonToolbar>
                    <IonTitle class = 'cravings-header'>Recipes</IonTitle>
                    <IonButtons slot="end">
                    <IonButton id="usermodalfromrecipe" slot="primary" fill="clear">
                      <IonIcon class = 'account-icon' slot="icon-only" icon={personCircleOutline}></IonIcon>
                    </IonButton>   
                    </IonButtons>                 
                    <UserModal trigger="usermodalfromrecipe"/>
                  </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



          <IonList>
            <IonListHeader>Vegan Recipes</IonListHeader>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                onSwiper={(swiper) => console.log(swiper)} >
                {veganCards}
              </Swiper>
          </IonList>


          <IonList>
            <IonListHeader>Keto Recipes</IonListHeader>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                onSwiper={(swiper) => console.log(swiper)} >
                {ketoCards}
              </Swiper>
          </IonList>


          <IonList>
            <IonListHeader>Nut Free Recipes</IonListHeader>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                onSwiper={(swiper) => console.log(swiper)} >
                {nutFreeCards}
              </Swiper>
          </IonList>

            <IonList>
              <IonListHeader>All Recipes</IonListHeader>
            {recipeItem}
            </IonList>
            
            {recpModal}
            {veganModals}
            {ketoModals}
            {nutFreeModals}
            </IonContent>

        </IonPage>
	)

}

export default RecipePage