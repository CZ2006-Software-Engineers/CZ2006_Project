import React from "react";
import Home from "./Home";
import Header from "./Header";
import "../styles/App.css";
import { UserProvider } from "../contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewListing from "./NewListing";
import Listing from "./Listing";
import Chat from "./Chat";
import { ChatEngineWrapper } from "react-chat-engine";

export default function App() {
  return (
    <UserProvider>
      <ChatEngineWrapper>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:listingId" element={<Listing />} />
              <Route path="/create-listing" element={<NewListing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:chatId" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ChatEngineWrapper>
    </UserProvider>
  );
}
