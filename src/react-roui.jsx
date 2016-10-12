import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './ui.less';

var Waiting = React.createClass({
    render: function() {
        var { waiting, isModal } = this.props;
        var mask = isModal ? <div className="ui-mask"/> : null;

        return waiting ? (
            <div id="ui-waiting">
                {mask}
                <p className="ui-loading"/>
            </div>
        ) : null;
    }
});

var Toast = React.createClass({
    render: function() {
        var toast = this.props.toast;

        return toast ? (
            <div id="ui-toast" className={toast ? '' : 'none'}>
                <p>{toast}</p>
            </div>
        ) : null;
    }
});

// action sheet
var setMenuState;
var Menu = React.createClass({
    getInitialState: function() {
        return {
            state: 0,
            btns: []
        };
    },
    componentWillMount: function() {
        setMenuState = this.setState.bind(this);
    },
    handleClick: function(i) {
        this.setState({ state: 0});
        if(this.state.action) this.state.action(i);
    },
    render: function() {
        var that = this;
        var body = null;

        if(this.state.state){
            var btns = this.state.btns.map(function(item, i){
                var btn = {__html: item};

                return <li key={i} onClick={() => that.handleClick(i)} dangerouslySetInnerHTML={btn}/>;
            });
            var title = this.state.title ? (
                <h2>{this.state.title}</h2>
            ) : null;

            body = (
                <div id="ui-menu">
                    <div className="ui-menus">
                        {title}
                        <ul>{btns}</ul>
                        <ul><li onClick={() => this.handleClick(-1)}>取消</li></ul>
                    </div>
                    <div className="ui-mask" onClick={() => this.handleClick(-1)}/>
                </div>
            );
        }

        return <ReactCSSTransitionGroup transitionName="ui-menu" transitionEnterTimeout={400} transitionLeaveTimeout={400} component="div">{body}</ReactCSSTransitionGroup>;
    }
});

var setDialogState;
var Dialog = React.createClass({
    getInitialState: function() {
        return {
            state: 0,
            title: '',
            cnt: '',
            btns: []
        };
    },
    componentDidMount: function() {
        setDialogState = this.setState.bind(this);
    },
    handleClick: function(i) {
        this.setState({ state: 0});
        if(this.state.action) this.state.action(i);
    },
    render: function() {
        var that = this;
        var btns = this.state.btns;

        // 最后一个按钮高亮
        btns = btns.map(function(item, i){
            return <a key={i} onClick={() => that.handleClick(i)} className={i+1 == btns.length ? 'primary' : ''}>{item}</a>;
        });

        return (
            <div id="ui-dialog" className={this.state.state ? 'on' : ''}>
                <div className="ui-mask dark"/>
                <div className="body">
                    <h2>{this.state.title}</h2>
                    <p>{this.state.cnt}</p>
                    <div className="actions">{btns}</div>
                </div>
            </div>
        );
    }
});


var setState;
export var UI = React.createClass({
    getInitialState: function() {
        return {
            waiting: 0,
            modalWaiting: 0,
            toast: '',

            menuState: 0,
            menuBtns: [],
            menuAction: function(){}
        };
    },
    componentWillMount: function() {
        setState = this.setState.bind(this);
    },
    render: function() {
        let { waiting, modalWaiting, toast } = this.state;

        return (
            <div>
                <Waiting waiting={waiting} isModal={modalWaiting}/>
                <Toast toast={toast}/>
                <Menu/>
                <Dialog/>
                {this.props.children}
            </div>
        );
    }
});

export default {
    showWaiting: function(isModal){
        setState({ waiting: 1, modalWaiting: !!isModal });
    },
    closeWaiting: function() {
        setState({ waiting: 0 });
    },
    toast: (function() {
        var tid;

        return function(msg) {
            if(tid) {
                clearTimeout(tid);
                tid = 0;
            }

            // show toast
            setState({ toast: msg});

            // close toast
            tid = setTimeout(function() {
                setState({ toast: ''});
            }, 3e3);
        }
    })(),

    menu: function(options){
        setMenuState(Object.assign({
            state: 1,
            title: ''
        }, options));
    },

    dialog: function(options){
        setDialogState(Object.assign({
            state: 1,
            title: '',
            cnt: ''
        }, options));
    }
};
