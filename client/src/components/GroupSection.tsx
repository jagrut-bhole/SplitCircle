import { useEffect, useState } from "react";
import { groupsService } from "@/services/groupsService";
import type { GetUserGroupsResponse, UserGroup } from "@/types/GroupTypes";
import { toast } from "sonner";
import { Users, Plus } from "lucide-react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateGroup } from "./CreateGroup";

export const GroupSection = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [groupDetails, setGroupDetails] = useState<UserGroup[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const calculateGroupBalance = (userGroup: UserGroup) => {
        // Use balance from API if available
        return userGroup.balance || 0;
    };

    const fetchUserGroups = async () => {
        setIsLoading(true);
        try {
            const response: GetUserGroupsResponse = await groupsService.getUserGroups();

            if (response.success) {
                setGroupDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching user groups:", error);
            toast.error("Failed to fetch groups. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGroupClick = (groupId: string) => {
        navigate(`/groups/${groupId}`);
    };

    useEffect(() => {
        fetchUserGroups();
    }, []);

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#E2E8F0] p-3 rounded-xl">
                            <Users className="w-6 h-6 text-[#475569]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Groups</h2>
                            <p className="text-xs text-slate-500 font-medium">
                                You belong to {groupDetails.length} {groupDetails.length === 1 ? 'group' : 'groups'}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>

                <CreateGroup isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} onSuccess={fetchUserGroups} />

                {/* Groups */}
                <div className="flex-1 overflow-y-auto custom-scroll pr-2 -mr-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-slate-500">Loading groups...</p>
                        </div>
                    ) : groupDetails.length === 0 ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-slate-500">No groups found. Create one to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-3 grid-cols-1">
                            {groupDetails.map((userGroup) => {
                                const group = Array.isArray(userGroup.group) ? userGroup.group[0] : userGroup.group;
                                const balance = calculateGroupBalance(userGroup);
                                const memberCount = group?.members?.length || 0;
                                const lastActive = group?.updatedAt ? new Date(group.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Just now';

                                return (
                                    <div 
                                        key={userGroup.id} 
                                        onClick={() => handleGroupClick(userGroup.groupId)}
                                        className="group relative bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex items-center gap-4 hover:bg-slate-50 hover:border-slate-300"
                                    >
                                        <div className="w-12 h-12 object-cover rounded-lg bg-[#F1F5F9] flex items-center justify-center shadow-sm">
                                            <span className="text-[#475569] font-bold text-lg">
                                                {group?.name?.charAt(0).toUpperCase() || 'G'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 text-base">{group?.name || 'Unnamed Group'}</h3>
                                            <p className="text-xs text-slate-500">{memberCount} members •  {lastActive}</p>
                                        </div>

                                        <div className="text-right">
                                            {balance > 0 && (
                                                <div className="text-[#059669] font-bold flex items-center justify-end gap-1">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                    ₹{balance.toFixed(2)}
                                                </div>
                                            )}
                                            {balance < 0 && (
                                                <div className="text-red-500 font-bold flex items-center justify-end gap-1">
                                                    <ArrowDownLeft className="w-4 h-4" />
                                                    ₹{Math.abs(balance).toFixed(2)}
                                                </div>
                                            )}
                                            {balance === 0 && (
                                                <div className="text-slate-400 font-medium text-sm">Settled</div>
                                            )}
                                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                                                {balance > 0 ? 'owes you' : balance < 0 ? 'you owe' : ''}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}