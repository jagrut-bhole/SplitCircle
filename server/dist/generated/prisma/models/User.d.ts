import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    username: number;
    email: number;
    password: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    username?: true;
    email?: true;
    password?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    username?: true;
    email?: true;
    password?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    username?: true;
    email?: true;
    password?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    expensesPaid?: Prisma.ExpenseListRelationFilter;
    expensesSplits?: Prisma.ExpenseSplitListRelationFilter;
    friendships1?: Prisma.FriendshipListRelationFilter;
    friendships2?: Prisma.FriendshipListRelationFilter;
    balancesAsUser1?: Prisma.BalanceListRelationFilter;
    balancesAsUser2?: Prisma.BalanceListRelationFilter;
    groupMemberships?: Prisma.GroupMemberListRelationFilter;
    groupsCreated?: Prisma.GroupListRelationFilter;
    activities?: Prisma.ActivityListRelationFilter;
    settlementsGiven?: Prisma.SettlementListRelationFilter;
    settlementsReceived?: Prisma.SettlementListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    expensesPaid?: Prisma.ExpenseOrderByRelationAggregateInput;
    expensesSplits?: Prisma.ExpenseSplitOrderByRelationAggregateInput;
    friendships1?: Prisma.FriendshipOrderByRelationAggregateInput;
    friendships2?: Prisma.FriendshipOrderByRelationAggregateInput;
    balancesAsUser1?: Prisma.BalanceOrderByRelationAggregateInput;
    balancesAsUser2?: Prisma.BalanceOrderByRelationAggregateInput;
    groupMemberships?: Prisma.GroupMemberOrderByRelationAggregateInput;
    groupsCreated?: Prisma.GroupOrderByRelationAggregateInput;
    activities?: Prisma.ActivityOrderByRelationAggregateInput;
    settlementsGiven?: Prisma.SettlementOrderByRelationAggregateInput;
    settlementsReceived?: Prisma.SettlementOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    username?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    expensesPaid?: Prisma.ExpenseListRelationFilter;
    expensesSplits?: Prisma.ExpenseSplitListRelationFilter;
    friendships1?: Prisma.FriendshipListRelationFilter;
    friendships2?: Prisma.FriendshipListRelationFilter;
    balancesAsUser1?: Prisma.BalanceListRelationFilter;
    balancesAsUser2?: Prisma.BalanceListRelationFilter;
    groupMemberships?: Prisma.GroupMemberListRelationFilter;
    groupsCreated?: Prisma.GroupListRelationFilter;
    activities?: Prisma.ActivityListRelationFilter;
    settlementsGiven?: Prisma.SettlementListRelationFilter;
    settlementsReceived?: Prisma.SettlementListRelationFilter;
}, "id" | "username" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    username?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutFriendships1Input = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFriendships1Input, Prisma.UserUncheckedCreateWithoutFriendships1Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFriendships1Input;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutFriendships2Input = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFriendships2Input, Prisma.UserUncheckedCreateWithoutFriendships2Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFriendships2Input;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutFriendships1NestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFriendships1Input, Prisma.UserUncheckedCreateWithoutFriendships1Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFriendships1Input;
    upsert?: Prisma.UserUpsertWithoutFriendships1Input;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFriendships1Input, Prisma.UserUpdateWithoutFriendships1Input>, Prisma.UserUncheckedUpdateWithoutFriendships1Input>;
};
export type UserUpdateOneRequiredWithoutFriendships2NestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFriendships2Input, Prisma.UserUncheckedCreateWithoutFriendships2Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFriendships2Input;
    upsert?: Prisma.UserUpsertWithoutFriendships2Input;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFriendships2Input, Prisma.UserUpdateWithoutFriendships2Input>, Prisma.UserUncheckedUpdateWithoutFriendships2Input>;
};
export type UserCreateNestedOneWithoutBalancesAsUser1Input = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser1Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser1Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBalancesAsUser1Input;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutBalancesAsUser2Input = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser2Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser2Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBalancesAsUser2Input;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutBalancesAsUser1NestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser1Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser1Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBalancesAsUser1Input;
    upsert?: Prisma.UserUpsertWithoutBalancesAsUser1Input;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutBalancesAsUser1Input, Prisma.UserUpdateWithoutBalancesAsUser1Input>, Prisma.UserUncheckedUpdateWithoutBalancesAsUser1Input>;
};
export type UserUpdateOneRequiredWithoutBalancesAsUser2NestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser2Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser2Input>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBalancesAsUser2Input;
    upsert?: Prisma.UserUpsertWithoutBalancesAsUser2Input;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutBalancesAsUser2Input, Prisma.UserUpdateWithoutBalancesAsUser2Input>, Prisma.UserUncheckedUpdateWithoutBalancesAsUser2Input>;
};
export type UserCreateNestedOneWithoutGroupsCreatedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutGroupsCreatedInput, Prisma.UserUncheckedCreateWithoutGroupsCreatedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutGroupsCreatedInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutGroupsCreatedNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutGroupsCreatedInput, Prisma.UserUncheckedCreateWithoutGroupsCreatedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutGroupsCreatedInput;
    upsert?: Prisma.UserUpsertWithoutGroupsCreatedInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutGroupsCreatedInput, Prisma.UserUpdateWithoutGroupsCreatedInput>, Prisma.UserUncheckedUpdateWithoutGroupsCreatedInput>;
};
export type UserCreateNestedOneWithoutGroupMembershipsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutGroupMembershipsInput, Prisma.UserUncheckedCreateWithoutGroupMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutGroupMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutGroupMembershipsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutGroupMembershipsInput, Prisma.UserUncheckedCreateWithoutGroupMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutGroupMembershipsInput;
    upsert?: Prisma.UserUpsertWithoutGroupMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutGroupMembershipsInput, Prisma.UserUpdateWithoutGroupMembershipsInput>, Prisma.UserUncheckedUpdateWithoutGroupMembershipsInput>;
};
export type UserCreateNestedOneWithoutExpensesPaidInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesPaidInput, Prisma.UserUncheckedCreateWithoutExpensesPaidInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesPaidInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExpensesPaidNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesPaidInput, Prisma.UserUncheckedCreateWithoutExpensesPaidInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesPaidInput;
    upsert?: Prisma.UserUpsertWithoutExpensesPaidInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExpensesPaidInput, Prisma.UserUpdateWithoutExpensesPaidInput>, Prisma.UserUncheckedUpdateWithoutExpensesPaidInput>;
};
export type UserCreateNestedOneWithoutExpensesSplitsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesSplitsInput, Prisma.UserUncheckedCreateWithoutExpensesSplitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesSplitsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExpensesSplitsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesSplitsInput, Prisma.UserUncheckedCreateWithoutExpensesSplitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesSplitsInput;
    upsert?: Prisma.UserUpsertWithoutExpensesSplitsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExpensesSplitsInput, Prisma.UserUpdateWithoutExpensesSplitsInput>, Prisma.UserUncheckedUpdateWithoutExpensesSplitsInput>;
};
export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutActivitiesInput, Prisma.UserUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutActivitiesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutActivitiesInput, Prisma.UserUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutActivitiesInput;
    upsert?: Prisma.UserUpsertWithoutActivitiesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutActivitiesInput, Prisma.UserUpdateWithoutActivitiesInput>, Prisma.UserUncheckedUpdateWithoutActivitiesInput>;
};
export type UserCreateNestedOneWithoutSettlementsGivenInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSettlementsGivenInput, Prisma.UserUncheckedCreateWithoutSettlementsGivenInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSettlementsGivenInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutSettlementsReceivedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSettlementsReceivedInput, Prisma.UserUncheckedCreateWithoutSettlementsReceivedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSettlementsReceivedInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSettlementsGivenNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSettlementsGivenInput, Prisma.UserUncheckedCreateWithoutSettlementsGivenInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSettlementsGivenInput;
    upsert?: Prisma.UserUpsertWithoutSettlementsGivenInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSettlementsGivenInput, Prisma.UserUpdateWithoutSettlementsGivenInput>, Prisma.UserUncheckedUpdateWithoutSettlementsGivenInput>;
};
export type UserUpdateOneRequiredWithoutSettlementsReceivedNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSettlementsReceivedInput, Prisma.UserUncheckedCreateWithoutSettlementsReceivedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSettlementsReceivedInput;
    upsert?: Prisma.UserUpsertWithoutSettlementsReceivedInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSettlementsReceivedInput, Prisma.UserUpdateWithoutSettlementsReceivedInput>, Prisma.UserUncheckedUpdateWithoutSettlementsReceivedInput>;
};
export type UserCreateWithoutFriendships1Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutFriendships1Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutFriendships1Input = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFriendships1Input, Prisma.UserUncheckedCreateWithoutFriendships1Input>;
};
export type UserCreateWithoutFriendships2Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutFriendships2Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutFriendships2Input = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFriendships2Input, Prisma.UserUncheckedCreateWithoutFriendships2Input>;
};
export type UserUpsertWithoutFriendships1Input = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFriendships1Input, Prisma.UserUncheckedUpdateWithoutFriendships1Input>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFriendships1Input, Prisma.UserUncheckedCreateWithoutFriendships1Input>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFriendships1Input = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFriendships1Input, Prisma.UserUncheckedUpdateWithoutFriendships1Input>;
};
export type UserUpdateWithoutFriendships1Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutFriendships1Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserUpsertWithoutFriendships2Input = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFriendships2Input, Prisma.UserUncheckedUpdateWithoutFriendships2Input>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFriendships2Input, Prisma.UserUncheckedCreateWithoutFriendships2Input>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFriendships2Input = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFriendships2Input, Prisma.UserUncheckedUpdateWithoutFriendships2Input>;
};
export type UserUpdateWithoutFriendships2Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutFriendships2Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutBalancesAsUser1Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutBalancesAsUser1Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutBalancesAsUser1Input = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser1Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser1Input>;
};
export type UserCreateWithoutBalancesAsUser2Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutBalancesAsUser2Input = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutBalancesAsUser2Input = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser2Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser2Input>;
};
export type UserUpsertWithoutBalancesAsUser1Input = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutBalancesAsUser1Input, Prisma.UserUncheckedUpdateWithoutBalancesAsUser1Input>;
    create: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser1Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser1Input>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutBalancesAsUser1Input = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutBalancesAsUser1Input, Prisma.UserUncheckedUpdateWithoutBalancesAsUser1Input>;
};
export type UserUpdateWithoutBalancesAsUser1Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutBalancesAsUser1Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserUpsertWithoutBalancesAsUser2Input = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutBalancesAsUser2Input, Prisma.UserUncheckedUpdateWithoutBalancesAsUser2Input>;
    create: Prisma.XOR<Prisma.UserCreateWithoutBalancesAsUser2Input, Prisma.UserUncheckedCreateWithoutBalancesAsUser2Input>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutBalancesAsUser2Input = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutBalancesAsUser2Input, Prisma.UserUncheckedUpdateWithoutBalancesAsUser2Input>;
};
export type UserUpdateWithoutBalancesAsUser2Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutBalancesAsUser2Input = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutGroupsCreatedInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutGroupsCreatedInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutGroupsCreatedInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutGroupsCreatedInput, Prisma.UserUncheckedCreateWithoutGroupsCreatedInput>;
};
export type UserUpsertWithoutGroupsCreatedInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutGroupsCreatedInput, Prisma.UserUncheckedUpdateWithoutGroupsCreatedInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutGroupsCreatedInput, Prisma.UserUncheckedCreateWithoutGroupsCreatedInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutGroupsCreatedInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutGroupsCreatedInput, Prisma.UserUncheckedUpdateWithoutGroupsCreatedInput>;
};
export type UserUpdateWithoutGroupsCreatedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutGroupsCreatedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutGroupMembershipsInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutGroupMembershipsInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutGroupMembershipsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutGroupMembershipsInput, Prisma.UserUncheckedCreateWithoutGroupMembershipsInput>;
};
export type UserUpsertWithoutGroupMembershipsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutGroupMembershipsInput, Prisma.UserUncheckedUpdateWithoutGroupMembershipsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutGroupMembershipsInput, Prisma.UserUncheckedCreateWithoutGroupMembershipsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutGroupMembershipsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutGroupMembershipsInput, Prisma.UserUncheckedUpdateWithoutGroupMembershipsInput>;
};
export type UserUpdateWithoutGroupMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutGroupMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutExpensesPaidInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutExpensesPaidInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutExpensesPaidInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesPaidInput, Prisma.UserUncheckedCreateWithoutExpensesPaidInput>;
};
export type UserUpsertWithoutExpensesPaidInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExpensesPaidInput, Prisma.UserUncheckedUpdateWithoutExpensesPaidInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesPaidInput, Prisma.UserUncheckedCreateWithoutExpensesPaidInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExpensesPaidInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExpensesPaidInput, Prisma.UserUncheckedUpdateWithoutExpensesPaidInput>;
};
export type UserUpdateWithoutExpensesPaidInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutExpensesPaidInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutExpensesSplitsInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutExpensesSplitsInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutExpensesSplitsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesSplitsInput, Prisma.UserUncheckedCreateWithoutExpensesSplitsInput>;
};
export type UserUpsertWithoutExpensesSplitsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExpensesSplitsInput, Prisma.UserUncheckedUpdateWithoutExpensesSplitsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesSplitsInput, Prisma.UserUncheckedCreateWithoutExpensesSplitsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExpensesSplitsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExpensesSplitsInput, Prisma.UserUncheckedUpdateWithoutExpensesSplitsInput>;
};
export type UserUpdateWithoutExpensesSplitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutExpensesSplitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutActivitiesInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutActivitiesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutActivitiesInput, Prisma.UserUncheckedCreateWithoutActivitiesInput>;
};
export type UserUpsertWithoutActivitiesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutActivitiesInput, Prisma.UserUncheckedUpdateWithoutActivitiesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutActivitiesInput, Prisma.UserUncheckedCreateWithoutActivitiesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutActivitiesInput, Prisma.UserUncheckedUpdateWithoutActivitiesInput>;
};
export type UserUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserCreateWithoutSettlementsGivenInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsReceived?: Prisma.SettlementCreateNestedManyWithoutPaidToInput;
};
export type UserUncheckedCreateWithoutSettlementsGivenInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsReceived?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidToInput;
};
export type UserCreateOrConnectWithoutSettlementsGivenInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSettlementsGivenInput, Prisma.UserUncheckedCreateWithoutSettlementsGivenInput>;
};
export type UserCreateWithoutSettlementsReceivedInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementCreateNestedManyWithoutPaidByInput;
};
export type UserUncheckedCreateWithoutSettlementsReceivedInput = {
    id?: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaidByInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedCreateNestedManyWithoutUserInput;
    friendships1?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser1Input;
    friendships2?: Prisma.FriendshipUncheckedCreateNestedManyWithoutUser2Input;
    balancesAsUser1?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser1Input;
    balancesAsUser2?: Prisma.BalanceUncheckedCreateNestedManyWithoutUser2Input;
    groupMemberships?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutUserInput;
    groupsCreated?: Prisma.GroupUncheckedCreateNestedManyWithoutCreatedByInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutActorInput;
    settlementsGiven?: Prisma.SettlementUncheckedCreateNestedManyWithoutPaidByInput;
};
export type UserCreateOrConnectWithoutSettlementsReceivedInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSettlementsReceivedInput, Prisma.UserUncheckedCreateWithoutSettlementsReceivedInput>;
};
export type UserUpsertWithoutSettlementsGivenInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSettlementsGivenInput, Prisma.UserUncheckedUpdateWithoutSettlementsGivenInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSettlementsGivenInput, Prisma.UserUncheckedCreateWithoutSettlementsGivenInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSettlementsGivenInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSettlementsGivenInput, Prisma.UserUncheckedUpdateWithoutSettlementsGivenInput>;
};
export type UserUpdateWithoutSettlementsGivenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsReceived?: Prisma.SettlementUpdateManyWithoutPaidToNestedInput;
};
export type UserUncheckedUpdateWithoutSettlementsGivenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsReceived?: Prisma.SettlementUncheckedUpdateManyWithoutPaidToNestedInput;
};
export type UserUpsertWithoutSettlementsReceivedInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSettlementsReceivedInput, Prisma.UserUncheckedUpdateWithoutSettlementsReceivedInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSettlementsReceivedInput, Prisma.UserUncheckedCreateWithoutSettlementsReceivedInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSettlementsReceivedInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSettlementsReceivedInput, Prisma.UserUncheckedUpdateWithoutSettlementsReceivedInput>;
};
export type UserUpdateWithoutSettlementsReceivedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUpdateManyWithoutPaidByNestedInput;
};
export type UserUncheckedUpdateWithoutSettlementsReceivedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expensesPaid?: Prisma.ExpenseUncheckedUpdateManyWithoutPaidByNestedInput;
    expensesSplits?: Prisma.ExpenseSplitUncheckedUpdateManyWithoutUserNestedInput;
    friendships1?: Prisma.FriendshipUncheckedUpdateManyWithoutUser1NestedInput;
    friendships2?: Prisma.FriendshipUncheckedUpdateManyWithoutUser2NestedInput;
    balancesAsUser1?: Prisma.BalanceUncheckedUpdateManyWithoutUser1NestedInput;
    balancesAsUser2?: Prisma.BalanceUncheckedUpdateManyWithoutUser2NestedInput;
    groupMemberships?: Prisma.GroupMemberUncheckedUpdateManyWithoutUserNestedInput;
    groupsCreated?: Prisma.GroupUncheckedUpdateManyWithoutCreatedByNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutActorNestedInput;
    settlementsGiven?: Prisma.SettlementUncheckedUpdateManyWithoutPaidByNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    expensesPaid: number;
    expensesSplits: number;
    friendships1: number;
    friendships2: number;
    balancesAsUser1: number;
    balancesAsUser2: number;
    groupMemberships: number;
    groupsCreated: number;
    activities: number;
    settlementsGiven: number;
    settlementsReceived: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    expensesPaid?: boolean | UserCountOutputTypeCountExpensesPaidArgs;
    expensesSplits?: boolean | UserCountOutputTypeCountExpensesSplitsArgs;
    friendships1?: boolean | UserCountOutputTypeCountFriendships1Args;
    friendships2?: boolean | UserCountOutputTypeCountFriendships2Args;
    balancesAsUser1?: boolean | UserCountOutputTypeCountBalancesAsUser1Args;
    balancesAsUser2?: boolean | UserCountOutputTypeCountBalancesAsUser2Args;
    groupMemberships?: boolean | UserCountOutputTypeCountGroupMembershipsArgs;
    groupsCreated?: boolean | UserCountOutputTypeCountGroupsCreatedArgs;
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs;
    settlementsGiven?: boolean | UserCountOutputTypeCountSettlementsGivenArgs;
    settlementsReceived?: boolean | UserCountOutputTypeCountSettlementsReceivedArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExpensesPaidArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExpensesSplitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseSplitWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountFriendships1Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FriendshipWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountFriendships2Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FriendshipWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountBalancesAsUser1Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BalanceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountBalancesAsUser2Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BalanceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountGroupMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupMemberWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountGroupsCreatedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSettlementsGivenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SettlementWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSettlementsReceivedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SettlementWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    expensesPaid?: boolean | Prisma.User$expensesPaidArgs<ExtArgs>;
    expensesSplits?: boolean | Prisma.User$expensesSplitsArgs<ExtArgs>;
    friendships1?: boolean | Prisma.User$friendships1Args<ExtArgs>;
    friendships2?: boolean | Prisma.User$friendships2Args<ExtArgs>;
    balancesAsUser1?: boolean | Prisma.User$balancesAsUser1Args<ExtArgs>;
    balancesAsUser2?: boolean | Prisma.User$balancesAsUser2Args<ExtArgs>;
    groupMemberships?: boolean | Prisma.User$groupMembershipsArgs<ExtArgs>;
    groupsCreated?: boolean | Prisma.User$groupsCreatedArgs<ExtArgs>;
    activities?: boolean | Prisma.User$activitiesArgs<ExtArgs>;
    settlementsGiven?: boolean | Prisma.User$settlementsGivenArgs<ExtArgs>;
    settlementsReceived?: boolean | Prisma.User$settlementsReceivedArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    username?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username" | "email" | "password" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    expensesPaid?: boolean | Prisma.User$expensesPaidArgs<ExtArgs>;
    expensesSplits?: boolean | Prisma.User$expensesSplitsArgs<ExtArgs>;
    friendships1?: boolean | Prisma.User$friendships1Args<ExtArgs>;
    friendships2?: boolean | Prisma.User$friendships2Args<ExtArgs>;
    balancesAsUser1?: boolean | Prisma.User$balancesAsUser1Args<ExtArgs>;
    balancesAsUser2?: boolean | Prisma.User$balancesAsUser2Args<ExtArgs>;
    groupMemberships?: boolean | Prisma.User$groupMembershipsArgs<ExtArgs>;
    groupsCreated?: boolean | Prisma.User$groupsCreatedArgs<ExtArgs>;
    activities?: boolean | Prisma.User$activitiesArgs<ExtArgs>;
    settlementsGiven?: boolean | Prisma.User$settlementsGivenArgs<ExtArgs>;
    settlementsReceived?: boolean | Prisma.User$settlementsReceivedArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        expensesPaid: Prisma.$ExpensePayload<ExtArgs>[];
        expensesSplits: Prisma.$ExpenseSplitPayload<ExtArgs>[];
        friendships1: Prisma.$FriendshipPayload<ExtArgs>[];
        friendships2: Prisma.$FriendshipPayload<ExtArgs>[];
        balancesAsUser1: Prisma.$BalancePayload<ExtArgs>[];
        balancesAsUser2: Prisma.$BalancePayload<ExtArgs>[];
        groupMemberships: Prisma.$GroupMemberPayload<ExtArgs>[];
        groupsCreated: Prisma.$GroupPayload<ExtArgs>[];
        activities: Prisma.$ActivityPayload<ExtArgs>[];
        settlementsGiven: Prisma.$SettlementPayload<ExtArgs>[];
        settlementsReceived: Prisma.$SettlementPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    expensesPaid<T extends Prisma.User$expensesPaidArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$expensesPaidArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    expensesSplits<T extends Prisma.User$expensesSplitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$expensesSplitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpenseSplitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    friendships1<T extends Prisma.User$friendships1Args<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$friendships1Args<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    friendships2<T extends Prisma.User$friendships2Args<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$friendships2Args<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    balancesAsUser1<T extends Prisma.User$balancesAsUser1Args<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$balancesAsUser1Args<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    balancesAsUser2<T extends Prisma.User$balancesAsUser2Args<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$balancesAsUser2Args<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    groupMemberships<T extends Prisma.User$groupMembershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$groupMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    groupsCreated<T extends Prisma.User$groupsCreatedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$groupsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    activities<T extends Prisma.User$activitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    settlementsGiven<T extends Prisma.User$settlementsGivenArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$settlementsGivenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    settlementsReceived<T extends Prisma.User$settlementsReceivedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$settlementsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly username: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.expensesPaid
 */
