// image placements
const images = ({ children }) => {
  return (
  
    <div className="bg-global-bg bg-contain bg-center min-h-screen p-4">
    <div className="flex items-center justify-between">
        <img
          src="/images/logo.png" 
          alt="Bookworm Logo"
          className="h-12 w-auto"
        />
        <div>
      {children}
    </div>
    </div>
  </div>
  );
};

export default images