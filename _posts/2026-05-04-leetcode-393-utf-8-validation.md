---
title: "LeetCode #393: UTF-8 Validation (UTF-8 編碼驗證)"
categories:
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數陣列，判斷其是否為合法的 UTF-8 編碼。

## 解題心得
逐個位元組分析：
- 讀取一個位元組，根據開頭 1 的個數確定該字元由幾個位元組組成（n 位元組字元開頭為 n 個 1 加一個 0）。
- 接下來的 n-1 個位元組開頭必須是 `10` 格式。
- 驗證整個陣列是否完全符合此規則。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        n_bytes = 0
        
        for num in data:
            # 只取最後 8 位
            byte = num & 0xFF
            if n_bytes == 0:
                # 統計開頭 1 的個數
                mask = 1 << 7
                while byte & mask:
                    n_bytes += 1
                    mask >>= 1
                if n_bytes == 0:
                    continue
                if n_bytes == 1 or n_bytes > 4:
                    return False
            else:
                # 後續位元組必須以 10 開頭
                if not (byte & (1 << 7) and not (byte & (1 << 6))):
                    return False
            n_bytes -= 1
            
        return n_bytes == 0
```

### C++
```cpp
#include <vector>

class Solution {
public:
    bool validUtf8(std::vector<int>& data) {
        int n_bytes = 0;

        for (int num : data) {
            int byte = num & 0xFF;
            if (n_bytes == 0) {
                int mask = 1 << 7;
                while (byte & mask) {
                    n_bytes++;
                    mask >>= 1;
                }
                if (n_bytes == 0) continue;
                if (n_bytes == 1 || n_bytes > 4) return false;
            } else {
                if (!((byte & (1 << 7)) && !(byte & (1 << 6)))) {
                    return false;
                }
            }
            n_bytes--;
        }
        return n_bytes == 0;
    }
};
```
