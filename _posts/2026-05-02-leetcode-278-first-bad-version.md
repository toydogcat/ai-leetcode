---
title: "LeetCode #278: First Bad Version (第一個錯誤的版本)"
categories:
  - Binary Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
你是產品經理，目前正在帶領一個團隊開發新的產品。不幸的是，你的產品的最新版本沒有通過質量檢測。由於每個版本都是基於之前的版本開發的，所以 **一個錯誤的版本之後的所有版本都是錯誤的**。

假設你有 `n` 個版本 `[1, 2, ..., n]`，你想找出導致之後所有版本都出錯的第一個錯誤版本。

你可以通過調用 `bool isBadVersion(version)` 接口來判斷版本號 `version` 是否在單元測試中出錯。請實現一個函數來找出第一個錯誤的版本。你應該盡量減少對 API 的調用次數。

**範例 1:**
```
輸入: n = 5, bad = 4
輸出: 4
解釋:
調用 isBadVersion(3) -> false
調用 isBadVersion(5) -> true
調用 isBadVersion(4) -> true
所以 4 是第一個錯誤的版本。
```

## 解題心得：二分搜尋法 (Binary Search)
因為錯誤版本之後的所有版本均為錯誤的，這具有單調性（Monotonicity），我們可以使用 **二分搜尋法** 來找到第一個錯誤的版本。

**核心邏輯**：
1. **區間初始化**：`left = 1`, `right = n`。
2. **中點測試**：
   - 如果 `isBadVersion(mid)` 為 `true`：代表 `mid` 已經是錯誤版本，第一個錯誤版本在 `mid` 本身或是在其左側。因此將搜尋範圍縮小至左側：`right = mid`。
   - 如果 `isBadVersion(mid)` 為 `false`：代表 `mid` 還是正確版本，第一個錯誤版本必定在 `mid` 的右側。因此將搜尋範圍縮小至右側：`left = mid + 1`。
3. 當 `left == right` 時，迴圈結束，此時的 `left` 即為所求的第一個錯誤版本。

- **時間複雜度**: $O(\log N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        left = 1
        right = n
        
        while left < right:
            mid = left + (right - left) // 2
            
            if isBadVersion(mid):
                right = mid
            else:
                left = mid + 1
                
        return left
```

### C++
```cpp
// The isBadVersion API is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int left = 1;
        int right = n;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }
};
```
