import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {
  //requisicao
  @ViewChild(IonModal) modal: IonModal;

  message= 'Clique no botão acima para fazer a sua requisição.';
  message2= 'Clique no botão acima para acompanhar requição.';
  message3= 'Clique no botão acima e veja os meios de contato da medconfia.';
  name: string;
  email:string;
  telefone:string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

//acompanhar requisicao
  presentingElement = null;

  
//meios de contato
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

}
