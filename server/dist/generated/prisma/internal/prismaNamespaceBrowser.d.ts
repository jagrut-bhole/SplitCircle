import * as runtime from "@prisma/client/runtime/index-browser";
export type * from "../models.js";
export type * from "./prismaNamespace.js";
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
  DbNull: new (secret: never) => typeof runtime.DbNull;
  JsonNull: new (secret: never) => typeof runtime.JsonNull;
  AnyNull: new (secret: never) => typeof runtime.AnyNull;
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
  readonly User: "User";
  readonly Friendship: "Friendship";
  readonly Balance: "Balance";
  readonly Group: "Group";
  readonly GroupMember: "GroupMember";
  readonly Expense: "Expense";
  readonly ExpenseSplit: "ExpenseSplit";
  readonly Activity: "Activity";
  readonly Settlement: "Settlement";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
  readonly ReadUncommitted: "ReadUncommitted";
  readonly ReadCommitted: "ReadCommitted";
  readonly RepeatableRead: "RepeatableRead";
  readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel =
  (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
  readonly id: "id";
  readonly username: "username";
  readonly email: "email";
  readonly password: "password";
  readonly name: "name";
  readonly createdAt: "createdAt";
  readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum =
  (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const FriendshipScalarFieldEnum: {
  readonly id: "id";
  readonly user1Id: "user1Id";
  readonly user2Id: "user2Id";
  readonly createdAt: "createdAt";
};
export type FriendshipScalarFieldEnum =
  (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum];
export declare const BalanceScalarFieldEnum: {
  readonly id: "id";
  readonly user1Id: "user1Id";
  readonly user2Id: "user2Id";
  readonly amount: "amount";
  readonly lastUpdated: "lastUpdated";
};
export type BalanceScalarFieldEnum =
  (typeof BalanceScalarFieldEnum)[keyof typeof BalanceScalarFieldEnum];
export declare const GroupScalarFieldEnum: {
  readonly id: "id";
  readonly name: "name";
  readonly description: "description";
  readonly createdById: "createdById";
  readonly createdAt: "createdAt";
  readonly updatedAt: "updatedAt";
};
export type GroupScalarFieldEnum =
  (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum];
export declare const GroupMemberScalarFieldEnum: {
  readonly id: "id";
  readonly groupId: "groupId";
  readonly userId: "userId";
  readonly joinedAt: "joinedAt";
};
export type GroupMemberScalarFieldEnum =
  (typeof GroupMemberScalarFieldEnum)[keyof typeof GroupMemberScalarFieldEnum];
export declare const ExpenseScalarFieldEnum: {
  readonly id: "id";
  readonly title: "title";
  readonly note: "note";
  readonly currency: "currency";
  readonly amount: "amount";
  readonly date: "date";
  readonly paidById: "paidById";
  readonly groupId: "groupId";
  readonly splitType: "splitType";
  readonly scenario: "scenario";
  readonly createdById: "createdById";
  readonly createdAt: "createdAt";
  readonly updatedAt: "updatedAt";
};
export type ExpenseScalarFieldEnum =
  (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum];
export declare const ExpenseSplitScalarFieldEnum: {
  readonly id: "id";
  readonly expenseId: "expenseId";
  readonly userId: "userId";
  readonly amount: "amount";
  readonly percentage: "percentage";
};
export type ExpenseSplitScalarFieldEnum =
  (typeof ExpenseSplitScalarFieldEnum)[keyof typeof ExpenseSplitScalarFieldEnum];
export declare const ActivityScalarFieldEnum: {
  readonly id: "id";
  readonly note: "note";
  readonly userId: "userId";
  readonly groupId: "groupId";
  readonly expenseId: "expenseId";
  readonly settlementId: "settlementId";
  readonly metadata: "metadata";
  readonly createdAt: "createdAt";
};
export type ActivityScalarFieldEnum =
  (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum];
export declare const SettlementScalarFieldEnum: {
  readonly id: "id";
  readonly groupId: "groupId";
  readonly paidById: "paidById";
  readonly paidToId: "paidToId";
  readonly amount: "amount";
  readonly note: "note";
  readonly createdAt: "createdAt";
};
export type SettlementScalarFieldEnum =
  (typeof SettlementScalarFieldEnum)[keyof typeof SettlementScalarFieldEnum];
export declare const SortOrder: {
  readonly asc: "asc";
  readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
  readonly DbNull: "DbNull";
  readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput =
  (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
  readonly default: "default";
  readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
  readonly first: "first";
  readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
  readonly DbNull: "DbNull";
  readonly JsonNull: "JsonNull";
  readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter =
  (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map
