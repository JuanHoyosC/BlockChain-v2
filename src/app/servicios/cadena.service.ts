import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class CadenaService {

  bloqueLista: AngularFireList<any>;
  
  constructor(private firebase: AngularFireDatabase) {

  }

  getCadena() {
    return this.bloqueLista = this.firebase.list('bloques');
  }
 
  insertCadena(index, timeStamp, datos, hashAnterior, hash ) {
    this.bloqueLista.push({
      index : index,
      timeStamp : timeStamp,
      datos : datos,
      hashAnterior : hashAnterior,
      hash : hash
    });
  }
}

