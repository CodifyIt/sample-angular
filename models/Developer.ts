class Developer {
     id: number;
     username: string;
     email: string;
     profile_image: string;
     role: string;
     results: any;

    constructor(
        id: number,
        username: string,
        email: string,
        profile_image: string,
        role: string
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profile_image = profile_image;
        this.role = role;
    }

}

export default Developer;
