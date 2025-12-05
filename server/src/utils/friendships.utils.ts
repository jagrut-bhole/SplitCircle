export function normalizeFriendshipIds(userId1:string,userId2:string) {
        if(userId1 > userId2) {
            return {user1Id : userId1, user2Id : userId2}
        } else {
            return {user1Id : userId2, user2Id : userId1}
        }
    }