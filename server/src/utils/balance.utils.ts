import { normalizeFriendshipIds } from "./friendships.utils.js";

export function calculateBalanceChange(
    currentUserId:string,
    friendId:string,
    currentUserOwes:number,
    friendOwes:number
):number {
    const {user1Id , user2Id} = normalizeFriendshipIds(currentUserId,friendId)

    const netChange = friendOwes - currentUserOwes;

    if (currentUserId === user1Id) {
        return netChange;
    } else {
        return -netChange;
    }
}