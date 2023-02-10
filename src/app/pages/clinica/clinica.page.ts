import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClinicaService } from 'src/servico/clinica.service';
import { HomePageModule } from '../home/home.module';
import { Clinicas } from 'src/model/clinicas.model';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.page.html',
  styleUrls: ['./clinica.page.scss'],
})
export class ClinicaPage implements OnInit {

  listaClinicas: Clinicas [] = [];

  component = ClinicaPage;

  canDismiss = false;

  presentingElement = null;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
  }

  constructor(
    private alertCtrl: AlertController,
    private ClinicaBase: ClinicaService
  ){}

  async alertando(){
    const alert = this.alertCtrl.create({
    mode:'ios',
    header: 'Cadastro',
    inputs:[
      {
        name: 'nomeclinica',
        type: 'text',
        placeholder: 'Nome da Clínica'
      },
      {
        name:'cnpj',
        type: 'number',
        placeholder: 'CNPJ'
      },
      {
        name: 'endereco',
        type: 'text',
        placeholder: 'Endereço'
      },
      {
        name: 'bairro',
        type: 'text',
        placeholder: 'Bairro'
      },
      {
        name: 'rua',
        type: 'text',
        placeholder: 'rua'
      },

      {
        name: 'horario',
        type: 'text',
        placeholder: 'Funcionamento'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        
      },
      {
        text: 'Cadastrar',
        handler: (form) => {
          let clinica = {
            nomeclinica: form.nomeclinica,
            cpnj: form.cnpj,
            endereco: form.endereco,
            horario: form.horario,
            bairro: form.bairro,
            rua: form.rua
          };
          try{
            this.ClinicaBase.cadastrar(clinica);

          }catch(err){
            console.log(err)
          }finally{

          }
        }
      }
    ]
  });
  (await alert).present();

}
}
