# LeetCode Helper

A Chrome extension that provides progressive hints for LeetCode problems to help you learn without spoiling solutions.

## The Problem

When stuck on LeetCode problems, students often jump straight to solutions, missing the learning opportunity. LeetCode Helper provides **progressive hints** that guide your thinking without spoiling the answer.

## How It Works

LeetCode Helper uses **pattern recognition** to identify common algorithmic patterns in problems and provides hints at three levels:

- **Level 1**: High-level guidance (data structures & patterns)
- **Level 2**: Strategic reasoning (time/space trade-offs)
- **Level 3**: Algorithm steps (pseudocode direction)

### Pattern Database

The extension recognizes 15+ common DSA patterns:
- Two Sum / Hash Map patterns
- Linked List manipulation
- Stack/Queue problems
- Binary Search
- Sliding Window
- Dynamic Programming
- Graph traversal (BFS/DFS)
- Two Pointers
- Backtracking
- Prefix Sum
- Greedy algorithms
- And more

## Features

- **Pattern-Based Hints** - Recognizes common DSA patterns automatically
- **Progressive Learning** - Three hint levels that increase in detail
- **Hint History** - Remembers where you left off on each problem
- **No Spoilers** - Designed to guide, never give complete solutions
- **Instant** - No API calls, works offline

## Installation

### From Source

1. Clone this repository
```bash
git clone https://github.com/baranck0513/leetcode-helper.git
cd leetcode-helper
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load in Chrome
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode" (top right)
- Click "Load unpacked"
- Select the `dist` folder

## Usage

1. Navigate to any LeetCode problem page
2. Click the LeetCode Helper extension icon
3. Select a hint level (1, 2, or 3)
4. Read the hint and try to solve the problem
5. Request higher-level hints if needed

The extension will remember your progress on each problem!

## Development
```bash
# Install dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Production build
npm run build

# Type checking
npm run type-check
```

## Project Structure
```
src/
├── background/           # Service worker
├── content/             # Reads LeetCode problem from page
├── popup/               # Extension popup UI
├── types/               # TypeScript definitions
└── utils/
    ├── hint-patterns.ts    # Pattern recognition & hints
    └── storage.ts          # Chrome storage helpers
```

## Tech Stack

- **TypeScript** - Type safety and better code organization
- **Chrome Extensions API (Manifest V3)** - Modern extension architecture
- **Webpack** - Bundling and build process
- **Pattern Matching** - Custom algorithm for recognizing problem types

## How Pattern Recognition Works

The extension:
1. Extracts the problem title and description from LeetCode DOM
2. Searches for keywords associated with known patterns
3. Returns the pattern with the most keyword matches
4. Provides hints specific to that pattern
5. Falls back to generic hints if no pattern matches

## Educational Philosophy

LeetCode Helper is built on the principle of **guided discovery**:
- Students learn better by thinking through problems
- Progressive hints prevent frustration without eliminating struggle
- Pattern recognition teaches transferable problem-solving skills
- No solution spoilers maintain the learning value

## Author

Built with the goal of making DSA learning more effective through guided practice.

---

**Note**: I built this extension for educational purposes to help students learn problem solving strategies, not to bypass the learning process.