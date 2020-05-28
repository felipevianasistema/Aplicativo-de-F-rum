import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BlocoAnotacao } from "../../../../entidades/BlocoAnotacao";
import { BlocoAnotacoesNovo } from "../bloco-anotacoes-novo/bloco-anotacoes-novo";
import { BlocoAnotacaoService } from "../../../../services/BlocoAnotacaoService";
import { Util } from "../../../util/Util";
import { UsuarioSessao } from "../../../../entidades/UsuarioSessao";
import { BlocoAnotacoesExibicao } from "../bloco-anotacoes-exibicao/bloco-anotacoes-exibicao";
@Component({
  selector: 'bloco-anotacoes-index',
  templateUrl: 'bloco-anotacoes-index.html'
})
export class BlocoAnotacoesIndex {

  lista: BlocoAnotacao[] = [];

  constructor(private blocoService: BlocoAnotacaoService
    , private navCtrl: NavController
    , private util: Util) {

  }

  ionViewWillEnter() {
    this.obterTodosPorUsuario();
  }

  obterTodosPorUsuario() {
    this.util.iniciarLoad();
    this.blocoService.obterTodosPorUsuario(UsuarioSessao.idUsuario).then((resp) => {
      this.lista = resp;
      this.util.pararLoad();
    }).catch((erro) => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  novo() {
    this.navCtrl.push(BlocoAnotacoesNovo, { "opcao": 'N' });
  }

  exibir(bloco : BlocoAnotacao){
    this.navCtrl.push(BlocoAnotacoesExibicao, {"bloco" : bloco});
  }

}
