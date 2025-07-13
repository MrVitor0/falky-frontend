/**
 * Serviço WebSocket para comunicação em tempo real com o backend
 */

import { io, Socket } from 'socket.io-client';
import { ResearchStatus } from '@/lib/types';

interface ResearchUpdate {
  course_id: string;
  status: ResearchStatus;
  progress: number;
  message: string;
  timestamp: string;
  current_source?: string;
  sources_found?: unknown[];
  current_step?: string;
}

interface SourceFound {
  course_id: string;
  source: {
    title: string;
    url: string;
    query: string;
    content_length: number;
    domain: string;
  };
  timestamp: string;
}

interface ResearchCompleted {
  course_id: string;
  final_data: {
    research_summary: string;
    quiz_questions_count: number;
    sources_analyzed: number;
    document_created: boolean;
  };
  timestamp: string;
}

interface MaterialUpdate {
  course_id: string;
  status: string;
  progress: number;
  message: string;
  current_step?: string;
  timestamp: string;
}

interface MaterialCompleted {
  course_id: string;
  status: string;
  progress: number;
  message: string;
  timestamp: string;
}

interface SectionRewriteUpdate {
  course_id: string;
  status: string;
  progress: number;
  message: string;
  current_step?: string;
  timestamp: string;
}

interface SectionRewriteCompleted {
  course_id: string;
  status: string;
  progress: number;
  message: string;
  timestamp: string;
}

type ResearchUpdateCallback = (update: ResearchUpdate) => void;
type SourceFoundCallback = (source: SourceFound) => void;
type ResearchCompletedCallback = (completed: ResearchCompleted) => void;
type MaterialUpdateCallback = (update: MaterialUpdate) => void;
type MaterialCompletedCallback = (completed: MaterialCompleted) => void;
type SectionRewriteUpdateCallback = (update: SectionRewriteUpdate) => void;
type SectionRewriteCompletedCallback = (completed: SectionRewriteCompleted) => void;
type ConnectionCallback = (connected: boolean) => void;

export class WebSocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  // Callbacks
  private onResearchUpdate: ResearchUpdateCallback | null = null;
  private onSourceFound: SourceFoundCallback | null = null;
  private onResearchCompleted: ResearchCompletedCallback | null = null;
  private onMaterialUpdate: MaterialUpdateCallback | null = null;
  private onMaterialCompleted: MaterialCompletedCallback | null = null;
  private onSectionRewriteUpdate: SectionRewriteUpdateCallback | null = null;
  private onSectionRewriteCompleted: SectionRewriteCompletedCallback | null = null;
  private onConnectionChange: ConnectionCallback | null = null;

  constructor() {
    this.connect();
  }

  /**
   * Conectar ao servidor WebSocket
   */
  private connect() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    
    console.log('🔌 Conectando ao WebSocket:', backendUrl);
    
    this.socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    this.setupEventListeners();
  }

  /**
   * Configurar listeners de eventos
   */
  private setupEventListeners() {
    if (!this.socket) return;

    // Eventos de conexão
    this.socket.on('connect', () => {
      console.log('✅ WebSocket conectado:', this.socket?.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.onConnectionChange?.(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ WebSocket desconectado:', reason);
      this.isConnected = false;
      this.onConnectionChange?.(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erro de conexão WebSocket:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Máximo de tentativas de reconexão atingido');
      }
    });

    // Eventos personalizados
    this.socket.on('connected', (data) => {
      console.log('🔌 Confirmação de conexão:', data);
    });

    this.socket.on('joined_course', (data) => {
      console.log('🎓 Associado ao curso:', data);
    });

    this.socket.on('research_update', (data: ResearchUpdate) => {
      console.log('📡 Atualização de pesquisa recebida:', data);
      this.onResearchUpdate?.(data);
    });

    this.socket.on('source_found', (data: SourceFound) => {
      console.log('📚 Nova fonte encontrada:', data);
      this.onSourceFound?.(data);
    });

    this.socket.on('research_completed', (data: ResearchCompleted) => {
      console.log('🎉 Pesquisa concluída:', data);
      this.onResearchCompleted?.(data);
    });

    // Eventos de material
    this.socket.on('material_update', (data: MaterialUpdate) => {
      console.log('📄 Material update recebido:', data);
      this.onMaterialUpdate?.(data);
    });

    this.socket.on('material_completed', (data: MaterialCompleted) => {
      console.log('✅ Material completed recebido:', data);
      this.onMaterialCompleted?.(data);
    });

    // Eventos de reescrita de seção
    this.socket.on('section_rewrite_update', (data: SectionRewriteUpdate) => {
      console.log('✏️ Section rewrite update recebido:', data);
      this.onSectionRewriteUpdate?.(data);
    });

    this.socket.on('section_rewrite_completed', (data: SectionRewriteCompleted) => {
      console.log('✅ Section rewrite completed recebido:', data);
      this.onSectionRewriteCompleted?.(data);
    });
  }

  /**
   * Associar cliente a um curso específico
   */
  public joinCourse(courseId: string) {
    if (!this.socket) {
      console.error('❌ Socket não conectado');
      return;
    }

    console.log('🎓 Associando ao curso:', courseId);
    this.socket.emit('join_course', { course_id: courseId });
  }

  /**
   * Definir callback para atualizações de pesquisa
   */
  public setOnResearchUpdate(callback: ResearchUpdateCallback) {
    this.onResearchUpdate = callback;
  }

  /**
   * Definir callback para fontes encontradas
   */
  public setOnSourceFound(callback: SourceFoundCallback) {
    this.onSourceFound = callback;
  }

  /**
   * Definir callback para pesquisa concluída
   */
  public setOnResearchCompleted(callback: ResearchCompletedCallback) {
    this.onResearchCompleted = callback;
  }

  /**
   * Definir callback para atualizações de material
   */
  public setOnMaterialUpdate(callback: MaterialUpdateCallback) {
    this.onMaterialUpdate = callback;
  }

  /**
   * Definir callback para material concluído
   */
  public setOnMaterialCompleted(callback: MaterialCompletedCallback) {
    this.onMaterialCompleted = callback;
  }

  /**
   * Definir callback para atualizações de reescrita de seção
   */
  public setOnSectionRewriteUpdate(callback: SectionRewriteUpdateCallback) {
    this.onSectionRewriteUpdate = callback;
  }

  /**
   * Definir callback para reescrita de seção concluída
   */
  public setOnSectionRewriteCompleted(callback: SectionRewriteCompletedCallback) {
    this.onSectionRewriteCompleted = callback;
  }

  /**
   * Definir callback para mudanças de conexão
   */
  public setOnConnectionChange(callback: ConnectionCallback) {
    this.onConnectionChange = callback;
  }

  /**
   * Verificar se está conectado
   */
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Desconectar
   */
  public disconnect() {
    if (this.socket) {
      console.log('🔌 Desconectando WebSocket...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /**
   * Reconectar manualmente
   */
  public reconnect() {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connect();
    }
  }
}

// Instância singleton
export const websocketService = new WebSocketService(); 