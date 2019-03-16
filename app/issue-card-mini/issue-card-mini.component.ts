import { Component, OnInit, Input } from '@angular/core';
import Issue from '../../models/Issue';
import Developer from '../../models/Developer';
import { DataService } from '../data.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-issue-card-mini',
  templateUrl: './issue-card-mini.component.html',
  styleUrls: ['./issue-card-mini.component.scss']
})
export class IssueCardMiniComponent {
  @Input() public showAssignee: boolean;
  @Input() public issueData: Issue;

  constructor(private dataService: DataService,
              private storageService: StorageService
    ) {}

  sendAssignee = () => {
    if (this.issueData.assignee) {
      console.log('Sent : ' + this.issueData.assignee.username);
      this.storageService.assignee = this.issueData.assignee.username;
    } else {
      console.log('Sent : None');
      this.dataService.setAssigneeUsername('None');
    }
  }

  OnInit(): void {
  }
}
