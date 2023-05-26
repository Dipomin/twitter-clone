import { useCallback, useMemo } from "react";

import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser"
import axios from "axios";
import { toast } from "react-hot-toast";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(userId);
    
    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [userId, currentUser?.followingIds])

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            }else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Succès')

        } catch(error) {
            toast.error("Quelque chose s'est mal passée");
        } 
        
    }, [
        currentUser, 
        isFollowing, 
        userId, 
        mutateCurrentUser, 
        mutateFetchedUser, 
        loginModal
    ]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;