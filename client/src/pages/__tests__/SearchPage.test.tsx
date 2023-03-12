import { render } from '@testing-library/react';
import SearchPage from '../SearchPage/SearchPage';

test('Test SearchPageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<SearchPage searchOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});

test('Test handlesubmit function', () => {

});