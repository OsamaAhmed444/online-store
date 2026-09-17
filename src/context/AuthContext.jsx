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

  const login = async (email, password) => {
    try {
      const response = await loginapi({
        email,
        password,
      });
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);

      return response.data;
    } catch (error) {
      throw error;
    }
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


    const verifyPasswordOtp = async ({ email,otp }) => {
    setLoading(true);
    try {
      const response = await verifyForgotPasswordOtp({ email ,otp});
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
        verifyPasswordOtp
      }}
    >
      {children}
    </authContext.Provider>
  );
}
