import './foodcard.css'

/**
 * The food card properties interface. Right now we are passing
 * id, image, and title values to the component.
 */
interface FoodcardProps {
    id: number, 
    img: string,
    title: string
}

/**
 * This will be the food cards displayed to the user after a successful
 * search for recipes.
 * 
 * @returns food card component. 
 */
const Foodcard: React.FC<FoodcardProps> = ({id, img, title}) => {
    return (
        <>
            <div className='food-card'>
                <div className='food-card-img'> 
                    <img alt='food' src={`${img}`}></img>
                </div>
                <span>{title}</span>
            </div>
        </>
    )
}

export default Foodcard