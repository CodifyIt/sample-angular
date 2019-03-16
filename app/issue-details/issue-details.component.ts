import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import IssueDetail from '../../models/IssueDetail';
import { DataService } from '../data.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})

export class IssueDetailsComponent implements OnInit {

  id: string;
  issueDetail: IssueDetail;
  PRIORITY: {};
  subscription: Subscription;
  username: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private dataService: DataService,
    private storageService: StorageService
  ) {}

  assigneeUsername = () => {
    this.username = this.storageService.assignee;
    // this.dataService.currentAssignee.subscribe(username => {
    //   this.username = username;
    //   console.log('usrname: ' + username);
    // });
    return true;
  }

  edit = () => {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: this.issueDetail
    // };

    // return this.router.navigate(['create'], navigationExtras);

    this.storageService.storage = this.issueDetail;
    this.router.navigate(['create']);
  }

  deleteIssue() {
    this.issueDetail.description_part = this.issueDetail.description;
    this.dataService.deleteIssue(this.issueDetail);
    // this.router.navigate(['dashboard']);
  }

  OnInit() {
  }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('issues');
    // console.log(this.id);
    this.PRIORITY = {
      1: 'LOW',
      2: 'MEDIUM',
      3: 'HIGH'
    };
    this.assigneeUsername();
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.id = params.get('id');
      // console.log(params);
      this.dataService.getIssueDetail(this.id).subscribe(res => {
        this.issueDetail = res;
        this.issueDetail.severity = this.PRIORITY[this.issueDetail.severity];
      });
    });
  }

}
