import { Component, ViewChild, OnInit, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { Evento } from 'src/app/interfaces/evento';
import {EventoService} from 'src/app/Services/evento.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;
  currentMonth: string;
  currentDate = new Date();
  minDate = new Date().toISOString();
  showAddEvent: boolean;
  private evento: Evento = {};
  private eventoId: string = null;
  private eventoSubs: Subscription;
  private usuarioId: string;

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private eventoServ: EventoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventoId = this.activatedRoute.snapshot.params['id'];

    if(this.eventoId) this.loadEvento();
  }

  ngOnInit() {}

  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }

  loadEvento() {
    this.eventoSubs = this.eventoServ.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    })
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.evento = {
      titulo: '',
      descricao: '',
      comeco: new Date().toISOString(),
      fim: new Date().toISOString()
    };
  }

  async addEvento() {
    this.evento.titulo = this.evento.titulo;
    this.evento.descricao = this.evento.descricao;
    this.evento.comeco = this.evento.comeco;
    this.evento.fim = this.evento.fim;
    this.evento.usersAdd = [];
    this.evento.numAdd = 0;
    this.evento.usuarioId = (await this.fireauth.currentUser).uid
    this.evento.usuarioNome = (await this.fireauth.currentUser).displayName
    this.evento.createdAt = new Date().getTime();
    try {
      await this.eventoServ.addEvento(this.evento);
    } catch(error) {
      console.log(error);
    } finally {
      this.showHideForm();
    }
  }
}
