import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { AuthProvider } from "./context/auth-context";
import { ForgotPassword } from "./pages/auth/forgot-password";
import { Login } from "./pages/auth/login";
import { Goals } from "./pages/goals";
import { NotFound } from "./pages/not-found";
import { Overview } from "./pages/overview";

export const MainApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="/goals" element={<Goals />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </AuthProvider>
  );
};
