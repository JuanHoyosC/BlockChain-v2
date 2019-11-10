
import {Block} from '../models/block';
export class BlockChain {
    chain;
    constructor() {
        this.chain = [this.crearBloqueGenesis()];
    }

    //Crea el primer bloque (Bloque Genesis)
    crearBloqueGenesis() {
        return new Block(0,'01/01/2018', 'Bloque Genesis', '');
    }

    //Obtiene el ultimo bloque agregado
    getUltimoBloque() {
        return this.chain[this.chain.length - 1];
    }

    //Agrega un nuevo bloque a la cadena
    agregarBloque(nuevoBloque) {
        nuevoBloque.hashAnterior = this.getUltimoBloque().hash;
        nuevoBloque.hash = nuevoBloque.calcularHash();
        this.chain.push(nuevoBloque);
    }
}
