import axios from "axios";

async function getRequest<T>(url: string, query?: Record<string, string>): Promise<T | { error: string }> {
    try {
        const fullUrl = query
            ? `${url}?${new URLSearchParams(query).toString()}`
            : url;

        const response = await axios.get<T>(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Erro:", error);
        return {
            error: error.response?.data?.error || error.message || 'Erro desconhecido',
        };
    }
}

export default getRequest;