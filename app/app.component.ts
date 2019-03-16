import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';

// import { issueManager } from '../index';
// import { IssueService } from './issue.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers : [IssueService]
})
export class AppComponent {
  title = 'tut';
  // issueManager = issueManager;
  // constructor(private issueService: IssueService) {}
  // setupIssues = () => {
  //   this.issueService.getAllIssues().subscribe(res => {
  //     for (const r of res) {
  //       this.issueManager.create(r);
  //     }
  //     this.issueService.setupIssueManager(this.issueManager);
  //   });
  // }

  // OnInit() {

  // }

  // ngOnInit() {
  //   this.setupIssues();
  // }
}
