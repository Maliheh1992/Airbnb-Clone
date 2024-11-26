import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddnewBookmark";
import BookMark from "./components/Bookmark";
import AuthProvider from "./components/context/AuthProvider";
import LoginForm from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />

          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />}></Route>
              <Route
                path=":id"
                element={
                  <div>
                    <SingleHotel />
                  </div>
                }
              ></Route>
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookMarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookMark />}></Route>
              <Route path=":id" element={<SingleBookmark />}></Route>
              <Route path="add" element={<AddNewBookmark />}></Route>
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
