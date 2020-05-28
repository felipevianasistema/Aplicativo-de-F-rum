import { Component } from "@angular/core";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { Resposta } from "../../entidades/Resposta";
import { RespostaService } from "../../services/RespostaService";
import { Util } from "../util/Util";
import { UsuarioSessao } from "../../entidades/UsuarioSessao";
import { ConteudoTopico } from "../../entidades/ConteudoTopico";
import { Constantes } from "../../app/constante/Constantes";

@Component({
  selector: 'page-resposta',
  templateUrl: 'page-resposta.html'
})

/**
 * As opções E e R correspondem a: E - Editar | R - Responder.
 */
export class PageResposta {

  dsTitulo: string;
  resposta: Resposta = new Resposta();
  conteutoTopico: ConteudoTopico;
  dsMensagemValidacao: string;
  qtdCaracteres: number = 0;
  opcao: string;

  constructor(private navParams: NavParams
    , private respostaService: RespostaService
    , public util: Util
    , private navCtrl: NavController) {
    this.dsTitulo = this.navParams.get("titulo");
    this.opcao = this.navParams.get("opcao");
    if (this.opcao == 'R') {
      //responder
      this.conteutoTopico = this.navParams.get("conteudoTopico");
      //dados do topico para o cadastros
      this.resposta.cdUsuario = UsuarioSessao.idUsuario;
      this.resposta.cdTopico = this.conteutoTopico.topico.idTopico;
    } else {
      //editar resposta
      this.resposta = this.navParams.get("resposta");
    }
  }

  responder() {
    if (this.validar()) {
      this.util.iniciarLoad();
      this.respostaService.cadastrar(this.resposta).then(result => {
        this.conteutoTopico.respostas.push(result.resposta);
        this.util.showAlert(result.msg);
        this.navCtrl.pop();
        this.util.pararLoad();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  editar() {
    if (this.validar()) {
      this.util.iniciarLoad();
      //edita o erro de conversão do timestamp
      let obj = Object.assign({}, this.resposta);
      obj.dtHoraCadastro = null;
      this.respostaService.editar(obj).then(result => {
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
    if (!this.resposta.dsMensagem) {
      this.dsMensagemValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsMensagemValidacao = '';
    return true;
  }

  contadorDeCaracteres() {
    this.qtdCaracteres = this.resposta.dsMensagem.length;
  }

} 
