---
title: "LeetCode #159: Longest Substring with At Most Two Distinct Characters (至多包含兩個不同字元的最長子字串)"
categories:
  - Hash Table
  - String
  - Sliding Window
tags:
  - Medium
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給你一個字串 `s` ，找出 **至多包含兩個不同字元** 的最長子字串的長度。

## 解題心得：滑動窗口的教科書範例
這題是滑動窗口 (Sliding Window) 的經典應用。

**核心邏輯**：
1. 維護一個窗口 `[left, right]`。
2. 使用哈希表記錄窗口內每個字元出現的次數。
3. 如果哈希表的大小（即不同字元的數量）超過了 2：
   - 不斷移動 `left` 指標並減少對應字元的計數。
   - 當某個字元的計數降為 0 時，將其從哈希表中移除。
   - 重複此步驟直到哈希表大小恢復到 $\le 2$。
4. 在過程中不斷更新最大長度 `res = max(res, right - left + 1)`。

- **時間複雜度**: $O(n)$，每個字元最多被訪問兩次（`left` 和 `right` 各一次）。
- **空間複雜度**: $O(1)$，因為哈希表最多只會存儲 3 個鍵值對。

## 程式碼實作

### Python
```python
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        n = len(s)
        if n < 3: return n
        
        left, right = 0, 0
        hashmap = {}
        max_len = 2
        
        while right < n:
            hashmap[s[right]] = right
            right += 1
            
            if len(hashmap) == 3:
                # 刪除最左邊出現的那個字元
                del_idx = min(hashmap.values())
                del hashmap[s[del_idx]]
                left = del_idx + 1
                
            max_len = max(max_len, right - left)
            
        return max_len
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(std::string s) {
        int n = s.length();
        if (n < 3) return n;
        
        int left = 0, right = 0;
        std::unordered_map<char, int> hashmap;
        int max_len = 2;
        
        while (right < n) {
            hashmap[s[right]] = right;
            right++;
            
            if (hashmap.size() == 3) {
                // 找出索引最小值
                int del_idx = n;
                for (auto const& [key, val] : hashmap) {
                    del_idx = std::min(del_idx, val);
                }
                hashmap.erase(s[del_idx]);
                left = del_idx + 1;
            }
            max_len = std::max(max_len, right - left);
        }
        return max_len;
    }
};
```
