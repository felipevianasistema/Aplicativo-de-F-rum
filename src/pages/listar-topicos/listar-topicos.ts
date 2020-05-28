import { Component, ViewChild } from "@angular/core";
import { NavController, ModalController, Content, NavParams } from "ionic-angular";
import { Constantes } from "../../app/constante/Constantes";
import { Topico } from "../../entidades/Topico";
import { TopicoService } from "../../services/TopicoService";
import { DetalhesTopico } from "../detalhes-topico/detalhes-topico";
import { NovoTopico } from "../novo-topico/novo-topico";
import { Util } from "../util/Util";
import { ExibicaoFotoPerfil } from "../exibicao-foto-perfil/exibicao-foto-perfil";

@Component({
  selector: 'listar-topicos',
  templateUrl: 'listar-topicos.html'
})
export class ListarTopicos {

  topicos: Topico[] = [];
  exibirFiltro: boolean = false;
  filtro: string;
  filtroValidacao: string;
  avatarPadraoMasculino: string = Constantes.AVATAR_MASCULINO_PADRAO;
  avatarPadraoFeminino: string = Constantes.AVATAR_FEMININO_PADRAO;
  @ViewChild(Content) content: Content;
  exibirLoading: boolean;
  private idSubcategoria: number;
  dsTituloSubCategoria : string;

  constructor(private navCtrl: NavController
    , private util: Util
    , private modalController: ModalController
    , private navParams: NavParams
    , private topicoService: TopicoService) {
    //quando o usuário entrar na tela, exibe o load, assim que avançar e voltar, não exibe
    this.exibirLoading = true;
  }

  ngAfterViewInit(){
    this.idSubcategoria = this.navParams.get("idSubcategoria")
    this.dsTituloSubCategoria = this.navParams.get("dsTitulo")
  }

  ionViewDidEnter() {
    this.obterTodosPorSubCategoria(null, this.exibirLoading);
  }

  obterTodosPorSubCategoria(pullRefresh, executaLoading: boolean) {
    this.exibirLoading = false;
    this.exibirFiltro = false;
    this.filtro = ""
    if (executaLoading) {
      this.util.iniciarLoad();
    }
    //forum
    this.topicoService.obterTodosPorSubCategoria(this.idSubcategoria).then(result => {
      this.topicos = [];
      if (result && result.length > 0) {
        this.topicos = result;
      }// else {
        //this.util.showAlert("Nenhum tópico cadastrado, seja o primeiro.");
     // }
      if (executaLoading) {
        this.util.pararLoad();
      }
      if (pullRefresh) {
        pullRefresh.complete();
      }
    }).catch(erro => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  exibirOcultarFiltro() {
    this.exibirFiltro = this.exibirFiltro ? false : true;
  }

  pesquisar() {
    if (this.validarFiltro()) {
      this.topicos = [];
      this.util.iniciarLoad();
      this.topicoService.filtrarTopicosCategoria(this.idSubcategoria, this.filtro).then(result => {
        if (result && result.length > 0) {
          this.topicos = result;
        } else {
         // this.util.showAlert("Nenhum tópico encontrado.");
        }
        this.util.pararLoad();
      }).catch(erro => {
        this.util.pararLoad();
        this.util.showAlert(erro);
      });
    }

  }


  novoTopico() {
    this.navCtrl.push(NovoTopico, { titulo: "Novo tópico", idSubcategoria : this.idSubcategoria });
  }

  detalhesTopico(idTopico: number) {
    this.navCtrl.push(DetalhesTopico, { idTopico: idTopico, chamarServico: true });
    /*this.util.iniciarLoad();
     this.topicoService.obterConteudoTopico(idTopico).then(result => {
       this.util.pararLoad();
       this.navCtrl.push(DetalhesTopico, { idTopico: idTopico });
     }).catch(erro => {
       this.util.pararLoad();
       this.util.showAlert(erro);
     });*/
  }

  ampliarImagem(img: string, nome: string) {
    let modal = this.modalController.create(ExibicaoFotoPerfil, { "img": img, "nome": nome });
    modal.present();
  }

  validarFiltro(): boolean {
    if (!this.filtro) {
      this.filtroValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    if (this.filtro.length < 3) {
      this.filtroValidacao = "Informe no mínimo 3 letras";
      return false;
    }
    this.filtroValidacao = "";
    return true;
  }

  scrollToTop() {
    if (this.exibirFiltro) {
      this.content.scrollToTop(1500);
      document.getElementById('filtro').focus;
    }
  }

}
