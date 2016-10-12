import React from 'react';
// Use Anywhere
import ui from 'react-roui';

export default React.createClass({
    render(){
        window.ui = ui;

        function showModalWaiting() {
            ui.showWaiting(true);
            setTimeout(ui.closeWaiting, 3e3);
        }

        function menu() {
            ui.menu({
                title: '请选择喜欢的数字',
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
                <a onClick={() => ui.showWaiting()} className="btn">show waiting</a>
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
