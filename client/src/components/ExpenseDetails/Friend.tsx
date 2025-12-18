import { useState } from "react";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Edit2, Trash2, X } from "lucide-react";
import { expensesService } from "@/services/expensesService";
import { toast } from "sonner";
import type { FriendExpense } from "@/types/FriendsTypes";

interface FriendExpenseDetailProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    expense: FriendExpense | null;
    friendId: string;
    currentUserId?: string;
    onSuccess?: () => void;
}

export const FriendExpenseDetail = ({
    isOpen,
    onOpenChange,
    expense,
    friendId,
    currentUserId,
    onSuccess
}: FriendExpenseDetailProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    if (!expense) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await expensesService.deleteFriendExpense(friendId, expense.id);
            toast.success('Expense deleted successfully!');
            if (onSuccess) onSuccess();
            setShowDeleteConfirm(false);
            onOpenChange(false);
        } catch (error) {
            console.error('Error deleting expense:', error);
            toast.error('Failed to delete expense');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = () => {
        // TODO: Implement edit functionality
        toast.info('Edit functionality coming soon!');
    };

    return (
        <>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800">Expense Details</h2>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                    {/* Expense Info */}
                    <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                                {expense.currency}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{expense.title}</h3>
                                <p className="text-sm text-slate-500">{formatDate(expense.date)}</p>
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            {expense.currency}{expense.amount.toFixed(2)}
                        </div>
                        <p className="text-sm text-slate-500">
                            Paid by <span className="font-bold text-slate-800">{expense.paidBy.name}</span>
                        </p>

                        {expense.note && (
                            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    Note
                                </p>
                                <p className="text-sm text-slate-700">{expense.note}</p>
                            </div>
                        )}
                    </div>

                    {/* Split Details */}
                    <div className="p-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Split Details
                        </h4>
                        <div className="space-y-4">
                            {expense.splits && expense.splits.length > 0 ? (
                                expense.splits.map((split) => {
                                    const isPayer = split.userId === expense.paidById;
                                    const isCurrentUser = split.userId === currentUserId;
                                    
                                    return (
                                        <div key={split.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {split.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="text-slate-700 font-medium">
                                                        {isCurrentUser ? 'You' : split.user.name}
                                                    </span>
                                                    {split.percentage && (
                                                        <span className="text-xs text-slate-400 ml-2">
                                                            ({split.percentage}%)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-bold text-slate-800">
                                                    {expense.currency}{split.amount.toFixed(2)}
                                                </span>
                                                <span
                                                    className={`text-xs font-medium ${
                                                        isPayer
                                                            ? 'text-green-600'
                                                            : 'text-orange-500'
                                                    }`}
                                                >
                                                    {isPayer ? 'Paid' : 'Owes'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-slate-400 italic">
                                    No split details available.
                                </p>
                            )}
                        </div>

                        {expense.createdAt && (
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <p className="text-xs text-slate-400">
                                    Added on {formatDate(expense.createdAt)}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                        <button
                            onClick={handleEdit}
                            className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Expense
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-red-100 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4" />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <DialogContent className="sm:max-w-[400px]">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Expense?</h3>
                        <p className="text-sm text-slate-600">This action cannot be undone. The expense will be permanently deleted.</p>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
};
