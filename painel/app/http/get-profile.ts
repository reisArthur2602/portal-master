interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Profile {
    user: User;
}

const url = `${process.env.SERVER_APP}/auth/me`;

export const getProfile = async () => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    const data: Profile = await response.json();

    return {
        user: data.user,
    };
};
