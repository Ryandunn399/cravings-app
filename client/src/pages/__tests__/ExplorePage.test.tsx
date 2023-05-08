import { render } from '@testing-library/react';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import ExplorePage from '../ExplorePage/ExplorePage';

test('Test ExplorePageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<ExplorePage ExploreOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});
