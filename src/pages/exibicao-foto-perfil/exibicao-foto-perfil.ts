import { Component } from "@angular/core";
import { NavParams } from 'ionic-angular';
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
  selector: 'exibicao-foto-perfil',
  templateUrl: 'exibicao-foto-perfil.html'
})

export class ExibicaoFotoPerfil {

  imagem: string;
  nome: string;

  constructor(private navParams: NavParams
    , public viewCtrl : ViewController) {
  }

  ngAfterViewInit() {
    this.imagem = this.navParams.get("img");
    this.nome = this.navParams.get("nome");
  }

} 
