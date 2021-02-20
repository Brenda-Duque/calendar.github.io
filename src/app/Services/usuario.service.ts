import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(
    private firestore: AngularFirestore
  ) { 
    this.usuariosCollection = this.firestore.collection<Usuario>('Usuários');
  }

  getUsuarios() {
    return this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data}
        })
      })
    )
  }

  getUsuario(id: string){
    return this.usuariosCollection.doc<Usuario>(id).valueChanges();
  }

  addUsuario(usuario: Usuario) {
    return this.usuariosCollection.add(usuario);
  }

  updateUsuario(id: string, usuario: Usuario) {
    return this.usuariosCollection.doc<Usuario>(id).update(usuario);
  }

  deleteUsuario(id: string) {
    return this.usuariosCollection.doc(id).delete();
  }

}
