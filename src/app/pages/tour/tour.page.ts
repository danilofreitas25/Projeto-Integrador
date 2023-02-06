import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FirebaseService } from 'src/servico/firebase.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  constructor(
    private alertCtrl: AlertController,
    private FireBase: FirebaseService
  ) { }

  ngOnInit() {
  }

slideOpts = {
  initialSlide: 0,
  speed: 400
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
            let cliente = {
              nome: form.nome,   
              senha: form.senha
            };
            try{
              this.FireBase.cadastrar(cliente);
              
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
