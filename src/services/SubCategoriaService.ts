import { Injectable } from "@angular/core";
import { SubCategoria } from "../entidades/SubCategoria";
import { SubCategoriaProvider } from "../providers/SubCategoriaProvider";

@Injectable()
export class SubCategoriaService {

    constructor(private provider: SubCategoriaProvider) { }

    public obterTodosPorCategoria(idCategoria : number): Promise<SubCategoria[]> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterTodosPorCategoria(idCategoria).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.subCategorias);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

}