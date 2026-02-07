import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

const MainLayout = ({ children, className }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
            {/* Semantic Header */}
            <Header />

            {/* Semantic Main Content */}
            <main className={classNames("flex-grow container mx-auto px-4 md:px-6 py-8 tablet:py-12 desktop:py-16", className)}>
                {children}
            </main>

            {/* Semantic Footer */}
            <Footer />

            {/* Global Cart Drawer */}
            <CartDrawer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default MainLayout;
