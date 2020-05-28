

export class Usuario {

    idUsuario: number;
    dsNome: string;
    dsEmail: string;
    dsUsuario: string;
    avatar: string;
    dsSenha: string;
    confirmarSenha: string;
    dsSexo: string;
    dtHoraCadastro: string;
    token: string;
    cdSubCategoria: number; //indica por qual aplicativo o usuário se cadastrou

    constructor(dsUsuario?: string, dsSenha?: string) {
        this.dsUsuario = dsUsuario;
        this.dsSenha = dsSenha;
    }


}