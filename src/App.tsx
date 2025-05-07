
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
import Recruitment from "./pages/Recruitment";
import Operations from "./pages/Operations";
import CandidatesTab from "./pages/recruitment/CandidatesTab";
import ApprovedTab from "./pages/recruitment/ApprovedTab";
import HistoryTab from "./pages/recruitment/HistoryTab";
import AttendanceTab from "./pages/operations/AttendanceTab";
import ClientsTab from "./pages/operations/ClientsTab";
import PaymentsTab from "./pages/operations/PaymentsTab";
import Messages from "./pages/Messages";
import Companies from "./pages/Companies";
import Documents from "./pages/Documents";

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

          {/* Recruitment routes */}
          <Route path="/recruitment" element={<Recruitment />}>
            <Route index element={<CandidatesTab />} />
            <Route path="candidates" element={<CandidatesTab />} />
            <Route path="approved" element={<ApprovedTab />} />
            <Route path="history" element={<HistoryTab />} />
          </Route>

          {/* Operations routes */}
          <Route path="/operations" element={<Operations />}>
            <Route index element={<AttendanceTab />} />
            <Route path="attendance" element={<AttendanceTab />} />
            <Route path="clients" element={<ClientsTab />} />
            <Route path="payments" element={<PaymentsTab />} />
          </Route>

          {/* Messages route */}
          <Route path="/messages" element={<Messages />} />
          
          {/* Company route */}
          <Route path="/companies" element={<Companies />} />
          
          {/* Documents route */}
          <Route path="/documents" element={<Documents />} />
          
          {/* Payments route - redirects to Operations/payments */}
          <Route path="/payments" element={<Operations />}>
            <Route index element={<PaymentsTab />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
