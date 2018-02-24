import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LinkManagerComponent } from './link-manager.component';
import { LinkCardComponent } from '../link-card/link-card.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { LinkInputComponent } from '../link-input/link-input.component';
import { MatProgressBarModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LinkManagerComponent', () => {
  let component: LinkManagerComponent;
  let fixture: ComponentFixture<LinkManagerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          LinkManagerComponent,
          LinkCardComponent,
          LinkInputComponent
        ],
        imports: [
          RouterTestingModule,
          SortablejsModule,
          MatProgressBarModule,
          MatCardModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
