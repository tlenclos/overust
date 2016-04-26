import { PropTypes } from 'react';

const Wipes = ({ wipes }) => (
  <div>
    {wipes.map((wipe) => {
      return <div key={wipe.id}>{wipe.id}: {wipe.serverName}</div>
    })}
  </div>
);

Wipes.propTypes = {
  wipes: PropTypes.array
};

Wipes.defaultProps = {
  wipes: []
};

export default Wipes;
