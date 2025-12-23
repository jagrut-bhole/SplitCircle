import { useState } from "react";
import type { CreateFriendExpenseData, FriendExpenseScenario } from "@/types/ExpenseTypes";
import { expensesService } from "@/services/expensesService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Receipt } from "lucide-react";

interface FriendAddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    friendId: string;
    friendUsername: string;
    friendName: string;
    currentUserName: string;
    onExpenseAdded: () => void;
}

export function FriendAddExpenseModal({
    isOpen,
    onClose,
    friendId,
    friendUsername,
    friendName,
    onExpenseAdded
}: FriendAddExpenseModalProps) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [scenario, setScenario] = useState<FriendExpenseScenario>("I_PAID_SPLIT_EQUAL");

    const resetForm = () => {
        setTitle("");
        setAmount("");
        setDescription("");
        setScenario("I_PAID_SPLIT_EQUAL");
    };

    const handleExpenseSubmit = async () => {
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        const expenseAmount = parseFloat(amount);
        if (!expenseAmount || expenseAmount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await expensesService.createFriendExpense(
                friendId,
                {
                    title: title.trim(),
                    amount: expenseAmount,
                    description: description.trim(),
                    scenario: scenario,
                    username: friendUsername
                } as CreateFriendExpenseData
            );

            if (response.success) {
                toast.success("Expense added successfully!");
                resetForm();
                onExpenseAdded();
                onClose();
            }
        } catch (error) {
            console.log("Error creating friend expense:", error);
            toast.error("Failed to create expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-orange-500" />
                        Add Expense with {friendName}
                    </DialogTitle>
                    <DialogDescription>
                        Split an expense with your friend. Choose how to split it fairly.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="e.g., Dinner at restaurant"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <textarea
                            placeholder="Add notes about this expense..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-20 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Scenario */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Scenario <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value as FriendExpenseScenario)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="I_PAID_SPLIT_EQUAL">I paid, split equally</option>
                            <option value="I_OWED_FULL">I paid, friend owes full amount</option>
                            <option value="FRIEND_PAID_SPLIT_EQUAL">Friend paid, split equally</option>
                            <option value="FRIEND_OWED_FULL">Friend paid, I owe full amount</option>
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleExpenseSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? "Adding..." : "Add Expense"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}