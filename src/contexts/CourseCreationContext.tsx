"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  KnowledgeLevelType,
  StudyRhythmType,
  MotivationGoalType,
  CoursePreferencesCreate,
  CoursePreferencesResponse,
} from '@/types/api.types';

// Estado do curso em criação
interface CourseCreationState {
  step: number;
  courseName: string;
  knowledgeLevel: KnowledgeLevelType | null;
  studyPace: StudyRhythmType | null;
  goalsAndMotivations: MotivationGoalType | null;
  additionalInformation: string;
  isCompleted: boolean;
  userId: string;
  createdCourseData: CoursePreferencesResponse | null;
}

// Ações possíveis
type CourseCreationAction =
  | { type: 'SET_COURSE_NAME'; payload: string }
  | { type: 'SET_KNOWLEDGE_LEVEL'; payload: KnowledgeLevelType }
  | { type: 'SET_STUDY_PACE'; payload: StudyRhythmType }
  | { type: 'SET_GOALS_AND_MOTIVATIONS'; payload: MotivationGoalType }
  | { type: 'SET_ADDITIONAL_INFORMATION'; payload: string }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_CREATED_COURSE_DATA'; payload: CoursePreferencesResponse }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'COMPLETE_CREATION' }
  | { type: 'RESET' };

// Estado inicial
const initialState: CourseCreationState = {
  step: 1,
  courseName: '',
  knowledgeLevel: null,
  studyPace: null,
  goalsAndMotivations: null,
  additionalInformation: '',
  isCompleted: false,
  userId: '',
  createdCourseData: null,
};

// Reducer
function courseCreationReducer(
  state: CourseCreationState,
  action: CourseCreationAction
): CourseCreationState {
  switch (action.type) {
    case 'SET_COURSE_NAME':
      return { ...state, courseName: action.payload };
    case 'SET_KNOWLEDGE_LEVEL':
      return { ...state, knowledgeLevel: action.payload };
    case 'SET_STUDY_PACE':
      return { ...state, studyPace: action.payload };
    case 'SET_GOALS_AND_MOTIVATIONS':
      return { ...state, goalsAndMotivations: action.payload };
    case 'SET_ADDITIONAL_INFORMATION':
      return { ...state, additionalInformation: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_CREATED_COURSE_DATA':
      return { ...state, createdCourseData: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 5) };
    case 'PREVIOUS_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'COMPLETE_CREATION':
      return { ...state, isCompleted: true };
    case 'RESET':
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
  getCoursePreferencesData: () => Omit<CoursePreferencesCreate, 'user_id'>;
  isStepValid: (step: number) => boolean;
}

const CourseCreationContext = createContext<CourseCreationContextValue | undefined>(undefined);

// Provider
interface CourseCreationProviderProps {
  children: ReactNode;
}

export function CourseCreationProvider({ children }: CourseCreationProviderProps) {
  const [state, dispatch] = useReducer(courseCreationReducer, initialState);

  // Verifica se pode prosseguir para o próximo step
  const canProceedToNext = (): boolean => {
    switch (state.step) {
      case 1:
        return state.courseName.trim().length > 0;
      case 2:
        return state.knowledgeLevel !== null;
      case 3:
        return state.studyPace !== null;
      case 4:
        return state.goalsAndMotivations !== null;
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
        return state.knowledgeLevel !== null;
      case 3:
        return state.studyPace !== null;
      case 4:
        return state.goalsAndMotivations !== null;
      default:
        return false;
    }
  };

  // Retorna os dados formatados para o endpoint
  const getCoursePreferencesData = (): Omit<CoursePreferencesCreate, 'user_id'> => {
    return {
      course_name: state.courseName,
      knowledge_level: state.knowledgeLevel!,
      study_pace: state.studyPace!,
      goals_and_motivations: state.goalsAndMotivations!,
      additional_information: state.additionalInformation || undefined,
    };
  };

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
    throw new Error('useCourseCreation must be used within a CourseCreationProvider');
  }
  return context;
}

// Dados para as opções de seleção
export const KNOWLEDGE_LEVEL_OPTIONS = [
  {
    value: KnowledgeLevelType.NOVATO,
    label: 'Iniciante',
    description: 'Pouco ou nenhum conhecimento no assunto',
    icon: '🌱',
  },
  {
    value: KnowledgeLevelType.INTERMEDIARIO,
    label: 'Intermediário',
    description: 'Conhecimento básico com algumas lacunas',
    icon: '📚',
  },
  {
    value: KnowledgeLevelType.AVANCADO,
    label: 'Avançado',
    description: 'Conhecimento sólido buscando aprofundamento',
    icon: '🎓',
  },
];

export const STUDY_PACE_OPTIONS = [
  {
    value: StudyRhythmType.PAUSADO,
    label: 'Pausado',
    description: 'Prefere explanações detalhadas e tempo para absorver',
    icon: '🐌',
  },
  {
    value: StudyRhythmType.MODERADO,
    label: 'Moderado',
    description: 'Equilíbrio entre detalhamento e agilidade',
    icon: '🚶',
  },
  {
    value: StudyRhythmType.RAPIDO,
    label: 'Rápido',
    description: 'Prefere conteúdo condensado e dinâmico',
    icon: '🏃',
  },
];

export const GOALS_AND_MOTIVATIONS_OPTIONS = [
  {
    value: MotivationGoalType.APROVACAO_PROVA,
    label: 'Aprovação em Prova',
    description: 'Foco em conteúdo para exames e certificações',
    icon: '📋',
  },
  {
    value: MotivationGoalType.DOMINIO_TEMA,
    label: 'Domínio do Tema',
    description: 'Compreensão profunda e completa do assunto',
    icon: '🎯',
  },
  {
    value: MotivationGoalType.HOBBY,
    label: 'Hobby Pessoal',
    description: 'Aprendizado por interesse pessoal e curiosidade',
    icon: '🎨',
  },
]; 