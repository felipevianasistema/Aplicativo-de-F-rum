import { Injectable } from "@angular/core";
import { RespostaProvider } from "../providers/RespostaProvider";
import { Resposta } from "../entidades/Resposta";

@Injectable()
export class RespostaService {

    constructor(private provider: RespostaProvider) { }

    public cadastrar(resposta: Resposta): Promise<{ resposta: Resposta, msg: string }> {
        return new Promise<any>((resolve, reject) => {
            this.provider.cadastrar(resposta).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve({ resposta: result.resposta, msg: result.msg });
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public editar(resposta: Resposta): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.editar(resposta).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public excluirPorId(id: number): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.excluirPorId(id).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }
}