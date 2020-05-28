import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";


@Injectable()
export class SubCategoriaProvider {

    constructor(private baseProvider: BaseProvider) {
    }

    public obterTodosPorCategoria(idCategoria : number): Promise<any> {
        return this.baseProvider.requestService(idCategoria, 'subCategoria/obterTodosPorCategoria');
    }


}