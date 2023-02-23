import AboutUs from 'pages/AboutUs';
import Base from 'pages/Base';
import ArticleGameSetup from 'pages/Games/ArticleGame/ArticleGameSetup';
import ConjugationGameSetup from 'pages/Games/ConjugationGame/ConjugationGameSetup';
import VocabularyGameSetup from 'pages/Games/VocabularyGame/VocabularyGameSetup';
import Index from 'pages/Index';
import Rankings from 'pages/Rankings';
import Search from 'pages/Search';
import SearchResults from 'pages/SearchResults';
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
          <Route path="/conjugation-game/setup" element={<ConjugationGameSetup/>}/>
          <Route path="/vocabulary-game/setup" element={<VocabularyGameSetup/>}/>
          <Route path="/rankings" element={<Rankings/>}/>
          <Route path="/search-results" element={<SearchResults/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
