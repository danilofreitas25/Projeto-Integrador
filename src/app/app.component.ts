import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Perfil', url: '/perfil', icon: 'paper-plane' },
    { title: 'Suporte', url: '/suporte', icon: 'heart' },
    { title: 'Logout', url: ' ', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
