import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { SubCategoria } from '../../entidades/SubCategoria';
import { SubCategoriaService } from '../../services/SubCategoriaService';
import { Util } from '../util/Util';
import { NavController, Content } from 'ionic-angular';
import { ListarTopicos } from '../listar-topicos/listar-topicos';

@Component({
  selector: 'page-subcategoria',
  templateUrl: 'page-subcategoria.html'
})
export class PageSubCategoria {

  subCategorias: SubCategoria[] = [];
  subCategoriasAux: SubCategoria[] = [];
  @ViewChild(Content) content: Content;
  exibirLoading: boolean;

  constructor(private subCategoriaService: SubCategoriaService
    , private navParams: NavParams
    , private navCtrl: NavController
    , private util: Util) {
    //quando o usuário entrar na tela, exibe o load, assim que avançar e voltar, não exibe
    this.exibirLoading = true;
  }

  ionViewDidEnter() {
    this.obterTodos(null, this.exibirLoading);
  }

  obterTodos(pullRefresh, executaLoading: boolean) {
    this.exibirLoading = false;
    if (executaLoading) {
      this.util.iniciarLoad();
    }
    this.subCategoriaService.obterTodosPorCategoria(this.navParams.get("idCategoria")).then((resp) => {
      this.subCategorias = resp;
      this.subCategoriasAux = Object.assign([], resp);
      if (executaLoading) {
        this.util.pararLoad();
      }
      if (pullRefresh) {
        pullRefresh.complete();
      }
    }).catch((erro) => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  getItems(event: any) {
    const val = event.target.value;
    this.subCategorias = Object.assign([], this.subCategoriasAux);
    if (val && val.trim() != '') {
      this.subCategorias = this.subCategorias.filter((item) => {
        return (item.dsTitulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  avancar(idSubcategoria: number, dsTitulo : string) {
    this.navCtrl.push(ListarTopicos, { idSubcategoria: idSubcategoria, dsTitulo : dsTitulo });
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }

}
