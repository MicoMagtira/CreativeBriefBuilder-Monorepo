import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import Header from "./components/Header";
import ProgressTabs from "./components/ProgressTabs";
import Footer from "./components/Footer";

// Pages
import BrandInfo from "./pages/BrandInfo";
import Audience from "./pages/Audience";
import OfferUSPs from "./pages/OfferUSPs";
import BrandReviews from "./pages/BrandReviews";
import Review from "./pages/Review";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <ProgressTabs />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<BrandInfo />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/offer" element={<OfferUSPs />} />
              <Route path="/reviews" element={<BrandReviews />} />
              <Route path="/review" element={<Review />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
