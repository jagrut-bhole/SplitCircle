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
import type { FriendSettlementInfo } from "@/types/SettlementTypes";
import { Loader2, Check } from "lucide-react";

interface SettleGroupPaymentProps {
  friendId: string;
  friendName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const SettleGroupPayment = ({
  friendId,
  friendName,
  isOpen,
  onOpenChange,
  onSuccess,
}: SettleGroupPaymentProps) => {
  const [settlementInfo, setSettlementInfo] = useState<FriendSettlementInfo | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchSettlementInfo();
    } else {
      // Reset state when modal closes
      setAmount("");
      setNote("");
      setSettlementInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, friendId]);

  const fetchSettlementInfo = async () => {
    setIsFetchingInfo(true);
    try {
      const response = await settlementsService.getFriendSettlementInfo(friendId);
      
      if (response.success) {
        setSettlementInfo(response.data);
        
        // Pre-fill amount with what you owe
        if (response.data.youOwe > 0) {
          setAmount(response.data.youOwe.toFixed(2));
        } else {
          toast.info("You're all settled up with this friend!");
        }
      }
    } catch (error) {
      console.error("Error fetching settlement info:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to fetch settlement information";
      toast.error(errorMessage);
    } finally {
      setIsFetchingInfo(false);
    }
  };

  const handleSettle = async () => {
    if (!settlementInfo) return;

    const parsedAmount = parseFloat(amount);
    
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parsedAmount > settlementInfo.youOwe) {
      toast.error(`Amount cannot exceed ₹${settlementInfo.youOwe.toFixed(2)}`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await settlementsService.settleFriend(friendId, {
        amount: parsedAmount,
        note: note.trim() || undefined,
      });

      if (response.success) {
        toast.success(`Successfully paid ₹${parsedAmount.toFixed(2)} to ${friendName}`);
        onOpenChange(false);
        
        // Call onSuccess callback to refresh friend details and activities
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error settling friend debt:", error);
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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Settle Up with {friendName}</DialogTitle>
          <DialogDescription>
            Record a payment to settle your debt with {friendName}
          </DialogDescription>
        </DialogHeader>

        {isFetchingInfo ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : settlementInfo ? (
          settlementInfo.youOwe > 0 ? (
            // Payment form
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  max={settlementInfo.youOwe}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  You owe: ₹{settlementInfo.youOwe.toFixed(2)}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note for this payment..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Current Balance</span>
                  <span className="font-medium">{settlementInfo.message}</span>
                </div>
                {parseFloat(amount) > 0 && (
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">After Payment</span>
                    <span className="font-semibold text-green-600">
                      {(settlementInfo.youOwe - parseFloat(amount)) > 0.01
                        ? `You owe ₹${(settlementInfo.youOwe - parseFloat(amount)).toFixed(2)}`
                        : "Settled"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Already settled
            <div className="text-center py-8">
              <Check className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p className="font-medium">All settled up!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {settlementInfo.message}
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Failed to load settlement information
          </div>
        )}

        <DialogFooter>
          {settlementInfo && settlementInfo.youOwe > 0 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
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
            </>
          ) : (
            <Button type="button" onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
