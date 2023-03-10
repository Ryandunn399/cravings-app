import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home'
import Searchpage from './pages/Searchpage/Searchpage';

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
    query: "chicken pasta",
    number: 30,
    offset: 20
}

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/search">
                    <Searchpage searchOptions={searchParams} />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
