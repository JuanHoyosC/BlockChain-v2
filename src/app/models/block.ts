import * as SHA256 from 'crypto-js/sha256';
export class Block {
    index = 0;
    timeStamp = "";
    datos = "";
    hashAnterior = "";
    hash = "";
    constructor(index, timeStamp, datos, hashAnterior = '') {
        this.index = index;
        this.timeStamp = timeStamp;
        this.datos = datos;
        this.hashAnterior = hashAnterior;
        this.hash = this.calcularHash();
    }

    //Calcula el Hash del bloque
    calcularHash() {
        console.log(typeof(this.index))
        console.log(typeof(this.timeStamp))
        console.log(typeof(this.datos))
        console.log(typeof(this.hash))
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.datos) + this.hashAnterior).toString();
    }

}
