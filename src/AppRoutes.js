import AboutUs from 'pages/AboutUs';
import Base from 'pages/Base';
import Index from 'pages/Index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base/>}>
          <Route path="/dashboard" element={<Index/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
