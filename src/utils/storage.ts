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

export async function getAllHintHistories(): Promise<StoredHintHistory[]> {
  try {
    const all = await chrome.storage.local.get(null);
    const histories: StoredHintHistory[] = Object.entries(all)
      .filter(([key]) => key.startsWith(STORAGE_PREFIX))
      .map(([, value]) => value as StoredHintHistory);

    return histories.sort((a, b) => {
      const aLast = a.hints[a.hints.length - 1]?.timestamp ?? 0;
      const bLast = b.hints[b.hints.length - 1]?.timestamp ?? 0;
      return bLast - aLast;
    });
  } catch (error) {
    console.error('Error getting all histories:', error);
    return [];
  }
}

export async function deleteHintHistory(problemUrl: string): Promise<void> {
  const key = `${STORAGE_PREFIX}${problemUrl}`;
  await chrome.storage.local.remove(key);
}

export async function clearAllHintHistories(): Promise<void> {
  const all = await chrome.storage.local.get(null);
  const keys = Object.keys(all).filter(k => k.startsWith(STORAGE_PREFIX));
  await chrome.storage.local.remove(keys);
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