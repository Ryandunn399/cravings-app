import React from 'react'
import Foodcard from '../../components/Foodcard/Foodcard'
import Navbar from '../../components/Navbar/Navbar'
import './searchpage.css'
import { SearchOptions, sendSearchCall } from '../../utilities/SearchUtilities'

/**
 * Basic interface for our searchbar properties.
 */
interface SearchbarProps {
    searchOptions: SearchOptions
}

/**
 * The search page component.  Will take the search options as the properties
 * and will render the JSON results obtained from making an API call.
 * 
 * @returns Searchpage component.
 */
const Searchpage: React.FC<SearchbarProps> = ({searchOptions}) => {

    const [meals, setMeals] = React.useState<any[]>([])

    // React hook to make API call.
    React.useEffect(() => {
        sendSearchCall(searchOptions)
            .then(data => setMeals(data.results));
    }, [])

    // Map out the results.
    const foodElements = meals.map(item => {
        return (
            <Foodcard 
                key={item.id}
                id={item.id}
                img={item.image}
                title={item.title}
            />
        )
    })

    return (
        <>
            <Navbar hasSearch={true} />
            <div className='search-elements'>
                {foodElements}
            </div>
        </>
    )
}

export default Searchpage