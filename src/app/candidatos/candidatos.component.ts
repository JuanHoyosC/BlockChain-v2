import { Component, OnInit } from '@angular/core';

//Servicios
import { VotantesService } from '../servicios/votantes.service';
import { CadenaService } from '../servicios/cadena.service';

//Form
import { NgForm } from '@angular/forms';

//Cadena de bloque
import { Votantes } from '../models/votantes';


//HASH
import * as SHA256 from 'crypto-js/sha256';


@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  fraude = false;
  mostrar = true;
  data;
  bloquesList;
  constructor(public votantesService: VotantesService, public bloquesService: CadenaService) {

  }


  ngOnInit() {
    this.votantesService.getVotantes();
    this.bloquesService.getCadena();
    this.resetForm();

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

  //Agrega los datos a la base de datos
  onSubtmit(votanteForm: NgForm, ID) {
    this.votantesService.insertVotante(votanteForm.value, ID);

    this.data = {
      datosPersonales: votanteForm.value,
      candidato: ID
    }
    this.resetForm(votanteForm);
    //Agrega el voto a la cadena
    this.crearBloque();

  }

  //Limpia el formulario
  resetForm(votanteForm?: NgForm) {
    if (votanteForm != null) {
      votanteForm.reset();
      this.votantesService.selectVotante = new Votantes();
    }
  }

  //Agrega el bloque a la base de datos
  crearBloque() {
    let hashAnterior = this.bloquesList[this.bloquesList.length - 1].hash;
    let fecha = new Date().toString();
    let hash = SHA256(this.bloquesList.length + fecha + JSON.stringify(this.data) + hashAnterior).toString();
    //Muestra la cadena de bloque
    this.bloquesService.insertCadena(this.bloquesList.length, fecha, JSON.stringify(this.data), hashAnterior, hash);
  }

  //Valida si no ha habido fraudes
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
