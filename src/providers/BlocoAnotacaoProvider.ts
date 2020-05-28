import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";
import { BlocoAnotacao } from "../entidades/BlocoAnotacao";

@Injectable()
export class BlocoAnotacaoProvider {

    constructor(private baseProvider: BaseProvider) {
    }

    public cadastrar(bloco: BlocoAnotacao): Promise<any> {
        return this.baseProvider.requestService(bloco, 'blocoAnotacao/cadastrar');
    }

    public obterTodosPorUsuario(cdUsuario : number): Promise<any> {
        return this.baseProvider.requestService(cdUsuario, 'blocoAnotacao/obterTodosPorUsuario');
    }

    public atualizar(bloco: BlocoAnotacao): Promise<any> {
        return this.baseProvider.requestService(bloco, 'blocoAnotacao/atualizar');
    }

    public excluir(id : number): Promise<any> {
        return this.baseProvider.requestService(id, 'blocoAnotacao/excluir');
    }

}