export type User$expensesPaidArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Expense
     */
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
/**
 * User.expensesSplits
 */
export type User$expensesSplitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSplit
     */
    select?: Prisma.ExpenseSplitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExpenseSplit
     */
    omit?: Prisma.ExpenseSplitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExpenseSplitInclude<ExtArgs> | null;
    where?: Prisma.ExpenseSplitWhereInput;
    orderBy?: Prisma.ExpenseSplitOrderByWithRelationInput | Prisma.ExpenseSplitOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseSplitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseSplitScalarFieldEnum | Prisma.ExpenseSplitScalarFieldEnum[];
};
/**
 * User.friendships1
 */
export type User$friendships1Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FriendshipScalarFieldEnum | Prisma.FriendshipScalarFieldEnum[];
};
/**
 * User.friendships2
 */
export type User$friendships2Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Friendship
     */
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FriendshipScalarFieldEnum | Prisma.FriendshipScalarFieldEnum[];
};
/**
 * User.balancesAsUser1
 */
export type User$balancesAsUser1Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: Prisma.BalanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Balance
     */
    omit?: Prisma.BalanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BalanceInclude<ExtArgs> | null;
    where?: Prisma.BalanceWhereInput;
    orderBy?: Prisma.BalanceOrderByWithRelationInput | Prisma.BalanceOrderByWithRelationInput[];
    cursor?: Prisma.BalanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BalanceScalarFieldEnum | Prisma.BalanceScalarFieldEnum[];
};
/**
 * User.balancesAsUser2
 */
