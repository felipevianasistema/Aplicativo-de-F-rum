import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";


@Injectable()
export class CategoriaProvider {

    constructor(private baseProvider: BaseProvider) {
    }

    public obterTodos(): Promise<any> {
        return this.baseProvider.requestService(null, 'categoria/obterTodos');
    }


}