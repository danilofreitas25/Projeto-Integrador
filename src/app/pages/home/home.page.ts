import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
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

  constructor(
    private actionSheet: ActionSheetController,
    private Router: Router,
    private ClinicaBase: ClinicaService,
    private AgendarBase: HistoricoService



    ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
  }

  async agendar(clinicas: Servicos){
    const action = await this.actionSheet.create({
      header: 'Desejar agendar uma consulta?',
      buttons: [
        {
          text: 'Sim',
          role: 'confirm',
          
        },
        {
          text: 'Não',
          role: 'cancel',
      },
      ],
    });
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
