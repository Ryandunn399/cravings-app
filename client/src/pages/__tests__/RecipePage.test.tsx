import { render } from '@testing-library/react';
import RecipePage from '../RecipePage/RecipePage';


test('Test RecipePageRender', () => {
	const testOptions = {
		query: "",
	}

	const { baseElement } = render(<RecipePage recipeOptions={testOptions}/>);
	expect(baseElement).toBeDefined();
});