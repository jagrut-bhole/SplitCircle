import { useState, useEffect } from "react";
import type { GetGroupDetailsResponse, Expense } from "@/types/GroupTypes";
import { groupsService } from "@/services/groupsService";
import { settlementsService } from "@/services/settlementsService";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Receipt, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { AddUserToGroup } from "@/components/AddUserToGroup";
import { CreateGroupExpense } from "@/components/CreateGroupExpense";
import { GroupExpenseDetail } from "@/components/GroupExpenseDetail";
import { SettleGroupDebt } from "@/components/SettleGroupDebt";

export function GroupExpense() {
    const currentUserId = useAuthStore((state) => state.user?.id);

    const [groupDetails, setGroupDetails] = useState<GetGroupDetailsResponse | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

    const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
    const [isSettleUpOpen, setIsSettleUpOpen] = useState<boolean>(false);
    const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [memberDebts, setMemberDebts] = useState<Array<{ name: string; youOwe?: number; theyOwe?: number }>>([]);

    const { groupId } = useParams();

    const fetchGroupDetails = async (groupId: string) => {
        setIsLoading(true)

        try {
            const response = await groupsService.getGroupDetails(groupId!);

            if (response.success) {
                setGroupDetails(response);
                setRecentExpenses(response.data.recentExpenses || [])
                // Fetch member debts
                fetchMemberDebts(groupId);
            }
        } catch (error) {
            console.log("Error while fetching group details: ", error);
            toast.error("Failed to fetch group details!!");
        } finally {
            setIsLoading(false);
        }
    }

    const fetchMemberDebts = async (groupId: string) => {
        try {
            const response = await settlementsService.getGroupSettlementInfo(groupId);
            if (response.success && response.data && response.data.members) {
                const debts = response.data.members
                    .filter((member) => member.youOwe > 0 || member.theyOwe > 0)
                    .map((member) => ({
                        name: member.name,
                        youOwe: member.youOwe,
                        theyOwe: member.theyOwe
                    }));
                setMemberDebts(debts);
            }
        } catch (error) {
            console.error("Error fetching member debts:", error);
        }
    }

    useEffect(() => {
        if (groupId) {
            fetchGroupDetails(groupId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    const handleExpenseClick = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsExpenseDetailOpen(true);
    }

    const calculateBalance = () => {
        let balance = 0;
        recentExpenses.forEach(expense => {
            // Check for settlement using splitType
            if (expense.splitType === 'SETTLEMENT') {
                // For settlements, check the expense splits to see who received the money
                const userSplit = expense.splits?.find(s => s.userId === currentUserId);
                const otherSplit = expense.splits?.find(s => s.userId !== currentUserId);
                
                if (expense.paidById === currentUserId && otherSplit) {
                    // You paid someone - reduces your negative balance (you owe less)
                    balance += otherSplit.amount;
                } else if (userSplit && userSplit.amount > 0) {
                    // Someone paid you - reduces your positive balance (they owe you less)
                    balance -= userSplit.amount;
                }
            } else {
                const splitAmount = expense.amount / (groupDetails?.data.group[0].members.length || 1);
                if (expense.paidById === currentUserId) {
                    // CurrentUser paid, so you lent money
                    balance += (expense.amount - splitAmount);
                } else {
                    // Someone else paid, so currentUser borrowed money
                    balance -= splitAmount;
                }
            }
        });
        return balance;
    };

    const totalBalance = calculateBalance();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (isLoading && !groupDetails) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 mt-5">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading group details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 mt-5">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in">
                    {/* Page Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-linear-to-r from-slate-50 to-white">
                        <button 
                            onClick={() => window.history.back()} 
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#E2E8F0] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                               <span className="text-[#475569]"> {groupDetails?.data.group[0].name.charAt(0) || "G"}</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{groupDetails?.data.group[0].name}</h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Total Members: {groupDetails?.data.group[0].members.length || 0}
                                </p>
                                {/* Individual member balances */}
                                {memberDebts.length > 0 && (
                                    <div className="mt-2 space-y-0.5">
                                        {memberDebts.slice(0, 3).map((debt, idx) => (
                                            <div key={idx}>
                                                {debt.theyOwe && debt.theyOwe > 0 ? (
                                                    <p className="text-xs text-emerald-600 font-medium">
                                                        {debt.name} owes you ₹{debt.theyOwe.toFixed(0)}
                                                    </p>
                                                ) : debt.youOwe && debt.youOwe > 0 ? (
                                                    <p className="text-xs text-red-500 font-medium">
                                                        You owe {debt.name} ₹{debt.youOwe.toFixed(0)}
                                                    </p>
                                                ) : null}
                                            </div>
                                        ))}
                                        {memberDebts.length > 3 && (
                                            <p className="text-xs text-slate-400 italic">
                                                +{memberDebts.length - 3} more...
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Balance</p>
                            <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {totalBalance >= 0 ? totalBalance === 0 ? ' ' : '+' : '-'}₹ {Math.abs(totalBalance).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 grid grid-cols-3 gap-3 border-b border-slate-100 bg-white">
                        <button
                            onClick={() => setIsAddExpenseOpen(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
                            <Receipt className="w-4 h-4" />
                            <span className="text-sm">Add Expense</span>
                        </button>
                        <button  
                            onClick={() => setIsSettleUpOpen(true)}
                            className=" cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all"
                        >
                            <CheckCircle className="w-4 h-4 text-slate-500" />
                            <span className="text-sm">Settle Up</span>
                        </button>
                        <button
                            onClick={() => setIsAddMemberOpen(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all"
                        >
                            <UserPlus className="w-4 h-4 text-slate-500" />
                            <span className="text-sm">Add User</span>
                        </button>
                    </div>

                    {/* Expense List */}
                    <div className="p-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Recent Expenses
                        </h4>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            </div>
                        ) : recentExpenses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Receipt className="w-12 h-12 text-slate-300 mb-2" />
                                <p className="text-slate-400 font-medium">No expenses yet</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentExpenses.map((expense) => {
                                    if (expense.splitType === 'SETTLEMENT') {
                                        const paidBy = expense.paidById === currentUserId ? 'You' : expense.paidBy.name;

                                        // For settlements, find who received the payment from splits
                                        const recipientSplit = expense.splits?.find(s => s.amount > 0);
                                        const paidTo = recipientSplit?.userId === currentUserId ? 'You' : (recipientSplit?.user.name || 'Unknown');

                                        return (
                                            <div 
                                                key={expense.id} 
                                                className="flex items-center justify-between p-3 bg-blue-50/30 rounded-xl border border-blue-100/50 italic shadow-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                                                        <CheckCircle className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-700">
                                                            <span className="font-bold text-slate-900">{paidBy}</span> paid <span className="font-bold text-slate-900">{paidTo}</span>
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-medium tracking-wide">{formatDate(expense.date)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-blue-600">₹{expense.amount.toFixed(2)}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Settled Up</p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    const isPaidByCurrentUser = expense.paidById === currentUserId;
                                    const splitAmount = expense.amount / (groupDetails?.data.group[0].members.length || 1);
                                    const yourShare = isPaidByCurrentUser 
                                        ? expense.amount - splitAmount  // You lent
                                        : splitAmount;  // You borrowed
                                    
                                    return (
                                        <div
                                            key={expense.id}
                                            onClick={() => handleExpenseClick(expense)}
                                            className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200 hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                                                    {expense.currency}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{expense.note}</p>
                                                    <p className="text-sm text-slate-500">
                                                        <span className="font-medium text-slate-700">
                                                            {isPaidByCurrentUser ? 'You' : expense.paidBy.name}
                                                        </span> paid • {formatDate(expense.date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-base font-bold ${isPaidByCurrentUser ? 'text-green-600' : 'text-red-500'}`}>
                                                    {isPaidByCurrentUser ? '+' : '-'}₹{yourShare.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {isPaidByCurrentUser ? 'you lent' : 'you borrowed'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add User to Group Modal */}
            {groupId && (
                <AddUserToGroup
                    groupId={groupId}
                    isOpen={isAddMemberOpen}
                    onOpenChange={setIsAddMemberOpen}
                    onSuccess={() => fetchGroupDetails(groupId)}
                />
            )}

            {groupId && (
                <CreateGroupExpense
                    groupId={groupId}
                    isOpen={isAddExpenseOpen}
                    onOpenChange={setIsAddExpenseOpen}
                    groupMembers={(groupDetails?.data.group[0].members || []).map((m) => ({
                        id: m.user.id,
                        name: m.user.name,
                        username: m.user.username,
                    }))}
                    onSuccess={() => fetchGroupDetails(groupId)}
                />
            )}
            
            {/* Settle Up Modal */}
            {groupId && groupDetails && (
                <SettleGroupDebt
                    groupId={groupId}
                    groupName={groupDetails.data.group[0].name}
                    isOpen={isSettleUpOpen}
                    onOpenChange={setIsSettleUpOpen}
                    onSuccess={() => fetchGroupDetails(groupId)}
                />
            )}

            {groupId && (
                <GroupExpenseDetail
                    isOpen={isExpenseDetailOpen}
                    onOpenChange={setIsExpenseDetailOpen}
                    expense={selectedExpense}
                    groupId={groupId}
                    currentUserId={currentUserId}
                    onSuccess={() => fetchGroupDetails(groupId)}
                />
            )}
        </div>
    );
}