import { NavBar } from "@/components/NavBar"
import { BackgroundComponent } from "@/components/ui/the-infinite-grid"
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundComponent />

      <div className="relative top-7 z-50">
        <NavBar />
      </div>

      <main className="flex-1 relative z-10 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
              Split Expenses, Stay Friends
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Easily split bills and track expenses with friends and groups. <br />
              Keep your finances simple and your friendships strong.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-all active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}