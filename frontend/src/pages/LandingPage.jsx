// src/pages/LandingPage.jsx
import Navbar from '../components/Navbar';

const LandingPage = () => (
  <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://media.newyorker.com/photos/63a4964f9a1485c25e918cd9/4:3/w_2275,h_1706,c_limit/Shouts-Elson-Reading.jpg)' }}>
    <Navbar />
    <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
      {/* You can add any other content here if needed */}
    </div>
  </div>
);

export default LandingPage;






