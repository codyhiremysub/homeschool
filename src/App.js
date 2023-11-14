import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// import PrivateRouteWrapper from './components/PrivateRouteWrapper';
import LoginPage from "./pages/auth/LoginPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";
import LoginMFAPage from "./pages/auth/LoginMFAPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import CheckResetCodePage from "./pages/auth/CheckResetCodePage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRouteWrapper from "./components/PublicRouteWrapper";
import FallbackErrorPage from "./pages/FallbackErrorPage";
import PrivateRouteWrapper from "./components/PrivateRouteWrapper";
import Homepage from "./pages/Homepage";

const App = () => (
  <ErrorBoundary FallbackComponent={FallbackErrorPage}>
    <Routes>
      <Route element={<PublicRouteWrapper />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:token" element={<LoginPage />} />
        <Route path="/login-mfa" element={<LoginMFAPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-reset-code" element={<CheckResetCodePage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
      </Route>
      <Route element={<PrivateRouteWrapper />}>
        <Route index element={<Homepage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </ErrorBoundary>
);

export default App;
