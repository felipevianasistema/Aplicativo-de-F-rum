import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Constantes } from '../../app/constante/Constantes';
import { Usuario } from '../../entidades/Usuario';
import { UsuarioService } from '../../services/UsuarioService';
import { Util } from '../util/Util';

@Component({
  selector: 'esqueceu-a-senha',
  templateUrl: 'esqueceu-a-senha.html'
})
export class EsqueceuSenha {

  usuario: Usuario = new Usuario();
  dsEmailValidacao: string;

  constructor(private usuarioService: UsuarioService
    , private navCtrl: NavController
    , private util: Util) { }

  /**
   * Caso o e-mail exista, o sistema gera uma nova senha aleatória e envia para o email do usuário
   */
  enviar() {
    if (this.validar()) {
      this.util.iniciarLoad();
      this.usuarioService.gerarNovaSenha(this.usuario).then(result => {
        this.util.pararLoad();
        this.util.showAlert(result);
        this.navCtrl.pop();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  validar(): boolean {
    if (!this.usuario.dsEmail) {
      this.dsEmailValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    if (!this.util.validarEmail(this.usuario.dsEmail)) {
      this.dsEmailValidacao = Constantes.MSG_EMAIL_INVALIDO;
      return false;
    }
    this.dsEmailValidacao = '';
    return true;
  }

}
