import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../PageContainer/PageContainer';
import Header from '../../features/Header/Header';
import Footer from '../../features/Footer/Footer';
import MainAlert from '../../features/MainAlert/MainAlertContainer';

const MainLayout = ({ children }) => (
  <>
    <PageContainer>
      <Header />
      <MainAlert />
      {children}
      <Footer />
    </PageContainer>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;