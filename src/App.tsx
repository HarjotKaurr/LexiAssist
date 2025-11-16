
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestProvider } from "./context/TestContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import WordDetective from "./components/WordDetective";
import Storybook from "./components/Storybook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TestProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/screening" element={<Screening />} />
              <Route path="/results" element={<Results />} />
              <Route path="/word-detective" element={<WordDetective />} />
              <Route path="/storybook" element={<Storybook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TestProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
