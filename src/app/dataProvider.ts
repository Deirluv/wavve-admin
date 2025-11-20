import { fetchUtils, DataProvider } from "react-admin";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const isFormData = (body: any): body is FormData => body instanceof FormData;

const httpClient = async (url: string, options: any = {}) => {

    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    options.credentials = "include";

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

    if (options.body && isFormData(options.body)) {
        options.headers.delete('Accept');
        options.headers.delete('Content-Type');

        const response = await fetch(url, options);

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return { status: 204, headers: response.headers, json: {} };
        }

        const json = await response.json();
        return { status: response.status, headers: response.headers, json };
    }

    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: "GET",
            credentials: "include",
        });

        return {
            data: json.map((u: any) => ({ ...u, id: u.id })),
            total: json.length,
        };
    },
    getOne: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "GET",
            credentials: "include",
        });

        return {
            data: json,
        };
    },
    create: async (resource, params) => {
        let url = `${apiUrl}/${resource}`;
        let options: any = { method: "POST", credentials: "include" };

        if (resource === 'users') {
            url = `${apiUrl}/Auth/register`;
            options.body = JSON.stringify(params.data);
        } else if (resource === 'tracks') {

            const hasFiles = params.data.File?.rawFile || params.data.Preview?.rawFile;

            if (hasFiles) {
                const formData = new FormData();

                formData.append('Title', params.data.title);
                formData.append('Description', params.data.description);
                formData.append('Duration', params.data.duration);
                formData.append('GenreId', params.data.genreId);

                if (params.data.File?.rawFile) {
                    formData.append('File', params.data.File.rawFile, params.data.File.rawFile.name);
                }
                if (params.data.Preview?.rawFile) {
                    formData.append('Preview', params.data.Preview.rawFile, params.data.Preview.rawFile.name);
                }

                options.body = formData;

            } else {
                options.body = JSON.stringify(params.data);
            }
        } else {
            options.body = JSON.stringify(params.data);
        }

        const { json } = await httpClient(url, options);

        return {
            data: { ...params.data, id: json?.id || params.data.id }
        };
    },
    update: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
            credentials: "include",
        });
        return { data: json };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
            credentials: "include",
        });

        return { data: json || params.previousData };
    },

    deleteMany: async (resource, params) => {
        const requests = params.ids.map((id) =>
            httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'DELETE',
                credentials: "include",
            })
        );

        await Promise.all(requests);

        return { data: params.ids };
    },

} as DataProvider;
