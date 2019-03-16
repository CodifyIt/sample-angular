import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, of, from } from 'rxjs';
import Issue from '../models/Issue';
import Priority from '../models/Priority';
// import { BehaviorSubject } from 'rxjs';
// import IssueManager from '../managers/IssueManager';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  // issueManager = new IssueManager();
  // private issueMgr = new BehaviorSubject(this.issueManager);
  // issueMngr = this.issueMgr.asObservable();
  url: string;
  url_prefix = 'http://localhost:8000';
  constructor(private http: HttpClient ) {
    this.url = this.url_prefix + '/api/v1/issues/';
  }

  // setupIssueManager (issueM: IssueManager) {
  //   this.issueMgr.next(issueM);
  //   console.log('this should setup second : ' + this.issueMgr.getValue().getTotalCount());
  //   // console.log('total count : ' + issueM.getTotalCount());
  // }

  // getPriorityIssues = (priority: number, limit: number) => {
  //   // while (this.issueMgr.getValue().getTotalCount() === 0) {}
  //   return this.issueMgr.getValue().getPriorityIssues(priority, limit);
  // }

  getAllIssues (): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.url);
  }

  getIssuesByPriority (priority: Priority, limit: number): Observable<Issue> {
    return this.http.get<Issue>(this.url + '?severity=' + priority + '&limit=' + limit);
  }

  getIssuesOrderedByCreationDate (order: string, limit: number): Observable<Issue> {
    let ORDER = ''; // FOR ASCENDING
    if (order === 'desc') {
      ORDER = '-';
    }

    return this.http.get<Issue>(this.url + '?ordering='+ ORDER + 'created_at' + '&limit=' + limit);
  }

  getIssuesByProject (projectId: number) {
    return this.http.get<Issue>(this.url + '?project=' + projectId);
  }

  getIssuesByAssignee (assigneeId: number) {
    return this.http.get<Issue>(this.url + '?asignee=' + assigneeId);
  }

  getIssuesByStatusProjectAssignee (status: string, project: string, assignee: string) {
    return this.http.get<Issue>(this.url + '?status=' + status + '&project=' + project + '&assignee=' + assignee);
  }
}
