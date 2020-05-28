import { Injectable } from "@angular/core";
import { Categoria } from "../entidades/Categoria";
import { CategoriaProvider } from "../providers/CategoriaProvider";

@Injectable()
export class CategoriaService {

    constructor(private provider: CategoriaProvider) { }

    public obterTodos(): Promise<Categoria[]> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterTodos().then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.categorias);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

}