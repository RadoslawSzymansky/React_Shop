import { connect } from 'react-redux';
import MainAlert from './MainAlert';


const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(MainAlert);
