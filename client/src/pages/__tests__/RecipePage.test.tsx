import { render } from '@testing-library/react';
import RecipePage from '../RecipePage/RecipePage';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import FoodModal from '../../components/FoodModal/FoodModal';
import UserModal from '../../components/UserModal/UserModal';
import {IonButton} from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'

test('Test RecipePageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<RecipePage recipeOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});

test('Test RecipeItem Render', () => {
	const { baseElement } = render(<RecipeItem 
                    key="123"
                    id="123"
                    name="testName"
                />);
	expect(baseElement).toBeDefined();
});

test('Test FoodModal Render', () => {
	render(<IonButton id="foodmodal123"/>)
	const { baseElement } = render(<FoodModal id="123" />);
	expect(baseElement).toBeDefined();
});

test('Test RecipeModal Render', () => {
	const testIng = [
		"ing1",
		"ing2",
		"ing3"
		]
	const testInst = "instructions!"
	render(<IonButton id="123"/>)
	const { baseElement } = render(<RecipeModal key="123" id="123" name="testname" comments="testcomment" ingredients={testIng} instructions={testInst} />);
	expect(baseElement).toBeDefined();
});


test('Test UserModal Render', () => {
	render(<IonButton id="trig"/>)
	const { baseElement } = render(<UserModal trigger="trig" />);
	expect(baseElement).toBeDefined();
});
