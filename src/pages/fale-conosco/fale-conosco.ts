import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Constantes } from '../../app/constante/Constantes';
import { Contato } from "../../entidades/Contato";
import { Util } from "../util/Util";
import { SuporteService } from './../../services/SuporteService';

@Component({
  selector: 'fale-conosco',
  templateUrl: 'fale-conosco.html'
})

export class FaleConosco {

  contato: Contato = new Contato();
  dsAssuntoValidacao: string;
  dsMensagemValidacao: string;
  dsEmailRemetenteValidacao: string;

  constructor(public util: Util
    , private navCtrl: NavController
    , private suporteService: SuporteService) {
  }

  enviar() {
    if (this.validar()) {
      this.util.iniciarLoad();
        //indica de qual app foi enviado
        this.contato.assunto += " - Fale Conosco - App Fórum";
        this.suporteService.faleConosco(this.contato).then((result) => {
          this.navCtrl.pop();
          this.util.pararLoad();
          this.util.showAlert(result);
        }).catch(erro => {
          this.util.pararLoad();
          this.util.showAlert(erro);
        });
    }
  }

  validar(): boolean {
    if (!this.contato.assunto) {
      this.dsAssuntoValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsAssuntoValidacao = "";
    if (!this.util.validarEmail(this.contato.emailRemetente)) {
      this.dsEmailRemetenteValidacao = Constantes.MSG_EMAIL_INVALIDO;
      return false;
    }
    this.dsEmailRemetenteValidacao = "";
    if (!this.contato.mensagem) {
      this.dsMensagemValidacao = Constantes.MSG_CAMPO_OBRIGATORIO;
      return false;
    }
    this.dsMensagemValidacao = "";
    return true;
  }
} 
