---
title: "LeetCode #165: Compare Version Numbers (比較版本號)"
categories:
  - String
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你兩個版本號字串 `version1` 和 `version2` ，請你比較它們。

版本號由一個或多個修訂號組成，各修訂號之間用點 `.` 分隔。每個修訂號列表中均包含多位數字，並可能包含前導零。
- 如果 `version1 > version2` 返回 `1`
- 如果 `version1 < version2` 返回 `-1`
- 否則返回 `0`

忽略修訂號的前導零，並將缺失的修訂號視為 `0`。

## 解題心得：分割與對齊
這題的核心在於如何處理不同長度的版本號。

**核心邏輯**：
1. 將字串按照 `.` 進行分割。
2. 同時遍歷兩個分割後的列表。
3. 如果其中一個列表已經遍歷完，則視為 `0`。
4. 比較對應位置的整數值：
   - 只要發現不相等，立即返回結果。
5. 如果全部比較完都相等，返回 `0`。

- **時間複雜度**: $O(n + m)$，其中 $n, m$ 是兩字串長度。
- **空間複雜度**: $O(n + m)$，用於存儲分割後的結果。

## 程式碼實作

### Python
```python
class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = version1.split('.')
        v2 = version2.split('.')
        
        n1, n2 = len(v1), len(v2)
        
        for i in range(max(n1, n2)):
            # 如果索引超出，預設為 0
            val1 = int(v1[i]) if i < n1 else 0
            val2 = int(v2[i]) if i < n2 else 0
            
            if val1 > val2:
                return 1
            if val1 < val2:
                return -1
                
        return 0
```

### C++
```cpp
#include <string>
#include <vector>
#include <sstream>

class Solution {
public:
    int compareVersion(std::string version1, std::string version2) {
        int n1 = version1.length(), n2 = version2.length();
        int i = 0, j = 0;
        
        while (i < n1 || j < n2) {
            long long num1 = 0, num2 = 0;
            
            // 提取 version1 的當前修訂號
            while (i < n1 && version1[i] != '.') {
                num1 = num1 * 10 + (version1[i] - '0');
                i++;
            }
            // 提取 version2 的當前修訂號
            while (j < n2 && version2[j] != '.') {
                num2 = num2 * 10 + (version2[j] - '0');
                j++;
            }
            
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
            
            // 跳過點
            i++;
            j++;
        }
        
        return 0;
    }
};
```
