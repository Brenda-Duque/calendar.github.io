import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private usuario: Usuario = {};

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async login(usuario: Usuario) {
    try{
      await this.fireauth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
