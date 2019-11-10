import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Votantes } from '../models/votantes';

@Injectable({
  providedIn: 'root'
})

export class VotantesService {

  votantesList: AngularFireList<any>;
  selectVotante: Votantes = new Votantes();

  constructor(private firebase: AngularFireDatabase) {

  }

  getVotantes() {
    return this.votantesList = this.firebase.list('votantes');
  }

  insertVotante(votante: Votantes, ID) {
    this.votantesList.push({
      nombre: votante.nombre,
      apellido: votante.apellido,
      identificador : votante.identificador,
      candidato: ID
    });
  }
}
