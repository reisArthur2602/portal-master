interface AuthenticatedUserProps {
    email: string;
    password: string;
}

const url = `${process.env.SERVER_APP}/auth/login`;

export const authenticatedUser = async ({ email, password }: AuthenticatedUserProps) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
};
