import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

import Priority from '../../models/Priority';
import { DataService } from '../data.service';
import Issue from '../../models/Issue';
import Developer from '../../models/Developer';
import Project from '../../models/Project';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
  providers : [DataService]
})
export class IssuesListComponent implements OnInit {

  @Input() public heading: string;
  @Input() public showAssignee: boolean;
  @Input() public assignee: Developer;
  @Input() public project: Project;
  @Input() public projectNotifier: Subject<Project>;
  @Input() public assigneeNotifier: Subject<Developer>;
  cards: Array<Issue> = new Array<Issue>();
  assignees: Array<Developer> = new Array<Developer>();

  // getCards = () => {
  //   this.cards = this.issueMngr.getByPriority(Priority.HIGH, 4);
  // }
  result: Boolean;
  listLength: {};
  // issueManager = issueManager;
  constructor(private dataService: DataService) { }
  // getFourHighIssues = () => {
  //   this.dataService.issueMngr.subscribe(res => {
  //     console.log('priority issues : ' + this.dataService.getPriorityIssues(Priority.HIGH, 4).length);
  //   });
  // }
  getIssues = () => {
    // console.log('length : ' + this.dataService.getPriorityIssues(Priority.HIGH, 4).length);
    if (this.heading === 'High Priority') {
      this.dataService.getIssuesByPriority(Priority.HIGH, 4).subscribe(res => {
          this.cards = res.results;
      });
    } else if (this.heading === 'Recently Updated Issues') {
      this.dataService.getIssuesOrderedByUpdationDate('desc', 4).subscribe(res => {
        this.cards = res.results;
      });
    } else if ( this.heading === 'Todo') {
      this.dataService.getAllAssignees().subscribe(dev => {
        this.dataService.getIssuesByStatusProjectAssignee('Open', this.project, this.assignee).subscribe(res => {
          this.assignees = dev;
          this.cards = res;
          this.dataService.addAssigneeToIssueCard(this.cards, this.assignees);
        });
      });
    } else if (this.heading === 'In Progress') {
      this.dataService.getAllAssignees().subscribe(dev => {
        this.dataService.getIssuesByStatusProjectAssignee('In Progress', this.project, this.assignee).subscribe(res => {
          this.assignees = dev;
          this.cards = res;
          this.dataService.addAssigneeToIssueCard(this.cards, this.assignees);
        });
      });
    } else {
      // heading = Done
      this.dataService.getAllAssignees().subscribe(dev => {
        this.dataService.getIssuesByStatusProjectAssignee('Resolved', this.project, this.assignee).subscribe(res => {
          this.assignees = dev;
          this.cards = res;
          this.dataService.addAssigneeToIssueCard(this.cards, this.assignees);
        });
      });
    }
  }

  OnInit() {

  }

  ngOnInit() {
    this.getIssues();
    if ( this.projectNotifier != null) {
      this.projectNotifier.subscribe(project => {
        this.project = project;
        console.log('Project');
        this.getIssues();
      });
    }

    if ( this.assigneeNotifier != null) {
      this.assigneeNotifier.subscribe(assignee => {
        this.assignee = assignee;
        this.getIssues();
      });
    }
  }
}
