import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { friendsService } from "@/services/friendsService";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { AddFriendResponse } from "@/types/FriendsTypes";

interface addFriendProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const AddFriend = ({ isOpen, onOpenChange, onSuccess }: addFriendProps) => {
    const [username, setUsername] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAdd = async () => {
        if (!username.trim()) {
            toast.error("Username cannot be empty.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await friendsService.addFriend(username.trim());

            if (response.success) {
                toast.success(`Friend @${username} added successfully!`);
                setUsername("");
                onOpenChange(false);
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.log("Error adding friend:", error);
            const axiosError = error as AxiosError<AddFriendResponse>;
            const errorMessage = axiosError.response?.data?.message || "Failed to add friend";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            setUsername("");
            onOpenChange(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-semibold">Add Friend </DialogTitle>
                    <DialogDescription>
                        Enter the username of the person you want to add as friend.
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
