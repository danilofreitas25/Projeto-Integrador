import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isModalOpen = false;
  teste: any;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

    const teste = undefined;
    
  }
  constructor(
    private actionSheetCtrl:ActionSheetController
    ) { }

    ngOnInit() {
    this.teste=document.querySelector('ion-page');
   
    }
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
