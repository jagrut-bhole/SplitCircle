import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity as ActivityIcon, Receipt, Check, UserPlus, Users, ArrowLeft } from "lucide-react";
import { activityService } from "@/services/activityService";
import type { Activity as ActivityType } from "@/types/ActivityTypes";
import { toast } from "sonner";

interface ExtendedActivity extends ActivityType {
    actor?: {
        id: string;
        name: string;
        email: string;
    };
    group?: {
        id: string;
        name: string;
    } | null;
    expense?: {
        id: string;
        title: string;
        note: string;
        amount: number;
        splitType: string;
        paidBy: {
            id: string;
            name: string;
        };
    } | null;
    settlement?: {
        id: string;
        amount: number;
        note: string;
        paidBy: {
            id: string;
            name: string;
        };
        paidTo: {
            id: string;
            name: string;
        };
    } | null;
}

export default function Activity() {
    const navigate = useNavigate();
    const [activities, setActivities] = useState<ExtendedActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchActivities = async () => {
        setIsLoading(true);
        try {
            const response = await activityService.getActivityFeed(50);
            if (response.success && response.data) {
                setActivities(response.data as ExtendedActivity[]);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            toast.error("Failed to load activities");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const getActivityType = (activity: ExtendedActivity): 'expense' | 'settle' | 'create' | 'group' => {
        if (activity.settlementId || (activity.expense && activity.expense.splitType === 'SETTLEMENT')) {
            return 'settle';
        }
        if (activity.expenseId) {
            return 'expense';
        }
        if (activity.note.includes('created group') || activity.note.includes('Created group')) {
            return 'create';
        }
        return 'group';
    };

    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 mt-5">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                        <div className="bg-blue-100 p-3 rounded-2xl shadow-sm">
                            <ActivityIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Activity Log</h2>
                            <p className="text-slate-500 font-medium">Track all recent expenses and updates</p>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="ml-auto flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm hover:bg-slate-50"
                        >
                            <ArrowLeft className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-700">Back to Dashboard</span>
                        </button>
                    </div>

                    {/* Content List */}
                    <div className="flex-1 overflow-y-auto custom-scroll p-6 md:p-8">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <ActivityIcon className="w-12 h-12 text-slate-300 mb-2" />
                                <p className="text-slate-400 font-medium">No activities yet</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {activities.map((activity) => {
                                    const activityType = getActivityType(activity);
                                    const amount = activity.expense?.amount || activity.settlement?.amount;

                                    return (
                                        <div
                                            key={activity.id}
                                            className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100 group"
                                        >
                                            {/* Icon Container */}
                                            <div className="mt-1 shrink-0">
                                                {activityType === 'expense' && (
                                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center ring-4 ring-white shadow-sm">
                                                        <Receipt className="w-5 h-5" />
                                                    </div>
                                                )}
                                                {activityType === 'settle' && (
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ring-4 ring-white shadow-sm">
                                                        <Check className="w-5 h-5" />
                                                    </div>
                                                )}
                                                {activityType === 'create' && (
                                                    <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center ring-4 ring-white shadow-sm">
                                                        <Users className="w-5 h-5" />
                                                    </div>
                                                )}
                                                {activityType === 'group' && (
                                                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center ring-4 ring-white shadow-sm">
                                                        <UserPlus className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="pr-2">
                                                        <p className="text-base text-slate-800 leading-snug">
                                                            {activity.note}
                                                        </p>
                                                        {activity.group && (
                                                            <p className="text-xs text-slate-500 mt-0.5">
                                                                in <span className="font-semibold text-slate-700">"{activity.group.name}"</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-slate-400 whitespace-nowrap pt-1">
                                                        {formatTimeAgo(activity.createdAt)}
                                                    </span>
                                                </div>

                                                {amount && (
                                                    <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-white border ${activityType === 'settle' ? 'text-blue-600 border-blue-100' : 'text-green-600 border-green-100'}`}>
                                                        ₹{amount.toFixed(2)}
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
            </div>
        </div>
    );
}
