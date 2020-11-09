export class User {
    id: number;
    name: string;
    lastname: string;
    birthday: Date;
    created_at: Date;
    email: string;
    login: string;
    password: string;
    cash: number;

    constructor(id: number, name: string, lastname: string, birthday: Date, created_at: Date,
                email: string, login: string, password: string) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.created_at = created_at;
        this.email = email;
        this.login = login;
        this.password = password;
    }
}
