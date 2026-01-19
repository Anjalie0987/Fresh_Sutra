import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';

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
            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Fresh Sutra. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default MainLayout;
