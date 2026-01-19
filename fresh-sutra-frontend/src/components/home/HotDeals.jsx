import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import MixedFruitJuiceImg from '../../assets/images/mixed.png';
import WatermelonJuiceImg from '../../assets/images/watermelon.png';

const OfferCard = ({ image, title, description, badge, badgeColor }) => (
    <div className="flex-none w-[280px] md:w-full md:flex-1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start border border-neutral-100 flex flex-col items-start h-full">
        {/* Top Badge */}
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm mb-4 ${badgeColor}`}>
            {badge}
        </div>

        {/* Spacious Image Container */}
        <div className="w-full h-48 mb-6 flex items-center justify-center relative">
            <img
                src={image}
                alt={title}
                className="w-4/5 h-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
            />
        </div>

        {/* Clean Typography */}
        <div className="mt-auto w-full">
            <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight group-hover:text-secondary transition-colors">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const HotDeals = () => {
    return (
        <section className="w-full py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
                        Hot Deals Near You
                    </h2>
                    <p className="text-lg text-neutral-500 font-medium">
                        Fresh juice offers you shouldn’t miss
                    </p>
                </div>

                {/* Cards Container */}
                {/* Mobile: Horizontal Scroll | Tablet: 2 Col Grid | Desktop: 4 Col Grid */}
                <div className="flex overflow-x-auto pb-8 md:pb-0 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory scrollbar-hide md:gap-8 px-2 md:px-0">

                    {/* Offer 1 */}
                    <OfferCard
                        image={OrangeJuiceImg} // Reuse image
                        title="Fresh Start Offer"
                        description="Flat discount on your first juice order"
                        badge="New Offer"
                        badgeColor="bg-secondary"
                    />

                    {/* Offer 2 */}
                    <OfferCard
                        image={PineappleJuiceImg} // Reuse image
                        title="Healthy Hour Deals"
                        description="Special prices during selected time slots"
                        badge="Trending"
                        badgeColor="bg-green-500"
                    />

                    {/* Offer 3 */}
                    <OfferCard
                        image={MixedFruitJuiceImg} // Reuse image
                        title="Nearby Store Specials"
                        description="Exclusive offers from juice shops near you"
                        badge="Nearby"
                        badgeColor="bg-blue-500"
                    />

                    {/* Offer 4 */}
                    <OfferCard
                        image={WatermelonJuiceImg} // Reuse image
                        title="Seasonal Juice Combos"
                        description="Limited-time fruit blends & combos"
                        badge="Limited Time"
                        badgeColor="bg-secondary-red"
                    />
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-neutral-400 mt-8 font-medium tracking-wide">
                    Offers may vary by location and availability.
                </p>

            </div>
        </section>
    );
};

export default HotDeals;
