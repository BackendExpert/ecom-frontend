import React from 'react';

const HeroContent = () => {
    return (
        <div className="md:p-8 p-4">
            <div
                className="relative rounded-xl shadow-xl bg-[url('https://wallpapercave.com/wp/wp1881531.jpg')] bg-cover bg-center h-[55vh] flex flex-col justify-start"
            >
                {/* Text Content */}
                <div className="text-right mr-8 md:mt-8 mt-16">
                    <h2 className="text-white font-semibold text-lg md:text-xl">
                        Get 30% Discount for your every $100+ orders
                    </h2>
                    <div className="text-white md:mt-4">
                        <h1 className="tracking-widest font-semibold text-3xl md:text-4xl md:mb-2">
                            Join with Us today
                        </h1>
                        <h3 className="tracking-wide text-lg md:text-xl">
                            and get best Deals
                        </h3>
                    </div>
                </div>

                {/* Button - fixed bottom right */}
                <div className="absolute md:top-44 top-48 right-8">
                    <button
                        className="bg-lime-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-lime-700 transition"
                    >
                        Get Deals
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;
