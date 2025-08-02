import { useNavigate } from 'react-router-dom';
import { FaBrain, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBrain className="text-indigo-600 text-2xl" />
          <h1 className="text-xl font-bold text-gray-800">MindVault</h1>
        </div>
      </header>

 
      <main className="flex-grow flex flex-col items-center justify-center p-6 max-w-4xl mx-auto text-center">
        <div className="mb-8 relative">
          <div className="text-[120px] md:text-[180px] font-bold text-gray-200 tracking-wide">404</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <FaBrain className="text-indigo-500 text-6xl md:text-8xl mb-4" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Page Not Found</h2>
          </div>
        </div>

        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
           This page doesn't exist in your knowledge vault. 
          You might have mistyped the address, let's get you back to productive thinking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FaArrowLeft />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <FaHome />
            Return to Dashboard
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="animate-pulse bg-gray-100 border border-gray-200 rounded-lg p-4 h-24 flex flex-col justify-between"
            >
              <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto"></div>
              <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </main>

    
      <footer className="py-6 px-4 text-center text-gray-500 text-sm">
        <p>MindVault &copy; {new Date().getFullYear()} - Organize Your Thoughts, Amplify Your Productivity</p>
      </footer>
    </div>
  );
};

export default NotFound;