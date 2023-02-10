import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/servico/auth.service';
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

  //tipar os dados do form
  form: FormGroup

  constructor(
    private alertCtrl: AlertController,
    private FireBase: FirebaseService,
    private authencation: AuthService,

    //ferramenta validação do formulário

    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    //executa o metodo na inicialização da page log
    this.validaForm();
    this.authencation.getAuth().user.subscribe(results => {
      localStorage.setItem('userId', results.uid );
    });
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
          name: 'nomecliente',
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
              nomecliente: form.nomecliente,   
              cpf: form.cpf,   
              rg: form.rg,   
              data: form.data,   
              tipo: form.tipo,   
              genero: form.genero,   
              endereco: form.endereco,   
              alergias: form.alergias,   
              email: form.email,   
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


  //Método de criação e validacao form
  validaForm(){
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    })
}

formulario(){ 
try{

      console.log(this.form.value)

      this.authencation.loginUser(this.form.value);
      /* console.log(localStorage.getItem('email'))
      console.log(localStorage.getItem('userId')) */
}catch{
    console.log('Operação Desconhecida!');
  }
}




// // metodo chamado pelo botao submit do form
//   formulario(){
//     if(this.nameButton == 'Logar'){
//       this.authencation.loginUser(this.form.value);
//     }else if(this.nameButton == 'Registrar'){
//       this.authencation.createUser(this.form.value);
//     }else{
//       console.log("cancel");
//     }
//   }

}
