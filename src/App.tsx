
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";

import Login from "./pages/Login";
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
import Users from "./pages/Users";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  console.log("App rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              
              {/* Settings routes */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProfileSettings />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="integrations" element={<IntegrationSettings />} />
              </Route>

              {/* Recruitment routes */}
              <Route 
                path="/recruitment" 
                element={
                  <ProtectedRoute>
                    <Recruitment />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CandidatesTab />} />
                <Route path="candidates" element={<CandidatesTab />} />
                <Route path="approved" element={<ApprovedTab />} />
                <Route path="history" element={<HistoryTab />} />
              </Route>

              {/* Operations routes */}
              <Route 
                path="/operations" 
                element={
                  <ProtectedRoute>
                    <Operations />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AttendanceTab />} />
                <Route path="attendance" element={<AttendanceTab />} />
                <Route path="clients" element={<ClientsTab />} />
                <Route path="payments" element={<PaymentsTab />} />
              </Route>

              {/* Messages route */}
              <Route 
                path="/messages" 
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } 
              />
              
              {/* Company route */}
              <Route 
                path="/companies" 
                element={
                  <ProtectedRoute>
                    <Companies />
                  </ProtectedRoute>
                } 
              />
              
              {/* Documents route */}
              <Route 
                path="/documents" 
                element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                } 
              />
              
              {/* Users route - requires special permission */}
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute requiredPermission="manageUsers">
                    <Users />
                  </ProtectedRoute>
                }
              />
              
              {/* Payments route - redirects to Operations/payments */}
              <Route 
                path="/payments" 
                element={<Navigate to="/operations/payments" replace />}
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
