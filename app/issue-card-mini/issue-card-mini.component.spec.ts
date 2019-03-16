import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCardMiniComponent } from './issue-card-mini.component';

describe('IssueCardMiniComponent', () => {
  let component: IssueCardMiniComponent;
  let fixture: ComponentFixture<IssueCardMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCardMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCardMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
