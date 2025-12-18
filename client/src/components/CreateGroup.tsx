import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { groupsService } from "@/services/groupsService";
import type { CreateGroupData, CreateGroupResponse } from "@/types/GroupTypes";
import { friendsService } from "@/services/friendsService";
import type { GetFriendsResponse } from "@/types/FriendsTypes";

interface CreateGroupProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const CreateGroup = ({ isOpen, onOpenChange, onSuccess }: CreateGroupProps) => {
    const [name,setname] = useState<string>("");

    const [note, setNote] = useState<string>("");

    const [members , setMembers] = useState<string[]>([]);
    const [friends, setFriends] = useState<{ username: string; name: string; id?: string }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCreate = async () => { 
        if (name.trim().length === 0) {
            toast.error("Group name cannot be empty.");
            return;
        }

        if(members.length === 0) {
            toast.error("Please add at least one member to the group.");
            return;
        }

        setIsLoading(true);

        try {
            const response : CreateGroupResponse = await groupsService.createGroup({
                name : name,
                description : note,
                memberUsernames : members
            } as CreateGroupData);

            if (response.success) {
                toast.success(`Group ${name} created successfully!`);
                setname("");
                setNote("");
                setMembers([]);
                onOpenChange(false);
                // trigger parent refresh
                onSuccess && onSuccess();
            }

        } catch (error) {
            console.log("Error creating group:", error);
            const axiosError = error as AxiosError<CreateGroupResponse>;
            const errorMessage = axiosError.response?.data?.message || "Failed to create group";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        if(!isLoading) {
             setname("");
            setNote("");
            setMembers([]);
            onOpenChange(false);
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        const loadFriends = async () => {
            try {
                const res: GetFriendsResponse = await friendsService.getFriends();
                if (res.success) {
                    setFriends(res.data.friends.map(f => ({ username: f.username, name: f.name, id: f.id })));
                }
            } catch (err) {
                console.error('Failed to fetch friends', err);
                toast.error('Unable to load friends');
            }
        }

        loadFriends();
    }, [isOpen]);

    const toggleMember = (username: string) => {
        setMembers(prev => prev.includes(username) ? prev.filter(u => u !== username) : [...prev, username]);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogDescription>Enter group details and select members from your friends.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-2 py-2">
                    <label className="text-sm font-medium">Group name</label>
                    <Input value={name} onChange={e => setname(e.target.value)} placeholder="Group name" />

                    <label className="text-sm font-medium">Description (optional)</label>
                    <Input value={note} onChange={e => setNote(e.target.value)} placeholder="Short description" />

                    <label className="text-sm font-medium">Members</label>
                    <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                        {friends.length === 0 ? (
                            <div className="text-sm text-slate-500">No friends found</div>
                        ) : (
                            friends.map(f => (
                                <div key={f.username} className="flex items-center gap-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={members.includes(f.username)}
                                        onChange={() => toggleMember(f.username)}
                                    />
                                    <div className="text-sm">
                                        <div className="font-medium">{f.name}</div>
                                        <div className="text-xs text-slate-500">@{f.username}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <div className="flex items-center justify-end gap-2 w-full">
                        <Button variant="ghost" onClick={handleClose} disabled={isLoading}>Cancel</Button>
                        <Button onClick={handleCreate} disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Group'}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}