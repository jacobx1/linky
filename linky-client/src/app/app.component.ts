import { Component, OnInit } from '@angular/core';
import link from './model/link';
import LinkyClient from '../api/linkyClient';
import linkyClient from '../api/linkyClient';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
