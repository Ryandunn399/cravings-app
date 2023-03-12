import { IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel } from '@ionic/react';
import React, { ReactElement } from "react";

/**
 * The explore card properties interface. 
 */
export type ExploreCardProps = {
	image: string;
	url: string;
	title: string;
	title_url: string;
	duration: string;
	duration_url: string;
}

/**
 * Explore Card
 * @returns explore card component. 
 */
export default function ExploreCard({
	image,
	url,
	title,
	title_url,
	duration,
	duration_url
}: ExploreCardProps): ReactElement {
	return (
		<IonCard>
			<IonImg style={{
 					height: 'auto',
            		width: 'auto',
          	}} src={image}/>
			<IonCardHeader>
				<IonCardTitle>{title}</IonCardTitle>
				<IonCardSubtitle>{duration}</IonCardSubtitle>
			</IonCardHeader>
		</IonCard>
	);
}
