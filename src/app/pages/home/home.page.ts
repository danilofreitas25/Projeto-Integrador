import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Clinicas } from 'src/model/clinicas.model';
import { Servicos } from 'src/model/servico.model';
import { ClinicaService } from 'src/servico/clinica.service';
import { HistoricoService } from 'src/servico/historico.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  presentingElement = undefined;

  listaClinicas: Clinicas[] = [];
  consulta: any

  constructor(
    private actionSheet: ActionSheetController,
    private Router: Router,
    private ClinicaBase: ClinicaService,
    private Agendar: HistoricoService,
    private alertCtrl: AlertController,
    
    



    ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
  }

   agendamento = async (consulta: Servicos) => {
    const actionSheet = await this.actionSheet.create({
      header: 'Desejar agendar uma consulta?',
      buttons: [
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            const alert = this.alertCtrl.create({
              header: 'Escolha a especialidade',
              inputs: [
                {
                  label: 'Alergista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'alergista',
                  },
                {
                  label: 'Cardiologista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'cardiologista',
                  },
                {
                  label: 'Clínico Geral',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'clinico',
                  },
                {
                  label: 'Dermotologista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'dermatologista',
                  },
                {
                  label: 'Ginecologista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'ginecologista',
                  },
                {
                  label: 'Nutricionista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'nutricionista',
                  },
                {
                  label: 'Oftalmologista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'oftalmologista',
                  },
                {
                  label: 'Ortopedista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'ortopedista',
                  },
                {
                  label: 'Psicologo',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'psicologo',
                  },
                {
                  label: 'Urologista',
                  type: 'radio',
                  name: 'especialidade',
                  value: 'urologista',
                  },
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel'
                  },
                  {
                    text: 'Agendar',
                    handler: (form) => {
                      let agendamento = {
                        especialidade: form.especialidade,
                        
                      };
                      try{
                        this.Agendar.agendar(agendamento);
                        console.log('oi')
                      }catch(err){
                        console.log(err)
                      }
                    }
                  }

                ]

            });
            (await alert).present();
          }
        },
        {
          text: 'Não',
          role: 'cancel',
      },
      ],
    });
    
    actionSheet.present();
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheet.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

   return role === 'confirm';
  };


  

}
