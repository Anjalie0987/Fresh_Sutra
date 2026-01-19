import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import MixedFruitJuiceImg from '../../assets/images/mixed.png';
import WatermelonJuiceImg from '../../assets/images/watermelon.png';

const JuiceRow = ({ image, name, description, bgColor, blobColor, reverse }) => (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-8 md:gap-20 w-full mb-24 last:mb-0`}>

        {/* Image Section (Half Width) */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center">

                {/* Visual Background Circle (Smaller than image) */}
                <div className={`absolute inset-0 m-auto w-56 h-56 md:w-80 md:h-80 rounded-full ${bgColor} opacity-60`} />

                {/* Soft Blob/Glow */}
                <div className={`absolute -inset-4 rounded-full ${blobColor} opacity-30 blur-3xl`} />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-10 w-3 h-3 rounded-full bg-secondary-red/20" />
                <div className="absolute bottom-10 left-4 w-2 h-2 rounded-full bg-secondary/30" />

                {/* Main Image */}
                <img
                    src={image}
                    alt={name}
                    className="relative z-10 w-64 md:w-80 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                />
            </div>
        </div>

        {/* Text Content Section (Half Width) */}
        <div className={`w-full md:w-1/2 text-center ${reverse ? 'md:text-right' : 'md:text-left'} px-4 md:px-0`}>
            <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                {name}
            </h3>
            <p className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                {description}
            </p>
        </div>
    </div>
);

const PopularJuices = () => {
    return (
        <section className="w-full py-24 md:py-32 relative overflow-hidden bg-[#FFFBF2]">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply filter" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-50/40 rounded-full blur-3xl opacity-50 mix-blend-multiply filter" />
                <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-yellow-50/30 rounded-full blur-3xl opacity-40" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
                        Popular Juices Loved by Customers
                    </h2>
                    <p className="text-lg text-neutral-500 font-medium tracking-wide">
                        Handpicked favorites, freshly squeezed
                    </p>
                </div>

                {/* Rows Container */}
                <div className="flex flex-col w-full max-w-6xl mx-auto">

                    {/* 1. Orange (Left Image) */}
                    <JuiceRow
                        image={OrangeJuiceImg}
                        name="Fresh Orange Juice"
                        description="Sun-kissed sweetness with a tangy citrus mood. A perfect morning energizer."
                        bgColor="bg-orange-100"
                        blobColor="bg-orange-300"
                        reverse={false}
                    />

                    {/* 2. Pineapple (Right Image) */}
                    <JuiceRow
                        image={PineappleJuiceImg}
                        name="Zesty Pineapple Juice"
                        description="Tropical punch that cools you down instantly. Sweet, tangy, and refreshing."
                        bgColor="bg-yellow-100"
                        blobColor="bg-yellow-300"
                        reverse={true}
                    />

                    {/* 3. Mixed Fruit (Left Image) */}
                    <JuiceRow
                        image={MixedFruitJuiceImg}
                        name="Mixed Fruit Juice"
                        description="A perfect harmony of seasonal nature's candy. The best of everything in one sip."
                        bgColor="bg-rose-100"
                        blobColor="bg-rose-300"
                        reverse={false}
                    />

                    {/* 4. Watermelon (Right Image) */}
                    <JuiceRow
                        image={WatermelonJuiceImg}
                        name="Watermelon Juice"
                        description="Hydrating splash of summer freshness. Light, sweet, and absolutely reviving."
                        bgColor="bg-green-100"
                        blobColor="bg-green-300"
                        reverse={true}
                    />

                </div>
            </div>
        </section>
    );
};

export default PopularJuices;
