import { useQuery } from "react-query";
import http from "../axios.config";
import { getAuthHeader } from "../core/auth/auth.service";

const getProjects = async () => {
    const { data } = await http.get(
        "/user/project"
        , { headers: getAuthHeader() });
    return data;
};

export default function useProjects() {
    return useQuery("projects", getProjects);
}
