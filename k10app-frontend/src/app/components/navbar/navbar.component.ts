import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth = false;
  private subscription: Subscription | undefined;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.userService.sendAuth.subscribe((auth) => {
      this.isAuth = auth
    })
  }

  ngOnDestroy() {

  }
}
