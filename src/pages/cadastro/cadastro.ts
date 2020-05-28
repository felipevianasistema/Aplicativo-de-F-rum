import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constantes } from '../../app/constante/Constantes';
import { Imagem } from '../../entidades/Imagem';
import { Usuario } from '../../entidades/Usuario';
import { UsuarioService } from '../../services/UsuarioService';
import { Util } from '../util/Util';

@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {

  usuario: Usuario = new Usuario();
  imagem: Imagem = new Imagem();
  dsNomeValidacao: string;
  dsEmailValidacao: string;
  dsUsuarioValidacao: string;
  avatarValidacao: string;
  dsSenhaValidacao: string;
  confirmarSenhaValidacao: string;

  constructor(private navCtrl: NavController
    , private usuarioService: UsuarioService
    , private util: Util) {
    this.usuario.dsSexo = "M";
  }

  /**
   * Cadastra o usuário, caso ocorra tudo bem, redireciona o usuário para tela de login.
   */
  cadastrar() {
    this.usuario.avatar = this.imagem.imagemBase64;
    if (this.validar()) {
     // this.usuario.cdSubCategoria; // o usuário se cadastrou pelo app de fórum
       this.util.iniciarLoad();
        this.usuarioService.cadastrar(this.usuario).then((result) => {
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
    if (!this.usuario.dsSenha) {
      this.dsSenhaValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsSenhaValidacao = null;
    if (!this.usuario.confirmarSenha) {
      this.confirmarSenhaValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.confirmarSenhaValidacao = null

    if (this.usuario.dsSenha != this.usuario.confirmarSenha) {
      this.dsSenhaValidacao = "As senhas devem ser iguais";
      return false;
    }
    this.dsSenhaValidacao = '';
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
