import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario'

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.page.scss'],
})
export class NovaSenhaPage implements OnInit {
  public usuario: Usuario = {};

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async atualizarSenha() {

    if (this.usuario.senha != this.usuario.confSenha) {
      console.error("as senhas não são iguais");
    }

    try {
      (await this.afAuth.currentUser).updatePassword(this.usuario.senha);

      this.router.navigate(['/configuracoes'])
    } catch (error) {
      console.log(error);
      
    } 
  }
}
