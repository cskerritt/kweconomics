import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { GoogleAnalytics } from "./components/analytics/GoogleAnalytics";
import GlobalSchemaMarkup from "@/components/GlobalSchemaMarkup";
import AIBotMeta from "@/components/AIBotMeta";

// Lazy load non-critical pages
const Services = lazy(() => import("./pages/Services"));
const Advisory = lazy(() => import("./pages/Advisory"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const ScheduleConsultation = lazy(() => import("./pages/ScheduleConsultation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServiceLocationPage = lazy(() => import("./pages/ServiceLocationPage"));
const LocationServicesPage = lazy(() => import("./pages/LocationServicesPage"));
const StatePage = lazy(() => import("./pages/StatePage"));
const ServiceHubPage = lazy(() => import("./pages/ServiceHubPage"));
const CaseTypePage = lazy(() => import("./pages/CaseTypePage"));
const CaseTypeIndex = lazy(() => import("./pages/CaseTypeIndex"));
const Locations = lazy(() => import("./pages/Locations"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LegacyLocationRedirect = lazy(() => import("./pages/LegacyLocationRedirect"));

// Simple loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalytics measurementId="G-JNK2QCYSC7" />
        {/* Site-wide AI + Schema metadata for all routes */}
        <GlobalSchemaMarkup />
        <AIBotMeta />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/schedule-consultation" element={<ScheduleConsultation />} />
            <Route path="/emergency-consultation" element={<Navigate to="/contact" replace />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* Service Hub Pages */}
            <Route path="/services/:serviceSlug" element={<ServiceHubPage />} />
            
            {/* Case Type Pages */}
            <Route path="/case-types" element={<CaseTypeIndex />} />
            <Route path="/case-types/:caseTypeSlug" element={<CaseTypePage />} />
            
            {/* Service + Location Pages */}
            <Route path="/services/:serviceSlug/:stateSlug/:citySlug" element={<ServiceLocationPage />} />
            
            {/* Legacy service directory patterns - must come before generic location routes */}
            <Route path="/forensic-economist/*" element={<LegacyLocationRedirect />} />
            <Route path="/personal-injury-economist/*" element={<LegacyLocationRedirect />} />
            <Route path="/business-valuation/*" element={<LegacyLocationRedirect />} />
            <Route path="/wrongful-death-damages/*" element={<LegacyLocationRedirect />} />
            <Route path="/vocational-expert/*" element={<LegacyLocationRedirect />} />
            <Route path="/life-care-planner/*" element={<LegacyLocationRedirect />} />
            <Route path="/disability-evaluation/*" element={<LegacyLocationRedirect />} />
            <Route path="/expert-witness/*" element={<LegacyLocationRedirect />} />
            <Route path="/practice-areas/*" element={<LegacyLocationRedirect />} />
            <Route path="/economic-damages/*" element={<LegacyLocationRedirect />} />
            <Route path="/lost-earnings/*" element={<LegacyLocationRedirect />} />
            <Route path="/present-value/*" element={<LegacyLocationRedirect />} />
            <Route path="/business-damages/*" element={<LegacyLocationRedirect />} />
            <Route path="/commercial-damages/*" element={<LegacyLocationRedirect />} />
            
            {/* Additional legacy patterns */}
            <Route path="/vendor/*" element={<LegacyLocationRedirect />} />
            <Route path="/tools/*" element={<LegacyLocationRedirect />} />
            <Route path="/blog/*" element={<LegacyLocationRedirect />} />
            <Route path="/locations/*" element={<LegacyLocationRedirect />} />
            <Route path="/services/business-consulting/*" element={<LegacyLocationRedirect />} />
            
            {/* Legacy URL redirects for hyphenated patterns */}
            <Route path="/:slug" element={<LegacyLocationRedirect />} />
            
            {/* Location Pages */}
            <Route path="/:stateSlug/:citySlug" element={<LocationServicesPage />} />
            <Route path="/:stateSlug" element={<StatePage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
