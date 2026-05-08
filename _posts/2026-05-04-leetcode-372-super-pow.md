---
title: "LeetCode #372: Super Pow (超級次方)"
categories:
  - Math
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
計算 $a^b \pmod{1337}$，其中 `b` 是一個以陣列形式給出的極大正整數。

## 解題心得
利用 **模共軛與遞迴求冪**：
- $a^{[1, 5, 6, 4]} = a^{1560} \times a^4 = (a^{[1, 5, 6]})^{10} \times a^4 \pmod{1337}$。
- 據此，我們寫出一個遞迴函數：`superPow(a, b) = pow(superPow(a, b[:-1]), 10) * pow(a, b[-1]) % 1337`。
- 其中快速冪函數 `pow(x, y, 1337)` 可以在 $O(\log Y)$ 時間內計算出結果。

- **時間複雜度**: O(L) 其中 L 是陣列 b 的長度
- **空間複雜度**: O(L) 遞迴深度

## 程式碼實作

### Python
```python
class Solution:
    def superPow(self, a: int, b: List[int]) -> int:
        BASE = 1337
        
        def my_pow(x, y):
            x %= BASE
            res = 1
            for _ in range(y):
                res = (res * x) % BASE
            return res
            
        if not b: return 1
        last = b.pop()
        part1 = my_pow(a, last)
        part2 = my_pow(self.superPow(a, b), 10)
        return (part1 * part2) % BASE
```

### C++
```cpp
#include <vector>

class Solution {
private:
    const int BASE = 1337;

    int my_pow(int x, int y) {
        x %= BASE;
        int res = 1;
        for (int i = 0; i < y; ++i) {
            res = (res * x) % BASE;
        }
        return res;
    }

public:
    int superPow(int a, std::vector<int>& b) {
        if (b.empty()) return 1;
        int last = b.back();
        b.pop_back();

        int part1 = my_pow(a, last);
        int part2 = my_pow(superPow(a, b), 10);
        return (part1 * part2) % BASE;
    }
};
```
