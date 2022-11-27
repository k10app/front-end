import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { UserService } from "../../services/user.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  loginProcess() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(result => {
        console.log(result);
        this.router.navigate(["/store"])
      })
    }
  }

}
