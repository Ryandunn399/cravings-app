import { render } from '@testing-library/react';
import ExplorePage from '../ExplorePage/ExplorePage';

test('Test ExplorePageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<ExplorePage ExploreOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});

test('Test handlesubmit function', () => {

});
