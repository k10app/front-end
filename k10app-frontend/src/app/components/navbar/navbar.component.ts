import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth = false;
  private subscription: Subscription | undefined;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.isAuth = this.userService.checkAuth();
    this.subscription = new Subscription();
    this.subscription = this.userService.sendAuth.subscribe((auth) => {
      this.isAuth = auth
    })
  }

  checkLogin() {
    if(localStorage.getItem("isAuth") != null) {
      if(localStorage.getItem("isAuth") == "true") {
        this.isAuth = true
      }
    }
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to order stuff!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, get me outta here!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful!',
          showConfirmButton: false,
          timer: 1500
          }
        );
        setTimeout( () =>{
          this.userService.logout();
          this.router.navigate(['/']);
        }, 1500);
      }
    })
  }

  ngOnDestroy() {

  }
}
