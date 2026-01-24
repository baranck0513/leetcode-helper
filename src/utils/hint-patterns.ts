interface PatternHint {
  keywords: string[];
  level1: string;
  level2: string;
  level3: string;
}

export const HINT_PATTERNS: PatternHint[] = [
  {
    keywords: ['two sum', 'pair', 'target sum', 'find two numbers'],
    level1: 'Think about using a hash map to store numbers you\'ve already seen. What would you need to look up for each new number?',
    level2: 'For each number, you can check if (target - current number) already exists in your hash map. This avoids the O(n²) nested loop approach. What information should you store in the hash map - just the number, or the index too?',
    level3: 'Here\'s the approach: (1) Create an empty hash map. (2) For each number in the array, calculate what number you\'d need to reach the target (complement = target - current). (3) Check if that complement is already in your map. (4) If yes, you found your pair! If no, add the current number and its index to the map. (5) Continue until you find a pair.'
  },
  {
    keywords: ['reverse', 'linked list', 'reverse list'],
    level1: 'To reverse a linked list, you need to change where each node points. Instead of pointing forward, they should point backward. What variables do you need to track the previous node?',
    level2: 'You\'ll need at least two pointers: one for the current node and one for the previous node. As you move forward, you change current.next to point to previous. But be careful - if you change current.next before saving the original next node, you\'ll lose the rest of the list!',
    level3: 'Step by step: (1) Initialize prev = null and current = head. (2) While current is not null: save the next node temporarily (next = current.next). (3) Reverse the current node\'s pointer (current.next = prev). (4) Move prev forward to current (prev = current). (5) Move current forward to next (current = next). (6) When the loop ends, prev will be the new head of the reversed list.'
  },
  {
    keywords: ['palindrome', 'same forwards backwards'],
    level1: 'A palindrome reads the same forwards and backwards. Can you use two pointers, one at each end, moving toward the middle?',
    level2: 'Start with one pointer at the beginning and one at the end. Compare the characters they point to. If they don\'t match, it\'s not a palindrome. If they do match, move both pointers toward the center. What\'s your stopping condition?',
    level3: 'Algorithm: (1) Set left pointer to index 0, right pointer to last index. (2) While left < right: compare characters at s[left] and s[right]. (3) If they\'re different, return false immediately. (4) If they\'re the same, increment left and decrement right. (5) If you make it through the whole loop without finding a mismatch, return true.'
  },
  {
    keywords: ['valid parentheses', 'brackets', 'matching brackets', 'balanced'],
    level1: 'What data structure is perfect for tracking things that need to be processed in reverse order? Think: Last In, First Out.',
    level2: 'A stack is ideal here! When you see an opening bracket, push it onto the stack. When you see a closing bracket, pop from the stack and check if they match. What should you do if the stack is empty when you try to pop?',
    level3: 'Steps: (1) Create an empty stack. (2) Go through each character. (3) If it\'s an opening bracket ({, [, or (), push it. (4) If it\'s a closing bracket, check if the stack is empty (invalid if so). Pop the top and verify it matches the closing bracket. (5) After processing all characters, the stack should be empty. If it\'s not empty, there were unclosed brackets.'
  },
  {
    keywords: ['binary search', 'sorted array', 'search sorted'],
    level1: 'Since the array is sorted, you can eliminate half of the remaining elements with each comparison! How do you decide which half to search?',
    level2: 'Compare the middle element with your target. If they\'re equal, you found it! If the target is smaller, it must be in the left half. If the target is larger, it must be in the right half. How do you track which portion you\'re searching?',
    level3: 'Binary search algorithm: (1) Set left = 0, right = array.length - 1. (2) While left <= right: calculate mid = (left + right) / 2 (use integer division). (3) If array[mid] equals target, return mid. (4) If array[mid] < target, the target must be in the right half, so set left = mid + 1. (5) If array[mid] > target, set right = mid - 1. (6) If the loop ends without finding it, return -1.'
  },
  {
    keywords: ['sliding window', 'subarray', 'substring', 'consecutive'],
    level1: 'Imagine a "window" that slides across the array. You expand it to include more elements, and shrink it when certain conditions are met. What do you need to track about the window?',
    level2: 'Use two pointers: left and right to define your window. Expand the window by moving right forward. When your window becomes invalid (violates some condition), shrink it by moving left forward. Keep track of your best answer as you go.',
    level3: 'Sliding window pattern: (1) Initialize left = 0, right = 0, and any tracking variables you need. (2) Expand the window: move right forward and update your tracking. (3) While the window is invalid: shrink from the left, move left forward and update tracking. (4) After each expansion, check if the current window is better than your best answer so far. (5) Continue until right reaches the end of the array.'
  },
  {
    keywords: ['dynamic programming', 'dp', 'fibonacci', 'climb', 'stairs', 'ways to'],
    level1: 'Can you break this into smaller subproblems? Often the answer for position N depends on answers for earlier positions. What\'s the recurrence relation?',
    level2: 'Think about building the solution from the bottom up. If you know the answers for small cases, can you use those to compute larger cases? Consider using an array to store results as you build up to the final answer.',
    level3: 'DP approach: (1) Create an array to store subproblem solutions. (2) Fill in the base cases (the simplest problems you can solve directly). (3) For each larger subproblem, use previously computed values to calculate the answer. (4) Build up from smallest to largest until you reach the problem size you need. (5) Return the final answer from your array.'
  },
  {
    keywords: ['breadth first', 'bfs', 'level order', 'shortest path'],
    level1: 'BFS explores nodes level by level, like ripples in a pond. What data structure helps you process nodes in the order you discovered them?',
    level2: 'Use a queue! Start by adding the initial node and marking it as visited. Then repeatedly: remove a node from the queue, process it, and add all its unvisited neighbors to the queue. How do you prevent visiting the same node twice?',
    level3: 'BFS algorithm: (1) Create a queue and a visited set. (2) Add the starting node to both the queue and visited set. (3) While the queue isn\'t empty: remove a node from the front, process it. (4) For each of its neighbors: if not visited, mark as visited and add to queue. (5) Continue until the queue is empty or you find what you\'re looking for.'
  },
  {
    keywords: ['depth first', 'dfs', 'backtrack', 'explore all paths'],
    level1: 'DFS explores as deep as possible before backtracking. Think recursively - visit a node, then recursively visit each of its unvisited neighbors.',
    level2: 'You can implement DFS recursively or with a stack. Recursive is often simpler: mark current as visited, process it, then recursively call DFS on each unvisited neighbor. For iterative, use a stack instead of a queue (unlike BFS).',
    level3: 'Recursive DFS: (1) Mark the current node as visited. (2) Process the current node. (3) For each unvisited neighbor, recursively call DFS on that neighbor. Iterative DFS: Use a stack instead of recursion. Push starting node, then repeatedly: pop a node, mark visited, process it, push all unvisited neighbors. Both achieve the same result!'
  },
  {
    keywords: ['two pointers', 'fast slow', 'tortoise hare', 'cycle detection'],
    level1: 'The two-pointer technique uses pointers moving at different speeds. A slow pointer and a fast pointer can help detect cycles or find midpoints. What happens if there\'s a cycle?',
    level2: 'Move the slow pointer one step at a time, and the fast pointer two steps at a time. If there\'s a cycle, eventually the fast pointer will lap the slow pointer and they\'ll meet. If fast reaches the end (null), there\'s no cycle.',
    level3: 'Floyd\'s algorithm: (1) Initialize slow = head, fast = head. (2) While fast and fast.next are not null: move slow one step (slow = slow.next), move fast two steps (fast = fast.next.next). (3) If slow equals fast, a cycle exists! (4) If fast reaches null, no cycle. This works because fast moves twice as quick, so it will eventually catch up to slow if they\'re going in circles.'
  },
  {
    keywords: ['merge', 'sorted arrays', 'merge two sorted'],
    level1: 'You have two sorted arrays. To merge them while keeping everything sorted, always pick the smaller of the two current elements. Which data structure helps here?',
    level2: 'Use two pointers, one for each array starting at index 0. Compare the elements at both pointers. Add the smaller one to your result and advance that pointer. What do you do when one array runs out?',
    level3: 'Merge algorithm: (1) Create pointers i = 0 for array1, j = 0 for array2. (2) While both arrays have elements left: compare array1[i] and array2[j]. (3) Add the smaller one to the result. (4) Increment the pointer of whichever array you took from. (5) When one array is exhausted, append all remaining elements from the other array. Both were sorted, so the remaining elements are all larger than what you\'ve already added.'
  },
  {
    keywords: ['backtracking', 'combination', 'permutation', 'generate all', 'subsets'],
    level1: 'Backtracking explores all possibilities by making choices, exploring the results, then "undoing" choices to try alternatives. Think of it like trying different paths in a maze.',
    level2: 'Use recursion to build solutions step by step. At each step, make a choice (add an element), recursively continue building, then undo that choice (remove the element) to try other options. When do you save a solution to your results?',
    level3: 'Backtracking template: (1) If current path meets the goal criteria, add a copy to results. (2) For each possible choice from current state: add the choice to current path, recursively explore further, remove the choice (backtrack). (3) Base case: return when you\'ve explored all possibilities from current state. The key is: make choice → explore → undo choice.'
  },
  {
    keywords: ['prefix sum', 'subarray sum', 'range sum', 'cumulative'],
    level1: 'Can you precompute running totals to make range sum queries faster? What does each position in a prefix sum array represent?',
    level2: 'Build a prefix array where prefix[i] contains the sum of all elements from index 0 to i. Then any range sum from index i to j can be calculated as prefix[j] - prefix[i-1]. Watch out for edge cases when i is 0!',
    level3: 'Prefix sum approach: (1) Create a prefix array the same size as input. (2) Set prefix[0] = array[0]. (3) For i from 1 to n-1: prefix[i] = prefix[i-1] + array[i]. (4) To get sum from index i to j: if i is 0, answer is prefix[j]. Otherwise, answer is prefix[j] - prefix[i-1]. This gives O(1) range queries after O(n) preprocessing!'
  },
  {
    keywords: ['hash map', 'hash table', 'frequency', 'count occurrences'],
    level1: 'A hash map lets you store and look up values in O(1) time. If you need to count frequencies or check for existence, a hash map is probably your friend.',
    level2: 'Think about what to use as keys and what to store as values. For counting, use the element as the key and its count as the value. For checking existence, the presence of a key in the map is what matters.',
    level3: 'Hash map pattern: (1) Create an empty hash map. (2) Iterate through your data. (3) For each element: check if it\'s in the map (map.has(key) or similar). (4) If it is, retrieve and update its value. (5) If not, add it with an initial value. (6) After building the map, you can query it in O(1) time for answers.'
  },
  {
    keywords: ['greedy', 'maximum', 'minimum', 'optimal'],
    level1: 'Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. What\'s the "best" choice you can make right now?',
    level2: 'Think about what criteria makes one choice better than another at each step. Sort your data if it helps identify the best choice. The trick is proving that local optimal choices lead to a global optimum for your specific problem.',
    level3: 'Greedy approach: (1) Identify what makes a choice "best" at each step. (2) Often requires sorting first. (3) Iterate through your options. (4) At each step, make the choice that looks best according to your criteria. (5) Don\'t reconsider previous choices. Note: Greedy doesn\'t always work! You need to verify it gives the correct answer for your problem.'
  }
];

