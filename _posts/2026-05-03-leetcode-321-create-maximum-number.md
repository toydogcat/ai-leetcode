---
title: "LeetCode #321: Create Maximum Number (拼接最大數)"
categories:
  - Stack
  - Greedy
  - Monotonic Stack
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你兩個整數陣列 `nums1` 和 `nums2`，它們的長度分別為 `m` 和 `n`。另給你一個整數 `k`。從這兩個陣列中選出 `k` 個數字，使得選出的數字在保持原有相對順序的前提下，拼接出的數值最大。返回該最大陣列。

## 解題心得
本題可以拆解為三個子問題：
1. **最大子序列提取**：編寫一個函數，從單一陣列中利用**單調堆疊**提取出長度為 `x` 的最大子序列。
2. **雙陣列最大合併**：將提取出的兩個子序列合併成一個最大的序列（合併時如果首字元相同，需貪心地向後比較子陣列大小）。
3. **列舉與最佳化**：列舉所有合法的提取長度 `i` 和 `k-i`（其中 $0 \le i \le m$ 且 $0 \le k-i \le n$），將每一次合併後的最大結果與全局最大值進行對比，取其最優者。

- **時間複雜度**: O(K \times (M + N)^2)
- **空間複雜度**: O(M + N)

## 程式碼實作

### Python
```python
class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        def getMaxSubsequence(nums, length):
            stack = []
            drop = len(nums) - length
            for num in nums:
                while drop > 0 and stack and stack[-1] < num:
                    stack.pop()
                    drop -= 1
                stack.append(num)
            return stack[:length]
            
        def merge(sub1, sub2):
            return [max(sub1, sub2).pop(0) for _ in range(len(sub1) + len(sub2))]

        ans = []
        for i in range(max(0, k - len(nums2)), min(k, len(nums1)) + 1):
            sub1 = getMaxSubsequence(nums1, i)
            sub2 = getMaxSubsequence(nums2, k - i)
            ans = max(ans, merge(sub1, sub2))
        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    std::vector<int> getMaxSubsequence(const std::vector<int>& nums, int length) {
        std::vector<int> stack;
        int drop = nums.size() - length;
        for (int num : nums) {
            while (drop > 0 && !stack.empty() && stack.back() < num) {
                stack.pop_back();
                drop--;
            }
            stack.push_back(num);
        }
        stack.resize(length);
        return stack;
    }

    std::vector<int> merge(std::vector<int> sub1, std::vector<int> sub2) {
        std::vector<int> res;
        auto it1 = sub1.begin(), end1 = sub1.end();
        auto it2 = sub2.begin(), end2 = sub2.end();
        while (it1 != end1 || it2 != end2) {
            if (std::lexicographical_compare(it1, end1, it2, end2)) {
                res.push_back(*it2++);
            } else {
                res.push_back(*it1++);
            }
        }
        return res;
    }

public:
    std::vector<int> maxNumber(std::vector<int>& nums1, std::vector<int>& nums2, int k) {
        std::vector<int> ans;
        int m = nums1.size(), n = nums2.size();
        for (int i = std::max(0, k - n); i <= std::min(k, m); ++i) {
            auto sub1 = getMaxSubsequence(nums1, i);
            auto sub2 = getMaxSubsequence(nums2, k - i);
            auto merged = merge(sub1, sub2);
            if (ans.empty() || merged > ans) {
                ans = merged;
            }
        }
        return ans;
    }
};
```
