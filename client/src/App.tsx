import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
// @ts-ignore
import Header from "./components/Header";
// @ts-ignore
import ProgressTabs from "./components/ProgressTabs";
// @ts-ignore
import Footer from "./components/Footer";

// Pages
// @ts-ignore
import BrandInfo from "./pages/BrandInfo";
// @ts-ignore
import Audience from "./pages/Audience";
// @ts-ignore
import OfferUSPs from "./pages/OfferUSPs";
// @ts-ignore
import VisualAssets from "./pages/VisualAssets";
// @ts-ignore
import BrandReviews from "./pages/BrandReviews";
// @ts-ignore
import Review from "./pages/Review";

import { BriefIdProvider } from './contexts/BriefIdContext';

import ReviewsSection from './pages/ReviewsSection';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BriefIdProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <ProgressTabs />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<BrandInfo />} />
                <Route path="/audience" element={<Audience />} />
                <Route path="/offer" element={<OfferUSPs />} />
                <Route path="/visual-assets" element={<VisualAssets />} />
                <Route path="/brand-reviews" element={<BrandReviews />} />
                <Route path="/reviews" element={<BrandReviews />} />
                <Route path="/review" element={<Review />} />
                <Route path="/reviews-section" element={<ReviewsSection />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </BriefIdProvider>
    </QueryClientProvider>
  );
}

export default App;
