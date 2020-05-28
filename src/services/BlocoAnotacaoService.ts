import { Injectable } from "@angular/core";
import { BlocoAnotacao } from "../entidades/BlocoAnotacao";
import { BlocoAnotacaoProvider } from "../providers/BlocoAnotacaoProvider";

@Injectable()
export class BlocoAnotacaoService {

    constructor(private provider: BlocoAnotacaoProvider) { }

    public cadastrar(bloco: BlocoAnotacao): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.provider.cadastrar(bloco).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public obterTodosPorUsuario(cdUsuario : number): Promise<BlocoAnotacao[]> {
        return new Promise<BlocoAnotacao[]>((resolve, reject) => {
            this.provider.obterTodosPorUsuario(cdUsuario).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.blocoAnotacoes);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public atualizar(bloco: BlocoAnotacao): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.provider.atualizar(bloco).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public excluir(id : number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.provider.excluir(id).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

}