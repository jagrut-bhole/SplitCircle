import { useState, useCallback } from "react";
import { GroupSection } from "@/components/GroupSection"
import { FriendSection } from "@/components/FriendSection"
import { NavBar } from "@/components/NavBar"
import { OwedCards } from "@/components/OwedCards"
import { ActivitySection } from "@/components/ActivitySection"


export const Dashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = useCallback(() => {
        setRefreshKey((prev) => prev + 1);
    }, []);

    return (
        <div >
            <div className="relative top-5 mb-4 z-50">
                <NavBar />
            </div>
            <div className="mx-auto w-5xl max-w-7xl px-4 py-8">
                <OwedCards refreshKey={refreshKey} />
            </div>
            {/* Additional dashboard content can go here */}
            <div className="flex flex-col h-170 font-sans">

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="h-full max-w-7xl mx-auto w-full transition-all duration-300">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full mb-6">
                            {/* GROUPS PANEL */}
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                                <GroupSection onDataChange={triggerRefresh} />
                            </div>

                            {/* FRIENDS PANEL */}
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                                <FriendSection onDataChange={triggerRefresh} />
                            </div>
                        </div>

                        {/* ACTIVITY FEED */}
                        <div className="max-w-7xl mx-auto">
                            <ActivitySection />
                        </div>

                        {/* <div className="h-full max-w-3xl mx-auto animate-fade-in">
                                    <GroupSection />
                                </div> */}


                    </div>
                </main>
            </div>

        </div>
    )
}