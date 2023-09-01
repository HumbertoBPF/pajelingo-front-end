import AboutUs from "pages/AboutUs";
import Activation from "pages/Activation";
import Base from "pages/Base";
import FavoriteWords from "pages/FavoriteWords";
import ArticleGame from "pages/Games/ArticleGame/ArticleGame";
import ArticleGameSetup from "pages/Games/ArticleGame/ArticleGameSetup";
import ConjugationGame from "pages/Games/ConjugationGame/ConjugationGame";
import ConjugationGameSetup from "pages/Games/ConjugationGame/ConjugationGameSetup";
import GameMenu from "pages/Games/GameMenu";
import VocabularyGame from "pages/Games/VocabularyGame/VocabularyGame";
import VocabularyGameSetup from "pages/Games/VocabularyGame/VocabularyGameSetup";
import Index from "pages/Index";
import Login from "pages/Login";
import Meanings from "pages/Meanings";
import MyProfile from "pages/MyProfile";
import Profile from "pages/Profile";
import Rankings from "pages/Rankings";
import RequestResetAccount from "pages/RequestResetAccount";
import ResetAccount from "pages/ResetAccount";
import Dictionary from "pages/Dictionary";
import SignUp from "pages/SignUp";
import UpdateAccount from "pages/UpdateAccount";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchAccount from "pages/SearchAccount";
import NotFound from "pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/accounts" element={<SearchAccount />} />
          <Route path="/accounts/:username" element={<Profile />} />
          <Route path="/meanings/:pk" element={<Meanings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate/:uid/:token" element={<Activation />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/favorite-words" element={<FavoriteWords />} />
          <Route path="/update-account" element={<UpdateAccount />} />
          <Route
            path="/request-reset-account"
            element={<RequestResetAccount />}
          />
          <Route path="/reset-account/:uid/:token" element={<ResetAccount />} />
          {/* Games routes */}
          <Route path="/games" element={<GameMenu />} />
          <Route path="/article-game/setup" element={<ArticleGameSetup />} />
          <Route path="/article-game/play" element={<ArticleGame />} />
          <Route
            path="/conjugation-game/setup"
            element={<ConjugationGameSetup />}
          />
          <Route path="/conjugation-game/play" element={<ConjugationGame />} />
          <Route
            path="/vocabulary-game/setup"
            element={<VocabularyGameSetup />}
          />
          <Route path="/vocabulary-game/play" element={<VocabularyGame />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
