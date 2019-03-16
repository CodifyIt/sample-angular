import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'create/:data',
    component: CreateComponent
  },
  {
    path: 'kanban-board',
    component: KanbanBoardComponent
  },
  {
    path: 'issues/',
    component: IssueDetailsComponent
  },
  {
    path: 'issues/:id',
    component: IssueDetailsComponent
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
