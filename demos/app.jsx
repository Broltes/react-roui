import React from 'react';
import { render } from 'react-dom';
import View from './view';
import './app.less';

// Render Once
import { UI } from 'react-roui';
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
