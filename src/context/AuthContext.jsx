import React, { createContext, useEffect, useState } from "react";
import {
  login as loginapi,
  logout as logoutapi,
  getMe,
  sendRegisterOtp,
  verifyRegisterOtp,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp
} from "../api/authApi";

export const authContext = createContext();
export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const sendOtp = async ({ email }) => {
    setLoading(true);
    try {
      const response = await sendRegisterOtp({ email });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async ({ email, otp }) => {
    setLoading(true);
    try {
      const response = await verifyRegisterOtp({ email, otp });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrData, password) => {
    try {
      const credentials =
        typeof emailOrData === "object" && emailOrData !== null
          ? emailOrData
          : { email: emailOrData, password };

      const response = await loginapi(credentials);
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Alias expected by RegisterPage: sends the full registration payload
  // (username, email, password, phone) to the register/send-otp endpoint.
  const registerUser = async (data) => {
    setLoading(true);
    try {
      sessionStorage.setItem("pendingRegisterEmail", data.email);
      const response = await sendRegisterOtp(data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Alias expected by VerifyOtpPage: pairs the OTP with the email
  // stashed by registerUser/sendOtp since that page only collects the code.
  const VerifyOtp = async (otp) => {
    const email = sessionStorage.getItem("pendingRegisterEmail");
    return verifyOtp({ email, otp });
  };

  // Alias expected by ForgotPasswordPage.
  const forgotPassword = async (email) => {
    sessionStorage.setItem("pendingResetEmail", email);
    return forgetPasswordOtp({ email });
  };

  const forgetPasswordOtp = async ({ email }) => {
    setLoading(true);
    try {
      const response = await sendForgotPasswordOtp({ email });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };


    const verifyPasswordOtp = async ({ email, otp, newPassword }) => {
    setLoading(true);
    try {
      const response = await verifyForgotPasswordOtp({ email, otp, newPassword });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutapi();
    } catch (error) {
      throw error;
    } finally {
      sessionStorage.removeItem("token");
      setUser(null);
      setToken(null);
    }
  };

  const restorSession = async () => {
    try {
      const savedToken = sessionStorage.getItem("token");
      if (!savedToken) {
        setUser(null);
        return;
      }
      const response = await getMe();
      setUser(response.data.user);
      setToken(savedToken);
    } catch (error) {
      sessionStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restorSession();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        setUser,
        login,
        logout,
        sendOtp,
        verifyOtp,
        forgetPasswordOtp,
        verifyPasswordOtp,
        registerUser,
        VerifyOtp,
        forgotPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
