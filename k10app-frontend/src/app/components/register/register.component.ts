import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  registerProcess() {
    if(this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(result => {
        console.log(result);
        this.router.navigate(["/store"]);
      })
    }
  }
}
