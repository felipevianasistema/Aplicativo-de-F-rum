import { Component } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { PageAtualizarSenha } from "./atualizar-senha/page-atualizar-senha";
import { PageAtualizarInformacoes } from "./atualizar-informacoes/page-atualizar-informacoes";
import { BlocoAnotacoesIndex } from "./bloco-anotacoes/bloco-anotacoes-index/bloco-anotacoes-index";
import { UsuarioSessao } from "../../entidades/UsuarioSessao";
import { Util } from "../util/Util";
import { Constantes } from "../../app/constante/Constantes";

@Component({
  selector: 'menu-atualizar-dados-index',
  templateUrl: 'menu-atualizar-dados-index.html'
})
export class AtualizarDadosIndex {

  constructor(private modalCtrl: ModalController,
    private util : Util,
    private navCtrl : NavController) {

  }

  irPara(opcao) {
    //usuário anonimo
    if(UsuarioSessao.idUsuario == 1){
      this.util.showAlert(Constantes.MSG_USUARIO_PERMISSAO_ANONIMO);
      return;
    }
    let modal;
    switch (opcao) {
      case 1:
        modal = this.modalCtrl.create(PageAtualizarInformacoes);
        modal.present();
        break;
      case 2:
        modal = this.modalCtrl.create(PageAtualizarSenha);
        modal.present();
        break;
      case 3:
        this.navCtrl.push(BlocoAnotacoesIndex);
        break;
    }
  }


}
