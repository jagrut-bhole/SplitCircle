import { useState, useEffect } from "react";
import { friendsService } from "@/services/friendsService";
import type { GetFriendsResponse, Friend, FriendsSummary } from "@/types/FriendsTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, UserPlus, CheckCircle2 } from "lucide-react";

export const FriendSection = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [allFriends, setAllFriends] = useState<Friend[]>([]);

    const [friendSummary, setFriendSummary] = useState<FriendsSummary>({
        totalFriends: 0,
        youOwe: 0,
        youAreOwed: 0,
    });

    // Count how many people owe you money
    const getPeopleOwingYouCount = () => {
        return allFriends.filter(friend => friend.balance > 0).length;
    };

    const fetchAllFriends = async () => {
        setIsLoading(true);
        try {
            const response: GetFriendsResponse = await friendsService.getFriends();

            if (response.success) {
                setAllFriends(response.data.friends)
                setFriendSummary(response.data.summary);
            }
        } catch (error) {
            console.log("Error fetching friends:", error);
            toast.error("Failed to fetch friends. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleFriendClick = (friendId: string) => {
        navigate(`/friends/${friendId}`);
    }

    useEffect(() => {
        fetchAllFriends();
    }, []);

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Friends</h2>
                            <p className="text-xs text-slate-500 font-medium">
                                {getPeopleOwingYouCount()} {getPeopleOwingYouCount() === 1 ? 'person owes' : 'people owe'} you money
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
                        <UserPlus className="w-4 h-4" />
                        <span>Add</span>
                    </button>
                </div>

                {/* Friends */}
                <div className="flex-1 overflow-y-auto custom-scroll pr-2 -mr-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-slate-500">Loading friends...</p>
                        </div>
                    ) : allFriends.length === 0 ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-slate-500">No friends found. Add some to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-3 grid-cols-1">
                            {allFriends.map((friend) => {
                                // Determine status based on balance
                                // balance > 0 means friend owes you (owed)
                                // balance < 0 means you owe friend (owes)
                                // balance === 0 means settled
                                const status = friend.balance > 0 ? 'owed' : friend.balance < 0 ? 'owes' : 'settled';
                                const amount = Math.abs(friend.balance);

                                return (
                                    <div 
                                        key={friend.id} 
                                        onClick={() => handleFriendClick(friend.id)}
                                        className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-orange-200 transition-all cursor-pointer flex items-center justify-between hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-sm">
                                                    <span className="text-white font-bold text-sm">
                                                        {friend.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${status === 'settled' ? 'bg-slate-300' : 'bg-green-500'}`}></span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 text-sm">{friend.name}</h3>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            {status === 'owed' && (
                                                <>
                                                    <div className="text-brand-600 font-bold text-sm">Owning</div>
                                                    <div className="text-brand-600 font-bold text-base">${amount.toFixed(2)}</div>
                                                </>
                                            )}
                                            {status === 'owes' && (
                                                <>
                                                    <div className="text-orange-500 font-bold text-sm">Owes</div>
                                                    <div className="text-slate-800 font-bold text-base">${amount.toFixed(2)}</div>
                                                </>
                                            )}
                                            {status === 'settled' && (
                                                <div className="flex items-center gap-1 text-slate-400">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Settled</span>
                                                </div>
                                            )}
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