import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Clinicas } from 'src/model/clinicas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  presentingElement = undefined;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

   return role === 'confirm';
  };

  // async actionMetod(item: Clinicas){
  //   const action = this.actionSheetCtrl.create({
  //     mode: 'ios',
  //     header: 'Selecione um Opção:',
  //     buttons: [
  //       {
  //         text: "Marcar consulta",
  //         handler: () => {
  //           this.router.navigate(['/receita', item.id]);
  //         },
          
  //       },
  //       {
  //         text: item.status ? 'Desmarcar receita' : 'Marcar receita',
  //         icon: item.status ? 'radio-button-off' : 'checkmark-circle',

  //         handler: () => {
  //           item.status = !item.status;
  //           this.DataBase.statusItem(item);
  //         }
  //       },        
  //       {
  //         text: "Cancelar",
  //         handler: () => {
  //           this.utilidades.toastando('Bolo cancelado', "middle", 2000, "secondary");
  //         }
  //       }
  //     ]
  //   }); (await action).present();
  // }
  

}
