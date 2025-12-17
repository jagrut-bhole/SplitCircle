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
import { groupsService } from "@/services/groupsService";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { AddMemberResponse } from "@/types/GroupTypes";

interface AddUserToGroupProps {
  groupId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddUserToGroup = ({ groupId, isOpen, onOpenChange, onSuccess }: AddUserToGroupProps) => {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAdd = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setIsLoading(true);

    try {
      const response = await groupsService.addGroupMembers(groupId, username.trim());

      if (response.success) {
        toast.success(`User @${username} added successfully!`);
        setUsername("");
        onOpenChange(false);
        
        // Call onSuccess callback to refresh group details
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error adding user to group:", error);
      const axiosError = error as AxiosError<AddMemberResponse>;
      const errorMessage = axiosError.response?.data?.message || "Failed to add user to group";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setUsername("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User to Group</DialogTitle>
          <DialogDescription>
            Enter the username of the person you want to add to this group.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleAdd();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
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
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
