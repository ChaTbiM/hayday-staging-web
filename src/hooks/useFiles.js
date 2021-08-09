import { useQuery } from "react-query";
import http from "../axios.config";
import { getAuthHeader } from "../core/auth/auth.service";

const getProjectFiles = async (roomId) => {
    const { data } = await http.get(
        `/project/${roomId}/files`
        , { headers: getAuthHeader() });
    return data;
};

export default function useFiles(roomId) {
    return useQuery("files",()=> getProjectFiles(roomId), { refetchOnWindowFocus: false });
}
