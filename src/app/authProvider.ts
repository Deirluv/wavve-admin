import { AuthProvider } from "react-admin";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

        // Try to read token from response JSON and save to sessionStorage
        let token: string | undefined;
        try {
            const data = await response.clone().json();
            token = data?.token || data?.access_token || data?.authToken || data?.jwt;
        } catch (e) {
            // Response may be empty or not JSON; ignore
        }
        if (token) {
            try {
                sessionStorage.setItem("token", token);
                console.log("[auth] Saved token to sessionStorage", token);
            } catch {}
        } else {
            console.warn("[auth] No token found in login response. Relying on cookies.");
        }

        return Promise.resolve();
    },

    logout: async () => {
        await fetch(`${apiUrl}/Auth/checkAuth`, {
            method: "POST",
            credentials: "include",
        }).catch(() => {});

        try {
            sessionStorage.removeItem("token");
        } catch {}

        return Promise.resolve();
    },

    checkAuth: async () => {
        // If we already have a token in sessionStorage, consider the user authenticated
        try {
            const token = sessionStorage.getItem("token");
            if (token) return Promise.resolve();
        } catch {}

        // Fallback to server-side cookie/session check
        const response = await fetch(`${apiUrl}/Auth/checkAuth`, {
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
            try { sessionStorage.removeItem("token"); } catch {}
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};
