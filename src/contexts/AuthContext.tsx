"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, UserPreferences, AuthContextType } from "@/lib/types";
import { localDB } from "@/lib/local-db";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const checkUser = async () => {
      try {
        const localUser = localStorage.getItem("currentUser");
        if (localUser) {
          const authUser = JSON.parse(localUser);
          setUser(authUser);
          await loadUserPreferences(authUser.id);
        }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const loadUserPreferences = async (userId: string) => {
    try {
      // Primeiro, tentar carregar do localStorage
      const localPrefs = localStorage.getItem("userPreferences");
      if (localPrefs) {
        const parsedPrefs = JSON.parse(localPrefs);
        setPreferences(parsedPrefs);
      }

      // Carregar do banco local SQLite
      const { preferences: dbPrefs } = await localDB.getPreferences(userId);
      if (dbPrefs) {
        setPreferences(dbPrefs);
        localStorage.setItem("userPreferences", JSON.stringify(dbPrefs));
      }
    } catch (error) {
      console.error("Erro ao carregar preferências:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Usar banco local SQLite
      const { user, error } = await localDB.signIn(email, password);
      if (user) {
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        await loadUserPreferences(user.id);
      }
      return { error: error || null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Usar banco local SQLite
      const { user, error } = await localDB.signUp(email, password, name);
      if (user) {
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      return { error: error || null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      // Limpar dados locais
      setUser(null);
      setPreferences(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userPreferences");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const updatePreferences = async (
    newPreferences: Omit<
      UserPreferences,
      "id" | "user_id" | "created_at" | "updated_at"
    >
  ) => {
    if (!user) {
      return { error: new Error("Usuário não autenticado") };
    }

    try {
      const preferencesData: UserPreferences = {
        ...newPreferences,
        user_id: user.id,
      };

      // Salvar no localStorage imediatamente
      setPreferences(preferencesData);
      localStorage.setItem("userPreferences", JSON.stringify(preferencesData));

      // Salvar no banco local SQLite
      const { error } = await localDB.savePreferences(preferencesData);
      if (error) {
        console.warn("Erro ao salvar no banco local:", error.message);
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const hasPreferences = () => {
    return Boolean(
      preferences !== null &&
        preferences?.name &&
        preferences?.profession &&
        preferences?.birth_date &&
        preferences?.teacher_personality &&
        preferences?.neurodivergence
    );
  };

  const value: AuthContextType = {
    user,
    preferences,
    loading,
    signIn,
    signUp,
    signOut,
    updatePreferences,
    hasPreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
