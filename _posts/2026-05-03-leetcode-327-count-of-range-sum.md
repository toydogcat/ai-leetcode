---
title: "LeetCode #327: Count of Range Sum (區間和的個數)"
categories:
  - Binary Indexed Tree
  - Segment Tree
  - Merge Sort
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums`，返回區間和在 `[lower, upper]` 之間的子陣列個數。

## 解題心得
設子陣列區間為 `[i, j]`，其區間和可表示為 `prefix[j + 1] - prefix[i]`。我們希望 `lower <= prefix[j + 1] - prefix[i] <= upper`。
這是一個典型的二維偏序問題，我們可以使用 **合併排序 (Merge Sort)** 來做分治統計：
- 計算前綴和陣列 `prefix`。
- 在合併排序的過程中，對於左右兩個已經有序的前綴和區間，我們可以使用兩個指針 `k` 和 `m` 來找出在右區間中，滿足 `prefix[k] - prefix[i] >= lower` 與 `prefix[m] - prefix[i] <= upper` 的邊界，從而可以在 $O(1)$ 時間內對當前的 `i` 加上 `m - k` 組逆序對數量。
- 這樣整體時間複雜度可達到 $O(N \log N)$。

- **時間複雜度**: O(N log N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + num)
            
        def mergeSort(left, right):
            if right - left <= 1:
                return 0
            mid = (left + right) // 2
            count = mergeSort(left, mid) + mergeSort(mid, right)
            
            # 分治統計
            k = m = mid
            for i in range(left, mid):
                while k < right and prefix[k] - prefix[i] < lower:
                    k += 1
                while m < right and prefix[m] - prefix[i] <= upper:
                    m += 1
                count += m - k
                
            prefix[left:right] = sorted(prefix[left:right])
            return count

        return mergeSort(0, len(prefix))
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    int mergeSort(std::vector<long long>& prefix, int left, int right, int lower, int upper) {
        if (right - left <= 1) return 0;
        int mid = left + (right - left) / 2;
        int count = mergeSort(prefix, left, mid, lower, upper) + mergeSort(prefix, mid, right, lower, upper);

        int k = mid, m = mid;
        for (int i = left; i < mid; ++i) {
            while (k < right && prefix[k] - prefix[i] < lower) k++;
            while (m < right && prefix[m] - prefix[i] <= upper) m++;
            count += m - k;
        }
        std::inplace_merge(prefix.begin() + left, prefix.begin() + mid, prefix.begin() + right);
        return count;
    }

public:
    int countRangeSum(std::vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        std::vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return mergeSort(prefix, 0, n + 1, lower, upper);
    }
};
```