export type User$balancesAsUser2Args<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: Prisma.BalanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Balance
     */
    omit?: Prisma.BalanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BalanceInclude<ExtArgs> | null;
    where?: Prisma.BalanceWhereInput;
    orderBy?: Prisma.BalanceOrderByWithRelationInput | Prisma.BalanceOrderByWithRelationInput[];
    cursor?: Prisma.BalanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BalanceScalarFieldEnum | Prisma.BalanceScalarFieldEnum[];
};
/**
 * User.groupMemberships
 */
export type User$groupMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: Prisma.GroupMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: Prisma.GroupMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.GroupMemberInclude<ExtArgs> | null;
    where?: Prisma.GroupMemberWhereInput;
    orderBy?: Prisma.GroupMemberOrderByWithRelationInput | Prisma.GroupMemberOrderByWithRelationInput[];
    cursor?: Prisma.GroupMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupMemberScalarFieldEnum | Prisma.GroupMemberScalarFieldEnum[];
};
/**
 * User.groupsCreated
 */
export type User$groupsCreatedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: Prisma.GroupSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Group
     */
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput | Prisma.GroupOrderByWithRelationInput[];
    cursor?: Prisma.GroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupScalarFieldEnum | Prisma.GroupScalarFieldEnum[];
};
/**
 * User.activities
 */
