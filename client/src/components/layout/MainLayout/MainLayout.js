import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../PageContainer/PageContainer';
import Header from '../../features/Header/Header';
import Footer from '../../features/Footer/Footer';
import MainAlert from '../../features/MainAlert/MainAlertContainer';
import LanguageControl from '../../features/LanguageControl/LanguageControlContainer';


const MainLayout = ({ children }) => (
  <>
    <PageContainer>
      <Header />
      <LanguageControl />
      <MainAlert />
      {children}
      <Footer />
    </PageContainer>
  </>
);

MainLayout.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default MainLayout;
