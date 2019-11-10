import { Component, OnInit } from '@angular/core';
import * as SHA256 from 'crypto-js/sha256';
import { CadenaService } from '../servicios/cadena.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})

export class BlockchainComponent implements OnInit {
  bloquesList;
  bloques;
  index;
  hash;
  hashAnterior;
  timeStamp;
  fraude = false;
  ver = true;

  constructor(public bloquesService: CadenaService) {
  }

  ngOnInit() {
    this.bloquesService.getCadena();
    this.bloquesService.getCadena().snapshotChanges().subscribe(item => {
      this.bloquesList = [];
      this.bloques = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        let y = element.payload.toJSON();
        x["$key"] = element.key;
        y["$key"] = element.key;
        this.bloques.push(x);
        this.bloquesList.push(y);
      })
      
      for (let i = 0; i < this.bloquesList.length; i++) {
        this.bloques[i].hash = this.bloques[i].hash.toString().substr(0, 15);
        this.bloques[i].hashAnterior = this.bloques[i].hashAnterior.toString().substr(0, 15);
        this.bloques[i].timeStamp = this.bloques[i].timeStamp.toString().substr(0, 15);
      }

      //Activa el mensaje de advertencia
      if (!this.validar()) {
        this.fraude = true;
        this.ver = false;
      } else {
        this.fraude = false;
        this.ver = true;
      }
    });
  }

  mostrar(clave) {

    for (let i = 0; i < this.bloquesList.length; i++) {
      if (this.bloquesList[i].$key == clave) {
        this.index = i;
        this.hash = this.bloquesList[i].hash.toString().substr(0, 40)
        this.hashAnterior = this.bloquesList[i].hashAnterior.toString().substr(0, 40)
        this.timeStamp = this.bloquesList[i].timeStamp;
      }

    }
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
