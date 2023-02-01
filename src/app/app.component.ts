import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/pages/home', icon: 'mail' },
    { title: 'Perfil', url: '/pages/perfil', icon: 'paper-plane' },
    { title: 'Suporte', url: '/oages/suporte', icon: 'heart' },
    { title: 'Logout', url: '/folder/Archived', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
