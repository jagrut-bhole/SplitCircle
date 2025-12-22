import { normalizeFriendshipIds } from "./friendships.utils.js";

export function calculateBalanceChange(
  currentUserId: string,
  friendId: string,
  currentUserOwes: number,
  friendOwes: number,
  paidById: string,
): number {
  const { user1Id, user2Id } = normalizeFriendshipIds(currentUserId, friendId);

  // Calculate net change: positive means user1 is owed money, negative means user1 owes money
  // If current user paid: they should be credited the friend's share
  // If friend paid: current user should be debited their share

  let netChange: number;
  if (paidById === currentUserId) {
    // Current user paid, so friend owes them friendOwes amount
    netChange = friendOwes;
  } else {
    // Friend paid, so current user owes them currentUserOwes amount
    netChange = -currentUserOwes;
  }

  // Normalize the change based on who is user1
  if (currentUserId === user1Id) {
    return netChange;
  } else {
    return -netChange;
  }
}
