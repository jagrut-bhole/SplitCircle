import { useState, useEffect } from "react";
import type { GetGroupDetailsResponse, Expense } from "@/types/GroupTypes";
import { groupsService } from "@/services/groupsService";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Receipt, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { AddUserToGroup } from "@/components/AddUserToGroup";

export function GroupExpense() {
    const currentUserId = useAuthStore((state) => state.user?.id);

    const [groupDetails, setGroupDetails] = useState<GetGroupDetailsResponse | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

    const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);

    const { groupId } = useParams();

    const fetchGroupDetails = async (groupId: string) => {
        setIsLoading(true)

        try {
            const response = await groupsService.getGroupDetails(groupId!);

            if (response.success) {
                setGroupDetails(response);
                setRecentExpenses(response.data.recentExpenses || [])
            }
        } catch (error) {
            console.log("Error while fetching group details: ", error);
            toast.error("Failed to fetch group details!!");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (groupId) {
            fetchGroupDetails(groupId);
        }
    }, [groupId]);

    function setSelectedExpense(expense: string) {
        return expense
    }

    const calculateBalance = () => {
        let balance = 0;
        recentExpenses.forEach(expense => {
            const splitAmount = expense.amount / (groupDetails?.data.group[0].members.length || 1);
            if (expense.paidById === currentUserId) {
                // CurrentUser paid, so you lent money
                balance += (expense.amount - splitAmount);
            } else {
                // Someone else paid, so currentUser borrowed money
                balance -= splitAmount;
            }
        });
        return balance;
    };

    const totalBalance = calculateBalance();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

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
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {groupDetails?.data.group[0].name.charAt(0) || 'T'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{groupDetails?.data.group[0].name}</h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Total Members: {groupDetails?.data.group[0].members.length || 0}
                                </p>
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
                        <button className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
                            <Receipt className="w-4 h-4" />
                            <span className="text-sm">Add Expense</span>
                        </button>
                        <button className=" cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all">
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
                                    const isPaidByCurrentUser = expense.paidById === currentUserId;
                                    const splitAmount = expense.amount / (groupDetails?.data.group[0].members.length || 1);
                                    const yourShare = isPaidByCurrentUser 
                                        ? expense.amount - splitAmount  // You lent
                                        : splitAmount;  // You borrowed
                                    
                                    return (
                                        <div
                                            key={expense.id}
                                            onClick={() => setSelectedExpense(expense.id)}
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
                                                    {isPaidByCurrentUser ? '+' : '-'}${yourShare.toFixed(2)}
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
        </div>
    );
}