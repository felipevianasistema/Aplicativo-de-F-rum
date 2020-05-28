import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController, Loading, LoadingController } from 'ionic-angular';
import { Constantes } from '../../app/constante/Constantes';

@Injectable()
export class Util {

    private loading: Loading;

    constructor(private alertCtrl: AlertController
        , private network: Network
        , private loadingCtrl: LoadingController) {

    }

    /**
     * Remove todos os acentos da string
     * @param str
     */
    removerAcentos(str) {
        let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let novastr = "";
        for (let i = 0; i < str.length; i++) {
            let troca = false;
            for (let a = 0; a < com_acento.length; a++) {
                if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                    novastr += sem_acento.substr(a, 1);
                    troca = true;
                    break;
                }
            }
            if (troca == false) {
                novastr += str.substr(i, 1);
            }
        }
        return novastr;
    }

    /**
     * 
     * @param email Validação temporária do e-mail (ajustar)
     */
    validarEmail(email: string): boolean {
        if (email.indexOf('@') == -1 || email.indexOf('.') == -1 || email.indexOf(' ') > -1) {
            return false;
        }
        return true;
    }

    showAlert(msg: string) {
        let alert = this.alertCtrl.create({
            title: "Aviso",
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    exibirBannerAdMobPequeno() {
     
    }

    exibirBannerAdMob() {
     
    }

    verificarConexaoInternet(): boolean {
        if (this.network.type == 'none') {
            return false;
        }
        return true;
    }

    /**
     * Verifica se a mensagem possui link e adiciona a tag <a>
     */
    public detectarLink(msg: string): string {
        if (msg) {
            msg = msg.split('\n').join('<br>');
            let temp: string[] = msg.split(" ");
            msg = "";
            temp.forEach(item => {
                if (item.startsWith('www.')) {
                    msg = msg + " <a href='http://" + item + "' target='_blank'> http://" + item + "</a> ";
                } else if (item.startsWith('https://') || item.startsWith('http://')) {
                    msg = msg + " <a href='" + item + "' target='_blank'>" + item + "</a> ";
                } else {
                    msg = msg + " " + item;
                }
            });
            msg = msg.split('<br>').join('\n');
        }
        return msg;
    }

    public iniciarLoad(mensagem: string = Constantes.MSG_AGUARDE) {
        this.loading = this.loadingCtrl.create({
            content: mensagem
        });
        this.loading.present();
    }

    public pararLoad() {
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    /**
     * Aumenta o tamanho do campo do text area, de acordo com o texto digitado.
     * @param event 
     */
    public autoResizeTextArea(event: any): void {
        let textarea: any = event.target;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        return;
    }

}