export type User$activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: Prisma.ActivitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Activity
     */
    omit?: Prisma.ActivityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ActivityInclude<ExtArgs> | null;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput | Prisma.ActivityOrderByWithRelationInput[];
    cursor?: Prisma.ActivityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ActivityScalarFieldEnum | Prisma.ActivityScalarFieldEnum[];
};
/**
 * User.settlementsGiven
 */
export type User$settlementsGivenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: Prisma.SettlementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Settlement
     */
    omit?: Prisma.SettlementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SettlementInclude<ExtArgs> | null;
    where?: Prisma.SettlementWhereInput;
    orderBy?: Prisma.SettlementOrderByWithRelationInput | Prisma.SettlementOrderByWithRelationInput[];
    cursor?: Prisma.SettlementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettlementScalarFieldEnum | Prisma.SettlementScalarFieldEnum[];
};
/**
 * User.settlementsReceived
 */
export type User$settlementsReceivedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: Prisma.SettlementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Settlement
     */
    omit?: Prisma.SettlementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SettlementInclude<ExtArgs> | null;
    where?: Prisma.SettlementWhereInput;
    orderBy?: Prisma.SettlementOrderByWithRelationInput | Prisma.SettlementOrderByWithRelationInput[];
    cursor?: Prisma.SettlementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettlementScalarFieldEnum | Prisma.SettlementScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map