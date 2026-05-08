---
title: "LeetCode #303: Range Sum Query - Immutable (區域和檢索 - 陣列不可變)"
categories:
  - Array
  - Design
  - Prefix Sum
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個整數陣列 `nums`，處理以下多個區間和查詢：
1. 計算索引 `left` 到 `right`（包含兩端）的子陣列元素之和。

## 解題心得
由於會進行多次查詢，如果每次查詢都使用迴圈累加，時間複雜度為 $O(N)$。我們可以使用 **前綴和 (Prefix Sum)** 來做預處理：
- 建立一個前綴和陣列 `prefix`，其中 `prefix[i]` 表示前 `i` 個元素的和。
- 區間 `[left, right]` 的和即為 `prefix[right + 1] - prefix[left]`。
- 這樣預處理的時間複雜度為 $O(N)$，每次查詢的時間複雜度為 $O(1)$。

- **時間複雜度**: 預處理 $O(N)$，查詢 $O(1)$
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### C++
```cpp
#include <vector>

class NumArray {
private:
    std::vector<int> prefix;

public:
    NumArray(std::vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```
