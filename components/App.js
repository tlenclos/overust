import { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import s from './App.css';
import UserInfo from './UserInfo';

const App = ({ value, user, onIncrement, onDecrement }) => (
  <div>
    <UserInfo user={user} />
    App: <span className={s.value}>{value}</span> <br />
    <span>Hello there</span>
    <button className={s.button} onClick={onIncrement}> +1 </button>
    <button className={s.button} onClick={onDecrement}> -1 </button>

    <Link to={`/app/wipe/create`}>Start by creating a wipe</Link>
  </div>
);

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

const mapStateToProps = ({ counter, user }) => ({
    value: counter,
    user
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch({ type: 'INCREMENT' }),
  onDecrement: () => dispatch({ type: 'DECREMENT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(App, s));
