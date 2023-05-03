import React, { ReactElement } from "react";
import { IonItem, IonLabel } from '@ionic/react';

/**
 * RecipeItemProps
 * Currently blank
 */
export type RecipeItemProps = {
    id: string,
    name: string,
}

/**
 * Recipe Item
 * Component displayed on the recipe page
 */
export default function RecipeItem({
    id,
    name
}: RecipeItemProps): ReactElement {
	return (
		<IonItem button>
            <IonLabel class="ion-text-wrap">
            {name}
            </IonLabel>
		</IonItem>
	);
}