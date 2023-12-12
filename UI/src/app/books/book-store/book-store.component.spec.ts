import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreComponent } from './book-store.component';

describe('BookStoreComponent', () => {
  let component: BookStoreComponent;
  let fixture: ComponentFixture<BookStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
