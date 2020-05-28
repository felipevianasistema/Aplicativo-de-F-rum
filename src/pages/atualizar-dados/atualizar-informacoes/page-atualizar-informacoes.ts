import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { Constantes } from "../../../app/constante/Constantes";
import { Imagem } from "../../../entidades/Imagem";
import { Usuario } from "../../../entidades/Usuario";
import { UsuarioSessao } from "../../../entidades/UsuarioSessao";
import { UsuarioService } from "../../../services/UsuarioService";
import { Util } from "../../util/Util";

@Component({
  selector: 'page-atualizar-informacoes',
  templateUrl: 'page-atualizar-informacoes.html'
})
export class PageAtualizarInformacoes {


  usuario: Usuario = new Usuario();
  imagem: Imagem = new Imagem();
  dsNomeValidacao: string;
  dsEmailValidacao: string;
  dsUsuarioValidacao: string;
  avatarValidacao: string;

  constructor(private usuarioService: UsuarioService
    , public viewCtrl: ViewController
    , private util: Util) {
  }

  ngOnInit(): void {
    //obtem os dados do usuário da sessão pra preencher a tela
    this.usuario.idUsuario = UsuarioSessao.idUsuario;
    this.usuario.dsNome = UsuarioSessao.dsNome;
    this.usuario.dsUsuario = UsuarioSessao.dsUsuario;
    this.usuario.dsEmail = UsuarioSessao.dsEmail;
    this.usuario.dsSexo = UsuarioSessao.dsSexo;
    this.imagem.imagemBase64 = UsuarioSessao.avatar;
    //adiciona imagem padrão caso não tenha
    if (!UsuarioSessao.avatar && this.usuario.dsSexo == "M") {
      this.imagem.imagemBase64 = Constantes.AVATAR_MASCULINO_PADRAO;
    } else if (!UsuarioSessao.avatar && this.usuario.dsSexo == "F") {
      this.imagem.imagemBase64 = Constantes.AVATAR_FEMININO_PADRAO;
    }
  }

  atualizar() {
    this.usuario.avatar = this.imagem.imagemBase64;
    if (this.validar()) {
      this.util.iniciarLoad();
      this.usuarioService.atualizarCadastro(this.usuario).then(result => {
        this.atualizarDadosSessao();
        this.util.pararLoad();
        this.util.showAlert(result);
        this.viewCtrl.dismiss();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  atualizarDadosSessao() {
    UsuarioSessao.idUsuario = this.usuario.idUsuario;
    UsuarioSessao.dsNome = this.usuario.dsNome;
    UsuarioSessao.dsUsuario = this.usuario.dsUsuario;
    UsuarioSessao.dsEmail = this.usuario.dsEmail;
    UsuarioSessao.dsSexo = this.usuario.dsSexo;
    UsuarioSessao.avatar = this.usuario.avatar;
  }

  validar(): boolean {
    if (!this.usuario.dsNome) {
      this.dsNomeValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsNomeValidacao = null;
    if (!this.usuario.dsUsuario) {
      this.dsUsuarioValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsUsuarioValidacao = null;

    if (!this.usuario.dsEmail) {
      this.dsEmailValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsEmailValidacao = null;
    if (!this.util.validarEmail(this.usuario.dsEmail)) {
      this.dsEmailValidacao = Constantes.MSG_EMAIL_INVALIDO;
      return false;
    }
    this.dsEmailValidacao = null;
    return true;
  }
}
