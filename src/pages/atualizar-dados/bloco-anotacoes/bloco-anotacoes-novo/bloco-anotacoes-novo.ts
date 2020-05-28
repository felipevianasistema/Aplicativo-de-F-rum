import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Constantes } from "../../../../app/constante/Constantes";
import { BlocoAnotacao } from "../../../../entidades/BlocoAnotacao";
import { UsuarioSessao } from "../../../../entidades/UsuarioSessao";
import { BlocoAnotacaoService } from "../../../../services/BlocoAnotacaoService";
import { Util } from "../../../util/Util";
import { BlocoAnotacoesExibicao } from "../bloco-anotacoes-exibicao/bloco-anotacoes-exibicao";

@Component({
  selector: 'bloco-anotacoes-novo',
  templateUrl: 'bloco-anotacoes-novo.html'
})
export class BlocoAnotacoesNovo {

  blocoAnotacao: BlocoAnotacao = new BlocoAnotacao();
  qtdCaracteres: number = 0;
  dsTituloValidacao: string;
  dsMensagemValidacao: string;
  opcao: string; // N = Novo - | E - Editar;

  constructor(public util: Util
    , private blocoAnotacoesService: BlocoAnotacaoService
    , public navCtrl : NavController
    , private navParams: NavParams) {
  }

  ngAfterViewInit() {
    this.opcao = this.navParams.get('opcao');
    if(this.opcao == "E"){
      this.blocoAnotacao = this.navParams.get('obj');
    }
  }

  cadastrar() {
    if (this.validar()) {
      //atribui o usuário
      this.blocoAnotacao.cdUsuario = UsuarioSessao.idUsuario;
      this.util.iniciarLoad();
      this.blocoAnotacoesService.cadastrar(this.blocoAnotacao).then((result) => {
        this.util.pararLoad();
        this.blocoAnotacao.idBlocoAnotacoes = result.blocoAnotacao.idBlocoAnotacoes;
        this.navCtrl.pop();
        this.navCtrl.push(BlocoAnotacoesExibicao, { "bloco": this.blocoAnotacao })
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  atualizar() {
    if (this.validar()) {
      this.util.iniciarLoad();
      this.blocoAnotacao.dtHoraCadastro = null;
      this.blocoAnotacoesService.atualizar(this.blocoAnotacao).then((result) => {
        this.util.pararLoad();
        this.navCtrl.pop();
        this.navCtrl.push(BlocoAnotacoesExibicao, { "bloco": this.blocoAnotacao })
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }



  contadorDeCaracteres() {
    this.qtdCaracteres = this.blocoAnotacao.dsMensagem.length;
  }

  private validar(): boolean {
    if (!this.blocoAnotacao.dsTitulo) {
      this.dsTituloValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsTituloValidacao = null;
    if (!this.blocoAnotacao.dsMensagem) {
      this.dsMensagemValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsMensagemValidacao = null;
    return true;
  }

} 
