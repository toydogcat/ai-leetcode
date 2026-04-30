---
title: "LeetCode #251: Flatten 2D Vector (展開二維向量)"
categories:
  - Design
  - Iterator
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個迭代器，用於展開一個二維向量。它應支持 `next` 和 `hasNext` 操作。
例如，輸入 `[[1,2],[3],[4]]`，連續調用 `next` 應返回 `1, 2, 3, 4`。

## 解題心得：雙指針迭代
設計迭代器的關鍵在於如何高效且準確地判斷「下一個元素在哪」。

**核心邏輯：**
1. **雙指針**：使用 `row` 表示當前行，`col` 表示當前列。
2. **`hasNext()` (重點)**：
   - 負責將指針移動到下一個 **有效元素** 的位置。
   - 如果當前 `col` 已經越過當前行的末尾，則 `row++`, `col=0`。
   - 循環檢查直到找到一個非空的行，或者遍歷完所有行。
3. **`next()`**：
   - 先調用 `hasNext()` 確保指針在正確位置。
   - 返回 `vec[row][col]` 並執行 `col++`。

- **時間複雜度**: `next` 和 `hasNext` 均攤均為 $O(1)$。
- **空間複雜度**: $O(1)$ (不計輸入數據)。

## 程式碼實作

### Python
```python
class Vector2D:
    def __init__(self, vec: List[List[int]]):
        self.vec = vec
        self.row = 0
        self.col = 0

    def next(self) -> int:
        if self.hasNext():
            val = self.vec[self.row][self.col]
            self.col += 1
            return val

    def hasNext(self) -> bool:
        # 跳過空行
        while self.row < len(self.vec):
            if self.col < len(self.vec[self.row]):
                return True
            self.row += 1
            self.col = 0
        return False
```

### C++
```cpp
#include <vector>

class Vector2D {
private:
    std::vector<std::vector<int>> data;
    int row = 0;
    int col = 0;

public:
    Vector2D(std::vector<std::vector<int>>& vec) : data(vec) {}
    
    int next() {
        hasNext();
        return data[row][col++];
    }
    
    bool hasNext() {
        while (row < data.size()) {
            if (col < data[row].size()) return true;
            row++;
            col = 0;
        }
        return false;
    }
};
```
