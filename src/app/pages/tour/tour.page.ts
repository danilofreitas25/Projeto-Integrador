import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  public email:any;
  public password:any;


  cancel() {
    this.modal.dismiss(null, 'cancel');
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
    public router: Router,
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


  //Método de criação e validacao form
  validaForm(){
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    })
}


login(){
  this.authencation.loginUser({email:this.email,password:this.password})
  .then(res=>{
    console.log(res);
    if(res.user.uid){
      this.authencation.getDetails({uid:res.user.uid}).subscribe(res=>{
        this.modal.dismiss();
        this.router.navigateByUrl('home');
      });
    }
  },err=>{
    alert("Email ou Senha Inválidos")
  })
}

cadastrar(){
  this.router.navigateByUrl('cadastrar');
}



}
