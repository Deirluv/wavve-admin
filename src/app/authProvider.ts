import { AuthProvider } from "react-admin";

const apiUrl = "https://localhost:7108/api";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const response = await fetch(`${apiUrl}/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            let errorMessage = "Error while trying to login";

            try {
                const errorData = await response.json();
                if (errorData?.message) {
                    errorMessage = errorData.message;
                } else if (errorData?.error) {
                    errorMessage = errorData.error;
                }
            } catch (e) {
                errorMessage = `Error ${response.status}: ${response.statusText}`;
            }

            throw new Error(errorMessage);
        }

        return Promise.resolve();
    },

    logout: async () => {
        // await fetch("/api/Auth/logout", {
        //     method: "POST",
        //     credentials: "include",
        // }).catch(() => {});
        //
        return Promise.resolve();
    },

    checkAuth: async () => {
        const response = await fetch(`${apiUrl}/Auth/check`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return Promise.reject();
        }

        return Promise.resolve();
    },

    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};
