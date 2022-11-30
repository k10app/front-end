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
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  registerProcess() {
    if(this.registerForm.valid) {
      this.userService.register(<UserRegister>this.registerForm.value)
        .subscribe({
          next: (res) => {
            if(res.status == "ok") {
              localStorage.setItem("isAuth", "true");
              localStorage.setItem("jwt", res.jwt);
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
