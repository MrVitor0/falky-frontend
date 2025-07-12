import { UserPreferences, AuthUser } from "./types";

// Função para gerar ID único
const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// Função para hash simples de senha (em produção, use bcrypt)
const hashPassword = (password: string) => {
  // Hash simples para demonstração - em produção use bcrypt
  return Buffer.from(password).toString("base64");
};

// Verificar senha
const verifyPassword = (password: string, hash: string) => {
  return hashPassword(password) === hash;
};

// Estrutura de dados em localStorage
interface LocalUser {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: string;
}

// Funções auxiliares para localStorage
const getUsers = (): LocalUser[] => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem("falky_users");
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: LocalUser[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("falky_users", JSON.stringify(users));
};

const getUserPreferences = (): UserPreferences[] => {
  if (typeof window === "undefined") return [];
  const prefs = localStorage.getItem("falky_preferences");
  return prefs ? JSON.parse(prefs) : [];
};

const saveUserPreferences = (preferences: UserPreferences[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("falky_preferences", JSON.stringify(preferences));
};

export const localDB = {
  // Autenticação
  signUp: async (
    email: string,
    password: string,
    name: string
  ): Promise<{ user?: AuthUser; error?: Error }> => {
    try {
      const users = getUsers();

      // Verificar se email já existe
      if (users.find((u) => u.email === email)) {
        return { error: new Error("Email já cadastrado") };
      }

      const userId = generateId();
      const hashedPassword = hashPassword(password);

      const newUser: LocalUser = {
        id: userId,
        email,
        password: hashedPassword,
        name,
        created_at: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      const user: AuthUser = {
        id: userId,
        email,
        user_metadata: { name },
      };

      return { user };
    } catch (error: unknown) {
      return { error: error as Error };
    }
  },

  signIn: async (
    email: string,
    password: string
  ): Promise<{ user?: AuthUser; error?: Error }> => {
    try {
      const users = getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        return { error: new Error("Usuário não encontrado") };
      }

      if (!verifyPassword(password, user.password)) {
        return { error: new Error("Senha incorreta") };
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        user_metadata: { name: user.name },
      };

      return { user: authUser };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Preferências
  savePreferences: async (
    preferences: UserPreferences
  ): Promise<{ error?: Error }> => {
    try {
      const allPrefs = getUserPreferences();
      const existingIndex = allPrefs.findIndex(
        (p) => p.user_id === preferences.user_id
      );

      const newPrefs: UserPreferences = {
        ...preferences,
        id: preferences.id || generateId(),
        created_at: preferences.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        allPrefs[existingIndex] = newPrefs;
      } else {
        allPrefs.push(newPrefs);
      }

      saveUserPreferences(allPrefs);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  },

  getPreferences: async (
    userId: string
  ): Promise<{ preferences?: UserPreferences; error?: Error }> => {
    try {
      const allPrefs = getUserPreferences();
      const userPrefs = allPrefs.find((p) => p.user_id === userId);

      return { preferences: userPrefs };
    } catch (error) {
      return { error: error as Error };
    }
  },
};
