---
title: "LeetCode #36: Valid Sudoku"
categories:
  - Hash Table
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用三個數組（或哈希表）分別記錄行、列、以及 $3 \times 3$ 宮格中數字出現的情況。

### Python
```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == '.': continue
                box_idx = (r // 3) * 3 + (c // 3)
                if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                    return False
                rows[r].add(val)
                cols[c].add(val)
                boxes[box_idx].add(val)
        return True
```

### C++
```cpp
#include <vector>
#include <unordered_set>

class Solution {
public:
    bool isValidSudoku(std::vector<std::vector<char>>& board) {
        int rows[9][9] = {0}, cols[9][9] = {0}, boxes[9][9] = {0};
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;
                int num = board[r][c] - '1';
                int b = (r / 3) * 3 + (c / 3);
                if (rows[r][num] || cols[c][num] || boxes[b][num]) return false;
                rows[r][num] = cols[c][num] = boxes[b][num] = 1;
            }
        }
        return true;
    }
};
```
