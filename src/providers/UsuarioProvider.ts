import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";
import { Usuario } from "../entidades/Usuario";
import { AtualizarSenha } from "../entidades/AtualizarSenha";

@Injectable()
export class UsuarioProvider {

    constructor(private baseProvider : BaseProvider) {
    }

    public cadastrar(usuario : Usuario): Promise<any> {
        return this.baseProvider.requestService(usuario, 'usuario/cadastrar');
    }

    public autenticar(usuario : Usuario): Promise<any> {
        return this.baseProvider.requestService(usuario, 'usuario/autenticar');
    }

    public gerarNovaSenha(usuario : Usuario): Promise<any> {
        return this.baseProvider.requestService(usuario, 'usuario/gerarNovaSenha');
    }

    public atualizarSenha(atualizarSenha : AtualizarSenha): Promise<any> {
        return this.baseProvider.requestService(atualizarSenha, 'usuario/atualizarSenha');
    }

    public atualizarCadastro(usuario : Usuario): Promise<any> {
        return this.baseProvider.requestService(usuario, 'usuario/atualizarCadastro');
    }

}