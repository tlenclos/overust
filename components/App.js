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
        const { value, onIncrement, onDecrement, children } = this.props;
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
                  {"rel": "stylesheet", "href": "http://yui.yahooapis.com/pure/0.6.0/pure-min.css"},
                  {"rel": "stylesheet", "href": "/app.css"},
                ]}
            />
            <div>
                App: <span className={s.value}>{value}</span> <br />
                <button className={s.button} onClick={onIncrement}> +1 </button>
                <button className={s.button} onClick={onDecrement}> -1 </button>

                {children}
            </div>
        </div>;
    }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

const mapStateToProps = ({ counter, user, wipes }) => ({
    value: counter
});
const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(App, s));