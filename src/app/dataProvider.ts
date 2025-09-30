import { fetchUtils, DataProvider } from "react-admin";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const httpClient = async (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    options.credentials = "include";

    // Prefer token from sessionStorage (set on login), fallback to cookie if readable
    let token = '';
    try {
        if (typeof sessionStorage !== 'undefined') {
            token = sessionStorage.getItem('token') || '';
        }
    } catch {}

    if (!token && typeof document !== 'undefined') {
        token = (document.cookie
            .split('; ')
            .find((row) => row.startsWith('auth_token='))
            ?.split('=')[1]) || '';
    }

    console.log('[http] Using token:', token);

    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/all`, {
            credentials: 'include',
        }).then(({ json }) => ({
            data: json.map((user: any) => ({ ...user, id: user.id })),
            total: json.length,
        })),


    // getOne: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    //         data: json,
    //     })),
    //
    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: "POST",
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json })),
    //
    // update: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: "PUT",
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json })),
    //
    // delete: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: "DELETE",
    //     }).then(({ json }) => ({ data: json })),

} as DataProvider;
