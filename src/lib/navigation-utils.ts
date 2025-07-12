import { AuthUser, UserPreferences } from "./types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleCourseCreationNavigation = (
  user: AuthUser | null,
  preferences: UserPreferences | null,
  hasPreferences: () => boolean,
  router: AppRouterInstance,
  targetPath: string = "/create-course-step-one"
) => {
  if (!user) {
    // Se não está logado, redireciona para login
    router.push("/login");
    return;
  }

  if (!hasPreferences()) {
    // Salvar intenção de navegar para o destino após completar profile
    localStorage.setItem("redirectAfterProfile", targetPath);
    router.push("/signup-step-one");
    return;
  }

  // Se tem tudo, vai para o destino
  router.push(targetPath);
};
