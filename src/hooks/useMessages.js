import { useQuery } from "react-query";
import http from "../axios.config";
import { getAuthHeader } from "../core/auth/auth.service";

const getMessages = async (projectId) => {
    const { data } = await http.get(
        `/project/${projectId}/messages`
        , { headers: getAuthHeader() });
    return await data;
};

export default function useMessages(projectId) {
    return useQuery("messages", () => getMessages(projectId));
}
