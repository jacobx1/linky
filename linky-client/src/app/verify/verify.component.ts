import { Component, OnInit } from '@angular/core';
import { LinkyClient, handleRequestReject } from '../../api/linkyClient';
import { Router } from '@angular/router';
import { Response } from 'request';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  message: string = 'Click it and get verified';

  constructor() { }

  ngOnInit() {
  }

  reverify() {
    LinkyClient.post('/verify')
      .then((resp: Response) => {
        this.message = resp.body;
      })
      .catch(handleRequestReject);
  }
}
