import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dias } from 'src/model/dias.model';
import { ClinicaService } from 'src/servico/clinica.service';
import { DiasService } from 'src/servico/dias.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clinica-update',
  templateUrl: './clinica-update.page.html',
  styleUrls: ['./clinica-update.page.scss'],
})
export class ClinicaUpdatePage implements OnInit {

  image = "https://cdn-icons-png.flaticon.com/512/2222/2222671.png";
  routeId= null;
  clinicas: any = {};
  listaDias: Dias[] =[];
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private ClinicaBase: ClinicaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id'];

    if(this.routeId){
      this.ClinicaBase.consultaone(this.routeId).subscribe(results => {this.clinicas = results});
    }
  }
  
  update(form:any){
    try{
    this.ClinicaBase.editar(this.routeId, form.value, ); 
    }finally{
      Swal.fire({
        title: 'Pronto!',
        text:   "Clínica atualizada",
        icon: 'success',
        heightAuto: false
    })
    this.router.navigate(['clinica']);
    }
  }
}
