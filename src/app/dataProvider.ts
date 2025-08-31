import { fetchUtils, DataProvider } from "react-admin";

const apiUrl = "https://localhost:7108/api";

const httpClient = async (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    options.credentials = "include";
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
    // Error here ^^^^


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
