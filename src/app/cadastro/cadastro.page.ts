import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private usuario: Usuario = {};
  private loading: any;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private usuarioServ: UsuarioService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async cadastrar() {

    if (this.usuario.senha != this.usuario.confSenha) {
      this.presentToast("The passwords doesn't match!");
      return console.error("as senhas não são iguais")
    }

    try{
      const novoUser = await this.fireauth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)

      this.usuario.seguindo = [];
      this.usuario.uid = novoUser.user.uid;
      
      delete this.usuario.confSenha
      delete this.usuario.senha
      
      await this.usuarioServ.addUsuario(this.usuario);
      
      this.fireauth.onAuthStateChanged(user => {
        if (user) {
          user.updateProfile({
            displayName: this.usuario.username
          })
        }
      })

      this.router.navigate(['/tabs/tab1']);
    } catch(error) {
      // console.dir(error);
      console.log(error);
      
    } 
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'loading-css-custom',
      message: 'Por favor, aguarde...',
    });
    return this.loading.present(); 
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
