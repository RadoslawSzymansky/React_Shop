import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../PageContainer/PageContainer';
import Header from '../../features/Header/Header';
import Footer from '../../features/Footer/Footer';

const MainLayout = ({ children }) => (
  <>
    <PageContainer>
      <Header />
      {children}
      <Footer />
    </PageContainer>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;