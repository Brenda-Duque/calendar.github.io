import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async logout() {
    try {
      await this.fireauth.signOut();
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);

    }
  }
}
