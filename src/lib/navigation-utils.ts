import { AuthUser, UserPreferences } from "./types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleCourseCreationNavigation = (
  user: AuthUser | null,
  preferences: UserPreferences | null,
  hasPreferences: () => boolean,
  router: AppRouterInstance,
  targetPath: string = "/create-course-step-one"
) => {
  // Permitir navegação para criação de curso mesmo sem login
  router.push(targetPath);
};
