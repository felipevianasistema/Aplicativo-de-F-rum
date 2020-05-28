import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";
import { Resposta } from "../entidades/Resposta";

@Injectable()
export class RespostaProvider {

    constructor(private baseProvider: BaseProvider) {
    }

    public cadastrar(resposta: Resposta): Promise<any> {
        return this.baseProvider.requestService(resposta, 'resposta/cadastrar');
    }

    public editar(resposta: Resposta): Promise<any> {
        return this.baseProvider.requestService(resposta, 'resposta/editar');
    }

    public excluirPorId(id : number): Promise<any> {
        return this.baseProvider.requestService(id, 'resposta/excluirPorId');
    }

}
