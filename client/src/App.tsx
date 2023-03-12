import { Redirect, Route } from 'react-router-dom';
import { IonApp, 
        IonIcon,
        IonLabel,
        IonRouterOutlet,
        IonTabBar,
        IonTabButton,
        IonTabs,
        setupIonicReact 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { readerOutline, searchOutline, listOutline } from 'ionicons/icons';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import SearchPage from './pages/SearchPage/SearchPage';
import RecipePage from './pages/RecipePage/RecipePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

/**
 * Placeholder search parameters to load a templated search page.
 * Cannot handle many cards as theirs current conflicts with ionic.
 * 
 * In this case, the search is conducting just a string search of "chicken pasta"
 * as if someone was normally typing this into a search bar.  Then the number variable
 * will determine the number of search results we want to receive and the offset represents where
 * in the API's database we want to draw from.
 */
const searchParams = {
    query: "",
    number: 50,
    offset: 20
}

const exploreParams = {

}

const recipeParams = {
    
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/explore">
            <ExplorePage exploreOptions={exploreParams}/>
          </Route>
          <Route exact path="/search">
            <SearchPage searchOptions={searchParams}/>
          </Route>
          <Route exact path="/recipe">
            <RecipePage recipeOptions={recipeParams}/>
          </Route>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="explore" href="/explore">
            <IonIcon icon={readerOutline} />
            <IonLabel>Explore</IonLabel>
          </IonTabButton>
          <IonTabButton tab="recipe" href="/recipe">
            <IonIcon icon={listOutline} />
            <IonLabel>Recipes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
