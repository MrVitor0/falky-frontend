"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

import { CourseStep, ResearchStatus, CourseStepResponse } from "@/lib/types";
import { apiController } from "@/controllers/api.controller";

// Estado do curso em criação
interface CourseCreationState {
  step: number;
  courseName: string;
  stepTwoAnswer: string;
  stepThreeAnswer: string;
  stepFourAnswer: string;
  stepFiveAnswer: string;
  interviewAnswers: string[];
  interviewCompleted: boolean;
  interviewSkipped: boolean;
  isCompleted: boolean;
  currentQuestion: string;
  loading: boolean;
  
  // Novos campos para integração com backend
  courseId: string | null;
  currentStep: CourseStep | null;
  stepProgress: number;
  apiError: string | null;
  researchStatus: ResearchStatus | null;
  researchProgress: number;
  researchMessage: string;
}

// Ações possíveis
type CourseCreationAction =
  | { type: "SET_COURSE_NAME"; payload: string }
  | { type: "SET_STEP_TWO_ANSWER"; payload: string }
  | { type: "SET_STEP_THREE_ANSWER"; payload: string }
  | { type: "SET_STEP_FOUR_ANSWER"; payload: string }
  | { type: "SET_STEP_FIVE_ANSWER"; payload: string }
  | { type: "SET_INTERVIEW_ANSWER"; payload: { index: number; answer: string } }
  | { type: "COMPLETE_INTERVIEW" }
  | { type: "SKIP_INTERVIEW" }
  | { type: "SET_CURRENT_QUESTION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "COMPLETE_CREATION" }
  | { type: "RESET" }
  
  // Novas ações para integração com backend
  | { type: "SET_COURSE_ID"; payload: string }
  | { type: "SET_CURRENT_STEP"; payload: CourseStep }
  | { type: "SET_STEP_PROGRESS"; payload: number }
  | { type: "SET_API_ERROR"; payload: string | null }
  | { type: "SET_RESEARCH_STATUS"; payload: ResearchStatus }
  | { type: "SET_RESEARCH_PROGRESS"; payload: number }
  | { type: "SET_RESEARCH_MESSAGE"; payload: string }
  | { type: "CLEAR_API_ERROR" };

// Estado inicial
const initialState: CourseCreationState = {
  step: 1,
  courseName: "",
  stepTwoAnswer: "",
  stepThreeAnswer: "",
  stepFourAnswer: "",
  stepFiveAnswer: "",
  interviewAnswers: ["", "", "", "", ""],
  interviewCompleted: false,
  interviewSkipped: false,
  isCompleted: false,
  currentQuestion: "",
  loading: false,
  
  // Novos campos para integração com backend
  courseId: null,
  currentStep: null,
  stepProgress: 0,
  apiError: null,
  researchStatus: null,
  researchProgress: 0,
  researchMessage: "",
};

// Reducer
function courseCreationReducer(
  state: CourseCreationState,
  action: CourseCreationAction
): CourseCreationState {
  switch (action.type) {
    case "SET_COURSE_NAME":
      return { ...state, courseName: action.payload };
    case "SET_STEP_TWO_ANSWER":
      return { ...state, stepTwoAnswer: action.payload };
    case "SET_STEP_THREE_ANSWER":
      return { ...state, stepThreeAnswer: action.payload };
    case "SET_STEP_FOUR_ANSWER":
      return { ...state, stepFourAnswer: action.payload };
    case "SET_STEP_FIVE_ANSWER":
      return { ...state, stepFiveAnswer: action.payload };
    case "SET_INTERVIEW_ANSWER":
      const newAnswers = [...state.interviewAnswers];
      newAnswers[action.payload.index] = action.payload.answer;
      return { ...state, interviewAnswers: newAnswers };
    case "COMPLETE_INTERVIEW":
      return { ...state, interviewCompleted: true };
    case "SKIP_INTERVIEW":
      return { ...state, interviewSkipped: true };
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 5) };
    case "PREVIOUS_STEP":
      return { ...state, step: Math.max(state.step - 1, 1) };
    case "COMPLETE_CREATION":
      return { ...state, isCompleted: true };
    case "RESET":
      return { ...initialState };
      
    // Novos cases para integração com backend
    case "SET_COURSE_ID":
      console.log("🔧 [DEBUG] REDUCER: SET_COURSE_ID - valor:", action.payload);
      const newStateWithCourseId = { ...state, courseId: action.payload };
      console.log("🔧 [DEBUG] REDUCER: novo estado courseId:", newStateWithCourseId.courseId);
      return newStateWithCourseId;
    case "SET_CURRENT_STEP":
      console.log("🔧 [DEBUG] REDUCER: SET_CURRENT_STEP - valor:", action.payload);
      return { ...state, currentStep: action.payload };
    case "SET_STEP_PROGRESS":
      console.log("🔧 [DEBUG] REDUCER: SET_STEP_PROGRESS - valor:", action.payload);
      return { ...state, stepProgress: action.payload };
    case "SET_API_ERROR":
      console.log("🔧 [DEBUG] REDUCER: SET_API_ERROR - valor:", action.payload);
      return { ...state, apiError: action.payload };
    case "SET_RESEARCH_STATUS":
      return { ...state, researchStatus: action.payload };
    case "SET_RESEARCH_PROGRESS":
      return { ...state, researchProgress: action.payload };
    case "SET_RESEARCH_MESSAGE":
      return { ...state, researchMessage: action.payload };
    case "CLEAR_API_ERROR":
      console.log("🔧 [DEBUG] REDUCER: CLEAR_API_ERROR");
      return { ...state, apiError: null };
      
    default:
      return state;
  }
}

