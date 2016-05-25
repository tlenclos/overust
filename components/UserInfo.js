import { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserInfo.css';

const UserInfo = ({ user }) => {
    return <div>
        Welcome <span className={s.value}>{user.displayName}</span> <br />
        <img className={s.avatar} src={user.avatarFull}/>
    </div>
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({ user: user });
export default connect(mapStateToProps)(withStyles(UserInfo, s));
