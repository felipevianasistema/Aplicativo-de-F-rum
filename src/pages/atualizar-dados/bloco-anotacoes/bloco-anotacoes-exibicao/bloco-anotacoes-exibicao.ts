import { Component } from "@angular/core";
import { AlertController, NavController, NavParams, ViewController } from "ionic-angular";
import { BlocoAnotacao } from "../../../../entidades/BlocoAnotacao";
import { BlocoAnotacaoService } from "../../../../services/BlocoAnotacaoService";
import { Util } from "../../../util/Util";
import { BlocoAnotacoesNovo } from "../bloco-anotacoes-novo/bloco-anotacoes-novo";
@Component({
  selector: 'bloco-anotacoes-exibicao',
  templateUrl: 'bloco-anotacoes-exibicao.html'
})
export class BlocoAnotacoesExibicao {

  blocoAnotacao: BlocoAnotacao = new BlocoAnotacao();

  constructor(public viewCtrl: ViewController
    , private navParams: NavParams
    , private navCtrl: NavController
    , private alertCtrl: AlertController
    , private blocoAnotacoesService : BlocoAnotacaoService
    , public util: Util) {
  }

  ngAfterViewInit() {
    this.blocoAnotacao = this.navParams.get("bloco");
  }

  novo() {
    this.navCtrl.pop();
    this.navCtrl.push(BlocoAnotacoesNovo, { "opcao": 'N' });
  }

  confirmacaoExcluir() {
    const confirm = this.alertCtrl.create({
      title: 'Aviso!',
      message: 'Tem certeza que deseja excluir esta anotação?',
      buttons: [
        {
          text: 'Não',
          handler: () => {}
        },{
          text: 'Sim',
          handler: () => {
           this.excluir();
          }
        }
      ]
    });
    confirm.present();
  }

  private excluir() {
      this.util.iniciarLoad();
      this.blocoAnotacoesService.excluir(this.blocoAnotacao.idBlocoAnotacoes).then((result) => {
        this.util.pararLoad();
        this.navCtrl.pop();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  
    editar(){
      this.navCtrl.pop();
      this.navCtrl.push(BlocoAnotacoesNovo, { "opcao": 'E', "obj" : this.blocoAnotacao});
    }

}
