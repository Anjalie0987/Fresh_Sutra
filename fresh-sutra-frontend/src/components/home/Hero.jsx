import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';

// Import local assets
import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import OrangeGif from '../../assets/images/img4.gif';
import PackGif from '../../assets/images/img1.gif';
import DeliveryGif from '../../assets/images/delivery.gif';

const DecorativeImage = ({ image, className, style, delay = '0s' }) => (
    <div
        className={`absolute hidden tablet:block z - 1 select - none pointer - events - none ${className} `}
        style={style}
    >
        <img
            src={image}
            alt="Decorative"
            className="w-[70px] desktop:w-[90px] h-auto object-contain drop-shadow-sm opacity-90 animate-float"
            style={{ animationDelay: delay }}
        />
    </div>
);

DecorativeImage.propTypes = {
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    delay: PropTypes.string,
};

const Hero = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden h-[calc(100vh-64px)] desktop:h-[calc(100vh-80px)]">
            {/* Background Decor (Subtle) */}
            <div className="absolute inset-0 bg-radial-gradient from-orange-50/40 via-transparent to-transparent opacity-60 -z-10" />

            {/* 1. DECORATIVE ZONE (Strict 8 Images + Floating Animation) */}

            {/* LEFT SIDE (3 Images) */}
            <DecorativeImage image={OrangeJuiceImg} className="top-[10%] left-[5%] desktop:left-[8%]" delay="0s" />     {/* Top-Left */}
            <DecorativeImage image={PackGif} className="top-[45%] left-[2%] desktop:left-[4%]" delay="2.5s" />            {/* Mid-Left */}
            <DecorativeImage image={PineappleJuiceImg} className="bottom-[10%] left-[6%] desktop:left-[8%]" delay="4s" /> {/* Bot-Left */}

            {/* RIGHT SIDE (3 Images) */}
            <DecorativeImage image={OrangeGif} className="top-[12%] right-[5%] desktop:right-[8%]" delay="1s" />         {/* Top-Right */}
            <DecorativeImage image={OrangeJuiceImg} className="top-[48%] right-[2%] desktop:right-[4%]" delay="3.5s" />    {/* Mid-Right */}
            <DecorativeImage image={PackGif} className="bottom-[12%] right-[6%] desktop:right-[8%]" delay="5s" />        {/* Bot-Right */}

            {/* TOP EDGE (2 Images) */}
            <DecorativeImage image={PineappleJuiceImg} className="top-4 left-[20%]" delay="1.5s" />  {/* Top Edge Left */}
            <DecorativeImage image={OrangeGif} className="top-4 right-[20%]" delay="3s" />         {/* Top Edge Right */}


            {/* 2. CENTER CONTENT (PROTECTED ZONE - 50%) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="w-full tablet:w-3/4 desktop:w-1/2 text-center pointer-events-auto px-4 flex flex-col items-center">

                    {/* Delivery GIF (Anchor) */}
                    <img
                        src={DeliveryGif}
                        alt="Delivery"
                        className="w-[50px] mb-6 animate-float object-contain drop-shadow-sm"
                        style={{ animationDelay: '0.5s' }}
                    />

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-secondary-red font-bold text-xs uppercase tracking-wider mb-6 shadow-sm border border-orange-200/50 hover:bg-orange-200 transition-colors cursor-default">
                        <MdDeliveryDining size={16} />
                        Fresh Juice Delivery
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl desktop:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                        <span className="text-neutral-900">The Freshest Juice</span>
                        <span className="text-secondary block mt-2">Near You</span>
                    </h1>

                    {/* Description */}
                    <p className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-lg mx-auto font-medium mb-10">
                        Discover fresh, hygienic, and FSSAI-verified juice stores around you and order in seconds.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center w-full">
                        {/* Primary Button: Order Now */}
                        <Link
                            to="/location"
                            className="inline-flex items-center justify-center px-10 py-4 bg-secondary text-white rounded-full text-lg font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:bg-yellow-600 transition-all active:scale-95 w-full sm:w-auto transform hover:-translate-y-1"
                        >
                            <span className="mr-2">Order Now</span>
                            <FiArrowRight size={20} className="text-white" />
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
