import { getAllHintHistories, deleteHintHistory, clearAllHintHistories } from '../utils/storage';
import { StoredHintHistory } from '../types';

const historyList = document.getElementById('history-list')!;
const emptyState = document.getElementById('empty-state')!;
const problemCount = document.getElementById('problem-count')!;
const clearAllBtn = document.getElementById('clear-all-btn')!;

function slugToTitle(url: string): string {
  const match = url.match(/\/problems\/([^/]+)/);
  if (!match) return url;
  return match[1]
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

function renderRow(history: StoredHintHistory): HTMLElement {
  const lastHint = history.hints[history.hints.length - 1];
  const title = slugToTitle(history.problemUrl);

  const row = document.createElement('div');
  row.className = 'history-row';

  row.innerHTML = `
    <div class="row-main">
      <span class="problem-name">${title}</span>
      <span class="level-badge">Level ${history.currentLevel}</span>
    </div>
    <div class="row-meta">
      <span class="timestamp">Last hint: ${lastHint ? timeAgo(lastHint.timestamp) : '—'}</span>
      <button class="clear-btn" data-url="${history.problemUrl}">Clear</button>
    </div>
  `;

  row.querySelector('.clear-btn')!.addEventListener('click', async () => {
    await deleteHintHistory(history.problemUrl);
    await render();
  });

  return row;
}

async function render() {
  const histories = await getAllHintHistories();
  historyList.innerHTML = '';

  if (histories.length === 0) {
    emptyState.classList.remove('hidden');
    problemCount.textContent = '0 problems practiced';
    clearAllBtn.style.display = 'none';
  } else {
    emptyState.classList.add('hidden');
    problemCount.textContent = `${histories.length} problem${histories.length !== 1 ? 's' : ''} practiced`;
    clearAllBtn.style.display = '';
    histories.forEach(h => historyList.appendChild(renderRow(h)));
  }
}

clearAllBtn.addEventListener('click', async () => {
  await clearAllHintHistories();
  await render();
});

render();
