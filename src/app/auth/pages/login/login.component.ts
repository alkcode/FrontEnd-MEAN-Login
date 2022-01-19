import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .content{
      margin-top:10%;
      border-radius:10%;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    }`
  ]
})
export class LoginComponent {

  miFormulario:FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor( 
    private fb:FormBuilder,
    private router: Router,
    private authService:AuthService
  ) { }

    login(){
      console.log(this.miFormulario.value);   
      const {email,password} = this.miFormulario.value;
      this.authService.login(email,password)
      .subscribe(ok =>{
        console.log(ok)
          if(ok ===true){
            this.router.navigateByUrl('/dashboard');
          }else{
              Swal.fire('Error',ok.msg , 'error')
          }
      });


      // this.authService.validarToken()
      // .subscribe(res=>{
      //   console.log(res)
      // })

    }

}
