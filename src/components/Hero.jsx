
import heroImage from '../assets/hero-image.png'; 

// responsive hero section with image and text and tailwindcss styling height like 100vh ect
const Hero = () => {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Find Your Perfect Job Match with AI
                    </h1>
                    <p className="text-lg text-gray-600">
                        Let our AI algorithms analyze your skills and preferences to find the best job opportunities for you.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img src={heroImage} alt="Hero" className="w-full h-auto" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
