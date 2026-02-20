import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../../../core/services/register/register.service";
import {AlertasService} from "../../../core/utils/alertas.service";
@Component({
  selector: 'app-register',
    imports: [
        RouterLink,
        RouterLinkActive,
        ReactiveFormsModule
    ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
    private formBuilder=inject(FormBuilder)
    protected registerForm:FormGroup=this.formBuilder.group({
        nombre:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password1:['',Validators.required],
        password2:['',Validators.required]
    })
    private registerService=inject(RegisterService)
    private alertasService=inject(AlertasService)
    private router=inject(Router)

    register(){
        if(this.registerForm.invalid){
            alert('Datos introduccidos no validos')
            return
        }
        this.registerService.postregister(this.registerForm.value).subscribe({
            next:response=>{
                this.alertasService.alert('Registro','Con éxito','success')
                this.router.navigate(['/login'])
            }, error:error=>{
                this.alertasService.alert('Registro','Fallido','error')
                console.log(error);
            }
        })
    }


}
