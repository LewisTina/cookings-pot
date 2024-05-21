export const prefix = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const UserUrl = {
    /* Authentication */
    POST_LOGIN: `${prefix}auth/login`,
    AUTH_ME: `${prefix}auth/me`,
};