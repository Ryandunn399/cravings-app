import WhiteLogo from '../../assets/logo-white.png'
import './navbar.css'

/**
 * This will act as the blanket navbar for the website.  Currently there's two
 * types of navbars, one with a search bar and one without.  To load the navbar with
 * a search bar you must pass the type property when loading the component
 * 
 * <Navbar type='search' /> for a navbar with a search bar.
 * 
 * @param {*} props the properties passed by react.
 * @returns the Navbar component of the website.
 */
function Navbar(props) {
    // Load the navbar with search bar, otherwise load the navbar without the search box
    if (props.type === 'search') {

        return (
            <div className='navbar'>
                <div className='navbar-search'>
                    
                </div>
            </div>
        )

    } else {
        
        return (
            <div className='nav'>
                <div className='navbar-nosearch'>
                    <div className='navbar-nosearch-invis'>
                        <a className='nosearch-login-invis'>Login</a>
                        <a>Sign Up</a>
                    </div>
                    <div className='navbar-nosearch-img'>
                        <img src={`${WhiteLogo}`} />
                    </div>
                    <div className='navbar-nosearch-txt'>
                        <a className='nosearch-login'>Login</a>
                        <a>Sign Up</a>
                    </div>
                </div>
            </div>
        )

    }
}

export default Navbar