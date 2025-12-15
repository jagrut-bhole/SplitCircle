import { normalizeFriendshipIds } from "./friendships.utils.js";
export function calculateBalanceChange(currentUserId, friendId, currentUserOwes, friendOwes) {
    const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, friendId);
    const netChange = friendOwes - currentUserOwes;
    if (currentUserId === user1Id) {
        return netChange;
    }
    else {
        return -netChange;
    }
}
//# sourceMappingURL=balance.utils.js.map