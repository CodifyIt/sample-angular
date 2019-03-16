import Priority from './Priority';
import IssueType from './IssueType';
import Status from './Status';

class Issue {
    id: number;
    description_part: string;
    description: string;
    created_at: string;
    updated_at: string;
    title: string;
    status: string;
    severity: number;
    due_date: Date;
    type: string;
    project: number;
    labels: string;
    assignee: any;
    results: Array<Issue>;

    constructor (
        id: number,
        description: string,
        created: string,
        updated: string,
        title: string,
        status: string,
        priority: number,
        due_date: Date,
        type: string,
        project: number,
        labels: string,
        assignee: any,
    ) {
        this.id = id;
        this.description = description;
        this.created_at = created;
        this.updated_at = updated;
        this.title = title;
        this.status = status;
        this.severity = priority;
        this.due_date = due_date;
        this.type = type;
        this.project = project;
        this.labels = labels;
        this.assignee = assignee;
    }
}

export default Issue;
