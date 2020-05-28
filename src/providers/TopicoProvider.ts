import { Injectable } from "@angular/core";
import { BaseProvider } from "./BaseProvider";
import { Topico } from "../entidades/Topico";

@Injectable()
export class TopicoProvider {

    constructor(private baseProvider: BaseProvider) {
    }

    public cadastrar(topico: Topico): Promise<any> {
        return this.baseProvider.requestService(topico, 'topico/cadastrar');
    }

    public obterDadosTopicos(idSubcategoria: number): Promise<any> {
        return this.baseProvider.requestService(idSubcategoria, 'topico/obterDadosTopicos');
    }

    public obterDadosTodosTopicos(): Promise<any> {
        return this.baseProvider.requestService("", 'topico/obterDadosTodosTopicos');
    }

    public obterTodosPorSubCategoria(idSubcategoria: number): Promise<any> {
        return this.baseProvider.requestService({ cdSubCategoria: idSubcategoria }, 'topico/obterTodosPorSubCategoria');
    }

    public filtrarTopicosCategoria(idSubcategoria: number, filtro: string): Promise<any> {
        return this.baseProvider.requestService({ cdSubCategoria: idSubcategoria, filtro: filtro }, 'topico/filtrarTopicosCategoria');
    }

    public obterConteudoTopico(idTopico: number): Promise<any> {
        return this.baseProvider.requestService(idTopico, 'topico/obterConteudoTopico');
    }

    public editar(topico: Topico): Promise<any> {
        return this.baseProvider.requestService(topico, 'topico/editar');
    }

    public excluirTopicoRespostas(idTopico : number): Promise<any> {
        return this.baseProvider.requestService(idTopico, 'topico/excluirTopicoRespostas');
    }

}
