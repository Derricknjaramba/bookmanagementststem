import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Help from './Help';
import Feedback from './Feedback';
import AssistUser from './AssistUser';
import Images from './Images';



function App() {
  return (
    <Router >
      <Images>
      <Routes>
        <Route path="/" element={<Admin />}  />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/help-requests/:requestId" element={<AssistUser />} />
      </Routes>
      </Images>
    </Router>
  );
}

export default App;
