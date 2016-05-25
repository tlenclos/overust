import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import s from './Wipes.css';
import UserInfo from './UserInfo';
import WipesList from './WipesList';
import { fetchWipes as fetchWipesAction } from './../actions';

class Wipes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchWipes();
    }

    render() {
        const { user, wipes } = this.props;
        return <div>
            <UserInfo user={user} />
            {wipes.items && <WipesList wipes={wipes.items} />}

            <div className="container">
                <Link className="pure-button" to={`/app/wipe/create`}>Start by creating a wipe</Link>
            </div>
        </div>;
    }
}

Wipes.propTypes = {
    wipes: PropTypes.object
};

const mapStateToProps = ({ user, wipes }) => ({
    user,
    wipes
});
const mapDispatchToProps = (dispatch) => ({
    fetchWipes: () => dispatch(fetchWipesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Wipes, s));
