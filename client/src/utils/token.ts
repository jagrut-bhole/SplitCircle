export const getAccesssToken = () => {
    return localStorage.getItem('accessToken');
}

export const setAccesssToken = (token : string) => {
    return localStorage.setItem('accessToken', token);
}

export const removeAccessToken = () => {
    return localStorage.removeItem('accessToken');
}