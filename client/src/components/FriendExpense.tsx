import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, Receipt, CheckCircle } from 'lucide-react';
import { useParams } from "react-router-dom";
import type { GetFriendDetails, FriendExpense as FriendExpenseType } from "@/types/FriendsTypes";
import { useAuthStore } from "@/store/authStore";
import { expensesService } from "@/services/expensesService";
import { FriendAddExpenseModal } from "./FriendAdddExpense";

export function FriendExpense() {
    
    const { friendId } = useParams<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [friendDetails, setFriendDetails] = useState<GetFriendDetails | null>(null);

    const [recentExpenses, setRecentExpenses] = useState<FriendExpenseType[]>([]);

    const currentUserId = useAuthStore((state) => state.user?.id);
    const currentUserName = useAuthStore((state) => state.user?.name);
    
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState<boolean>(false);

    const fetchFriendDetails = async () => {
        setIsLoading(true);

        try {
            const response = await expensesService.getFriendDetails(friendId as string);

            if (response.success) {
                setFriendDetails(response);
                setRecentExpenses(response.data.expenses || []);
            }
        } catch (error) {
            console.log("Error fetching friend expenses:", error);
            toast.error("Failed to fetch friend expenses. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (friendId) {
            fetchFriendDetails();
        }
    }, [friendId]);

    const friendUser = friendDetails?.data.friend;
    const totalBalance = friendDetails?.data.balance || 0;
    const owesYou = totalBalance > 0;

    // Format date to "MMM DD, YYYY"
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
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
                            <div className="relative">
                                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {friendUser?.name.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${owesYou ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{friendUser?.name.toUpperCase() || 'Friend'}</h2>
                                <p className="text-xs text-slate-500 font-medium">@{friendUser?.username || 'Loading...'}</p>
                            </div>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                {owesYou ? 'Owes You' : 'You Owe'}
                            </p>
                            <p className={`text-2xl font-bold ${owesYou ? 'text-green-600' : 'text-orange-500'}`}>
                                ₹ {Math.abs(totalBalance).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 grid grid-cols-2 gap-3 border-b border-slate-100 bg-white">
                        <button 
                            onClick={() => setIsAddExpenseModalOpen(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
                        >
                            <Receipt className="w-4 h-4" />
                            <span className="text-sm">Add Expense</span>
                        </button>
                        <button className=" cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all">
                            <CheckCircle className="w-4 h-4 text-slate-500" />
                            <span className="text-sm">Settle Up</span>
                        </button>
                    </div>

                    {/* Expense List */}
                    <div className="p-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Shared Expenses
                        </h4>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : recentExpenses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Receipt className="w-12 h-12 text-slate-300 mb-2" />
                                <p className="text-slate-400 font-medium">No shared expenses yet</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentExpenses.map((expense) => {
                                    const isPaidByCurrentUser = expense.paidById === currentUserId;
                                    const userSplit = expense.splits.find(split => split.userId === currentUserId);
                                    const friendSplit = expense.splits.find(split => split.userId !== currentUserId);
                                    
                                    // Calculate what you lent or borrowed
                                    let displayAmount = 0;
                                    if (isPaidByCurrentUser && friendSplit) {
                                        // You paid, so you lent the friend's share
                                        displayAmount = friendSplit.amount;
                                    } else if (!isPaidByCurrentUser && userSplit) {
                                        // Friend paid, so you borrowed your share
                                        displayAmount = userSplit.amount;
                                    }
                                    
                                    return (
                                        <div
                                            key={expense.id}
                                            className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200 hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                                                    {expense.currency}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{expense.title}</p>
                                                    <p className="text-sm text-slate-500">
                                                        <span className="font-medium text-slate-700">
                                                            {isPaidByCurrentUser ? 'You' : friendUser?.name}
                                                        </span> paid • {formatDate(expense.date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-base font-bold ${isPaidByCurrentUser ? 'text-green-600' : 'text-orange-500'}`}>
                                                    {isPaidByCurrentUser ? '+' : '-'}₹ {displayAmount.toFixed(2)}
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

            {/* Add Expense Modal */}
            {friendUser && (
                <FriendAddExpenseModal
                    isOpen={isAddExpenseModalOpen}
                    onClose={() => setIsAddExpenseModalOpen(false)}
                    friendId={friendId as string}
                    friendUsername={friendUser.username}
                    friendName={friendUser.name}
                    currentUserName={currentUserName || "You"}
                    onExpenseAdded={fetchFriendDetails}
                />
            )}

        </div>
    );
}