# Module CTRL

### 說明

控制模組，透過注入的方式整合基礎模組以達成較完整的功能

- **檔案結構**，將模組建立於 ctrl 資料夾下

    ```
    ├── modules/
        ├── ctrl/
            └── {name}/index.js, ...
    ```

    - **{name}**，模組名稱，index.js 為模組入口，*{name}* 以lower camel case命名

- **程式規則**

    ```
    import Ctrl from '../index';

    // declare
    const Me = class Ctrl{Name} extends Ctrl {
        constructor({injection}) {
            super(injection, Me.INJECTION_MAP);
        }
        // e.g
        {method}() {
            // ...
        }
        // event
        _event(msg) {
            // super._event(msg);
        }
        // listener
        on(type, callback) {
            // super.on(type, callback);
        }
    }

    // injection map
    Me.INJECTION_MAP = {
        plugin: [{pluginName}, ...],
        module: [{baseName}, ...]
    };

    export default Me;
    ```

    - **匯入類別**，ctrl的共用父類別，已實作事件方法(_check, _event, on);
    - **類別宣告**，定義類別名稱 *{Name}* 以Pascal命名(同模組名稱)及其方法
    - **event**，接收到底層事件的處理邏輯
    - **listener**，事件偵聽器，讓ui可以註冊事件回呼函示：
        * **type**，事件型態
        * **callback**，對應事件型態的回呼函示
    - **injection map**，基礎模組的檢查清單
    - **{injection}**，基礎模組注入，透過constructor 以物件參數傳入，種類如下：
        * **module**，一般類基礎模組，{name: instance, ...}
        * **plugin**，插件類基礎模組，{name: instance, ...}
