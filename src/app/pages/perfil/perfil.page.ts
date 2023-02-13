import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FirebaseService } from 'src/servico/firebase.service';
import { Clientes } from 'src/model/clientes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/servico/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isModalOpen = false;

  component = PerfilPage;

  presentingElement = null;

  listaClientes: Clientes[] = [];
 
  // public email:any;
  // public senha:any;
  // public nomecliente:any;
  // public cpf:any;
  // public rg:any;
  // public data:any;
  // public tipo: any;
  // public genero: any;
  // public endereco: any;
  // public alergias: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionSheetCtrl:ActionSheetController,
    private authentication: AuthService,
    private ClientesBase: FirebaseService,
    private router: Router
    ) { }

    ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.ClientesBase.consultar().subscribe( results => this.listaClientes = results);

    }

    // atualizar(){ 
    //   this.authentication.saveDetails({email:this.email, password:this.senha}).then(res=>{
    //     if(res.user.uid){
    //       let data = {
    //         email:this.email,
    //         senha: this.senha,
    //         nomecliente: this.nomecliente,
    //         cpf: this.cpf,   
    //         rg: this.rg,   
    //         data: this.data,   
    //         tipo: this.tipo,   
    //         genero: this.genero,   
    //         endereco: this.endereco,   
    //         alergias: this.alergias,
    //         uid:res.user.uid
    //       }
    //       this.authentication.saveDetails(data).then(res=>{
    //        alert('Conta Criada!');
    //       })
    //     }
    //   },err=>{
    //     alert("Preencha todos os dados");
    //   })
    // }






    canDismiss = async () => {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Tem certeza?',
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
  
      actionSheet.present();
  
      const { role } = await actionSheet.onWillDismiss();
  
      return role === 'confirm';
    };

}
