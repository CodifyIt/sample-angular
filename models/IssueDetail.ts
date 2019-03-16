class IssueDetail {
    id: number;
    description: string;
    description_part: string;
    created_at: string;
    updated_at: string;
    title: string;
    labels: string;
    status: string;
    severity: number;
    due_date: Date;
    type: string;
    project: number;
    assignee: any;
    results: Array<IssueDetail>;

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
        assignee: any
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
        this.assignee = assignee;
    }
}

export default IssueDetail;
