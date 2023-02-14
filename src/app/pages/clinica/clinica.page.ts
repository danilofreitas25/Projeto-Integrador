import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClinicaService } from 'src/servico/clinica.service';
import { Clinicas } from 'src/model/clinicas.model';
import Swal from 'sweetalert2';

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
  roleMessage: string;

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
        placeholder: 'Clínica'
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
        name: 'horario',
        type: 'time',
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
            bairro: form.bairro
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



async deletar(id: string) {
    const alerte = this.alertCtrl.create({
      mode: 'md',
      header: 'Deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        },
        {
          text: 'Confirmar',
          handler: ()  =>{
            try{
              this.ClinicaBase.deletar(id);              
            }finally{
              Swal.fire({
                title: 'Excluído!',
                text:   "Clinica Excluída",
                icon: 'error',
                heightAuto: false
              });
            }
          },
        }
      ]
});
(await alerte).present();
}


}
