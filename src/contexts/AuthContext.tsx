
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database of users (in a real app, this would be a backend API)
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@daarulilmi.com",
    password: "password123",
    avatar: "/placeholder.svg",
    role: "admin" as const,
  },
  {
    id: "2",
    username: "user",
    email: "user@daarulilmi.com",
    password: "password123",
    avatar: "/placeholder.svg",
    role: "user" as const,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API request delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      user => user.email === email && user.password === password
    );
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API request delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(user => user.email === email);
    if (userExists) {
      setIsLoading(false);
      throw new Error("User with this email already exists");
    }
    
    // In a real app, you would send this data to your backend
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      avatar: "/placeholder.svg",
      role: "user" as const,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
