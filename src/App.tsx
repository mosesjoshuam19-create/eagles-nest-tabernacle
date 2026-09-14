import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import NotFound from "./pages/NotFound";
import AppErrorBoundary from "@/components/AppErrorBoundary";

const Index = lazy(() => import("./pages/Index"));

const OurChurch = lazy(() => import("./pages/about/OurChurch"));
const Mission = lazy(() => import("./pages/about/Mission"));
const Leadership = lazy(() => import("./pages/about/Leadership"));
const Values = lazy(() => import("./pages/about/Values"));
const Beliefs = lazy(() => import("./pages/about/Beliefs"));
const History = lazy(() => import("./pages/about/History"));

const LiveStreaming = lazy(() => import("./pages/services/LiveStreaming"));
const Archives = lazy(() => import("./pages/services/Archives"));

const Pictures = lazy(() => import("./pages/media/Pictures"));
const Videos = lazy(() => import("./pages/media/Videos"));
const Interviews = lazy(() => import("./pages/media/Interviews"));

const Missions = lazy(() => import("./pages/witnessing/Missions"));
const Satellite = lazy(() => import("./pages/witnessing/Satellite"));
const Affiliations = lazy(() => import("./pages/witnessing/Affiliations"));

const Events = lazy(() => import("./pages/Events"));
const Music = lazy(() => import("./pages/Music"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
      <span className="h-3 w-3 animate-pulse rounded-full bg-blue-600" />
      Loading page...
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="etm-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PWAInstallPrompt />
            <BrowserRouter>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/about/our-church" element={<OurChurch />} />
                <Route path="/about/mission" element={<Mission />} />
                <Route path="/about/leadership" element={<Leadership />} />
                <Route path="/about/values" element={<Values />} />
                <Route path="/about/beliefs" element={<Beliefs />} />
                <Route path="/about/history" element={<History />} />

                <Route path="/services/live" element={<LiveStreaming />} />
                <Route path="/services/archives" element={<Archives />} />

                <Route path="/media/pictures" element={<Pictures />} />
                <Route path="/media/videos" element={<Videos />} />
                <Route path="/media/interviews" element={<Interviews />} />

                <Route path="/witnessing/missions" element={<Missions />} />
                <Route path="/witnessing/satellite" element={<Satellite />} />
                <Route path="/witnessing/affiliations" element={<Affiliations />} />

                <Route path="/events" element={<Events />} />
                <Route path="/music" element={<Music />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
