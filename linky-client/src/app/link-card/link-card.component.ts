import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import link from '../model/link';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css']
})
export class LinkCardComponent implements OnInit {
  @Input() link: link;

  @Output('deleteLink')
  deleteLink: EventEmitter<link> = new EventEmitter<link>();

  ngOnInit() {}

  deleteCard() {
    this.deleteLink.emit(this.link);
  }
}
