import { IonLabel, IonButton, IonContent, IonPopover, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { ReactElement } from "react";
import './ExploreCard.css';
/**
 * The explore card properties interface. 
 */
export type ExploreCardProps = {
	image: string;
	title: string;
	description: string;
	id: string
}

/**
 * Explore Card
 * @returns explore card component. 
 */
export default function ExploreCard({
	image,
	title,
	description, 
	id
}: ExploreCardProps): ReactElement {
	return (
		<div>
		<IonCard >
			<IonImg  src={image}  />
		</IonCard>
		</div>
	);
}
