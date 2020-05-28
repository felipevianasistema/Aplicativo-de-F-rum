import { Injectable } from "@angular/core";
import { Usuario } from "../entidades/Usuario";
import { UsuarioProvider } from "../providers/UsuarioProvider";
import { AtualizarSenha } from "../entidades/AtualizarSenha";

@Injectable()
export class UsuarioService {

    constructor(private provider: UsuarioProvider) { }


    public cadastrar(usuario: Usuario): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.cadastrar(usuario).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public autenticar(usuario: Usuario): Promise<Usuario> {
        return new Promise<any>((resolve, reject) => {
            this.provider.autenticar(usuario).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.usuario);
                } else {
                    reject(result.msg);
                }
            });
        })
    }
    
    public gerarNovaSenha(usuario: Usuario): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.gerarNovaSenha(usuario).then(result => {
                if (result.cod.startsWith('S02')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        })
    }

    public atualizarSenha(atualizarSenha: AtualizarSenha): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.atualizarSenha(atualizarSenha).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            }).catch(erro => {});
        });
    }

    public atualizarCadastro(usuario: Usuario): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.provider.atualizarCadastro(usuario).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

}