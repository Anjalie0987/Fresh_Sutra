import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import MixedFruitJuiceImg from '../../assets/images/mixed.png';
import WatermelonJuiceImg from '../../assets/images/watermelon.png';

const JuiceCard = ({ image, name, description, bgColor }) => (
    <div className={`flex-none w-[280px] md:w-full md:flex-1 ${bgColor} rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer group snap-start relative overflow-hidden`}>
        {/* Floating Image Effect */}
        <div className="w-full h-48 mb-4 flex items-center justify-center relative z-10 perspective-1000">
            <img
                src={image}
                alt={name}
                className="w-4/5 h-auto object-contain drop-shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out"
            />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
            <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">{name}</h3>
            <p className="text-neutral-600 text-sm font-medium opacity-90 line-clamp-2">{description}</p>
        </div>

        {/* Subtle decorative circle/glow behind image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 rounded-full blur-2xl -z-0" />
    </div>
);

const PopularJuices = () => {
    return (
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
            {/* Soft Transparent Background with Colored Blur Overlay */}
            <div className="absolute inset-0 bg-white/50 -z-20" /> {/* Base transparency */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF3E0] via-transparent to-[#EAF7EA] opacity-60 blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
                        Popular Juices Loved by Customers
                    </h2>
                    <p className="text-lg text-neutral-500 font-medium">
                        Trending fresh juices
                    </p>
                </div>

                {/* Cards Container */}
                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto pb-8 md:pb-0 gap-6 md:grid md:grid-cols-4 snap-x snap-mandatory scrollbar-hide md:gap-8 px-2 md:px-0">

                    {/* 1. Orange */}
                    <JuiceCard
                        image={OrangeJuiceImg}
                        name="Fresh Orange Juice"
                        description="Bright, refreshing, and naturally energizing"
                        bgColor="bg-orange-50"
                    />

                    {/* 2. Pineapple */}
                    <JuiceCard
                        image={PineappleJuiceImg}
                        name="Zesty Pineapple Juice"
                        description="Sweet, tropical, and cooling"
                        bgColor="bg-yellow-50"
                    />

                    {/* 3. Mixed Fruit */}
                    <JuiceCard
                        image={MixedFruitJuiceImg}
                        name="Mixed Fruit Juice"
                        description="A perfect blend of seasonal fruits"
                        bgColor="bg-rose-50"
                    />

                    {/* 4. Watermelon */}
                    <JuiceCard
                        image={WatermelonJuiceImg}
                        name="Watermelon Juice"
                        description="Light, hydrating, and summer-fresh"
                        bgColor="bg-green-50"
                    />
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-neutral-400 mt-8 font-medium tracking-wide">
                    Availability may vary by location and store.
                </p>

            </div>
        </section>
    );
};

export default PopularJuices;
