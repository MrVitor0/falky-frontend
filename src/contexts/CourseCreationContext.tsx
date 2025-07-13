"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

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
  | { type: "RESET" };

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

  // Verifica se pode prosseguir para o próximo step
  const canProceedToNext = (): boolean => {
    switch (state.step) {
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
  }, [state.courseName, state.knowledgeLevel, state.studyPace, state.goalsAndMotivations, state.additionalInformation]);

  const value: CourseCreationContextValue = {
    state,
    dispatch,
    canProceedToNext,
    getCoursePreferencesData,
    isStepValid,
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
