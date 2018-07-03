# Module BASE

### 說明

基礎模組，以功能系統跟相關技術來定義；其功能會偏向單一職責，且可以獨立運作。

目前的架構主要會分為兩類：

- [一般](#一般)
- [插件](#插件)

### 一般

自定義的基礎模組功能

- **檔案結構**，將模組建立於 base 資料夾下

    ```
    ├── modules/
        ├── base/
            └── {name}/index.js, ...
    ```

    - **{name}**，模組名稱，index.js 為模組入口，*{name}* 以lower camel case命名

- **程式規則**

    ```
    // declare
    const Me = class Base{Name} {
        constructor() {
            // ...
        }
        // e.g
        {method}() {
            // ...
        }
        // event register*
        eventRegister(eventBack) {
            // ...
        }
    }

    export default Me;
    ```

    - **類別宣告**，定義類別名稱 *{Name}* 以Pascal命名(同模組名稱)及其方法
    - **event register**，模組的事件註冊器(若存在)統一規則(**重要**)

### 插件

主要是作為第三方套件的通道，所以介面會盡量單純，邏輯處理則實做在套件裡

實作待續...
