# react-ui
适合移动端的简单交互组件

## Live demo
[https://github.com/weui/weui](https://github.com/weui/weui)
## Usage
```js
import React from 'react';
import { render } from 'react-dom';
import View from './view';
import './app.less';

// Render Once
import { UI } from 'react-ui';
var App = React.createClass({
    render: function(){
        return (
            <div>
                <UI/>
                <View/>
            </div>
        );
    }
});
render(<App/>, document.getElementById('app'));
```

view.js
```js
import React from 'react';
// Use Anywhere
import ui from 'react-ui';
export default React.createClass({
    render: function(){

        function showModalWaiting() {
            ui.showWaiting(1);
            setTimeout(ui.closeWaiting, 3e3);
        }

        function menu() {
            ui.menu({
                btns: [0,'<a class="test">1</a>'],

                action: function(i){
                    ui.toast(i + ' clicked');
                }
            });
        }

        function dialog() {
            ui.dialog({
                title:'弹窗标题',
                cnt:'自定义弹窗内容，居中显示，告知确认的信息等',
                btns: ['取消','确定'],
                action: function(i){
                    ui.toast(i + ' clicked');
                }
            });
        }

        return (
            <div>
                <a onClick={ui.showWaiting} className="btn">show waiting</a>
                <a onClick={showModalWaiting} className="btn">show modal waiting 3s</a>
                <a onClick={ui.closeWaiting} className="btn">close waiting</a>
                <br/>
                <a onClick={() => ui.toast('toast message')} className="btn">toast message</a>
                <br/>
                <a onClick={menu} className="btn">menu(action sheet)</a>
                <br/>
                <a onClick={dialog} className="btn">show dialog</a>
            </div>
        );
    }
});

```

## Development
开发时注意设置 webpack.dev.config.js 的entry：
```js
'webpack-dev-server/client?http://dev.broltes.com:' + devport,
```
将环境修改为自己的。
