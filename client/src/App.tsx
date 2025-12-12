import { useQuery } from "@tanstack/react-query";
import UserProfile from "./components/UserProfile";
function App() {

  const {data,isLoading} = useQuery({
    queryKey: ['splitCircle'],
    queryFn: async () => {

    }
  });

  return (
    <>
      <div className="bg-black/90 min-h-screen">
        <h1 className="text-white/90 text-center flex justify-center hover:text-red-500 hover:cursor-pointer">{isLoading ? "isLoading..." : "Jagrut Bhole - SplitCircle"}</h1>
      </div>
      <UserProfile />
    </>
  )
}

export default App
