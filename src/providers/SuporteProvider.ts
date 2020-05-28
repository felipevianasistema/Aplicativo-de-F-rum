import { Contato } from '../entidades/Contato';
import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";

@Injectable()
export class SuporteProvider {

    constructor(private baseProvider: BaseProvider) { }

    public faleConosco(contato: Contato): Promise<any> {
        return this.baseProvider.requestService(contato, 'suporte/faleConosco');
    }
}