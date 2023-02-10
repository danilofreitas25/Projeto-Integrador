import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClinicaService } from 'src/servico/clinica.service';
import { Clinicas } from 'src/model/clinicas.model';
import { Clientes } from 'src/model/clientes.model';
import { FirebaseService } from 'src/servico/firebase.service';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {
  
  listaClinicas: Clinicas[] = [];
  listaClientes: Clientes[] = [];
  
  //requisicao
  @ViewChild(IonModal) modal: IonModal;

  message= 'Clique no botão acima para fazer a sua requisição.';
  message2= 'Clique no botão acima para acompanhar requição.';
  message3= 'Clique no botão acima e veja os meios de contato da medconfia.';
  name: string;
  assunto:string;
  clinica:string;
  email:string;



constructor(
  private ClinicaBase: ClinicaService,
  private ClientesBase: FirebaseService

){}

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
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
    this.ClientesBase.consultar().subscribe(results => this.listaClientes = results);

  }

}
