export interface Team {
    id: number;
    name: string;
    logo: string;
    members: Member[];
}

interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    adress: {
        street: string;
        city: string;
        country: string;
        zipcode: string;
    };
}