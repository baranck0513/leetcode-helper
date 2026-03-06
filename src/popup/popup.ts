import { ProblemData, MessageType } from '../types';
import { getHintHistory, saveHint } from '../utils/storage';
import { findMatchingHints, getGenericHint } from '../utils/hint-patterns';

const problemSection = document.getElementById('problem-section')!;
const problemInfo = document.getElementById('problem-info')!;
const problemTitle = document.getElementById('problem-title')!;
const problemDifficulty = document.getElementById('problem-difficulty')!;
const noProblem = document.getElementById('no-problem')!;

const hintSection = document.getElementById('hint-section')!;
const hintBtns = document.querySelectorAll('.hint-btn');

const hintDisplay = document.getElementById('hint-display')!;
const hintContent = document.getElementById('hint-content')!;
const nextLevelBtn = document.getElementById('next-level-btn')!;

const loading = document.getElementById('loading')!;
const errorSection = document.getElementById('error')!;
const errorMessage = document.getElementById('error-message')!;
const dismissErrorBtn = document.getElementById('dismiss-error')!;

let currentProblem: ProblemData | null = null;
let currentLevel: 1 | 2 | 3 = 1;

async function init() {
  console.log('Starting LeetCode Helper');
  await loadProblem();
}

async function loadProblem() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.id || !tab.url?.includes('leetcode.com/problems/')) {
      showNoProblem();
      return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: MessageType.GET_PROBLEM
    });

    if (response.success && response.data) {
      const problem: ProblemData = response.data;
      currentProblem = problem;
      showProblem(problem);
      
      const history = await getHintHistory(problem.url);
      if (history) {
        const nextLevel = history.currentLevel + 1;
        if (nextLevel === 2) {
          currentLevel = 2;
        } else if (nextLevel >= 3) {
          currentLevel = 3;
        } else {
          currentLevel = 1;
        }
      }
    } else {
      showNoProblem();
    }
  } catch (error) {
    console.error('Error loading problem:', error);
    showNoProblem();
  }
}

function showProblem(problem: ProblemData) {
  noProblem.classList.add('hidden');
  problemInfo.classList.remove('hidden');
  hintSection.classList.remove('hidden');
  
  problemTitle.textContent = problem.title;
  problemDifficulty.textContent = problem.difficulty;
  problemDifficulty.className = `badge ${problem.difficulty}`;
}

function showNoProblem() {
  problemInfo.classList.add('hidden');
  noProblem.classList.remove('hidden');
  hintSection.classList.add('hidden');
}

hintBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const level = parseInt(btn.getAttribute('data-level')!) as 1 | 2 | 3;
    await generateAndDisplayHint(level);
  });
});

async function generateAndDisplayHint(level: 1 | 2 | 3) {
  if (!currentProblem) {
    showError('No problem loaded. Please refresh the page and try again.');
    return;
  }

  showLoading();
  hideError();

  let hint = '';

  try {
    const pattern = findMatchingHints(
      currentProblem.description, 
      currentProblem.title
    );
    
    if (!pattern) {
      hint = getGenericHint(level);
    } else {
      if (level === 1) {
        hint = pattern.level1;
      } else if (level === 2) {
        hint = pattern.level2;
      } else {
        hint = pattern.level3;
      }
    }
    
    await saveHint(currentProblem.url, {
      hint,
      level,
      timestamp: Date.now()
    });

    if (!hint) {
      throw new Error('Failed to generate hint. Please try again.');
    }

    displayHint(hint, level);
    currentLevel = level;
    
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      showError(error.message);
    } else {
      showError('Failed to generate hint. Please try again.');
    }
  }
  
  hideLoading();
}

function displayHint(hint: string, level: 1 | 2 | 3) {
  hintSection.classList.add('hidden');
  hintDisplay.classList.remove('hidden');
  
  hintContent.textContent = hint;
  
  if (level < 3) {
    nextLevelBtn.classList.remove('hidden');
    if (level === 1) {
      nextLevelBtn.textContent = 'Get Level 2 Hint';
    } else if (level === 2) {
      nextLevelBtn.textContent = 'Get Level 3 Hint';
    }
  } else {
    nextLevelBtn.classList.add('hidden');
  }
}

nextLevelBtn.addEventListener('click', async () => {
  let nextLevel: 1 | 2 | 3 = 1;
  
  if (currentLevel === 1) {
    nextLevel = 2;
  } else if (currentLevel === 2) {
    nextLevel = 3;
  } else {
    nextLevel = 3;
  }
  
  await generateAndDisplayHint(nextLevel);
});

function showLoading() {
  loading.classList.remove('hidden');
  hintSection.classList.add('hidden');
  hintDisplay.classList.add('hidden');
  errorSection.classList.add('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

function showError(message: string) {
  errorSection.classList.remove('hidden');
  errorMessage.textContent = message;
}

function hideError() {
  errorSection.classList.add('hidden');
}

dismissErrorBtn.addEventListener('click', () => {
  hideError();
});

document.getElementById('view-history-btn')!.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

init();