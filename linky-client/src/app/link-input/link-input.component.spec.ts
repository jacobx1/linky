import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkInputComponent } from './link-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LinkInputComponent', () => {
  let component: LinkInputComponent;
  let fixture: ComponentFixture<LinkInputComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LinkInputComponent],
        imports: [
          FormsModule,
          MatInputModule,
          MatButtonModule,
          MatFormFieldModule,
          BrowserAnimationsModule,
          ReactiveFormsModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
