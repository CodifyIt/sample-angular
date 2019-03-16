import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import Developer from '../../models/Developer';
import Project from '../../models/Project';
import Issue from '../../models/Issue';
import { DataService } from '../data.service';
import { StorageService } from '../storage.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  assignees: Array<Developer> = new Array<Developer>();
  projects: Array<Project> = new Array<Project>();
  issue: Issue;

  constructor(
    private formGroup: FormBuilder,
    private dataService: DataService,
    private storageService: StorageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    ) {}

  createIssueForm = this.formGroup.group({
    title: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    type: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    assignee: new FormControl('', Validators.required),
    labels: new FormControl(''),
    project: new FormControl('', Validators.required),
    description: new FormControl(''),
    due_date: new FormControl(''),
  });

  getAssignees = () => {
    this.dataService.getAllAssignees().subscribe(res => {
      this.assignees = res;
    });
  }

  getProjects = () => {
    this.dataService.getAllProjects().subscribe(res => {
      this.projects = res;
    });
  }

  addIssue = (): boolean => {
      const updated_at = new Date().toISOString();
      let created_at = updated_at;
      if (this.storageService.storage) {
        created_at = this.storageService.storage.created_at;
      }
      this.dataService.getAllIssues().subscribe(res => {
        let id = res.length + 1;

        if (this.storageService.storage) {
          id = this.storageService.storage.id;
        }
        const issue = new Issue(
            id,
            this.createIssueForm.value.description,
            created_at,
            updated_at,
            this.createIssueForm.value.title,
            this.createIssueForm.value.status,
            this.createIssueForm.value.priority,
            this.createIssueForm.value.due_date,
            this.createIssueForm.value.type,
            this.createIssueForm.value.project,
            this.createIssueForm.value.labels,
            this.createIssueForm.value.assignee
          );
          if (!this.storageService.storage) {
            this.dataService.postIssue(issue).subscribe(result => {
              console.log(result);
              });
          } else {
            console.log('sending put request');
            issue.description_part = issue.description;
            this.dataService.putIssue(issue);
          }

      });
      // this.createIssueForm.reset();
    return true;
  }

  patchForm = () => {
    if (this.storageService.storage) {
      const data = this.storageService.storage;
      const PRIORITY = {
        'LOW': 1,
        'MEDIUM': 2,
        'HIGH': 3
      };

      this.createIssueForm.patchValue({
        title: data.title,
        type : data.type,
        priority : PRIORITY[data.severity],
        assignee : data.assignee,
        labels : data.labels,
        project : data.project,
        description : data.description,
        due_date : data.due_date,
        status: data.status
      });
    }
  }

  ngOnInit() {
    this.getAssignees();
    this.getProjects();
    this.patchForm();
  }

}
