/**
 * Serviço de API com interceptor Axios
 * Configura e gerencia todas as requisições HTTP do sistema
 */

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import {
  API_BASE_URLS,
  API_CONFIG,
  DEFAULT_HEADERS,
  STATIC_USER_ID,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "@/constants/api.constants";
import { ApiResponse } from "@/types/api.types";
import { getCurrentTimestamp } from "@/utils/date.utils";

/**
 * Classe responsável por gerenciar a configuração e interceptors do Axios
 */
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
    this.setupInterceptors();
  }

  /**
   * Cria uma instância do Axios com configurações padrão
   * @returns Instância configurada do Axios
   */
  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: API_BASE_URLS.MAIN,
      timeout: API_CONFIG.TIMEOUT,
      headers: DEFAULT_HEADERS,
    });
  }

  /**
   * Configura os interceptors de requisição e resposta
   */
  private setupInterceptors(): void {
    // Interceptor de requisição
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return this.handleRequest(config);
      },
      (error) => {
        return this.handleRequestError(error);
      }
    );

    // Interceptor de resposta
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return this.handleResponse(response);
      },
      (error) => {
        return this.handleResponseError(error);
      }
    );
  }

  /**
   * Processa requisições antes de enviá-las
   * @param config - Configuração da requisição
   * @returns Configuração processada
   */
  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    // Garante que o Content-Type seja application/json
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // Adiciona user_id estático a todas as requisições
    if (config.data && typeof config.data === "object") {
      config.data = {
        ...config.data,
        user_id: STATIC_USER_ID,
      };
    } else if (
      config.method?.toLowerCase() === "post" ||
      config.method?.toLowerCase() === "put"
    ) {
      config.data = {
        user_id: STATIC_USER_ID,
        ...(config.data || {}),
      };
    }

    // Adiciona timestamp da requisição
    config.headers["X-Request-Time"] = getCurrentTimestamp().toString();

    console.log("🚀 Requisição:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });

    return config;
  }

  /**
   * Trata erros de requisição
   * @param error - Erro da requisição
   * @returns Promise rejeitada com erro tratado
   */
  private handleRequestError(error: AxiosError): Promise<never> {
    console.error("❌ Erro na requisição:", error);

    return Promise.reject({
      success: false,
      error: ERROR_MESSAGES.NETWORK_ERROR,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Processa respostas da API
   * @param response - Resposta da API
   * @returns Resposta processada
   */
  private handleResponse<T>(
    response: AxiosResponse<T>
  ): AxiosResponse<ApiResponse<T>> {
    // Valida se a resposta é um objeto válido
    if (response.data && typeof response.data === "object") {
      // Formata a resposta no padrão ApiResponse
      const formattedResponse: ApiResponse<T> = {
        data: response.data,
        success:
          response.status >= HTTP_STATUS_CODES.OK && response.status < 300,
        message: response.statusText,
        timestamp: new Date().toISOString(),
      };

      // Log da resposta em desenvolvimento
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Resposta recebida:", {
          status: response.status,
          data: response.data,
          headers: response.headers,
        });
      }

      // Retorna a resposta formatada
      return {
        ...response,
        data: formattedResponse,
      };
    }

    // Se não for um objeto válido, retorna erro
    throw new Error("Resposta inválida da API");
  }

  /**
   * Trata erros de resposta
   * @param error - Erro da resposta
   * @returns Promise rejeitada com erro tratado
   */
  private handleResponseError(error: AxiosError): Promise<never> {
    console.error("❌ Erro na resposta:", error);

    let errorMessage: string = ERROR_MESSAGES.SERVER_ERROR;

    // Determina a mensagem de erro baseada no status
    if (error.response) {
      switch (error.response.status) {
        case HTTP_STATUS_CODES.BAD_REQUEST:
          errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        case HTTP_STATUS_CODES.UNAUTHORIZED:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case HTTP_STATUS_CODES.NOT_FOUND:
          errorMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage =
            error.response.statusText || ERROR_MESSAGES.SERVER_ERROR;
      }
    } else if (error.request) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    }

    const errorResponse: ApiResponse<null> = {
      data: null,
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(errorResponse);
  }

  /**
   * Obtém a instância do Axios configurada
   * @returns Instância do Axios
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Configura uma nova URL base
   * @param baseURL - Nova URL base
   */
  public setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  /**
   * Adiciona um header personalizado
   * @param key - Chave do header
   * @param value - Valor do header
   */
  public setHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  /**
   * Remove um header
   * @param key - Chave do header a ser removido
   */
  public removeHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }
}

/**
 * Instância singleton do serviço de API
 */
export const apiService = new ApiService();

/**
 * Instância configurada do Axios para uso direto
 */
export const api = apiService.getAxiosInstance();
