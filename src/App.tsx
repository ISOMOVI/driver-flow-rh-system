import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ProfileSettings from "./pages/settings/ProfileSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import IntegrationSettings from "./pages/settings/IntegrationSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Settings routes */}
          <Route path="/settings" element={<Settings />}>
            <Route index element={<ProfileSettings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="integrations" element={<IntegrationSettings />} />
          </Route>

          {/* Future routes will be added here */}
          <Route path="/recruitment" element={<NotFound />} />
          <Route path="/operations" element={<NotFound />} />
          <Route path="/companies" element={<NotFound />} />
          <Route path="/payments" element={<NotFound />} />
          <Route path="/documents" element={<NotFound />} />
          <Route path="/messages" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
