import React, { useRef } from 'react';
import './UserModal.css';
import {   IonList,
  IonAvatar,
  IonAccordionGroup,
  IonAccordion,
  IonTitle, IonHeader, IonButtons, IonButton, IonModal, IonContent, IonToolbar, IonLabel, IonItem } from '@ionic/react';

/**
 * The UserModalProps interface. 
 * Only takes a string which is the trigger name
 */
interface UserModalProps {
  trigger: string;
}

/**
 * This will be the modal displayed to the user.
 * 
 * @returns user modal component. 
 */
const UserModal: React.FC<UserModalProps> = (UserModalProps) => {
    const userModal = useRef<HTMLIonModalElement>(null);

    function confirm() {
        userModal.current?.dismiss('confirm');
    }

    return (
        <IonModal ref={userModal} trigger={UserModalProps.trigger}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Account</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Done
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList inset={true}> 
              <IonItem lines="inset" color="light">
                <IonAvatar slot="start">
                  <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>
                  <h3>John Smith</h3>
                  <p>johnsmith@gmail.com</p>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonList inset={true}>
                <IonAccordionGroup>
                      <IonAccordion value="first">
                        <IonItem slot="header" color="light">
                          <IonLabel>Favorites</IonLabel>
                        </IonItem>
                        <IonItem slot="content" color="light">
                          Recipe 1
                        </IonItem>
                        <IonItem slot="content" color="light">
                          Recipe 2
                        </IonItem>
                        <IonItem slot="content" color="light">
                          Recipe 3
                        </IonItem>
                      </IonAccordion>
                </IonAccordionGroup>
            </IonList>
          </IonContent>
        </IonModal>

    )
}

export default UserModal