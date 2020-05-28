import { Contato } from './../entidades/Contato';
import { SuporteProvider } from './../providers/SuporteProvider';
import { Injectable } from "@angular/core";

@Injectable()
export class SuporteService {

    constructor(private provider: SuporteProvider) { }

    public faleConosco(contato: Contato): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.provider.faleConosco(contato).then(result => {
                if (result.cod.startsWith('S03')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }
}