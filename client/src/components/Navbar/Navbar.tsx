import React, {useState} from 'react'
import { IonSearchbar } from '@ionic/react'
import './navbar.css'

/**
 * Interface to define the properties we will be using in our Navigation bar.
 */
interface NavbarProps {
    hasSearch: boolean
}

/**
 * Todo: load new page with routing
 */
const handleSubmit = (query: string) => {
    
}

/**
 * This will act as the blanket navbar for the website.  Currently there's two
 * types of navbars, one with a search bar and one without.  To load the navbar with
 * a search bar you must pass the type property when loading the component
 * 
 * <Navbar type='search' /> for a navbar with a search bar.
 * 
 * Currently is only configured for desktop web browsers.
 * 
 * @param {*} props the properties passed by react.
 * @returns the Navbar component of the website.
 */
const Navbar: React.FC<NavbarProps> = ( {hasSearch} ) => {
    const [query, setQuery] = useState('');


    // Return the component with the added search bar.
    if (hasSearch) {
        return (
            <>
                <div className='nav'>
                    <div className='navbar-search'>
                        <img src={process.env.PUBLIC_URL + '/assets/logo-white.png'} alt='cravings logo'/>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(query)
                        }}>

                        <IonSearchbar value={query} onIonChange={e => {
                            setQuery(e.detail.value!);
                            console.log(query);
                        }}>
                        </IonSearchbar>
                        
                        </form>
                        <div className='navbar-search-txt'>
                            <span className='search-login'>Login</span>
                            <span>Sign Up</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Return the component without the searchbar.
    return(
        <>
            <div className='nav'>
                <div className='navbar-nosearch'>
                    <div className='navbar-nosearch-invis'>
                        <span className='nosearch-login-invis'>Login</span>
                        <span>Sign Up</span>
                    </div>
                    <div className='navbar-img'>
                        <img src={process.env.PUBLIC_URL + '/assets/logo-white.png'} alt='cravings logo'/>
                    </div>
                    <div className='navbar-nosearch-txt'>
                        <span className='nosearch-login'>Login</span>
                        <span>Sign Up</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;