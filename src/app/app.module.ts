import { SuporteProvider } from './../providers/SuporteProvider';
import { SuporteService } from './../services/SuporteService';
import { FaleConosco } from './../pages/fale-conosco/fale-conosco';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AdMobFree } from '@ionic-native/admob-free';
import { Util } from '../pages/util/Util';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Login } from '../pages/login/login';
import { Cadastro } from '../pages/cadastro/cadastro';
import { UsuarioService } from '../services/UsuarioService';
import { IncludeImagemUpload } from './components/includeImagemUpload';
import { UsuarioProvider } from '../providers/UsuarioProvider';
import { BaseProvider } from '../providers/BaseProvider';
import { Camera } from '@ionic-native/camera';
import { TopicoService } from '../services/TopicoService';
import { TopicoProvider } from '../providers/TopicoProvider';
import { TelaForum } from '../pages/tela-forum/tela-forum';
import { ListarTopicos } from '../pages/listar-topicos/listar-topicos';
import { DetalhesTopico } from '../pages/detalhes-topico/detalhes-topico';
import { NovoTopico } from '../pages/novo-topico/novo-topico';
import { PageResposta } from '../pages/page-resposta/page-resposta';
import { RespostaService } from '../services/RespostaService';
import { RespostaProvider } from '../providers/RespostaProvider';
import { EsqueceuSenha } from '../pages/esqueceu-a-senha/esqueceu-a-senha';
import { AtualizarDadosIndex } from '../pages/atualizar-dados/menu-atualizar-dados-index';
import { PageAtualizarSenha } from '../pages/atualizar-dados/atualizar-senha/page-atualizar-senha';
import { PageAtualizarInformacoes } from '../pages/atualizar-dados/atualizar-informacoes/page-atualizar-informacoes';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ExibicaoFotoPerfil } from '../pages/exibicao-foto-perfil/exibicao-foto-perfil';
import { PageCategoria } from '../pages/page-categoria/page-categoria';
import { CategoriaService } from '../services/CategoriaService';
import { CategoriaProvider } from '../providers/CategoriaProvider';
import { PageSubCategoria } from '../pages/page-subcategoria/page-subcategoria';
import { SubCategoriaProvider } from '../providers/SubCategoriaProvider';
import { SubCategoriaService } from '../services/SubCategoriaService';
import { BlocoAnotacoesIndex } from '../pages/atualizar-dados/bloco-anotacoes/bloco-anotacoes-index/bloco-anotacoes-index';
import { BlocoAnotacoesNovo } from '../pages/atualizar-dados/bloco-anotacoes/bloco-anotacoes-novo/bloco-anotacoes-novo';
import { BlocoAnotacaoService } from '../services/BlocoAnotacaoService';
import { BlocoAnotacoesExibicao } from '../pages/atualizar-dados/bloco-anotacoes/bloco-anotacoes-exibicao/bloco-anotacoes-exibicao';
import { BlocoAnotacaoProvider } from '../providers/BlocoAnotacaoProvider';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Cadastro,
    IncludeImagemUpload,
    TelaForum,
    ListarTopicos,
    DetalhesTopico,
    NovoTopico,
    PageResposta,
    EsqueceuSenha,
    AtualizarDadosIndex,
    PageAtualizarSenha,
    PageAtualizarInformacoes,
    FaleConosco,
    ExibicaoFotoPerfil,
    PageCategoria,
    PageSubCategoria,
    BlocoAnotacoesIndex,
    BlocoAnotacoesNovo,
    BlocoAnotacoesExibicao
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Cadastro,
    IncludeImagemUpload,
    TelaForum,
    ListarTopicos,
    DetalhesTopico,
    NovoTopico,
    PageResposta,
    EsqueceuSenha,
    AtualizarDadosIndex,
    PageAtualizarSenha,
    PageAtualizarInformacoes,
    FaleConosco,
    ExibicaoFotoPerfil,
    PageCategoria,
    PageSubCategoria,
    BlocoAnotacoesIndex,
    BlocoAnotacoesNovo,
    BlocoAnotacoesExibicao
  ],
  providers: [
    Util,
    StatusBar,
    SplashScreen,
    AdMobFree,
    InAppBrowser,
    UsuarioService,
    UsuarioProvider,
    BaseProvider,
    TopicoService,
    TopicoProvider,
    RespostaService,
    RespostaProvider,
    SuporteService,
    SuporteProvider,
    Camera,
    Network,
    SocialSharing,
    CategoriaService,
    CategoriaProvider,
    SubCategoriaService,
    SubCategoriaProvider,
    BlocoAnotacaoService,
    BlocoAnotacaoProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
