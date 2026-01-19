import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import MixedFruitJuiceImg from '../../assets/images/mixed.png';
import WatermelonJuiceImg from '../../assets/images/watermelon.png';
import PartyPopperImg from '../../assets/images/party-popper.png';
import { FaStar } from "react-icons/fa";

const OfferCard = ({ image, title, description, badge, badgeColor, rating, originalPrice, price, discount }) => (
    <div className="flex-none w-[280px] md:w-full md:flex-1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start border border-neutral-100 flex flex-col items-start h-full relative overflow-hidden">
        {/* Top Badge */}
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm mb-4 ${badgeColor}`}>
            {badge}
        </div>

        {/* Spacious Image Container */}
        <div className="w-full h-40 mb-4 flex items-center justify-center relative">
            <img
                src={image}
                alt={title}
                className="w-4/5 h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
            />
        </div>

        {/* Content */}
        <div className="mt-auto w-full">
            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-900 mb-1 leading-tight group-hover:text-secondary transition-colors">{title}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"} />
                    ))}
                </div>
                <span className="text-xs text-neutral-500 font-medium">({rating})</span>
            </div>

            {/* Description */}
            <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

            {/* Price & Discount */}
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-50">
                <span className="text-neutral-400 line-through text-sm">₹{originalPrice}</span>
                <span className="text-neutral-900 font-bold text-lg">₹{price}</span>
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">{discount}</span>
            </div>
        </div>
    </div>
);

const HotDeals = () => {
    return (
        <section className="w-full py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
                            Hot Deals Near You
                        </h2>
                        <img
                            src={PartyPopperImg}
                            alt="Celebration"
                            className="w-8 md:w-10 -mt-1"
                        />
                    </div>
                    <p className="text-lg text-neutral-500 font-medium">
                        Fresh juice offers you shouldn’t miss
                    </p>
                </div>

                {/* Cards Container */}
                {/* Mobile: Horizontal Scroll | Tablet: 2 Col Grid | Desktop: 4 Col Grid */}
                <div className="flex overflow-x-auto pb-8 md:pb-0 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory scrollbar-hide md:gap-8 px-2 md:px-0 scroll-smooth">

                    {/* Offer 1 */}
                    <OfferCard
                        image={OrangeJuiceImg}
                        title="Fresh Start Offer"
                        description="Flat discount on your first juice order"
                        badge="New Offer"
                        badgeColor="bg-secondary"
                        rating={4.8}
                        originalPrice={120}
                        price={89}
                        discount="25% OFF"
                    />

                    {/* Offer 2 */}
                    <OfferCard
                        image={PineappleJuiceImg}
                        title="Healthy Hour Deals"
                        description="Special prices during selected time slots"
                        badge="Trending"
                        badgeColor="bg-green-500"
                        rating={4.5}
                        originalPrice={150}
                        price={110}
                        discount="26% OFF"
                    />

                    {/* Offer 3 */}
                    <OfferCard
                        image={MixedFruitJuiceImg}
                        title="Nearby Store Specials"
                        description="Exclusive offers from juice shops near you"
                        badge="Nearby"
                        badgeColor="bg-blue-500"
                        rating={4.2}
                        originalPrice={180}
                        price={149}
                        discount="17% OFF"
                    />

                    {/* Offer 4 */}
                    <OfferCard
                        image={WatermelonJuiceImg}
                        title="Seasonal Juice Combos"
                        description="Limited-time fruit blends & combos"
                        badge="Limited Time"
                        badgeColor="bg-secondary-red"
                        rating={4.9}
                        originalPrice={200}
                        price={169}
                        discount="15% OFF"
                    />
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-neutral-400 mt-4 font-medium tracking-wide">
                    Offers may vary by location and availability.
                </p>

            </div>
        </section>
    );
};

export default HotDeals;
