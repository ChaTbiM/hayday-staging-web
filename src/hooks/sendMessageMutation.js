import { queryClient } from "../App";
import http from "../axios.config";
import { getAuthHeader } from "../core/auth/auth.service";


const sendMessageRequest = (message) => {
    return http.post(
        `/message`, { ...message }
        , { headers: getAuthHeader() });
}

const sendMessageMutationOptions =
{
    onMutate: async newMessage => {
        await queryClient.cancelQueries('messages')

        const previousMessages = queryClient.getQueryData('messages')

        queryClient.setQueryData('messages', oldMessages => {
            const messageWithUser = { ...newMessage, from: { id: newMessage.fromId } }
            return [messageWithUser, ...oldMessages]
        }
        )

        return previousMessages
    },
    onError: (err, variables, previousMessages) =>
        queryClient.setQueryData('messages', previousMessages),
    onSettled: () => {
        queryClient.invalidateQueries('messages')
    },
}

export { sendMessageMutationOptions, sendMessageRequest };

