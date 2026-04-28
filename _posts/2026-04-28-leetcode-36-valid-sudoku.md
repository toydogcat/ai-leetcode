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

## 題目描述
請你判斷一個 `9 x 9` 的數獨是否有效。只需要 **根據以下規則** ，驗證已經填入的數字是否有效即可：
1. 數字 `1-9` 在每一行只能出現一次。
2. 數字 `1-9` 在每一列只能出現一次。
3. 數字 `1-9` 在每一個以粗實線分隔的 `3x3` 宮內只能出現一次。

## 解題心得：一眼看穿重複
這題跟 37 題不同，我們不需要「解」它，只需要檢查「有沒有違規」。

**核心邏輯：**
1. **建立記錄本**：我們需要幫每一行、每一列、每一個九宮格都開一個「清單」（哈希表）。
2. **地毯式檢查**：遍歷每一個有數字的格子。
3. **抓到重複就報警**：
   - 看看這個數字是不是已經出現在「這一行」的清單裡了？
   - 看看是不是已經出現在「這一列」的清單裡了？
   - 看看是不是已經出現在「這個九宮格」的清單裡了？
4. **九宮格定位公式**：一個小技巧是，格子 `(r, c)` 屬於第 `(r // 3) * 3 + (c // 3)` 個九宮格。

這就像是海關檢查，每個人（數字）都要同時通過行、列、九宮格三道關卡的檢查，只要有人重複出現，這個數獨就是無效的。

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
