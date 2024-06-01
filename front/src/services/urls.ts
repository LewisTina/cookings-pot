export const prefix = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const UserUrl = {
    /* Authentication */
    POST_LOGIN: `${prefix}members/login`,
    POST_REGISTER: `${prefix}members/register`,
    AUTH_ME: `${prefix}members/auth/me`,
};