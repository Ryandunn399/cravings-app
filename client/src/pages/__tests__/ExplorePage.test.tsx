import { render } from '@testing-library/react';
import ExplorePage from '../ExplorePage/ExplorePage';
import UserModal from '../../components/UserModal/UserModal';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import ExploreModal from '../../components/ExploreModal/ExploreModal';
import {IonButton} from '@ionic/react'

test('Test ExplorePageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<ExplorePage exploreOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});

test('Test UserModal Render', () => {
	render(<IonButton id="trig"/>)
	const { baseElement } = render(<UserModal trigger="trig" />);
	expect(baseElement).toBeDefined();
});

test('Test ExploreModal Render', () => {
	render(<IonButton id="123"/>)
	const testInst = [
		"ins1",
		"ins2",
		"ins3"
	]
	const testIng = [
		"ing1",
		"ing2",
		"ing3"
	]
	const { baseElement } = render(<ExploreModal key="testKey" id="123"
											title="test title"
											img="test IMG URL"
											description="test description"
											instructions={testInst} 
											ingredients={testIng} 
											readyIn="5 mins"
											servings="1 person" />);
	expect(baseElement).toBeDefined();
});

test('Test ExploreCard Render', () => {
	const { baseElement } = render(<ExploreCard key="key" id="123" 
									title="title" image="img" description="desc..." />);
	expect(baseElement).toBeDefined();
});
