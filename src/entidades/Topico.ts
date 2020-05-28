import { Usuario } from "./Usuario";
import { Resposta } from "./Resposta";

export class Topico {
    idTopico: number;
    dsTitulo: string;
    dsMensagem: string;
    dtHoraCadastro: string;
    cdUsuario: number;
    cdSubCategoria: number;

    usuario: Usuario;
    resposta : Resposta;
    respostas: Resposta[];

}