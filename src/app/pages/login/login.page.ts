import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  //Método do alertando 
async alertando(){
  const alert = this.alertCtrl.create({
    mode:'ios',
    header: 'Cadastro',
    inputs:[
      {
        name: 'nome',
        type: 'text',
        placeholder: 'Nome'
      },
      {
        name:'cpf',
        type: 'number',
        placeholder: 'CPF'
      },
      {
        name: 'rg',
        type: 'number',
        placeholder: 'RG (Opcional)*'
      },
      {
        name: 'data',
        type: 'text',
        placeholder: 'Data de Nascimento'
      },
      {
        name: 'tipo',
        type: 'text',
        placeholder: 'Tipo Sanguineo'
      },
      {
        name: 'genero',
        type: 'text',
        placeholder: 'Gênero'
      },
      {
        name: 'endereco',
        type: 'text',
        placeholder: 'Endereço'
      },
      {
        name: 'alergias',
        type: 'text',
        placeholder: 'Alergias (Opcional)*'
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      },
      {
        name: 'senha',
        type: 'password',
        placeholder: 'Senha'
      }
    ],
    buttons: [

      //Botão de cancelar
      {
        text: 'Cancelar',
        role: 'cancel'
      },

      //Botão de cadastrar
      {
        text: 'Cadastrar',
        handler: (form) => {
          //Objeto que irá forma nosso item da lista
          let user = {
            nome: form.nome,   
            senha: form.senha
          };
          try{
            // this.DataBase.postUser(user);
          }catch(err){
            console.log(err)
          }finally{
            // this.utilidades.toastando("Usuario Cadastrado", "top", 2000,"success");                           
          } 
        }
      }
    ]
  });

  (await alert).present();
}
}
