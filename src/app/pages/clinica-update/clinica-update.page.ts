import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicaService } from 'src/servico/clinica.service';

@Component({
  selector: 'app-clinica-update',
  templateUrl: './clinica-update.page.html',
  styleUrls: ['./clinica-update.page.scss'],
})
export class ClinicaUpdatePage implements OnInit {

  image = "https://cdn-icons-png.flaticon.com/512/2222/2222671.png";
  routeId= null;
  clinicas: any = {};
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private clinica: ClinicaService,
    private router: Router    
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id'];

    if(this.routeId){

      this.clinica.consultaone(this.routeId).subscribe(caixa => {this.clinicas = caixa});
    }
  }
  
  update(form:any){
    this.clinica.editar(form.value, this.routeId);
    this.router.navigate(['/']);

  }

}
