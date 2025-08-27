import publicClient from "./client";
import { authClient } from "./client";

export const requestClient = async <T> (
    callback: (client: typeof publicClient) => Promise<T>
): Promise<T> => {
    const token = localStorage.getItem("accessToken");
    const client = token ? authClient : publicClient;
    return callback(client); 
}