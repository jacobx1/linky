import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LinkyClient } from '../../api/linkyClient';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailControl = new FormControl();
  usernameControl = new FormControl();
  passwordControl = new FormControl();
  passwordConfirmControl = new FormControl();

  private router: Router;
  private route: ActivatedRoute;

  constructor(r: Router, rt: ActivatedRoute) {
    this.router = r;
    this.route = rt;
  }

  ngOnInit() {}

  async signup() {
    const resp = await LinkyClient.post(
      '/signup',
      {
        form: {
          username: this.usernameControl.value,
          email: this.emailControl.value,
          password: this.passwordControl.value,
          passwordConfirm: this.passwordConfirmControl.value
        }
      }
    ).then(resp => {
      if (resp.statusCode === 201) {
        this.router.navigate(['/login']);
      }
    }).catch(console.error);

    console.log(resp);
  }
}
