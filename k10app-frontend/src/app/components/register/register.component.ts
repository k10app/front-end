import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';
import {UserRegister} from "../../../models/Auth-models";
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  checkValid(name: string): boolean {
    return this.registerForm.get(name)?.invalid as boolean && this.registerForm.get(name)?.dirty as boolean
  }

  checkPasswords(): boolean {
    let invalid = false
    if(this.registerForm.get("confirmPassword")?.dirty as boolean) {
      if(this.registerForm.get("password")?.value != this.registerForm.get("confirmPassword")?.value) {
        invalid = true
      }
    }
    return invalid
  }

  registerProcess() {
    if(this.registerForm.valid) {
      this.userService.register(<UserRegister>this.registerForm.value)
        .subscribe({
          next: (res) => {
            if(res.status == "ok") {
              const jwt_string = `Bearer ${res.jwt}`;
              localStorage.setItem("jwt", jwt_string);
              localStorage.setItem("isAuth", "true");
              this.userService.sendAuth.next(true);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Register Successful!',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout( () =>{
                this.router.navigate(['/', 'store']);
              }, 1500);
            }
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              title: "Register Error",
              text: error
            })
          }
        })
    } else {
      Swal.fire({
        icon: "error",
        title: "Form Error",
        text: "Data missing from form"
      })
    }
  }
}
