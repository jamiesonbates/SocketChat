import { connectType, disconnectType } from '../actionTypes';

export function connectSocket() {
  return { type: connectType };
}

export function disconnectSocket() {
  return { type: disconnectTypes };
}
