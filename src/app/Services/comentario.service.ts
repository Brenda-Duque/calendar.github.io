import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Comentario } from '../interfaces/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private comentariosCollection: AngularFirestoreCollection<Comentario>;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.comentariosCollection = this.firestore.collection<Comentario>('Comentários');
   }

   getComentarios() {
    return this.comentariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data}
        })
      })
    )
  }

  getComentario(id: string) {
    return this.comentariosCollection.doc<Comentario>(id).valueChanges();
  }

  addComentario(comentario: Comentario) {
    return this.comentariosCollection.add(comentario);
  }
  
  updateComentario(id: string, comentario: Comentario) {
    return this.comentariosCollection.doc<Comentario>(id).update(comentario);
  }

  deleteComentario(id: string) {
    return this.comentariosCollection.doc(id).delete();
  }
}
