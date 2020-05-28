import { Util } from './../pages/util/Util';
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//import { Observable } from "rxjs/Observable";
import { UsuarioSessao } from "../entidades/UsuarioSessao";
import { Observable } from 'rxjs';
@Injectable() 
export class BaseProvider {

   urlBase: string = "http://localhost:8084/WsTopicos/services/"; 

    constructor(public http: Http
    , private util : Util) { } 
 
    /**
     * Requisição genérica de chamada dos serviços.
     * Trata o erro caso o JWT retorne um erro 401 de ação não autorizada
     * POST (implementar PUT/GET e DELETE)
     * @param parametro 
     * @param url 
     */
    requestService(parametro: any, url: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            //verifica se o dispositivo está conectado a internet
            if(!this.util.verificarConexaoInternet()){
                resolve({ cod: "", msg: "O seu dispositivo não está conectado a internet." });
                return;
            }
            this.enviarRequest(parametro, url).subscribe(result => {
                resolve(result);
            }, erro => {
                if (erro == 401) {
                    resolve({ cod: "401", msg: "Ação não autorizada, favor efetue o login novamente." });
                    return;
                }
                resolve({ cod: "", msg: erro });
            });
        })
    }

  private enviarRequest(parametro: any, url: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', UsuarioSessao.token)
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.urlBase + url, JSON.stringify(parametro), options)
            .map(res => res.json())
            .catch(erro => {
                if (erro.status === 401) {
                    //status de requição não autorizada
                    return Observable.throw(401);
                }
                return Observable.throw("Houve um erro inesperado, contate o administrador ou tente novamente mais tarde.");
            })
    }

}