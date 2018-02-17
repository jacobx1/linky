import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const urlFormat = /^https?:\/\//;

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.css']
})
export class LinkInputComponent implements OnInit {
  link: string;

  linkControl = new FormControl();

  @Output('savedLink')
  linkSaveEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  saveLink() {
    let linkInput: string = this.linkControl.value;
    if (linkInput === '') return;

    if (!linkInput.match(urlFormat)) {
      linkInput = 'https://' + linkInput;
    }

    this.linkSaveEvent.emit(linkInput);
    this.linkControl.reset(null, { emitEvent: false });
  }
}
