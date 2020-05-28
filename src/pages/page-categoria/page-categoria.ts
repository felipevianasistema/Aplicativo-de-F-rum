import { Component } from '@angular/core';
import { Categoria } from '../../entidades/Categoria';
import { CategoriaService } from '../../services/CategoriaService';
import { Util } from '../util/Util';
import { NavController } from 'ionic-angular';
import { PageSubCategoria } from '../page-subcategoria/page-subcategoria';

@Component({
  selector: 'page-categoria',
  templateUrl: 'page-categoria.html'
})
export class PageCategoria {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService
    , private navCtrl : NavController
    , private util: Util) {
  }

  ngAfterViewInit() {
    this.obterTodos();
  }

  obterTodos() {
    this.util.iniciarLoad();
    this.categoriaService.obterTodos().then((resp) => {
      this.categorias = resp;
      this.util.pararLoad();
    }).catch((erro) => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  avancar(id : number){
    this.navCtrl.push(PageSubCategoria, {idCategoria : id});
  }

}
