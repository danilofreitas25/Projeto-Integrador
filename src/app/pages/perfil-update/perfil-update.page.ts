import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/model/clientes.model';
import { FirebaseService } from 'src/servico/firebase.service';

@Component({
  selector: 'app-perfil-update',
  templateUrl: './perfil-update.page.html',
  styleUrls: ['./perfil-update.page.scss'],
})
export class PerfilUpdatePage implements OnInit {

  routeId = null;
  clientes: any = {};

   listaClientes: Clientes [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ClientesBase: FirebaseService
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id'];
    this.ClientesBase.consultaone(this.routeId).subscribe(results => {this.clientes = results});
    this.ClientesBase.consultar().subscribe(results => this.listaClientes = results);
  }

  update(form: any){
    try{
      this.ClientesBase.editar(this.routeId, form.value);
    }finally{
      alert("usuario atualizado")
    }
  }


}