/**
 * Utilitários para formatação e manipulação de strings
 * Fornece métodos para trabalhar com strings de forma consistente
 */

import { BAD_WORDS } from '@/constants/api.constants';

/**
 * Capitaliza a primeira letra de uma string
 * @param str - String a ser capitalizada
 * @returns String com primeira letra maiúscula
 */
export const capitalizeFirst = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitaliza a primeira letra de cada palavra
 * @param str - String a ser formatada
 * @returns String com primeira letra de cada palavra maiúscula
 */
export const capitalizeWords = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

/**
 * Remove acentos de uma string
 * @param str - String a ter acentos removidos
 * @returns String sem acentos
 */
export const removeAccents = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Converte string para slug (URL amigável)
 * @param str - String a ser convertida
 * @returns Slug formatado
 */
export const stringToSlug = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  
  return removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens múltiplos
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
};

/**
 * Valida se uma string contém apenas letras e espaços
 * @param str - String a ser validada
 * @returns true se válida, false caso contrário
 */
export const isValidName = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  return nameRegex.test(str.trim());
};

/**
 * Valida formato de email
 * @param email - Email a ser validado
 * @returns true se válido, false caso contrário
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Trunca uma string para um tamanho máximo
 * @param str - String a ser truncada
 * @param maxLength - Tamanho máximo
 * @param suffix - Sufixo a ser adicionado (padrão: '...')
 * @returns String truncada
 */
export const truncateString = (str: string, maxLength: number, suffix = '...'): string => {
  if (!str || typeof str !== 'string') return '';
  
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Remove bad words de uma string
 * @param str - String a ser filtrada
 * @param replacement - Caractere de substituição (padrão: '*')
 * @returns String sem bad words
 */
export const removeBadWords = (str: string, replacement = '*'): string => {
  if (!str || typeof str !== 'string') return '';
  
  let filteredStr = str;
  
  BAD_WORDS.forEach(badWord => {
    const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
    const replacementStr = replacement.repeat(badWord.length);
    filteredStr = filteredStr.replace(regex, replacementStr);
  });
  
  return filteredStr;
};

/**
 * Verifica se uma string contém bad words
 * @param str - String a ser verificada
 * @returns true se contém bad words, false caso contrário
 */
export const containsBadWords = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  const lowerStr = str.toLowerCase();
  
  return BAD_WORDS.some(badWord => 
    lowerStr.includes(badWord.toLowerCase())
  );
};

/**
 * Formata um número de telefone brasileiro
 * @param phone - Número de telefone
 * @returns Telefone formatado
 */
export const formatPhoneBrazilian = (phone: string): string => {
  if (!phone || typeof phone !== 'string') return '';
  
  // Remove todos os caracteres que não sejam dígitos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Formata de acordo com o tamanho
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone; // Retorna original se não conseguir formatar
};

/**
 * Gera uma string aleatória
 * @param length - Tamanho da string
 * @param includeNumbers - Incluir números (padrão: true)
 * @param includeSymbols - Incluir símbolos (padrão: false)
 * @returns String aleatória
 */
export const generateRandomString = (
  length: number,
  includeNumbers = true,
  includeSymbols = false
): string => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  if (includeNumbers) {
    chars += '0123456789';
  }
  
  if (includeSymbols) {
    chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Conta o número de palavras em uma string
 * @param str - String a ser analisada
 * @returns Número de palavras
 */
export const countWords = (str: string): number => {
  if (!str || typeof str !== 'string') return 0;
  
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}; 