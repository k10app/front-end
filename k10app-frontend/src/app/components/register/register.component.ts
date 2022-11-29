import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';
import {UserRegister} from "../../../models/Auth-models";
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
      const verified = this.userService.register(<UserRegister>this.registerForm.value);
      if(verified) {
        this.router.navigate(["/store"]);
      }
    }
  }
}
