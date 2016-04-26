import { PropTypes } from 'react';

const Wipes = ({ wipes }) => (
  <div>
    {wipes.map((wipe) => {
      return <p>{wipe.name}</p>
    })}
  </div>
);

Wipes.propTypes = {
  wipes: PropTypes.arrayOf(PropTypes.object)
};

Wipes.defaultProps = {
  wipes: []
};

export default Wipes;
