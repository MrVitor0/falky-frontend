/**
 * Utilitários para formatação e manipulação de datas
 * Fornece métodos para trabalhar com datas de forma consistente
 */

/**
 * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
 * @param date - Data a ser formatada
 * @returns Data formatada no padrão brasileiro
 */
export const formatDateToBrazilian = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Data inválida');
    }

    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data para o padrão brasileiro com horário (DD/MM/YYYY HH:MM)
 * @param date - Data a ser formatada
 * @returns Data e horário formatados no padrão brasileiro
 */
export const formatDateTimeToBrazilian = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Data inválida');
    }

    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return 'Data inválida';
  }
};

/**
 * Converte uma data para o formato ISO string
 * @param date - Data a ser convertida
 * @returns Data no formato ISO string
 */
export const toISOString = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Data inválida');
    }

    return dateObj.toISOString();
  } catch (error) {
    console.error('Erro ao converter data para ISO:', error);
    return new Date().toISOString();
  }
};

/**
 * Verifica se uma data é válida
 * @param date - Data a ser verificada
 * @returns true se a data for válida, false caso contrário
 */
export const isValidDate = (date: Date | string): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param startDate - Data inicial
 * @param endDate - Data final
 * @returns Diferença em dias
 */
export const daysDifference = (startDate: Date | string, endDate: Date | string): number => {
  try {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Data inválida');
    }

    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  } catch (error) {
    console.error('Erro ao calcular diferença de dias:', error);
    return 0;
  }
};

/**
 * Adiciona dias a uma data
 * @param date - Data base
 * @param days - Número de dias a adicionar
 * @returns Nova data com os dias adicionados
 */
export const addDays = (date: Date | string, days: number): Date => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Data inválida');
    }

    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  } catch (error) {
    console.error('Erro ao adicionar dias:', error);
    return new Date();
  }
};

/**
 * Obtém o timestamp atual
 * @returns Timestamp atual em milissegundos
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Formata um timestamp para data brasileira
 * @param timestamp - Timestamp em milissegundos
 * @returns Data formatada no padrão brasileiro
 */
export const formatTimestampToBrazilian = (timestamp: number): string => {
  try {
    const date = new Date(timestamp);
    return formatDateToBrazilian(date);
  } catch (error) {
    console.error('Erro ao formatar timestamp:', error);
    return 'Data inválida';
  }
}; 