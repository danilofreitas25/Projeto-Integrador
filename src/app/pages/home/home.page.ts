import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonModal } from '@ionic/angular';
import { Clinicas } from 'src/model/clinicas.model';
import { Servicos } from 'src/model/servico.model';
import { AuthService } from 'src/servico/auth.service';
import { ClinicaService } from 'src/servico/clinica.service';
import { HistoricoService } from 'src/servico/historico.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listaClinicas: Clinicas[] = [];
 
  constructor(
    private ClinicaBase: ClinicaService,
    private AuthService: AuthService
    ) { }

  ngOnInit() {
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
  }

  async logout(){
    try{
      await this.AuthService.logoutUser();
    }catch(error){
      console.error(error);
    }
  }

}
