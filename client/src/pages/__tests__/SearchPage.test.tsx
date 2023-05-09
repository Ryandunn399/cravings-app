import { render } from '@testing-library/react';
import SearchPage from '../SearchPage/SearchPage';
import FoodCard from '../../components/FoodCard/FoodCard';
import FoodModal from '../../components/FoodModal/FoodModal';
import UserModal from '../../components/UserModal/UserModal';
import {IonButton} from '@ionic/react'

test('Test SearchPageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<SearchPage searchOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});

test('Test FoodCard Render', () => {

	const { baseElement } = render(<FoodCard                         
								key="1234"
                                id="123"
                                img="testimg"
                                title="test"/>);
	expect(baseElement).toBeDefined();
});

test('Test FoodModal Render', () => {
	render(<IonButton id="foodmodal123"/>)
	const { baseElement } = render(<FoodModal id="123" />);
	expect(baseElement).toBeDefined();
});

test('Test UserModal Render', () => {
	render(<IonButton id="trig"/>)
	const { baseElement } = render(<UserModal trigger="trig" />);
	expect(baseElement).toBeDefined();
});

