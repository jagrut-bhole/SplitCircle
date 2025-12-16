import { GroupSection } from "@/components/GroupSection"
import { FriendSection } from "@/components/FriendSection"
import { NavBar } from "@/components/NavBar"
import { OwedCards } from "@/components/OwedCards"


export const Dashboard = () => {
    return (
        <div >
            <NavBar />
            <div className="mx-auto w-5xl max-w-7xl px-4 py-8">
                <OwedCards />
            </div>
                {/* Additional dashboard content can go here */}
                <div className="flex flex-col h-160 font-sans">

                    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                        <div className="h-full max-w-7xl mx-auto w-full transition-all duration-300">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                                {/* GROUPS PANEL */}
                                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                                    <GroupSection />
                                </div>

                                {/* FRIENDS PANEL */}
                                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                                    <FriendSection />
                                </div>
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