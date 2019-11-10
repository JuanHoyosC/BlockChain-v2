import { Component, OnInit } from '@angular/core';
//HASH
import * as SHA256 from 'crypto-js/sha256';
//Servicios
import { VotantesService } from '../servicios/votantes.service';
import { Votantes } from '../models/votantes';
import { CadenaService } from '../servicios/cadena.service';

@Component({
  selector: 'app-ver-estadisticas',
  templateUrl: './ver-estadisticas.component.html',
  styleUrls: ['./ver-estadisticas.component.scss']
})
export class VerEstadisticasComponent implements OnInit {
  //Variables globales
  bloquesList;
  votosList: Votantes[];
  candidato1 = 0;
  candidato2 = 0;
  candidato3 = 0;
  fraude = false;
  mostrar = true;

  //Constructor
  constructor(public votantesService: VotantesService, public bloquesService: CadenaService) {
  }

  ngOnInit() {

    //Obtiene la info de los votantes
    this.votantesService.getVotantes().snapshotChanges().subscribe(item => {
      this.votosList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.votosList.push(x as Votantes);
      })
      this.calcular();
    });

    //Obtiene la info de los bloques
    this.bloquesService.getCadena().snapshotChanges().subscribe(item => {
      this.bloquesList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.bloquesList.push(x);
      })

      //Activa el mensaje de advertencia
      if (!this.validar()) {
        this.fraude = true;
        this.mostrar = false;
      } else {
        this.fraude = false;
        this.mostrar = true;
      }
    });

  }

  //Calcula quien va ganando o los votos de cada votacion
  calcular() {
    this.candidato1 = 0;
    this.candidato2 = 0;
    for (let i = 0; i < this.votosList.length; i++) {
      if (this.votosList[i].candidato.toString() == "1") {
        this.candidato1++;
      }

      if (this.votosList[i].candidato.toString() == "2") {
        this.candidato2++;
      }

      if (this.votosList[i].candidato.toString() == "3") {
        this.candidato3++;
      }

      

    }
  }

  //Valida si el bloque está sin alterarse
  validar() {
    for (let i = 1; i < this.bloquesList.length; i++) {
      const bloqueActual = this.bloquesList[i];
      const bloqueAnterior = this.bloquesList[i - 1];
      let hash = SHA256(bloqueActual.index + bloqueActual.timeStamp + bloqueActual.datos + bloqueActual.hashAnterior).toString();
      if (bloqueActual.hashAnterior != bloqueAnterior.hash) {
        return false;
      }

      if (hash != bloqueActual.hash) {
        return false;
      }

    }
    return true;
  }

}
