import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { TestProvider } from "./context/TestContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import WordDetective from "./components/WordDetective";
import Storybook from "./components/Storybook";

import Landing from "./auth/pages/Landing";
import SignIn from "./auth/pages/SignIn";
import SignUpStep1 from "./auth/pages/SignUpStep1";
import SignUpStep2 from "./auth/pages/SignUpStep2";
import SignUpStep3 from "./auth/pages/SignUpStep3";
import SignUpStep4 from "./auth/pages/SignUpStep4";
import SignUpStep5 from "./auth/pages/SignUpStep5";
import Confirmation from "./auth/pages/Confirmation";

const queryClient = new QueryClient();

const LayoutWrapper = () => <Layout><Outlet /></Layout>;

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TestProvider>
          <Toaster />
          <Sonner />
          {isAuthenticated ? (
            <Routes>
              <Route path="/confirmation" element={<Confirmation />} />
              <Route element={<LayoutWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="/screening" element={<Screening />} />
                <Route path="/results" element={<Results />} />
                <Route path="/word-detective" element={<WordDetective />} />
                <Route path="/storybook" element={<Storybook />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<Navigate to="/auth/signup/step1" replace />} />
              <Route path="/auth/signup/step1" element={<SignUpStep1 />} />
              <Route path="/auth/signup/step2" element={<SignUpStep2 />} />
              <Route path="/auth/signup/step3" element={<SignUpStep3 />} />
              <Route path="/auth/signup/step4" element={<SignUpStep4 />} />
              <Route path="/auth/signup/step5" element={<SignUpStep5 />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><p className="text-xl">About Page - Coming Soon</p></div>} />
              <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><p className="text-xl">Contact Page - Coming Soon</p></div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </TestProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
