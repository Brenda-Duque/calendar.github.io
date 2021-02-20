import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Evento } from 'src/app/Interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private usuarios = new Array<Usuario>();
  private usuariosSubs: Subscription
  private eventos = new Array<Evento>();
  private eventosSubs: Subscription;

  constructor(
    private usuarioServ: UsuarioService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router,
    private eventoServ: EventoService
  ) {
    this.showEvents();
  }

  async ngOnInit() {
    this.displayInfo();

  }

  async showEvents() {
    this.fireauth.onAuthStateChanged(user => {
      if (user) {
        this.eventosSubs = this.eventoServ.getEventos().subscribe(data => {
          this.eventos = data.filter(eve => eve.usuarioId == user.uid || eve.usersAdd.includes(user.displayName) == true)
        })
      }
    })
  }

  ngOnDestroy() {
  }

  async displayInfo() {
    const nomeUser = document.querySelector('.nome_user')

    this.fireauth.onAuthStateChanged(user => {
      if (user) {
        const htmlName = `<h1> @${user.displayName} </h1>`
        nomeUser.innerHTML = htmlName
      } else {
        nomeUser.innerHTML = ''
      }
    })
  }



  async deleteEvento(id: string) {
    try{
      await this.eventoServ.deleteEvento(id);
    } catch(error) {
      console.log(error);
    }

  }

}
