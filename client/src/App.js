
import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';

import { loadUserRequest } from './redux/authRedux';
import { concatBasketsRequest, concatFavoritesRequest } from './redux/userRedux';
import { fetchDiscountCodesRequest } from './redux/productsRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Routes from './routing/Routes';

import globalTranslations from './translations/global.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Polish', code: 'pl' },
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup },
    });
  }

  componentDidMount() {
    const { loadUserRequest, fetchDiscountCodesRequest } = this.props;
    loadUserRequest();
    fetchDiscountCodesRequest();
  }

  componentDidUpdate() {
    const { isAuthenticated, concatBasketsRequest, concatFavoritesRequest } = this.props;
    if (isAuthenticated) {
      concatBasketsRequest();
      concatFavoritesRequest();
    }
  }

  render() {
    return (
      <MainLayout>
        <Routes />
      </MainLayout>
    );
  }
}

App.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  concatBasketsRequest: PropTypes.func.isRequired,
  concatFavoritesRequest: PropTypes.func.isRequired,
  fetchDiscountCodesRequest: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserRequest: () => dispatch(loadUserRequest()),
  concatBasketsRequest: () => dispatch(concatBasketsRequest()),
  concatFavoritesRequest: () => dispatch(concatFavoritesRequest()),
  fetchDiscountCodesRequest: () => dispatch(fetchDiscountCodesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(withLocalize(App)));
