import {Component, inject} from '@angular/core';
import {AlertasService} from "../../core/utils/alertas.service";

@Component({
  selector: 'app-pasarela',
  imports: [],
  templateUrl: './pasarela.html',
  styleUrl: './pasarela.scss',
})
export class Pasarela {
  private alertService = inject(AlertasService)

  confirmar(){

    this.alertService.alert('Tu pago','Ha sido confirmado con exito','success')
  }

}
