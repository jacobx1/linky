import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import LinkyClient from '../../api/linkyClient';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameControl = new FormControl();
  passwordControl = new FormControl();

  private router: Router;
  private route: ActivatedRoute;

  constructor(r: Router, rt: ActivatedRoute) {
    this.router = r;
    this.route = rt;
  }

  ngOnInit() {}

  async login() {
    const resp = await LinkyClient.post(
      '/login',
      {
        form: {
          username: this.usernameControl.value,
          password: this.passwordControl.value
        }
      },
      (error, resp) => {
        if (error) {
          console.error(error);
        } else if (resp.statusCode === 200) {
          this.router.navigate(['/']);
        }
      }
    );

    console.log(resp);
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
