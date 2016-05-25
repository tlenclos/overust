import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from "react-helmet";
import s from './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return <div>
            <Helmet
                htmlAttributes={{"lang": "en"}} // amp takes no value
                title="Home"
                titleTemplate="Overust - %s"
                base={{"target": "_blank", "href": "http://localhost:3000/"}}
                meta={[
                  {"name": "description", "content": "Overust, manage you clan"},
                ]}
                link={[
                  // {"rel": "stylesheet", "href": "http://yui.yahooapis.com/pure/0.6.0/pure-min.css"},
                  {"rel": "stylesheet", "href": "/app.css"},
                ]}
            />
            <div className={s.page}>
                {children}
            </div>
        </div>;
    }
}

export default withStyles(App, s);
