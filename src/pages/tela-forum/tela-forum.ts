import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Constantes } from "../../app/constante/Constantes";
import { DadosTopicos } from "../../entidades/DadosTopicos";
import { UsuarioSessao } from "../../entidades/UsuarioSessao";
import { TopicoService } from "../../services/TopicoService";
import { AtualizarDadosIndex } from "../atualizar-dados/menu-atualizar-dados-index";
import { PageCategoria } from "../page-categoria/page-categoria";
import { Util } from "../util/Util";


@Component({
  selector: 'tela-forum',
  templateUrl: 'tela-forum.html'
})
export class TelaForum {

  idUsuario: number = UsuarioSessao.idUsuario;
  avatar: string = UsuarioSessao.avatar;
  nome: string = UsuarioSessao.dsNome;
  sexo: string = UsuarioSessao.dsSexo;
  dadosTopicos: DadosTopicos = new DadosTopicos();
  avatarPadraoMasculino: string = Constantes.AVATAR_MASCULINO_PADRAO;
  avatarPadraoFeminino: string = Constantes.AVATAR_FEMININO_PADRAO;
  exibirLoading : boolean;

  constructor(private navCtrl: NavController
    , private util: Util
    , private topicoService: TopicoService) {
      //quando o usuário entrar na tela, exibe o load, assim que avançar e voltar, não exibe
      this.exibirLoading = true;
  }

  ionViewDidEnter() {
    this.obterDadosTopicos(null, this.exibirLoading);
    setInterval(() => {
      this.atualizarDadosUsrTela();
    }, 2000)
  }

  /**
   * Caso o usuário atualize seus dados e volte para esta tela, o mesmo será att sem precisar fazer login novamente
   */
  atualizarDadosUsrTela() {
    this.avatar = UsuarioSessao.avatar;
    this.nome = UsuarioSessao.dsNome;
    this.sexo = UsuarioSessao.dsSexo;
  }


  obterDadosTopicos(pullRefresh, executaLoading?: boolean) {
    this.exibirLoading = false;
    if (executaLoading) {
      this.util.iniciarLoad();
    }
    this.topicoService.obterDadosTodosTopicos().then((result) => {
      if (result) {
        this.dadosTopicos = result
      }
      if (executaLoading) {
        this.util.pararLoad();
      }
      if (pullRefresh) {
        pullRefresh.complete();
      }
    }).catch(() => {
      this.util.pararLoad();
      this.util.showAlert("Não foi possível obter os dados atuais dos tópicos.");
    });
  }

  irPara() {
    this.navCtrl.push(PageCategoria);
  }

  menuAtualizarDados() {
    this.navCtrl.push(AtualizarDadosIndex);
  }

}
