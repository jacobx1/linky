import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LinkyClient, handleRequestReject } from '../../api/linkyClient';
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
      }
    ).then(resp => {
      this.router.navigate(['/']);
    }).catch(handleRequestReject);

    console.log(resp);
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
