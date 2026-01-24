import { StoredHintHistory, HintResponse } from '../types';

const STORAGE_PREFIX = 'leetcode_helper_';

export async function getHintHistory(problemUrl: string): Promise<StoredHintHistory | null> {
  const key = `${STORAGE_PREFIX}${problemUrl}`;
  
  try {
    const result = await chrome.storage.local.get(key);
    if (result[key]) {
      return result[key];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting history:', error);
    return null;
  }
}

export async function saveHint(problemUrl: string, hint: HintResponse): Promise<void> {
  const key = `${STORAGE_PREFIX}${problemUrl}`;
  
  try {
    const existing = await getHintHistory(problemUrl);

    let updated: StoredHintHistory;
    
    if (existing) {
      updated = {
        problemUrl,
        hints: [...existing.hints, hint],
        currentLevel: hint.level
      };
    } else {
      updated = {
        problemUrl,
        hints: [hint],
        currentLevel: hint.level
      };
    }

    await chrome.storage.local.set({ [key]: updated });
  } catch (error) {
    console.error('Error saving hint:', error);
  }
}