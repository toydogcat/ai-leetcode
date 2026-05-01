---
title: "LeetCode #263: Ugly Number (醜數)"
categories:
  - Math
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
**醜數** 是指只包含質因數 `2`、`3` 和 `5` 的正整數。

給定一個整數 `n`，判斷 `n` 是否為醜數。如果是，返回 `true`；否則，返回 `false`。

**範例 1:**
```
輸入: n = 6
輸出: true
解釋: 6 = 2 × 3
```

**範例 2:**
```
輸入: n = 1
輸出: true
解釋: 1 沒有質因數，因此它的所有質因數都在 {2, 3, 5} 中。
```

**範例 3:**
```
輸入: n = 14
輸出: false
解釋: 14 = 2 × 7，7 不是一個醜數的質因數。
```

## 解題心得：反覆試除質因數
這是一題經典的數學題。根據題目定義，一個正整數 $n$ 只要能完全被質因數 $2, 3, 5$ 分解成 $1$，那麼它就是一個醜數。

**核心邏輯**：
1. **處理非正整數**：由於醜數必須是正整數，當 $n \le 0$ 時直接返回 `false`。
2. **反覆試除**：使用 `while` 迴圈依次檢查是否能被 $2, 3, 5$ 整除：
   - 當 $n$ 能被 2 整除，將 $n$ 除以 2，直到不能整除為止。
   - 同理，再依次試除 3 和 5。
3. **檢查餘數**：如果最後 $n = 1$，說明該數字只包含 $2, 3, 5$ 的質因數，即為醜數。

- **時間複雜度**: $O(\log_2 n + \log_3 n + \log_5 n) = O(\log n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False
        
        # 依次試除 2, 3, 5
        for p in [2, 3, 5]:
            while n % p == 0:
                n //= p
                
        return n == 1
```

### C++
```cpp
class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0) {
            return false;
        }

        // 依次試除 2, 3, 5
        int factors[] = {2, 3, 5};
        for (int p : factors) {
            while (n % p == 0) {
                n /= p;
            }
        }

        return n == 1;
    }
};
```
