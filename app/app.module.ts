import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { IssueCardMiniComponent } from './issue-card-mini/issue-card-mini.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { HttpModule } from '@angular/http';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent,
    HeaderComponent,
    IssueCardMiniComponent,
    IssuesListComponent,
    KanbanBoardComponent,
    NavComponent,
    IssueDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
