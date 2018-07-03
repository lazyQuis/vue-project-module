# Modules 整體架構

### 說明

前端的架構設計以模組化的方式設計，規則如下：

- 確保模組的設計為高內聚、低耦合；依賴介面而非類別
- 模組類型：
    + **[Module BASE][MD_BASE]**，基礎模組，可獨立運作
    + **[Module CTRL][MD_CTRL]**，控制模組，需要注入基礎模組
    + **[Module VIEW][MD_VIEW]**，畫面模組，需要注入控制模組，跟vue框架溝通

詳情請參閱各個模組說明。

### 檔案結構

```
├── src
|     ├── config/                (參數位置)
|     ├── lib/                   (sdk位置)
|     ├── modules/               (模組位置)
|     |     ├── base/            (基礎模組)
|     |     ├── ctrl/            (控制模組)
|     |     └── view/            (畫面模組)
```

[MD_BASE]: ModuleBASE.md
[MD_CTRL]: ModuleCTRL.md
[MD_VIEW]: ModuleVIEW.md
