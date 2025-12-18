import { useEffect, useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { expensesService } from "@/services/expensesService";
import type { CreateGroupExpenseData, CreateGroupExpenseResponse, SplitType } from "@/types/ExpenseTypes";
import { useAuthStore } from "@/store/authStore";
import { Receipt } from "lucide-react";

type MemberOption = { id?: string; username: string; name: string };

export interface CreateGroupExpenseProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    groupId: string;
    groupMembers: MemberOption[];
    onSuccess?: () => void;
}

export const CreateGroupExpense = ({ isOpen, onOpenChange, groupId, groupMembers, onSuccess }: CreateGroupExpenseProps) => {
    const currentUser = useAuthStore((state) => state.user);

    const [title, setTitle] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [splitType, setSplitType] = useState<SplitType>("EQUAL");
    const [paidByUsername, setPaidByUsername] = useState<string>("");
    const [participantUsernames, setParticipantUsernames] = useState<string[]>([]);
    const [splitEntries, setSplitEntries] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const memberUsernames = useMemo(() => groupMembers.map((m) => m.username), [groupMembers]);

    useEffect(() => {
        if (!isOpen) return;

        const defaultParticipants = memberUsernames;
        setParticipantUsernames(defaultParticipants);
        setSplitEntries({});
        setSplitType("EQUAL");
        setAmount("");
        setTitle("");
        setNote("");

        const currentUsername = currentUser?.username;
        if (currentUsername && memberUsernames.includes(currentUsername)) {
            setPaidByUsername(currentUsername);
        } else {
            setPaidByUsername(memberUsernames[0] || "");
        }
    }, [isOpen, memberUsernames, currentUser]);

    const handleToggleParticipant = (username: string) => {
        setParticipantUsernames((prev) => {
            const exists = prev.includes(username);
            const next = exists ? prev.filter((u) => u !== username) : [...prev, username];
            setSplitEntries((prevSplits) => {
                const entries = { ...prevSplits };
                Object.keys(entries).forEach((key) => {
                    if (!next.includes(key)) delete entries[key];
                });
                return entries;
            });
            return next;
        });
    };

    const remainingForUnequal = useMemo(() => {
        const total = parseFloat(amount || "0");
        const used = participantUsernames.reduce((sum, username) => sum + (splitEntries[username] || 0), 0);
        return Number.isFinite(total) ? total - used : 0;
    }, [amount, participantUsernames, splitEntries]);

    const remainingForPercentage = useMemo(() => {
        const used = participantUsernames.reduce((sum, username) => sum + (splitEntries[username] || 0), 0);
        return 100 - used;
    }, [participantUsernames, splitEntries]);

    const validateSplits = () => {
        const totalAmount = parseFloat(amount || "0");

        if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
            toast.error("Amount must be greater than zero.");
            return false;
        }

        if (participantUsernames.length === 0) {
            toast.error("Select at least one participant.");
            return false;
        }

        if (!paidByUsername) {
            toast.error("Select who paid.");
            return false;
        }

        if (splitType === "UNEQUAL") {
            const used = participantUsernames.reduce((sum, username) => sum + (splitEntries[username] || 0), 0);
            if (participantUsernames.some((u) => !splitEntries[u] && splitEntries[u] !== 0)) {
                toast.error("Enter amounts for all participants.");
                return false;
            }
            if (Math.abs(used - totalAmount) > 0.01) {
                toast.error(`Split amounts must equal total. Difference: ${Math.abs(used - totalAmount).toFixed(2)}`);
                return false;
            }
        }

        if (splitType === "PERCENTAGE") {
            const used = participantUsernames.reduce((sum, username) => sum + (splitEntries[username] || 0), 0);
            if (participantUsernames.some((u) => !splitEntries[u] && splitEntries[u] !== 0)) {
                toast.error("Enter percentages for all participants.");
                return false;
            }
            if (Math.abs(used - 100) > 0.01) {
                toast.error(`Percentages must total 100%. Current: ${used.toFixed(2)}%`);
                return false;
            }
        }

        return true;
    };

    const buildSplitsPayload = () => {
        if (splitType === "UNEQUAL") {
            return participantUsernames.map((username) => ({ username, amount: splitEntries[username] || 0 }));
        }
        if (splitType === "PERCENTAGE") {
            return participantUsernames.map((username) => ({ username, percentage: splitEntries[username] || 0 }));
        }
        return undefined;
    };

    const handleCreateExpense = async () => {
        if (title.trim().length === 0) {
            toast.error("Title is required.");
            return;
        }

        if (note.trim().length === 0) {
            toast.error("Note is required.");
            return;
        }

        if (!validateSplits()) return;

        const totalAmount = parseFloat(amount || "0");

        setIsLoading(true);
        try {
            const payload: CreateGroupExpenseData = {
                title,
                note,
                amount: totalAmount,
                paidByUsername,
                splitType,
                participantUsernames,
            };

            const splits = buildSplitsPayload();
            if (splits) payload.splits = splits;

            const response: CreateGroupExpenseResponse = await expensesService.createGroupExpense(
                groupId,
                payload
            );

            if (response.success) {
                toast.success("Expense created successfully!");
                if (onSuccess) onSuccess();
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Error creating group expense:", error);
            toast.error("Failed to create group expense.");
        } finally {
            setIsLoading(false);
        }
    };

    const splitInputsNeeded = splitType === "UNEQUAL" || splitType === "PERCENTAGE";
    const isRemainingZero = splitType === "UNEQUAL" 
        ? Math.abs(remainingForUnequal) < 0.01 
        : Math.abs(remainingForPercentage) < 0.01;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-green-600" />
                        Add Group Expense
                    </DialogTitle>
                    <DialogDescription>
                        Split an expense with your group members.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g., Dinner at restaurant" 
                            className="w-full"
                        />
                    </div>

                    {/* Note */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Note <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add notes about this expense..."
                            className="w-full min-h-20 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full"
                        />
                    </div>

                    {/* Paid By */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Paid By <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={paidByUsername}
                            onChange={(e) => setPaidByUsername(e.target.value)}
                        >
                            {groupMembers.map((member) => (
                                <option key={member.username} value={member.username}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Split Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Split Type
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setSplitType("EQUAL");
                                    setSplitEntries({});
                                }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                    splitType === "EQUAL"
                                        ? "bg-green-600 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                Equal Split
                            </button>
                            <button
                                type="button"
                                onClick={() => setSplitType("UNEQUAL")}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                    splitType === "UNEQUAL"
                                        ? "bg-green-600 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                Unequal
                            </button>
                            <button
                                type="button"
                                onClick={() => setSplitType("PERCENTAGE")}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                                    splitType === "PERCENTAGE"
                                        ? "bg-green-600 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                Percentage
                            </button>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            Participants <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {groupMembers.map((member) => {
                                const isSelected = participantUsernames.includes(member.username);
                                return (
                                    <label key={member.username} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleToggleParticipant(member.username)}
                                            className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500"
                                        />
                                        <span className="text-slate-700">{member.name.toUpperCase()}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Split Details */}
                    {splitInputsNeeded && parseFloat(amount) > 0 && (
                        <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">
                                Split Details
                            </h4>

                            {participantUsernames.map((username) => {
                                const member = groupMembers.find((m) => m.username === username);
                                return (
                                    <div key={username} className="flex items-center gap-3">
                                        <div className="w-32 text-sm font-medium text-slate-700">
                                            {member?.name}
                                        </div>
                                        <Input
                                            type="number"
                                            min="0"
                                            step={splitType === "UNEQUAL" ? "0.01" : "1"}
                                            value={splitEntries[username] ?? ""}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                if (!isNaN(val) && val >= 0) {
                                                    setSplitEntries((prev) => ({ ...prev, [username]: val }));
                                                } else if (e.target.value === "") {
                                                    setSplitEntries((prev) => {
                                                        const newEntries = {...prev};
                                                        delete newEntries[username];
                                                        return newEntries;
                                                    });
                                                }
                                            }}
                                            placeholder={splitType === "UNEQUAL" ? "0.00" : "0"}
                                            className="flex-1"
                                        />
                                        {splitType === "PERCENTAGE" && <span className="text-sm text-slate-500">%</span>}
                                    </div>
                                );
                            })}

                            {/* Remaining Display */}
                            <div className="pt-2 border-t border-slate-200">
                                <div className={`text-sm font-medium ${
                                    isRemainingZero
                                        ? "text-green-600" 
                                        : splitType === "UNEQUAL" && remainingForUnequal > 0
                                        ? "text-orange-600" 
                                        : "text-red-600"
                                }`}>
                                    {isRemainingZero
                                        ? "✓ Split complete!" 
                                        : splitType === "UNEQUAL"
                                        ? `${Math.abs(remainingForUnequal).toFixed(2)} ${remainingForUnequal > 0 ? "left" : "over"} of ${parseFloat(amount).toFixed(2)}`
                                        : `${Math.abs(remainingForPercentage).toFixed(2)}% ${remainingForPercentage > 0 ? "left" : "over"} of 100%`
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateExpense}
                        disabled={isLoading || (splitInputsNeeded && !isRemainingZero)}
                        className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Saving..." : "Add Expense"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};