import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkManagerComponent } from './link-manager.component';

describe('LinkManagerComponent', () => {
  let component: LinkManagerComponent;
  let fixture: ComponentFixture<LinkManagerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LinkManagerComponent]
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
