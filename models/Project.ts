class Project {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    results: any;

    constructor(id: number, title: string, created_at: string) {
        this.id = id;
        this.name = title;
        this.created_at = this.updated_at = created_at;
    }
}

export default Project;
