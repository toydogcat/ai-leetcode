---
title: "LeetCode #307: Range Sum Query - Mutable (區域和檢索 - 陣列可修改)"
categories:
  - Design
  - Binary Indexed Tree
  - Segment Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個陣列 `nums`，請你實現一個資料結構，支援：
1. 更新單個元素的值 `update(index, val)`。
2. 計算區間 `sumRange(left, right)` 的元素之和。

## 解題心得
本題需要同時支援頻繁的「單點修改」與「區間查詢」。
- 若使用普通前綴和，修改需要 $O(N)$，查詢 $O(1)$。
- 若使用普通陣列，修改 $O(1)$，查詢 $O(N)$。
為了平衡兩者，我們可以使用 **樹狀陣列 (Binary Indexed Tree / Fenwick Tree)** 或 **線段樹 (Segment Tree)**，讓修改與查詢的時間複雜度皆為 $O(\log N)$。

- **時間複雜度**: 修改 $O(\log N)$，查詢 $O(\log N)$
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.n = len(nums)
        self.nums = nums
        self.tree = [0] * (self.n + 1)
        for i in range(self.n):
            self.add(i + 1, nums[i])

    def add(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def update(self, index: int, val: int) -> None:
        delta = val - self.nums[index]
        self.nums[index] = val
        self.add(index + 1, delta)

    def sumRange(self, left: int, right: int) -> int:
        return self.query(right + 1) - self.query(left)
```

### C++
```cpp
#include <vector>

class NumArray {
private:
    std::vector<int> tree;
    std::vector<int>& nums;
    int n;

    void add(int i, int delta) {
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i);
        }
        return sum;
    }

public:
    NumArray(std::vector<int>& nums) : nums(nums) {
        n = nums.size();
        tree.resize(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            add(i + 1, nums[i]);
        }
    }
    
    void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        add(index + 1, delta);
    }
    
    int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
};
```
