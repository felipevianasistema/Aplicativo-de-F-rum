import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { Constantes } from "../../app/constante/Constantes";
import { Topico } from "../../entidades/Topico";
import { UsuarioSessao } from "../../entidades/UsuarioSessao";
import { TopicoService } from "../../services/TopicoService";
import { DetalhesTopico } from "../detalhes-topico/detalhes-topico";
import { Util } from "../util/Util";

@Component({
  selector: 'novo-topico',
  templateUrl: 'novo-topico.html'
})
/**
 * Esta tela serve tanto para o cadastro, como edição do tópico.
 * Parametro: novoTopico - 'N' - Novo Tópico | 'E' - Editar
 */
export class NovoTopico {

  dsTitulo: string;
  topico: Topico = new Topico();
  qtdCaracteres: number = 0;
  dsTituloValidacao: string;
  dsMensagemValidacao: string;
  opcao: string;
  constructor(private navCtrl: NavController
    , private topicoService: TopicoService
    , public util: Util
    , private navParams: NavParams) {
    this.dsTitulo = this.navParams.get("titulo");
  }

  ngAfterViewInit() {
    this.opcao = this.navParams.get("opcao");
    if (this.opcao == 'E') {
      //editar tópico
      this.topico = this.navParams.get("topico");
    }
  }

  /**
   * Cadastra um novo tópico e redireciona o usuário para tela de visualização
   */
  cadastrar() {
    if (this.validar()) {
      this.topico.cdSubCategoria =  this.navParams.get('idSubcategoria');
      this.topico.cdUsuario = UsuarioSessao.idUsuario;
      this.util.iniciarLoad();
      this.topicoService.cadastrar(this.topico).then((result) => {
        this.util.pararLoad();
        //da um pop e depois avança, pq quando o usuário clicar no botão voltar,
        // ele irá retornar para tela de listagem dostopicos
        this.navCtrl.pop();
        this.navCtrl.push(DetalhesTopico, { conteudoTopico: result.topico, chamarServico : false });
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }
  }

  editar() {
    if (this.validar()) {
      let objEnvio: Topico = Object.assign({}, this.topico);
      objEnvio.dtHoraCadastro = null;
      this.topicoService.editar(objEnvio).then((result) => {
        this.navCtrl.pop();
      }).catch(erro => {
        this.util.showAlert(erro);
      });
    }
  }

  contadorDeCaracteres() {
    this.qtdCaracteres = this.topico.dsMensagem.length;
  }

  validar(): boolean {
    if (!this.topico.dsTitulo) {
      this.dsTituloValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsTituloValidacao = '';
    if (!this.topico.dsMensagem) {
      this.dsMensagemValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsMensagemValidacao = '';
    return true;
  }

} 