export function findMatchingHints(problemDescription: string, problemTitle: string): PatternHint | null {
  const searchText = (problemTitle + ' ' + problemDescription).toLowerCase();
  
  let bestMatch: PatternHint | null = null;
  let maxMatches = 0;
  
  for (let i = 0; i < HINT_PATTERNS.length; i++) {
    const pattern = HINT_PATTERNS[i];
    let matches = 0;
    
    for (let j = 0; j < pattern.keywords.length; j++) {
      const keyword = pattern.keywords[j].toLowerCase();
      if (searchText.includes(keyword)) {
        matches = matches + 1;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = pattern;
    }
  }
  
  if (maxMatches > 0) {
    return bestMatch;
  } else {
    return null;
  }
}

export function getGenericHint(level: 1 | 2 | 3): string {
  let hint = '';
  
  if (level === 1) {
    hint = "Start by identifying what data structures the problem mentions. Common ones include arrays, strings, hash maps, stacks, queues, linked lists, or trees. What information do you need to track as you solve this?";
  } else if (level === 2) {
    hint = "Consider the time complexity of different approaches. Can you solve this in O(n) time? Sometimes using extra space (like a hash map) can help you avoid nested loops. Think about patterns like two pointers, sliding window, or divide and conquer. What's the trade-off between time and space?";
  } else if (level === 3) {
    hint = "Break the problem into steps: (1) What do you need to initialize before the main logic? (2) What's your main loop or recursion condition? (3) What happens in each iteration? (4) What's your termination condition? (5) What should you return? Try writing these out in plain English before coding.";
  }
  
  return hint;
}