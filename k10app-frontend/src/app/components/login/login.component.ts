import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { UserService } from "../../services/user.service";
import {Router} from '@angular/router';
import {LoginData} from "../../../models/Auth-models";
import Swal from 'sweetalert2';
import {isCI} from "@angular/cli/src/utilities/environment-options";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  loginProcess() {
    if(this.loginForm.valid) {
      this.userService.login(<LoginData>this.loginForm.value)
        .subscribe({
          next: (res) => {
            if(res.status == "ok") {
              this.userService.sendAuth.next(true);
              const jwt_string = `Bearer ${res.jwt}`;
              localStorage.setItem("jwt", jwt_string);
              localStorage.setItem("isAuth", "true");
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful!',
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
              title: "Login Error",
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
