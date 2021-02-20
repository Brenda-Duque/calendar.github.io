import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/Interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private eventos = new Array<Evento>();
  private eventosSubs: Subscription;
  private eventoId: string = null;
  public filtro: string;

  constructor(
    private firestore: AngularFirestore,
    private eventoServ: EventoService
  ) {
    
       this.eventosSubs = this.eventoServ.getEventos().subscribe(data => {
      this.eventos = data;
    })
   
   
  }

  async ngOnInit() {
   
   }

  ngOnDestroy() {
    this.eventosSubs.unsubscribe();
  }

  filterCity() {
    this.eventosSubs = this.eventoServ.getEventos().subscribe(data => {
      this.eventos = data.filter(eve => eve.cidade == this.filtro)
    })
    console.log(" a" + this.filtro);
    
  }
  

  // async filterList(evt) {
  //   this.eventos = await this.inicializaItens();
  //   this.pesquisa = evt.srcElement.value;

  //   this.eventos = this.eventos.filter(evento => {
  //     if (evento.titulo && this.pesquisa) {
  //       return (evento.titulo.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1)
  //     }
  //   })
  // }

  
}
