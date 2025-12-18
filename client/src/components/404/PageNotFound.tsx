import { Home } from 'lucide-react';
import { BackgroundComponent } from '../ui/the-infinite-grid';

export const NotFoundPage = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden ">
        <BackgroundComponent />
      
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
      </div> */}

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 space-y-6">

        <h1 className="text-[120px] md:text-[180px] font-extrabold text-black leading-none tracking-tight">
          404
        </h1>

        <p className="text-lg md:text-xl text-slate-800 max-w-md">
          The page you're looking for might have been moved or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleGoHome}
            className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg active:scale-95"
          >
            <Home size={20} />
            Go Home
          </button>
        
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size[50px_50px] pointer-events-none opacity-20" />
    </div>
  );
};