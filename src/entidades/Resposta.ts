import { Usuario } from "./Usuario";

export class Resposta {

    idResposta: number;
    dsMensagem: string;
    dtHoraCadastro: string;
    cdUsuario: number;
    cdTopico: number;
    quantidade: number;
    usuario : Usuario;
}