import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDataComponent } from './recipe-data.component';

describe('RecipeDataComponent', () => {
  let component: RecipeDataComponent;
  let fixture: ComponentFixture<RecipeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDataComponent]
    });
    fixture = TestBed.createComponent(RecipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
