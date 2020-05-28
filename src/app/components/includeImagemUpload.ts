import { Component, Input } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Imagem } from "../../entidades/Imagem";

@Component({
  selector: 'includeImagemUpload',
  templateUrl: 'includeImagemUpload.html'
})

export class IncludeImagemUpload {

  @Input() label: string;
  @Input() labelDescricao: string;
  @Input() imagem: Imagem;
  @Input() permitirLimparImagem : boolean = true;

  options: CameraOptions = {
    targetWidth: 500,
    targetHeight: 550,
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private actionSheetCtrl: ActionSheetController
    , private camera: Camera) {
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          icon: 'camera',
          text: 'Câmera',
          handler: () => {
            this.abrirCamera();
          }
        }, {
          icon: 'image',
          text: 'Galeria',
          handler: () => {
            this.abrirGaleria();
          }
        }
      ]
    });
    actionSheet.present();
  }

  abrirCamera() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.options.correctOrientation = true;
    this.options.cameraDirection = 1;
    this.camera.getPicture(this.options).then((imageData) => {
      this.imagem.imagemBase64 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  abrirGaleria() {
    this.options.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    this.options.correctOrientation = true;
    this.camera.getPicture(this.options).then((imageData) => {
      this.imagem.imagemBase64 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  limpar() {
    this.imagem.imagemBase64 = null;
  }

}
