import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {LoginServices} from "../../../core/services/login/login.services";
import {AlertasService} from "../../../core/utils/alertas.service";

@Component({
  selector: 'app-login',
    imports: [
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
    ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
    private fb = inject(FormBuilder)
    protected loginForm:FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })
    private loginService=inject(LoginServices)
    private alertasService = inject(AlertasService)
    private router = inject(Router)


    login(){
        if (this.loginForm.invalid){
            alert('Formulario invalido')
            return
        }

        this.loginService.postLogin(this.loginForm.value).subscribe({
            next: response => {
                this.alertasService.alert('Bienvenido','Tus Datos son correctos','success')
                this.router.navigate(['/'])
            }, error: error => {
                this.alertasService.alert('Error','Datos introduccidos no son validos','error')
                console.log(error);
            }
        })



    }

}
