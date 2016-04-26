import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import s from './App.css';
import UserInfo from './UserInfo';
import Wipes from './Wipes';
import { fetchWipesAction } from './../actions';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchWipes();
    }

    render() {
        const { value, user, onIncrement, onDecrement, wipes } = this.props;
        return <div>
            App: <span className={s.value}>{value}</span> <br />
            <UserInfo user={user} />
            <button className={s.button} onClick={onIncrement}> +1 </button>
            <button className={s.button} onClick={onDecrement}> -1 </button>

            <Wipes wipes={wipes.items} />

            <Link to={`/app/wipe/create`}>Start by creating a wipe</Link>
        </div>;
    }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  wipes: PropTypes.object
};

const mapStateToProps = ({ counter, user, wipes }) => ({
    value: counter,
    user,
    wipes
});
const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' }),
    fetchWipes: () => dispatch(fetchWipesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(App, s));
