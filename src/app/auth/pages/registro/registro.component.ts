import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
    `
    .content{
      margin-top:10%;
      border-radius:10%;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
    
    `
  ]
})
export class RegistroComponent {

  miFormulario:FormGroup = this.fb.group({
    name:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb:FormBuilder,
    private authService: AuthService,
    private router: Router) { }

    registro(){
      console.log(this.miFormulario.value);   
      console.log(this.miFormulario.valid); 
      const {name, email, password} = this.miFormulario.value;
      this.authService.registro(name, email, password)
      .subscribe(ok=>{
          console.log(ok)
          if(ok === true){
            this.router.navigateByUrl('/dashboard')
          }else{
            Swal.fire('Error', ok, 'error')
          }
      });
      
      

    }

}
