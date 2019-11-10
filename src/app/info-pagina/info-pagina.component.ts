import { Component, OnInit } from '@angular/core';
//HASH
import * as SHA256 from 'crypto-js/sha256';

import { CadenaService } from '../servicios/cadena.service';

@Component({
  selector: 'app-info-pagina',
  templateUrl: './info-pagina.component.html',
  styleUrls: ['./info-pagina.component.scss']
})
export class InfoPaginaComponent implements OnInit {

  //Varriables

  fraude = false;
  mostrar = true;
  bloquesList;
  constructor(public bloquesService: CadenaService) { }

  ngOnInit() {
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

  //Valida el bloque
  validar() {
    for (let i = 1; i < this.bloquesList.length; i++) {
      const bloqueActual = this.bloquesList[i];
      const bloqueAnterior = this.bloquesList[i - 1];
      console.log(SHA256(bloqueActual.index + bloqueActual.timeStamp + JSON.stringify(bloqueActual.datos) + bloqueActual.hashAnterior).toString())
      console.log(bloqueActual.hash);
      if (bloqueActual.hashAnterior != bloqueAnterior.hash) {
        return false;
      }

    }
    return true;
  }

}
