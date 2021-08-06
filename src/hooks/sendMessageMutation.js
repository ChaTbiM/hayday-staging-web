import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import http from "../axios.config";
import { getAuthHeader } from "../core/auth/auth.service";

// const sendMessage = async (projectId, fromId, content) => {
//     const { data } = await http.post(
//         `/message`, { projectId, fromId, content }
//         , { headers: getAuthHeader() });
//     return await data;
// };

const sendMessage = (projectId, fromId, content) => {
    return http.post(
        `/message`, { projectId, fromId, content }
        , { headers: getAuthHeader() });
}

const sendMessageMutationOptions = {
    onMutate: async (data) => {
        console.log('data', data)
        // await queryClient.cancelQueries("messages")

        // queryClient.setQueryData('todos', old => ({
        //     ...old,
        //     items: [...old.items, text],
        //   }))

        return null
    }
}

export { sendMessageMutationOptions, sendMessage };