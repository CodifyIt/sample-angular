import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers : [DataService]
})
export class DashboardComponent implements OnInit {
  // issueManager = issueManager;
  // constructor(private issueService: IssueService) {}
  // setupIssues = () => {
  //   this.issueService.getAllIssues().subscribe(res => {
  //     for (const r of res) {
  //       this.issueManager.create(r);
  //     }
  //   });
  // }

  OnInit() {

  }

  ngOnInit() {
    // this.setupIssues();
  }
}
