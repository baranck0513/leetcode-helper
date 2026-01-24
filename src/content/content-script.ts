import { ProblemData, MessageType, ChromeMessage } from '../types';

console.log('LeetCode Helper content script loaded');

function extractProblemData(): ProblemData | null {
  try {
    let title = '';
    
    const titleSelector1 = document.querySelector('[data-cy="question-title"]');
    if (titleSelector1 && titleSelector1.textContent) {
      title = titleSelector1.textContent.trim();
    }
    
    if (!title) {
      const titleSelector2 = document.querySelector('.text-title-large');
      if (titleSelector2 && titleSelector2.textContent) {
        title = titleSelector2.textContent.trim();
      }
    }
    
    if (!title) {
      const titleSelector3 = document.querySelector('div[class*="text-label-1"]');
      if (titleSelector3 && titleSelector3.textContent) {
        title = titleSelector3.textContent.trim();
      }
    }
    
    if (!title) {
      const titleSelector4 = document.querySelector('h1');
      if (titleSelector4 && titleSelector4.textContent) {
        title = titleSelector4.textContent.trim();
      }
    }

    let description = '';
    
    const descSelector1 = document.querySelector('[data-track-load="description_content"]');
    if (descSelector1 && descSelector1.textContent) {
      description = descSelector1.textContent.trim();
    }
    
    if (!description) {
      const descSelector2 = document.querySelector('.elfjS');
      if (descSelector2 && descSelector2.textContent) {
        description = descSelector2.textContent.trim();
      }
    }
    
    if (!description) {
      const descSelector3 = document.querySelector('div[class*="description"]');
      if (descSelector3 && descSelector3.textContent) {
        description = descSelector3.textContent.trim();
      }
    }
    
    if (!description) {
      const descSelector4 = document.querySelector('.question-content');
      if (descSelector4 && descSelector4.textContent) {
        description = descSelector4.textContent.trim();
      }
    }

    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    
    const diffSelector1 = document.querySelector('[diff]');
    if (diffSelector1 && diffSelector1.textContent) {
      const text = diffSelector1.textContent.trim();
      if (text === 'Easy' || text === 'Medium' || text === 'Hard') {
        difficulty = text;
      }
    }
    
    if (difficulty === 'Medium') {
      const diffSelector2 = document.querySelector('div[class*="difficulty"]');
      if (diffSelector2 && diffSelector2.textContent) {
        const text = diffSelector2.textContent.trim();
        if (text === 'Easy' || text === 'Medium' || text === 'Hard') {
          difficulty = text;
        }
      }
    }

    if (!title || !description) {
      console.warn('Could not find problem data');
      return null;
    }

    if (description.length > 2000) {
      description = description.substring(0, 2000) + '...';
    }

    return {
      title,
      description,
      difficulty,
      url: window.location.href,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('Error extracting problem:', error);
    return null;
  }
}

chrome.runtime.onMessage.addListener(
  (message: ChromeMessage, sender, sendResponse) => {
    console.log('Content script got message:', message.type);
    
    if (message.type === MessageType.GET_PROBLEM) {
      const problemData = extractProblemData();
      
      if (problemData) {
        console.log('Found problem:', problemData.title);
        sendResponse({ success: true, data: problemData });
      } else {
        console.warn('No problem data');
        sendResponse({ success: false, data: null });
      }
    }
    
    return true;
  }
);

function showExtensionIndicator() {
  const existing = document.getElementById('leetcode-helper-indicator');
  if (existing) {
    return;
  }

  const indicator = document.createElement('div');
  indicator.id = 'leetcode-helper-indicator';
  indicator.textContent = 'LeetCode Helper Active';
  
  indicator.style.position = 'fixed';
  indicator.style.bottom = '20px';
  indicator.style.right = '20px';
  indicator.style.background = '#4CAF50';
  indicator.style.color = 'white';
  indicator.style.padding = '8px 16px';
  indicator.style.borderRadius = '20px';
  indicator.style.fontSize = '12px';
  indicator.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  indicator.style.zIndex = '10000';
  indicator.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  indicator.style.pointerEvents = 'none';
  
  document.body.appendChild(indicator);
  
  setTimeout(() => {
    indicator.style.transition = 'opacity 1s';
    indicator.style.opacity = '0';
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 1000);
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showExtensionIndicator);
} else {
  showExtensionIndicator();
}