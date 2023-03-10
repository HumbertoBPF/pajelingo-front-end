import AboutUs from 'pages/AboutUs';
import Activation from 'pages/Activation';
import Base from 'pages/Base';
import ArticleGame from 'pages/Games/ArticleGame/ArticleGame';
import ArticleGameSetup from 'pages/Games/ArticleGame/ArticleGameSetup';
import ConjugationGame from 'pages/Games/ConjugationGame/ConjugationGame';
import ConjugationGameSetup from 'pages/Games/ConjugationGame/ConjugationGameSetup';
import VocabularyGame from 'pages/Games/VocabularyGame/VocabularyGame';
import VocabularyGameSetup from 'pages/Games/VocabularyGame/VocabularyGameSetup';
import Index from 'pages/Index';
import Login from 'pages/Login';
import Meanings from 'pages/Meanings';
import Profile from 'pages/Profile';
import Rankings from 'pages/Rankings';
import RequestResetAccount from 'pages/RequestResetAccount';
import ResetAccount from 'pages/ResetAccount';
import Search from 'pages/Search';
import SearchResults from 'pages/SearchResults';
import SignUp from 'pages/SignUp';
import UpdateAccount from 'pages/UpdateAccount';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base/>}>
          <Route path="/dashboard" element={<Index/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/article-game/setup" element={<ArticleGameSetup/>}/>
          <Route path="/article-game/play" element={<ArticleGame/>}/>
          <Route path="/conjugation-game/setup" element={<ConjugationGameSetup/>}/>
          <Route path="/conjugation-game/play" element={<ConjugationGame/>}/>
          <Route path="/vocabulary-game/setup" element={<VocabularyGameSetup/>}/>
          <Route path="/vocabulary-game/play" element={<VocabularyGame/>}/>
          <Route path="/rankings" element={<Rankings/>}/>
          <Route path="/search-results" element={<SearchResults/>}/>
          <Route path="/meanings/:pk" element={<Meanings/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/activate/:uid/:token" element={<Activation/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/update-account" element={<UpdateAccount/>}/>
          <Route path="/request-reset-account" element={<RequestResetAccount/>}/>
          <Route path="/reset-account/:uid/:token" element={<ResetAccount/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
