import { useEffect, useState } from "react";
import { toast } from "sonner";
import { friendsService } from "@/services/friendsService";

interface OwedCardsProps {
    refreshKey?: number;
}

export const OwedCards = ({ refreshKey }: OwedCardsProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [totalOwedToUser, setTotalOweToUser] = useState(0);
    const [totalUserOwes, setTotalUserOwes] = useState(0);

    const fetchOwedData = async () => {
        setIsLoading(true);

        try {
            const response = await friendsService.userOwedAmount();

            const { totalOwedToUser, totalUserOwes } = response.data;
            setTotalOweToUser(totalOwedToUser);
            setTotalUserOwes(totalUserOwes);

        } catch (error) {
            console.error("Error while fetching user owed data: ", error);
            toast.error("Failed to fetch owed data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOwedData();
    }, [refreshKey])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-linear-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/15 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <p className="text-emerald-100 text-sm font-medium mb-1">You will get</p>
                    {/* <h2 className="text-3xl font-bold">₹{' '}{isLoading ? "-" : totalOwedToUser.toFixed(2)}</h2> */}
                    <h2 className="text-3xl font-bold">₹{' '}{isLoading ? '-' : totalOwedToUser === 0 ? 0 : totalOwedToUser.toFixed(2)} </h2>

                </div>
                <div className="bg-linear-to-br from-rose-500 to-rose-700 rounded-2xl p-6 text-white shadow-lg shadow-rose-200 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/15 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <p className="text-rose-100 text-sm font-medium mb-1">You have to give</p>
                    {/* <h2 className="text-3xl font-bold">₹{' '}{isLoading ? "-" : totalUserOwes.toFixed(2)}</h2> */}
                    <h2 className="text-3xl font-bold">₹{' '}{isLoading ? '-' : totalUserOwes === 0 ? 0 : totalUserOwes.toFixed(2)} </h2>

                </div>
            </div>
        </>
    )
}