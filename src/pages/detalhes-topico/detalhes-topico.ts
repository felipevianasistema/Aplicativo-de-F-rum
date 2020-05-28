import { Component, OnInit } from "@angular/core";
import { NavParams, NavController, ModalController, AlertController } from "ionic-angular";
import { UsuarioSessao } from "../../entidades/UsuarioSessao";
import { NovoTopico } from "../novo-topico/novo-topico";
import { PageResposta } from "../page-resposta/page-resposta";
import { Resposta } from "../../entidades/Resposta";
import { ConteudoTopico } from "../../entidades/ConteudoTopico";
import { Util } from "../util/Util";
import { ExibicaoFotoPerfil } from "../exibicao-foto-perfil/exibicao-foto-perfil";
import { Constantes } from "../../app/constante/Constantes";
import { TopicoService } from "../../services/TopicoService";
import { RespostaService } from "../../services/RespostaService";

@Component({
  selector: 'detalhes-topico',
  templateUrl: 'detalhes-topico.html'
})
export class DetalhesTopico implements OnInit {

  chamarServico: boolean = false; // quem chamar esta página, deve informar se o serviço deve ou não ser chamado
  idTopico: number;
  conteudoTopico: ConteudoTopico;
  idUsuarioLogado: number = UsuarioSessao.idUsuario;
  avatarPadraoMasculino: string = Constantes.AVATAR_MASCULINO_PADRAO;
  avatarPadraoFeminino: string = Constantes.AVATAR_FEMININO_PADRAO;

  constructor(private navParams: NavParams
    , private navCtrl: NavController
    , private modalController: ModalController
    , private topicoService: TopicoService
    , private respostaService: RespostaService
    , private alertCtrl: AlertController
    , public util: Util) {
  }

  ngOnInit(): void {
    this.chamarServico = this.navParams.get("chamarServico");
    if (this.chamarServico) {
      this.idTopico = this.navParams.get('idTopico');
      this.obterConteudoTopico();
    } else {
      this.conteudoTopico = this.navParams.get('conteudoTopico');
      //obtem pra quando o usuário chamar o "ion-refresher", atualizar os dados do tópico.
      this.idTopico = this.conteudoTopico.topico.idTopico;
    }
  }

  obterConteudoTopico(pullRefresh?) {
    if (!pullRefresh) {
      this.util.iniciarLoad();
    }
    this.topicoService.obterConteudoTopico(this.idTopico).then(result => {
      this.conteudoTopico = result;
      if (!pullRefresh) {
        this.util.pararLoad();
      } else {
        pullRefresh.complete();
      }
    }).catch(erro => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  ampliarImagem(img: string, nome: string) {
    let modal = this.modalController.create(ExibicaoFotoPerfil, { "img": img, "nome": nome });
    modal.present();
  }

  editarTopico() {
    this.navCtrl.push(NovoTopico, { topico: this.conteudoTopico.topico, opcao: 'E', titulo: 'Editar' });
  }

  responder() {
    this.navCtrl.push(PageResposta, { conteudoTopico: this.conteudoTopico, opcao: 'R', titulo: 'Responder' });
  }

  editarResposta(resposta: Resposta) {
    this.navCtrl.push(PageResposta, { resposta: resposta, opcao: 'E', titulo: 'Editar Resposta' });
  }

  confirmarExclusaoResposta(resposta: Resposta) {
    const prompt = this.alertCtrl.create({
      title: 'Aviso',
      message: "Tem certeza que deseja excluir esta resposta?",
      buttons: [
        {
          text: 'Não',
          handler: data => {
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.excluirResposta(resposta);
          }
        }
      ]
    });
    prompt.present();
  }


  private excluirResposta(resposta: Resposta) {
    this.util.iniciarLoad();
    this.respostaService.excluirPorId(resposta.idResposta).then((result) => {
      this.util.pararLoad();
      //remove o item excluir da tela
      this.conteudoTopico.respostas = this.conteudoTopico.respostas.filter((i) => i.idResposta != resposta.idResposta);
      this.util.showAlert(result);
    }).catch(erro => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

  confirmarExclusaoTopico(idTopico: number) {
    const prompt = this.alertCtrl.create({
      title: 'Aviso',
      message: "Tem certeza que deseja excluir o tópico completo?",
      buttons: [
        {
          text: 'Não',
          handler: data => {
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.excluirTopico(idTopico);
          }
        }
      ]
    });
    prompt.present();
  }


  private excluirTopico(idTopico: number) {
    this.util.iniciarLoad();
    this.topicoService.excluirTopicoRespostas(idTopico).then((result) => {
      this.util.pararLoad();
      //this.util.showAlert(result);
      this.navCtrl.pop();
    }).catch(erro => {
      this.util.pararLoad();
      this.util.showAlert(erro);
    });
  }

}
