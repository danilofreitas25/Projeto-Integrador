import { Component, OnInit } from '@angular/core';
import { Clinicas } from 'src/model/clinicas.model';
import { Especialidade } from 'src/model/especialidades.model';
import { ClinicaService } from 'src/servico/clinica.service';
import { EspecialidadesService } from 'src/servico/especialidades.service';
import { HistoricoService } from 'src/servico/historico.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  public nomecliente:any;
  public cpf:any;
  public data:any;
  public horario: any;
  public genero: any;
  public nomeclinica: any;
  public especialidade: any;

  presentingElement: any;
  listaClinicas: Clinicas[] = [];
  listaEspecialidades: Especialidade[] = [];

  constructor(
    private ClinicaBase: ClinicaService,
    private Especialidades: EspecialidadesService,
    private Historico: HistoricoService
  ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.ClinicaBase.consultar().subscribe(results => this.listaClinicas = results);
    this.Especialidades.consultar().subscribe(results => this.listaEspecialidades = results);
  }

  agendamento(){
    try{this.Historico.agendar({nomecliente: this.nomecliente, cpf: this.cpf, horario: this.horario, data: this.data, genero: this.genero, nomeclinica: this.nomeclinica, especialidade: this.especialidade}).then(res => {
      if(res.collection.toString){
      let agendamentos = {
        nomecliente: this.nomecliente,
        cpf: this.cpf,
        data: this.data,
        horario: this.horario,
        genero: this.genero,
        nomeclinica: this.nomeclinica,
        especialidade: this.especialidade,
      }
      alert('Agendamento Feito');
    }})
    }catch{
      alert('Preencha todos os campos');
    }
  }
}
