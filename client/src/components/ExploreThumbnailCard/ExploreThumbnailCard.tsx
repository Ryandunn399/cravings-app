import { IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { ReactElement } from "react";

/**
 * The Explore Thumbnail Card properties interface. 
 */
export type ExploreThumbnailCardProps = {
	title: string,
	image: string,
	description: string
}

/**
 * Explore Thumbnail Card
 * @returns explore card component. 
 */
export default function ExploreThumbnailCard({
	title,
	image,
	description
}: ExploreThumbnailCardProps): ReactElement {
	return (
		<IonCard>
			<IonImg style={{
 					height: 'auto',
            		width: 'auto',
          	}} src={image}/>
			<IonCardHeader>
				<IonCardTitle>{title}</IonCardTitle>
				<IonCardSubtitle>{description}</IonCardSubtitle>
			</IonCardHeader>
		</IonCard>
	);
}
