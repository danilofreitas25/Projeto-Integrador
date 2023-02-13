import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dias } from 'src/model/dias.model';
import { Horario } from 'src/model/horarios.model';
import { ClinicaService } from 'src/servico/clinica.service';
import { DiasService } from 'src/servico/dias.service';
import { HorariosService } from 'src/servico/horarios.service';

@Component({
  selector: 'app-cadastro-clinica',
  templateUrl: './cadastro-clinica.page.html',
  styleUrls: ['./cadastro-clinica.page.scss'],
})
export class CadastroClinicaPage implements OnInit {

  public nomeclinica:any;
  public CNPJ: any;
  public endereco: any;
  public bairro: any;
  public dia: any;
  public hora: any;

  presentingElement: any;
  listaDias: Dias[] = [];
  listaHorarios: Horario[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private Dias: DiasService,
    private Horarios: HorariosService,
    private ClinicaBase: ClinicaService,   
  ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.Dias.consultar().subscribe(results => this.listaDias = results);
    this.Horarios.consultar().subscribe(results => this.listaHorarios = results);
  }

  cadastrar(){
    try{this.ClinicaBase.cadastrar({nomeclinica: this.nomeclinica, cnpj: this.CNPJ, endereco: this.endereco, bairro: this.bairro, dia: this.dia, horario: this.hora}).then(res => {
      if(res.collection.toString){
      let clinica = {
        nomeclinica: this.nomeclinica,
        cnpj: this.CNPJ,
        endereco: this.endereco,
        bairro: this.bairro,
        dia: this.dia,
        hora: this.hora,
      }
      alert('Cadastro Feito');
    }})
    }catch{
      alert('Preencha todos os campos');
    }
  }

}
