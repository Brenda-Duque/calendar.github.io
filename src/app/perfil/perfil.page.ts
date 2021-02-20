import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators'
import { Evento } from 'src/app/Interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private usuario: Usuario = {};
  private usuarioId: string;
  private usuarioSubs: Subscription;
  public listaUsuarios: any;
  private eventos = new Array<Evento>();
  private eventosSubs: Subscription;
  private eventoId: string = null;

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private usuarioServ: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private eventoServ: EventoService
  ) { 
    this.eventosSubs = this.eventoServ.getEventos().subscribe(data => {
      this.eventos = data
       .filter(eve => eve.usuarioNome === this.usuario.username || eve.usersAdd.includes(this.usuario.username) === true)
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);
    })
  }

  ngOnDestroy(){
    this.eventosSubs.unsubscribe();
  }
  inicializar(id: string) {
    this.usuarioId = id;
    
    if (this.usuarioId) this.loadUsuario();

  }

  loadUsuario() {
    this.usuarioSubs = this.usuarioServ.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    })
  }



}
