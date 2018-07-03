# Module VIEW

### 說明

畫面模組，透過注入的方式整合控制模組以達成跟vue的互動

- **檔案結構**，將模組建立於 view 資料夾下

    ```
    ├── modules/
        ├── view/
            └── {name}/index.js, ...
    ```

    - **{name}**，模組名稱，index.js 為模組入口，*{name}* 以lower camel case命名

- **程式規則**

    ```
    import View from '../index';

    // declare
    const Me = class View{Name} extends View {
        constructor(vue, injection) {
            super(vue, injection, Me.INJECTION_MAP);
        }
        // e.g
        {method}() {
            // ...
        }
        // event hook
        _eventHook() {
            // super._eventHook();
        }
        // eventBack
        onEvt{Callback}(data) {
            //
        }
    }

    // injection map
    Me.INJECTION_MAP = [{ctrlName}, ...];

    export default Me;
    ```

    - **匯入類別**，view的共用父類別，已實作事件方法(_check, _eventHook);
    - **類別宣告**，定義類別名稱 *{Name}* 以Pascal命名(同模組名稱)及其方法
    - **event hook**，事件綁定宣告位置，參照控制模組
    - **onEvt{Callback}**，事件回呼函示的命名規則
    - **injection map**，控制模組的檢查清單
    - **{injection}**，控制模組注入，透過constructor 以物件參數傳入，{name: instance, ...}
