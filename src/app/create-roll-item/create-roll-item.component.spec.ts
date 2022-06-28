import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRollItemComponent } from './create-roll-item.component';

describe('CreateRollItemComponent', () => {
  let component: CreateRollItemComponent;
  let fixture: ComponentFixture<CreateRollItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRollItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRollItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
