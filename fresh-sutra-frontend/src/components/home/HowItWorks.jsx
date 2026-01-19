import StepLocation from '../../assets/images/location.png';
import StepStore from '../../assets/images/store.png';
import StepDelivery from '../../assets/images/delivered.png';

const StepCard = ({ image, title, subtitle, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
        <div className="w-24 h-24 mb-6 flex items-center justify-center bg-orange-50 rounded-full p-4">
            <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        {subtitle && <p className="text-secondary font-semibold text-sm mb-3 uppercase tracking-wider">{subtitle}</p>}
        <p className="text-neutral-500 leading-relaxed max-w-xs">{description}</p>
    </div>
);

const HowItWorks = () => {
    return (
        <section className="w-full py-20 md:py-28 bg-gradient-to-b from-[#E6F4EA] to-[#FFF4E8]">
            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
                        How Fresh Sutra Works
                    </h2>
                    <h3 className="text-xl text-neutral-600 font-medium mb-2">
                        Fresh juice, just three simple steps.
                    </h3>
                    <p className="text-neutral-400 text-sm">
                        From nearby store to your doorstep — fresh juice made simple.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-8 lg:gap-12 relative">

                    {/* Divider for Desktop (Optional visual connector could go here) */}

                    {/* Step 1 */}
                    <StepCard
                        image={StepLocation}
                        title="Share Your Location"
                        subtitle=""
                        description="Allow location access so we can show hygienic, FSSAI-verified juice stores around your area."
                    />

                    {/* Step 2 */}
                    <StepCard
                        image={StepStore}
                        title="Choose a Nearby Juice Store"
                        subtitle="Pick freshness closest to you"
                        description="Browse nearby juice shops, check distance and verification status, and select the store you trust."
                    />

                    {/* Step 3 */}
                    <StepCard
                        image={StepDelivery}
                        title="Get Fresh Juice Delivered"
                        subtitle="Prepared after you order"
                        description="Your juice is freshly prepared and delivered quickly to your doorstep by a local delivery partner."
                    />

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
