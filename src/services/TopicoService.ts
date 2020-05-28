import { Injectable } from "@angular/core";
import { DadosTopicos } from "../entidades/DadosTopicos";
import { TopicoProvider } from "../providers/TopicoProvider";
import { Topico } from "../entidades/Topico";
import { ConteudoTopico } from "../entidades/ConteudoTopico";

@Injectable()
export class TopicoService {

    constructor(private provider: TopicoProvider) { }


    /**
     * Cadastra um novo tópico
     * @param topico 
     */
    public cadastrar(topico: Topico): Promise<{ topico : Topico, msg: string }> {
        return new Promise<any>((resolve, reject) => {
            this.provider.cadastrar(topico).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve({ topico: result.conteudoTopico, msg: result.msg });
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    /**
     * Obtem os dados dos tópicos de uma determinada categoria
     * @param idSubcategoria
     */
    public obterDadosTopicos(idSubcategoria: number): Promise<DadosTopicos> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterDadosTopicos(idSubcategoria).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.dadosTopicos);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

     /**
     * Obtem os dados de todos os tópicos
     */
    public obterDadosTodosTopicos(): Promise<DadosTopicos> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterDadosTodosTopicos().then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.dadosTopicos);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    /**
     * Retorna todos os tópicos de uma determinada categoria.
     * @param idSubcategoria
     */
    public obterTodosPorSubCategoria(idSubcategoria: number): Promise<Topico[]> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterTodosPorSubCategoria(idSubcategoria).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.topicos);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    /**
     * Filtra os tópicos de uma determinada categoria
     */
    public filtrarTopicosCategoria(idSubcategoria: number, filtro: string): Promise<Topico[]> {
        return new Promise<any>((resolve, reject) => {
            this.provider.filtrarTopicosCategoria(idSubcategoria, filtro).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.topicos);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public obterConteudoTopico(idTopico: number): Promise<ConteudoTopico> {
        return new Promise<any>((resolve, reject) => {
            this.provider.obterConteudoTopico(idTopico).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.conteudoTopico);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public editar(topico : Topico): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.provider.editar(topico).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }

    public excluirTopicoRespostas(idTopico : number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.provider.excluirTopicoRespostas(idTopico).then(result => {
                if (result.cod.startsWith('S01')) {
                    resolve(result.msg);
                } else {
                    reject(result.msg);
                }
            });
        });
    }
}