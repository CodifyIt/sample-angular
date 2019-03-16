import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import Project from '../../models/Project';
import Developer from '../../models/Developer';

import { DataService } from '../data.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  providers: [DataService]
})
export class KanbanBoardComponent implements OnInit {

  projects: Array<Project> = new Array<Project>();
  assignees: Array<Developer> = new Array<Developer>();
  selectedProject: Project;
  selectedAssignee: Developer;
  changedProject = new Subject<Project>();
  changedAssignee = new Subject<Developer>();

  constructor(private dataService: DataService) { }

  changeProject = () => {
    console.log('here');
    this.changedProject.next(this.selectedProject);
  }

  changeAssignee = () => {
    this.changedAssignee.next(this.selectedAssignee);
  }

  showResults = (typ: string) => {
    if (typ === 'project') {
      return this.projects;
    } else {
      return this.assignees;
    }
  }

  getProjects = () => {
    this.dataService.getAllProjects().subscribe(res => {
      this.projects = res;
    });
  }

  getAssignees = () => {
    this.dataService.getAllAssignees().subscribe(res => {
      this.assignees = res;
    });
  }

  OnInit() {

  }

  ngOnInit() {
    this.getProjects();
    this.getAssignees();
  }

}
