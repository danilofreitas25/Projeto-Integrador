import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClinicaService } from 'src/servico/clinica.service';
import { Clinicas } from 'src/model/clinicas.model';
import { Clientes } from 'src/model/clientes.model';
import { FirebaseService } from 'src/servico/firebase.service';
import { ResquisicaoService } from 'src/servico/resquisicao.service';
import { Requisacao } from 'src/model/requisicao.model';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {

  public nomecliente: any;
  public email: any;
  public nomeclinica: any;
  public assunto: any;
  
  listaClinicas: Clinicas[] = [];
  listaClientes: Clientes[] = [];
  listaRequisicoes: Requisacao[] = [];
  
  //requisicao
  @ViewChild(IonModal) modal: IonModal;

  message= 'Clique no botão acima para fazer a sua requisição.';
  message2= 'Clique no botão acima para acompanhar requição.';
  message3= 'Clique no botão acima e veja os meios de contato da medconfia.';




constructor(
  private ClinicaBase: ClinicaService,
  private Requisicao: ResquisicaoService,
  private router: Router,

){}

  cancel() {
    this.nomecliente = ""
    this.email = ""
    this.nomeclinica = ""
    this.assunto = ""
    this.modal.dismiss(null, 'cancel');
  }
  

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  // this.modal.dismiss();
  // this.email = ""
  // this.password = ""
  // 



  requisicao(){
    try{this.Requisicao.cadastrar({nomecliente: this.nomecliente, email: this.email, nomeclinica: this.nomeclinica, assunto: this.assunto}).then(res => {
      if(res.collection.toString){
      let requisicoes = {
        nomecliente: this.nomecliente,
        email: this.email,
        nomeclinica: this.nomeclinica,
        assunto: this.assunto,
      }
      Swal.fire({
        title: 'Pronto!',
        text:   "Requisição feita",
        icon: 'success',
        heightAuto: false
      });
    }})
    }catch{
      Swal.fire({
        title: 'Atenção!',
        text:   "Preencha todos os campos",
        icon: 'info',
        heightAuto: false
      });
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
    this.Requisicao.consultar().subscribe(results => this.listaRequisicoes = results);
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);

  }

}
