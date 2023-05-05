import { IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { ReactElement } from "react";
import './ExploreCard.css';
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
				<IonCardSubtitle>{title}</IonCardSubtitle>
				<IonCardSubtitle>{duration}</IonCardSubtitle>
			</IonCardHeader>
		</IonCard>
	);
}
