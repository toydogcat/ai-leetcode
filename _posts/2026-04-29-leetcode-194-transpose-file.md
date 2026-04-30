---
title: "LeetCode #194: Transpose File (轉置文件)"
categories:
  - Shell
tags:
  - Medium
  - Bash
  - awk
---

## 題目描述
給定一個文件 `file.txt`，轉置它的內容。
你可以假設每行列數相同，並且欄位由空格分隔。

例如，如果 `file.txt` 內容如下：
```
name age
alice 21
ryan 30
```
輸出應該是：
```
name alice ryan
age 21 30
```

## 解題心得：awk 的二維處理
在 Shell 中處理表格轉置，`awk` 是最強大的工具。

**核心邏輯**：
1. **遍歷每一行**：對於每一行，我們遍歷其每一個欄位（Field）。
2. **存入陣列**：使用一個二維陣列（在 awk 中其實是模擬的） `res[column, row]` 來存儲數據。
3. **最後輸出**：在讀取完所有行後（`END` 塊），我們按列優先的順序輸出陣列。

## 程式碼實作

### Bash (awk)
```bash
awk '{
    for (i = 1; i <= NF; i++) {
        if (NR == 1) {
            res[i] = $i;
        } else {
            res[i] = res[i] " " $i;
        }
    }
}
END {
    for (i = 1; i <= NF; i++) {
        print res[i];
    }
}' file.txt
```
> [!NOTE]
> `NF` 代表當前行的欄位總數，`NR` 代表當前行號。我們將每一列的數據拼接在對應的 `res[i]` 中。
