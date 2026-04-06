# <p align="center"> LeetCode Helper

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/baranck0513/leetcode-helper/pulls)

[Chrome WebStore Link](https://chromewebstore.google.com/detail/leetcode-helper/fgdgpjebbdgafhapfbgjiifcecemdgic)

A Chrome extension that provides **progressive, pattern-based hints** for LeetCode problems — guiding your thinking without spoiling the solution.

## The Problem

When stuck on a LeetCode problem, most students jump straight to the solution and miss the learning opportunity entirely. LeetCode Helper bridges that gap by recognizing the algorithmic pattern behind the problem and offering hints at three escalating levels of detail.

## Features

- **Pattern Recognition** — Automatically detects 15+ common DSA patterns from the problem title and description
- **Progressive Hints** — Three hint levels that increase in detail, so you always stay in control
- **Hint History** — Remembers where you left off on every problem via Chrome local storage
- **Fully Offline** — No API calls, no tracking. Everything runs locally in your browser
- **Manifest V3** — Built on the latest Chrome extension standard

## Getting Started

### Prerequisites

- Node.js and npm
- Google Chrome

### Installation

```bash
# Clone the repository
git clone https://github.com/baranck0513/leetcode-helper.git
cd leetcode-helper

# Install dependencies
npm install

# Build the extension
npm run build
```

Then load it in Chrome:

1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `dist` folder

### Usage

1. Navigate to any LeetCode problem page (e.g. `leetcode.com/problems/two-sum`)
2. Click the **LeetCode Helper** icon in your toolbar
3. Choose a hint level — start with Level 1 and work your way up
4. Try to solve the problem with that hint before requesting more

The extension remembers your hint history per problem so you can always pick up where you left off.

## How It Works

### Pattern Matching

When you open the popup, the content script extracts the problem title and description from the LeetCode DOM. The hint engine then searches for keywords associated with known algorithmic patterns and picks the best match:

```
Problem: "Given an array, find two numbers that sum to target"
  ↓
Keyword scan: "array", "sum", "two" → matches Two Sum / Hash Map pattern
  ↓
Return hints[0..2] for that pattern
```

If no pattern matches, the extension falls back to generic DSA guidance.

### Hint Levels

Each recognized pattern includes three hints of increasing specificity:

| Level | Focus | Example |
|-------|-------|---------|
| **1** | Data structure & pattern | *"Think about what data structure lets you look up values in O(1)"* |
| **2** | Trade-offs & complexity | *"Consider the time/space complexity. Can you do better than O(n²)?"* |
| **3** | Algorithm direction | *"Iterate once. At each element, check if its complement already exists in your map"* |

### Supported Patterns

The extension recognizes the following patterns:

- Two Sum / Hash Map
- Linked List manipulation
- Stack / Queue problems
- Binary Search
- Sliding Window
- Dynamic Programming
- Graph traversal (BFS / DFS)
- Two Pointers
- Backtracking
- Prefix Sum
- Greedy algorithms
- Merge operations
- Palindromes
- Valid parentheses / bracket matching
- And more — the pattern database in `src/utils/hint-patterns.ts` is easy to extend

## Development

```bash
# Watch mode — rebuilds on every file change
npm run dev

# Production build
npm run build

# TypeScript type checking (no output)
npm run type-check
```

### Project Structure

```
src/
├── background/
│   └── service-worker.ts       # Extension lifecycle & message routing
├── content/
│   └── content-script.ts       # Extracts problem data from LeetCode DOM
├── popup/
│   ├── popup.html              # Extension popup UI
│   ├── popup.css
│   └── popup.ts                # Hint display & level selection logic
├── options/
│   ├── options.html            # Hint history page
│   ├── options.css
│   └── options.ts              # History management
├── types/
│   └── index.ts                # Shared TypeScript interfaces & enums
└── utils/
    ├── hint-patterns.ts         # Pattern database & hint generation
    └── storage.ts               # Chrome local storage helpers
```

### Completed

- [x] Chrome Web Store release
- [x] Pattern recognition engine
- [x] Three-level progressive hints
- [x] Hint history with per-problem tracking
- [x] Offline-first, no external API calls
- [x] Manifest V3 architecture

</details>

## Requirements

- **Node.js**: 18+
- **Chrome**: 112+ (Manifest V3)
- **npm**: 9+
