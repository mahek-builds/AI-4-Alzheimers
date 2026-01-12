import { createContext, useContext, useState, ReactNode } from "react";

interface MockUser {
  name: string;
  email: string;
  displayName: string;
  createdAt: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Hardcoded credentials
const MOCK_USER = {
  name: "Hirdesh",
  email: "hirdesh@medAI.com",
  password: "test1234",
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<MockUser | null>(() => {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem("mockUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading] = useState(false);

  const login = (email: string, password: string): boolean => {
    // Check hardcoded user
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const loggedInUser: MockUser = {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        displayName: MOCK_USER.name,
        createdAt: new Date().toISOString(),
      };
      setUser(loggedInUser);
      localStorage.setItem("mockUser", JSON.stringify(loggedInUser));
      return true;
    }
    
    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = registeredUsers.find((u: { email: string; password: string }) => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      const loggedInUser: MockUser = {
        name: foundUser.name,
        email: foundUser.email,
        displayName: foundUser.name,
        createdAt: foundUser.createdAt,
      };
      setUser(loggedInUser);
      localStorage.setItem("mockUser", JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if email already exists
    if (email === MOCK_USER.email || registeredUsers.some((u: { email: string }) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    const loggedInUser: MockUser = {
      name,
      email,
      displayName: name,
      createdAt: newUser.createdAt,
    };
    setUser(loggedInUser);
    localStorage.setItem("mockUser", JSON.stringify(loggedInUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mockUser");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};