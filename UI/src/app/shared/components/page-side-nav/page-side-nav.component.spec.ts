import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSideNavComponent } from './page-side-nav.component';

describe('PageSideNavComponent', () => {
  let component: PageSideNavComponent;
  let fixture: ComponentFixture<PageSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSideNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
