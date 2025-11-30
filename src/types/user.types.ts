type CreateUserType = {
    name?: string;
    email: string;
    password: string;
};

type LoginType = {
    email: string;
    password: string;
}

export type { CreateUserType, LoginType };

