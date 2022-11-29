import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { UserService } from "../../services/user.service";
import {Router} from '@angular/router';
import {LoginData} from "../../../models/Auth-models";
import Swal from 'sweetalert2';

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
      const verified = this.userService.login(<LoginData>this.loginForm.value);
      if(verified) {
        this.router.navigate(['/', 'store']);
      }
    } else {
      alert("Form is missing stuff");
    }
  }



}
