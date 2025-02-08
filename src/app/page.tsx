import Header from './components/Header'
import Hero from './components/Hero'
import Globe from './components/Globe';
import Focal from './components/Focal'
import Band from './components/Band'
import Focal1 from './components/Focal1';
import PricingCard from './components/Pricing-card'
import Footer from './components/Footer'
export default async function Home() {

  const pricingData = [
    {
      title: "Free",
      price: 0,
      features: ["Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere"],
      buttonText: "Already using",
      buttonLink: "#",
    },
    {
      title: "Premium",
      price: 28.98,
      features: [
        "Full Access to Essential Features",
        "Priority Support",
        "Increased Storage",
        "Ad-Free Experience",
        "Analytics & Insights",
        "Collaboration Tools",
      ],
      buttonText: "Buy now",
      buttonLink: "#",
    },
    {
      title: "Business",
      price: 29.99,
      features: [
        "Advanced Features & Customization",
        "24/7 Priority Support",
        "Unlimited Storage",
        "Exclusive Content & Updates",
        "AI-Powered automation",
        "Integration with Third-Party Services",
        "Multi-User Access",
      ],
      buttonText: "Buy now",
      buttonLink: "#",
    },
  ]

  return (

    <>
      <div className='h-screen  overflow-hidden w-screen'>


        <Header></Header>
        <div className="bg-black  z-0 flex flex-col  overflow-hidden  absolute">
          <Globe />
          <div className="flex w-full z-10 h-screen overflow-hidden justify-normal items-center bg-opacity-50 bg-[#21145C] absolute">
            <div className="blur1 absolute"></div>
            <div className="blur2 absolute"></div>


            <Hero></Hero>



          </div>
        </div>



      </div>
      <div className=' overflow-x-hidden  w-full bg-white'>
        <div className='md:my-16'>
          <Focal
            title="Schedule Your Checkup Now!"
            description="Our expert doctors are here for you. Book your appointment today and receive the best medical care."



            imageSrc="/people.jpg"
            imageAlt="Doctor Consultation"
          />

        </div>


        <Band></Band>
        <div className='md:my-16'>
          <Focal1
            title="Schedule Your Checkup Now!"
            description="Our expert doctors are here for you. Book your appointment today and receive the best medical care."



            imageSrc="/pc.png"
            imageAlt="Doctor Consultation"
          />

        </div>

        <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-36 mx-12 m-4 md:m-32">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonLink={plan.buttonLink}
            />
          ))}
        </div>


        <Footer></Footer>

      </div>




    </>
  );
}
