---
title: "LeetCode #370: Range Addition (區間加法)"
categories:
  - Array
  - Prefix Sum
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個長度為 `length` 的陣列，初始全為 0。給定一組更新操作 `updates`，將範圍 `[start, end]` 內的所有元素加上 `val`。返回最終陣列。要求 $O(N + K)$。

## 解題心得
這是一道標準的 **差分陣列 (Difference Array)** 經典題：
- 對於每個更新 `[start, end, val]`：
  - 我們在差分陣列中 `diff[start] += val`。
  - 若 `end + 1 < length`，我們在差分陣列中 `diff[end + 1] -= val`。
- 所有更新操作結束後，對差分陣列求一次 **前綴和 (Prefix Sum)** 即可在 $O(N)$ 時間內得到最終結果。

- **時間複雜度**: O(N + K) 其中 K 是 updates 的長度
- **空間複雜度**: O(1) 扣除結果陣列

## 程式碼實作

### Python
```python
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        diff = [0] * length
        for start, end, val in updates:
            diff[start] += val
            if end + 1 < length:
                diff[end + 1] -= val
                
        # 求前綴和
        curr = 0
        for i in range(length):
            curr += diff[i]
            diff[i] = curr
        return diff
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> getModifiedArray(int length, std::vector<std::vector<int>>& updates) {
        std::vector<int> diff(length, 0);
        for (auto const& update : updates) {
            int start = update[0];
            int end = update[1];
            int val = update[2];
            diff[start] += val;
            if (end + 1 < length) {
                diff[end + 1] -= val;
            }
        }

        int curr = 0;
        for (int i = 0; i < length; ++i) {
            curr += diff[i];
            diff[i] = curr;
        }
        return diff;
    }
};
```
