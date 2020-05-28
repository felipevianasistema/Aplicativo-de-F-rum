import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constantes } from '../../app/constante/Constantes';
import { Usuario } from '../../entidades/Usuario';
import { UsuarioSessao } from '../../entidades/UsuarioSessao';
import { UsuarioService } from '../../services/UsuarioService';
import { Cadastro } from '../cadastro/cadastro';
import { EsqueceuSenha } from '../esqueceu-a-senha/esqueceu-a-senha';
import { TelaForum } from '../tela-forum/tela-forum';
import { Util } from '../util/Util';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FaleConosco } from '../fale-conosco/fale-conosco';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {

  usuario: Usuario = new Usuario();
  dsUsuarioValidacao: string;
  dsSenhaValidacao: string;
  loginsSalvos: Usuario[] = [];

  constructor(private navCtrl: NavController
    , private usuarioService: UsuarioService
    , private socialSharing: SocialSharing
    , private util: Util) {
  }

  ngAfterViewInit() {
    this.acessarComoUsuarioAnonimo();
  }

  /**
  * Autenticação do usuário.
  */
  autenticar() {
    if (this.validar()) {
      this.util.iniciarLoad();     
        this.usuarioService.autenticar(this.usuario).then((result) => {
          this.preencherSessaoUsuario(result);
          this.navCtrl.push(TelaForum);
          this.util.pararLoad();
        }).catch(erro => {
          this.util.pararLoad();
          this.util.showAlert(erro);
        });
    }
  }

  /**
   * Verifica se o login está salvo
   *
  salvarLogin() {
    this.loginsSalvos = (localStorage.getItem("logins")) ? JSON.parse(localStorage.getItem("logins")) : [];
    console.log('x--> ' + this.loginsSalvos.length);
      //caso o usuário ainda não esteja saldo, pergunta se deseja salvar
      if (!this.loginsSalvos.find(item => item.dsUsuario == this.usuario.dsUsuario)) {
        this.perguntaSalvarLogin();
    }
  }

  /**
   * Exibe alert informando se o usuário deseja salvar o login
   *
  perguntaSalvarLogin() {
    const confirm = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja salvar este login?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            //salva o login no local storage
            this.loginsSalvos.push(new Usuario(this.usuario.dsUsuario, this.usuario.dsSenha));
            localStorage.removeItem("logins");
            localStorage.setItem("logins", JSON.stringify(this.loginsSalvos));
          }
        },
        {
          text: 'Não',
          handler: () => { }
        }
      ]
    });
    confirm.present();
  }*/

  compartilharRedeSocial() {
    this.socialSharing.share("https://play.google.com/store/apps/details?id=br.com.touchinove&hl=pt_BR")
  }

  faleConosco(){
    this.navCtrl.push(FaleConosco);
  }

  validar(): boolean {
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
    return true;
  }

  acao(op: number) {
    switch (op) {
      case 1:
        this.acessarComoUsuarioAnonimo();
        this.autenticar();
        break;
      case 2:
        // Quero me cadastrar
        this.navCtrl.push(Cadastro);
        break;
      case 3:
        //Esqueci a senha
        this.navCtrl.push(EsqueceuSenha)
        break;
    }
  }

  limpar(){
    this.usuario.dsUsuario = null;
    this.usuario.dsSenha = null;
  }

  private acessarComoUsuarioAnonimo(){
    this.usuario.dsUsuario = 'anônimo'
    this.usuario.dsSenha = ''
  }

  private preencherSessaoUsuario(usuario: Usuario) {
    UsuarioSessao.idUsuario = usuario.idUsuario;
    UsuarioSessao.dsNome = usuario.dsNome;
    UsuarioSessao.dsEmail = usuario.dsEmail;
    UsuarioSessao.dsUsuario = usuario.dsUsuario;
    UsuarioSessao.avatar = usuario.avatar;
    UsuarioSessao.dsSexo = usuario.dsSexo;
    UsuarioSessao.dtHoraCadastro = usuario.dtHoraCadastro;
    UsuarioSessao.token = usuario.token;
  }

}
