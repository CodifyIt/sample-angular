import { Injectable } from '@angular/core';

import { catchError, retry } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, of, from, throwError, BehaviorSubject } from 'rxjs';
import Issue from '../models/Issue';
import IssueDetail from '../models/IssueDetail';
import Developer from '../models/Developer';
import Project from '../models/Project';
import Priority from '../models/Priority';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  user_url: string;
  project_url: string;
  issue_url: string;
  prefix: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private assigneeSource = new BehaviorSubject('user 1');
  currentAssignee = this.assigneeSource.asObservable();

  devUsername = 'None';

  constructor(private http: HttpClient ) {
    this.user_url = '/api/v1/users/';
    this.project_url = '/api/v1/projects/';
    this.issue_url = '/api/v1/issues/';
    this.prefix = 'http://localhost:8000';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getURL = (model: string): string => {
    let url: string;
    switch (model) {
      case 'user' : url = this.user_url; break;
      case 'project' : url = this.project_url; break;
      case 'issue' : url = this.issue_url; break;
    }
    return url;
  }

  setAssigneeUsername = (username: string) => {
    console.log('Got : ' + username);
    this.devUsername = username;
    this.assigneeSource.next(username);
  }

  getAssigneeUsername = () => {
    return this.devUsername;
  }

  getAllIssues (): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.prefix + this.getURL('issue'));
  }

  getIssueById (id: string): Observable<Issue> {
    return this.http.get<Issue>(this.prefix + this.getURL('issue') + id);
  }

  getIssuesByPriority (priority: Priority, limit: number): Observable<Issue> {
    return this.http.get<Issue>(this.prefix + this.getURL('issue') + '?severity=' + priority + '&limit=' + limit);
  }

  getIssuesOrderedByCreationDate (order: string, limit: number): Observable<Issue> {
    let ORDER = ''; // FOR ASCENDING
    if (order === 'desc') {
      ORDER = '-';
    }

    return this.http.get<Issue>(this.prefix + this.getURL('issue') + '?ordering=' + ORDER + 'created_at' + '&limit=' + limit);
  }

  getIssuesOrderedByUpdationDate (order: string, limit: number): Observable<Issue> {
    let ORDER = ''; // FOR ASCENDING
    if (order === 'desc') {
      ORDER = '-';
    }

    return this.http.get<Issue>(this.prefix + this.getURL('issue') + '?ordering=' + ORDER + 'updated_at' + '&limit=' + limit);
  }

  getIssuesByProject (projectId: number) {
    return this.http.get<Issue>(this.prefix + this.getURL('issue') + '?project=' + projectId);
  }

  getIssuesByAssignee (assigneeId: number): Observable<Issue> {
    return this.http.get<Issue>(this.prefix + this.getURL('issue') + '?asignee=' + assigneeId);
  }

  getIssuesByStatusProjectAssignee (status: string, project: Project, assignee: Developer): Observable<Issue[]> {
    // tslint:disable-next-line:max-line-length
    let projectId = '';
    let assigneeId = '';

    if (project) {
      projectId = '' + project.id;
    }
    if (assignee) {
      assigneeId = '' + assignee.id;
    }
    return this.http.get<Issue[]>(this.prefix + this.getURL('issue') + '?status=' + status + '&project=' + projectId + '&assignee=' + assigneeId);
  }

  getAllAssignees (): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.prefix + this.getURL('user') + '?ordering=id');
  }

  getAssigneeById (assigneeId: number): Observable<Developer> {
    return this.http.get<Developer>(this.prefix + this.getURL('user') + '/' + assigneeId);
  }

  getAllProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.prefix + this.getURL('project') + '?ordering=id');
  }

  getIssueDetail (id: string): Observable<IssueDetail> {
    return this.http.get<IssueDetail>(this.prefix + this.getURL('issue') + id);
  }

  postIssue (issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.prefix + this.getURL('issue'), issue)
    .pipe(
      catchError(this.handleError)
    );
  }

  putIssue (issue: any): Observable<any> {
    console.log(this.prefix + this.getURL('issue') + issue.id + '/');
    console.log(issue);
    return this.http.put<any>('jhgjygjygyj', issue, this.httpOptions);
  }

  deleteIssue (issue: Issue): Observable<Issue> {
    console.log(this.prefix + this.getURL('issue') + issue.id);
    return this.http.delete<Issue>(this.prefix + this.getURL('issue') + issue.id + '/', this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  addAssigneeToIssueCard (cards: Issue[], assignees: Developer[]) {
    for (const kard of cards) {
      const id = kard.assignee;
      if (!id) {
        kard.assignee = {
          'username': 'none',
          'role': '',
          'profile_img': '../../assets/user_1.svg'
        };
      } else {
        kard.assignee = assignees[id - 1];
      }
    }
  }


  // issuePageList (heading: string, cards: Issue[], assignees: Developer[], project: Project, assignee: Developer) {
  //   let projectId = '';
  //   let assigneeId = '';

  //   if (project) {
  //     projectId = '' + project.id;
  //   }
  //   if (assignee) {
  //     assigneeId = '' + assignee.id;
  //   }
  //   if (heading === 'Done') {
  //     heading = 'Resolved';
  //   }
  //   if (heading === 'Todo') {
  //     heading = 'Open';
  //   }
  //   this.getAllAssignees().subscribe(dev => {
  //     console.log('heading : ' + heading + '  projectId : ' + projectId + '  assigneeId : ' + assigneeId);
  //     this.getIssuesByStatusProjectAssignee(heading, projectId, assigneeId).subscribe(res => {
  //       assignees = dev;
  //       cards = res;
  //       this.addAssigneeToIssueCard(cards, assignees);
  //     });
  //   });
  // }
}
