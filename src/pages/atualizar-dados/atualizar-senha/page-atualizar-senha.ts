import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Constantes } from "../../../app/constante/Constantes";
import { AtualizarSenha } from "../../../entidades/AtualizarSenha";
import { UsuarioSessao } from "../../../entidades/UsuarioSessao";
import { UsuarioService } from "../../../services/UsuarioService";
import { Util } from "../../util/Util";
@Component({
  selector: 'page-atualizar-senha',
  templateUrl: 'page-atualizar-senha.html'
})
export class PageAtualizarSenha {

  atualizarSenha: AtualizarSenha = new AtualizarSenha();
  repetirNovaSenha: string;
  senhaAtualValidacao: string;
  novaSenhaValidacao: string;

  constructor(private util: Util
    , public viewCtrl: ViewController
    , private usuarioService: UsuarioService) {

  }

  atualizar() {
    if (this.validar()) {
      this.util.iniciarLoad();
      this.atualizarSenha.dsUsuario = UsuarioSessao.dsUsuario;
      this.atualizarSenha.idUsuario = UsuarioSessao.idUsuario;
      this.usuarioService.atualizarSenha(this.atualizarSenha).then(result => {
        this.util.pararLoad();
        this.util.showAlert(result);
        this.viewCtrl.dismiss();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  validar(): boolean {
    if (!this.atualizarSenha.senhaAtual) {
      this.senhaAtualValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.senhaAtualValidacao = ""

    if (!this.atualizarSenha.novaSenha) {
      this.novaSenhaValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }

    if (this.atualizarSenha.novaSenha != this.repetirNovaSenha) {
      this.novaSenhaValidacao = "Os campos devem ser iguais"
      return false;
    }
    this.novaSenhaValidacao = '';
    return true;
  }

}
