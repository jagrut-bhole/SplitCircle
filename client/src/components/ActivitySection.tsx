import { useState, useEffect } from "react";
import { activityService } from "@/services/activityService";
import { toast } from "sonner";
import type { Activity } from "@/types/ActivityTypes";
import { Receipt, History, Loader2, AlertCircle } from "lucide-react";

export function ActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await activityService.getActivityFeed(20);
      
      if (response.success) {
        setActivities(response.data);
      } else {
        setError("Failed to load activities");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities");
      toast.error("Failed to load recent activities");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (seconds < 60) return "just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;
      const weeks = Math.floor(days / 7);
      if (weeks < 4) return `${weeks}w ago`;
      return date.toLocaleDateString();
    } catch {
      return "recently";
    }
  };

  const getActivityIcon = (activity: Activity) => {
    if (activity.settlementId) {
      return (
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Receipt className="w-5 h-5 text-blue-600" />
        </div>
      );
    }
    
    return (
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <Receipt className="w-5 h-5 text-green-600" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">Loading activities...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-red-400 mb-2" />
            <p className="text-sm text-slate-600 font-medium">{error}</p>
            <button
              onClick={fetchActivities}
              className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <History className="w-12 h-12 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500 font-medium">No activities yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Start by adding expenses or settling debts
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                {getActivityIcon(activity)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium leading-snug">
                    {activity.note}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
