import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsgvoPage } from './dsgvo.page';

describe('DsgvoPage', () => {
  let component: DsgvoPage;
  let fixture: ComponentFixture<DsgvoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DsgvoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
