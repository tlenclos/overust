import { PropTypes } from 'react';

const WipesList = ({ wipes }) => (
    <div>
        {wipes.map((wipe) => {
            return <div key={wipe.id}>{wipe.id}: {wipe.serverName}</div>
        })}
    </div>
);

WipesList.propTypes = {
    wipes: PropTypes.array
};

WipesList.defaultProps = {
    wipes: []
};

export default WipesList;