// Context
interface CourseCreationContextValue {
  state: CourseCreationState;
  dispatch: React.Dispatch<CourseCreationAction>;
  canProceedToNext: () => boolean;
  getCoursePreferencesData: () => {
    course_name: string;
    step_two_answer: string;
    step_three_answer: string;
    step_four_answer: string;
    step_five_answer: string;
  };
  isStepValid: (step: number) => boolean;
  
  // Novos métodos para integração com backend
  createCourseWithTopic: (topic: string) => Promise<{ courseId: string | null; success: boolean }>;
  processCourseStep: (answer: string) => Promise<void>;
  startResearch: () => Promise<void>;
  checkResearchStatus: () => Promise<void>;
  clearError: () => void;
}

const CourseCreationContext = createContext<
  CourseCreationContextValue | undefined
>(undefined);

// Provider
interface CourseCreationProviderProps {
  children: ReactNode;
}

export function CourseCreationProvider({
  children,
}: CourseCreationProviderProps) {
  const [state, dispatch] = useReducer(courseCreationReducer, initialState);

  // Teste da API no carregamento inicial (removido para produção)
  // React.useEffect(() => {
  //   const testApi = async () => {
  //     try {
  //       const isConnected = await apiController.testConnection();
  //       console.log("🔧 [DEBUG] API Connection test:", isConnected);
  //       
  //       if (isConnected) {
  //         await apiController.testCourseCreation();
  //       }
  //     } catch (error) {
  //       console.error("🔧 [DEBUG] API test failed:", error);
  //     }
  //   };
  //   
  //   testApi();
  // }, []);

  // Verifica se pode prosseguir para o próximo step
  const canProceedToNext = (): boolean => {
    console.log("🔧 [DEBUG] canProceedToNext executado - step:", state.step);
    
    switch (state.step) {
      case 1:
        const canProceed1 = state.courseName.trim().length > 0;
        console.log("🔧 [DEBUG] canProceedToNext step 1 - courseName:", state.courseName, "resultado:", canProceed1);
        return canProceed1;
      case 2:
        const canProceed2 = state.stepTwoAnswer.trim().length > 5;
        console.log("🔧 [DEBUG] canProceedToNext step 2 - stepTwoAnswer:", state.stepTwoAnswer, "resultado:", canProceed2);
        return canProceed2;
      case 3:
        const canProceed3 = state.stepThreeAnswer.trim().length > 5;
        console.log("🔧 [DEBUG] canProceedToNext step 3 - stepThreeAnswer:", state.stepThreeAnswer, "resultado:", canProceed3);
        return canProceed3;
      case 4:
        const canProceed4 = state.stepFourAnswer.trim().length > 5;
        console.log("🔧 [DEBUG] canProceedToNext step 4 - stepFourAnswer:", state.stepFourAnswer, "resultado:", canProceed4);
        return canProceed4;
      case 5:
        const canProceed5 = state.stepFiveAnswer.trim().length > 5;
        console.log("🔧 [DEBUG] canProceedToNext step 5 - stepFiveAnswer:", state.stepFiveAnswer, "resultado:", canProceed5);
        return canProceed5;
      default:
        console.log("🔧 [DEBUG] canProceedToNext - step inválido:", state.step);
        return false;
    }
  };

  // Verifica se um step específico é válido
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return state.courseName.trim().length > 0;
      case 2:
        return state.stepTwoAnswer.trim().length > 5;
      case 3:
        return state.stepThreeAnswer.trim().length > 5;
      case 4:
        return state.stepFourAnswer.trim().length > 5;
      case 5:
        return state.stepFiveAnswer.trim().length > 5;
      default:
        return false;
    }
  };

  // Retorna os dados formatados para o endpoint
  const getCoursePreferencesData = () => {
    return {
      course_name: state.courseName,
      step_two_answer: state.stepTwoAnswer,
      step_three_answer: state.stepThreeAnswer,
      step_four_answer: state.stepFourAnswer,
      step_five_answer: state.stepFiveAnswer,
    };
  };

  // Novos métodos para integração com backend
  const createCourseWithTopic = async (topic: string): Promise<{ courseId: string | null; success: boolean }> => {
    try {
      console.log("🔧 [DEBUG] createCourseWithTopic iniciado com tópico:", topic);
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_API_ERROR" });
      
      const response = await apiController.createCourseWithTopic({ topic });
      console.log("🔧 [DEBUG] Resposta da API createCourseWithTopic:", response);
      
      if (response.success && response.data) {
        console.log("🔧 [DEBUG] Estrutura completa da resposta (primeiros 500 chars):", JSON.stringify(response, null, 2).substring(0, 500));
        console.log("🔧 [DEBUG] response.data:", response.data);
        
        // Verificar se há estrutura aninhada devido ao interceptor
        interface NestedResponse {
          data?: CourseStepResponse;
          success?: boolean;
          message?: string;
        }
        
        const responseData = response.data as CourseStepResponse | NestedResponse;
        const hasNestedData = 'data' in responseData && responseData.data;
        console.log("🔧 [DEBUG] hasNestedData:", hasNestedData);
        
        // O interceptor da API pode criar uma estrutura aninhada: response.data.data
        const courseData = hasNestedData ? (responseData as NestedResponse).data! : responseData as CourseStepResponse;
        console.log("🔧 [DEBUG] courseData extraído:", courseData);
        console.log("🔧 [DEBUG] courseData.course_id:", courseData.course_id);
        console.log("🔧 [DEBUG] courseData.step:", courseData.step);
        console.log("🔧 [DEBUG] courseData.question:", courseData.question);
        console.log("🔧 [DEBUG] courseData.progress:", courseData.progress);
        
        if (courseData.course_id) {
          dispatch({ type: "SET_COURSE_ID", payload: courseData.course_id });
          dispatch({ type: "SET_CURRENT_STEP", payload: courseData.step });
          dispatch({ type: "SET_CURRENT_QUESTION", payload: courseData.question });
          dispatch({ type: "SET_STEP_PROGRESS", payload: courseData.progress });
          console.log("🔧 [DEBUG] Estado atualizado - courseId:", courseData.course_id);
          return { courseId: courseData.course_id, success: true };
        } else {
          console.error("🔧 [DEBUG] courseId não encontrado nos dados:", courseData);
          dispatch({ type: "SET_API_ERROR", payload: "courseId não encontrado na resposta da API" });
          return { courseId: null, success: false };
        }
      } else {
        console.error("🔧 [DEBUG] Resposta inválida da API:", response);
        dispatch({ type: "SET_API_ERROR", payload: "Resposta inválida da API" });
        return { courseId: null, success: false };
      }
    } catch (error) {
      console.error("🔧 [DEBUG] Erro em createCourseWithTopic:", error);
      
      // Verificar se é erro de conexão (backend não está rodando)
      const errorMsg = error instanceof Error ? error.message : String(error);
      const isNetworkError = errorMsg.includes('Network Error') || 
                           errorMsg.includes('ERR_NETWORK') ||
                           errorMsg.includes('ECONNREFUSED') ||
                           errorMsg.includes('fetch');
      
      if (isNetworkError) {
        console.log("🔧 [DEBUG] Backend não está rodando, usando dados simulados");
        
        // Simular resposta do backend para desenvolvimento
        const simulatedCourseId = `course_${Date.now()}`;
        dispatch({ type: "SET_COURSE_ID", payload: simulatedCourseId });
        dispatch({ type: "SET_CURRENT_STEP", payload: CourseStep.MOTIVATION });
        dispatch({ type: "SET_CURRENT_QUESTION", payload: `Qual a sua motivação para aprender sobre ${topic}?` });
        dispatch({ type: "SET_STEP_PROGRESS", payload: 25 });
        
        console.log("🔧 [DEBUG] Dados simulados criados - courseId:", simulatedCourseId);
        return { courseId: simulatedCourseId, success: true };
      }
      
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar curso";
      dispatch({ type: "SET_API_ERROR", payload: errorMessage });
      return { courseId: null, success: false };
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const processCourseStep = async (answer: string): Promise<void> => {
    console.log("🔧 [DEBUG] processCourseStep iniciado");
    console.log("🔧 [DEBUG] - courseId:", state.courseId);
    console.log("🔧 [DEBUG] - currentStep:", state.currentStep);
    console.log("🔧 [DEBUG] - answer:", answer);
    
    if (!state.courseId || !state.currentStep) {
      console.log("🔧 [DEBUG] processCourseStep: courseId ou currentStep não definidos");
      return;
    }
    
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_API_ERROR" });
      
      const response = await apiController.processCourseStep({
        course_id: state.courseId,
        step: state.currentStep,
        answer
      });
      
      console.log("🔧 [DEBUG] processCourseStep resposta:", response);
      
      if (response.success && response.data) {
        // Verificar se há estrutura aninhada devido ao interceptor (mesmo que createCourseWithTopic)
        interface NestedStepResponse {
          data?: CourseStepResponse | { status: string; message: string; progress: number; next_action: string };
          success?: boolean;
          message?: string;
        }
        
        const responseData = response.data as CourseStepResponse | { status: string; message: string; progress: number; next_action: string } | NestedStepResponse;
        const hasNestedData = 'data' in responseData && responseData.data;
        console.log("🔧 [DEBUG] processCourseStep hasNestedData:", hasNestedData);
        
        // Extrair dados considerando estrutura aninhada
        const stepData = hasNestedData ? (responseData as NestedStepResponse).data! : responseData as CourseStepResponse | { status: string; message: string; progress: number; next_action: string };
        console.log("🔧 [DEBUG] processCourseStep stepData extraído:", stepData);
        
        if ('step' in stepData) {
          // É uma próxima pergunta
          console.log("🔧 [DEBUG] processCourseStep: próxima pergunta recebida");
          dispatch({ type: "SET_CURRENT_STEP", payload: stepData.step });
          dispatch({ type: "SET_CURRENT_QUESTION", payload: stepData.question });
          dispatch({ type: "SET_STEP_PROGRESS", payload: stepData.progress });
        } else {
          // Curso completo
          console.log("🔧 [DEBUG] processCourseStep: curso completo");
          dispatch({ type: "COMPLETE_CREATION" });
        }
      } else {
        console.error("🔧 [DEBUG] processCourseStep: resposta inválida:", response);
        dispatch({ type: "SET_API_ERROR", payload: "Resposta inválida da API" });
      }
    } catch (error) {
      console.error("🔧 [DEBUG] processCourseStep erro:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar step";
      dispatch({ type: "SET_API_ERROR", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const startResearch = async (): Promise<void> => {
    if (!state.courseId) return;
    
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_API_ERROR" });
      
      const response = await apiController.startCourseResearch({
        course_id: state.courseId,
        generate_content: true
      });
      
      if (response.success && response.data) {
        // Verificar se há estrutura aninhada devido ao interceptor
        interface NestedResearchResponse {
          data?: { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number };
          success?: boolean;
          message?: string;
        }
        
        const responseData = response.data as { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number } | NestedResearchResponse;
        const hasNestedData = 'data' in responseData && responseData.data;
        console.log("🔧 [DEBUG] startResearch hasNestedData:", hasNestedData);
        
        // Extrair dados considerando estrutura aninhada
        const researchData = hasNestedData ? (responseData as NestedResearchResponse).data! : responseData as { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number };
        console.log("🔧 [DEBUG] startResearch researchData extraído:", researchData);
        
        dispatch({ type: "SET_RESEARCH_STATUS", payload: researchData.status });
        dispatch({ type: "SET_RESEARCH_PROGRESS", payload: researchData.progress });
        dispatch({ type: "SET_RESEARCH_MESSAGE", payload: researchData.message });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao iniciar pesquisa";
      dispatch({ type: "SET_API_ERROR", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const checkResearchStatus = async (): Promise<void> => {
    if (!state.courseId) return;
    
    try {
      const response = await apiController.getCourseResearchStatus(state.courseId);
      
      if (response.success && response.data) {
        // Verificar se há estrutura aninhada devido ao interceptor
        interface NestedResearchStatusResponse {
          data?: { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number };
          success?: boolean;
          message?: string;
        }
        
        const responseData = response.data as { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number } | NestedResearchStatusResponse;
        const hasNestedData = 'data' in responseData && responseData.data;
        console.log("🔧 [DEBUG] checkResearchStatus hasNestedData:", hasNestedData);
        
        // Extrair dados considerando estrutura aninhada
        const statusData = hasNestedData ? (responseData as NestedResearchStatusResponse).data! : responseData as { course_id: string; status: ResearchStatus; progress: number; message: string; estimated_time?: number };
        console.log("🔧 [DEBUG] checkResearchStatus statusData extraído:", statusData);
        
        dispatch({ type: "SET_RESEARCH_STATUS", payload: statusData.status });
        dispatch({ type: "SET_RESEARCH_PROGRESS", payload: statusData.progress });
        dispatch({ type: "SET_RESEARCH_MESSAGE", payload: statusData.message });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao verificar status";
      dispatch({ type: "SET_API_ERROR", payload: errorMessage });
    }
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_API_ERROR" });
  };

  const value: CourseCreationContextValue = {
    state,
    dispatch,
    canProceedToNext,
    getCoursePreferencesData,
    isStepValid,
    createCourseWithTopic,
    processCourseStep,
    startResearch,
    checkResearchStatus,
    clearError,
  };

  return (
    <CourseCreationContext.Provider value={value}>
      {children}
    </CourseCreationContext.Provider>
  );
}

// Hook para usar o context
export function useCourseCreation() {
  const context = useContext(CourseCreationContext);
  if (context === undefined) {
    throw new Error(
      "useCourseCreation must be used within a CourseCreationProvider"
    );
  }
  return context;
}
