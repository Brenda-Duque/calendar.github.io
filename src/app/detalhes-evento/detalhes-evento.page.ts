import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/Interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
import { Comentario } from 'src/app/Interfaces/comentario';
import { ComentarioService } from 'src/app/Services/comentario.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.page.html',
  styleUrls: ['./detalhes-evento.page.scss'],
})
export class DetalhesEventoPage implements OnInit {
  private evento: Evento = {};
  private eventoId: string = null;
  private eventoSubs: Subscription;
  private comentario: Comentario = {};
  private comentarios = new Array<Comentario>(); 
  private comentarioSubs: Subscription;
 
  constructor(
    private fireauth: AngularFireAuth,
    private eventoServ: EventoService,
    private comentarioServ: ComentarioService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.comentarioSubs = this.comentarioServ.getComentarios().subscribe(data => {
      this.comentarios = data.filter(com => com.idPost === this.eventoId).sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);
    })
  }

  ngOnDestroy() {
    if(this.eventoSubs) this.eventoSubs.unsubscribe();
  }

  inicializar(id: string) {
    this.eventoId = id;
    if(this.eventoId) this.loadEvento();
  }

  loadEvento() {
    this.eventoSubs = this.eventoServ.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    })
  }
  
  async add() {
    const userVerif = (await this.fireauth.currentUser).displayName
  
    try{
      if (this.evento.usersAdd.includes(userVerif) === false) {
        this.evento.numAdd ++;
        this.evento.usersAdd.push(userVerif);

        await this.eventoServ.updateEvento(this.eventoId, this.evento)
      } else if(this.evento.usersAdd.includes(userVerif) === true) {
        this.evento.numAdd --;
        
        const index = this.evento.usersAdd.indexOf(userVerif);
        this.evento.usersAdd.splice(index, 1);

        await this.eventoServ.updateEvento(this.eventoId, this.evento);
      }
    } catch(error) {
      console.log(error);
    }
  }

  async coment() {
    try{
      this.comentario.createdAt = new Date().getTime();
      this.comentario.username = (await this.fireauth.currentUser).displayName
      this.comentario.idPost = this.eventoId;

      await this.comentarioServ.addComentario(this.comentario)
    } catch(error) {
      console.log(error);
      
    }
  }

}
