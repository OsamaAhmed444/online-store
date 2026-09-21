import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // بيانات مستخدم وهمية للتجربة (يمكنك تغيير null إلى مستخدم لتجربة حالة تسجيل الدخول)
  const [user, setUser] = useState({ name: 'Ganna', role: 'USER' });

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // قيمة احتياطية
    return { user: null, logout: () => {} };
  }
  return context;
};