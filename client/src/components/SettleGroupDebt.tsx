import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { settlementsService } from "@/services/settlementsService";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { GroupMemberBalance } from "@/types/SettlementTypes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, Loader2 } from "lucide-react";

interface SettleGroupDebtProps {
  groupId: string;
  groupName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const SettleGroupDebt = ({
  groupId,
  groupName,
  isOpen,
  onOpenChange,
  onSuccess,
}: SettleGroupDebtProps) => {
  const [members, setMembers] = useState<GroupMemberBalance[]>([]);
  const [selectedMember, setSelectedMember] = useState<GroupMemberBalance | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchSettlementInfo();
    } else {
      // Reset state when modal closes
      setSelectedMember(null);
      setAmount("");
      setNote("");
      setMembers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, groupId]);

  const fetchSettlementInfo = async () => {
    setIsFetchingInfo(true);
    try {
      const response: any = await settlementsService.getGroupSettlementInfo(groupId);
      
      if (response.success && response.data) {
        // The API returns yourDebts array, not members
        const yourDebts = response.data.yourDebts || [];
        
        // Map the API response to match our component's expected structure
        const membersYouOwe = yourDebts
          .filter((debt: any) => debt.youOwe && debt.youOwe > 0)
          .map((debt: any) => ({
            userId: debt.user.id,
            username: debt.user.username,
            name: debt.user.name,
            youOwe: debt.youOwe || 0,
            theyOwe: debt.theyOwe || 0,
            balance: 0
          }));
        
        setMembers(membersYouOwe);
        
        if (membersYouOwe.length === 0) {
          toast.info("You don't owe anyone in this group!");
        }
      } else {
        setMembers([]);
        toast.info("No settlement information available");
      }
    } catch (error) {
      console.error("Error fetching settlement info:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to fetch settlement information";
      toast.error(errorMessage);
      setMembers([]);
    } finally {
      setIsFetchingInfo(false);
    }
  };

  const handleSelectMember = (member: GroupMemberBalance) => {
    setSelectedMember(member);
    setAmount(member.youOwe.toFixed(2)); // Pre-fill with full amount owed
  };

  const handleBack = () => {
    setSelectedMember(null);
    setAmount("");
    setNote("");
  };

  const handleSettle = async () => {
    if (!selectedMember) return;

    const parsedAmount = parseFloat(amount);
    
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parsedAmount > selectedMember.youOwe) {
      toast.error(`Amount cannot exceed ₹${selectedMember.youOwe.toFixed(2)}`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await settlementsService.settleGroup(
        groupId,
        selectedMember.userId,
        {
          amount: parsedAmount,
          note: note.trim() || undefined,
        }
      );

      if (response.success) {
        toast.success(`Successfully paid ₹${parsedAmount.toFixed(2)} to ${selectedMember.name}`);
        onOpenChange(false);
        
        // Call onSuccess callback to refresh group details and activities
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error settling group debt:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to settle debt";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {selectedMember ? `Settle with ${selectedMember.name}` : "Settle Up"}
          </DialogTitle>
          <DialogDescription>
            {selectedMember
              ? `Pay your debt to ${selectedMember.name} in ${groupName}`
              : `Select a group member to settle your debt in ${groupName}`}
          </DialogDescription>
        </DialogHeader>

        {isFetchingInfo ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : selectedMember ? (
          // Payment form for selected member
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max={selectedMember.youOwe}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                You owe: ₹{selectedMember.youOwe.toFixed(2)}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                placeholder="Add a note for this payment..."
                value={note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>
        ) : (
          // Member selection list
          <div className="grid gap-3 py-4 max-h-[400px] overflow-y-auto">
            {members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Check className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>All settled up!</p>
                <p className="text-sm">You don't owe anyone in this group.</p>
              </div>
            ) : (
              members.map((member) => (
                <button
                  key={member.userId}
                  onClick={() => handleSelectMember(member)}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors text-left"
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">@{member.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      ₹{member.youOwe.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">you owe</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        <DialogFooter>
          {selectedMember && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          {!selectedMember ? (
            <Button type="button" onClick={handleClose} disabled={isLoading}>
              Close
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSettle}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${amount || "0.00"}`
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
