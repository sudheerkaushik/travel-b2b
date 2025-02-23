
import AgentHeader from "@/app/components/agents/header";
import AgentServices from "@/app/components/agents/services";
import TopServices from "@/app/components/agents/services-2";
import SignUpPromo from "@/app/components/agents/signup-offer";
import TopDestinations from "@/app/components/agents/top-destinations";
// import TopPackages from "@/app/components/agents/top-packages"; // Unused import removed
import Image from "next/image";

export default function SearchTrip() {
  return (
    <>
      <AgentHeader />
      <AgentServices />
      <TopDestinations />
      <TopServices />
      {/* <TopPackages /> */}
      <SignUpPromo />

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Testimonial
            </h6>
            <h1>What Say Our Clients</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="text-center pb-4">
              <Image
                className="img-fluid mx-auto"
                src="/img/testimonial-1.jpg"
                alt="Testimonial client 1"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                  stet amet eirmod eos labore diam
                </p>
                <h5 className="text-truncate">Client Name</h5>
                <span>Profession</span>
              </div>
            </div>
            <div className="text-center">
              <Image
                className="img-fluid mx-auto"
                src="/img/testimonial-2.jpg"
                alt="Testimonial client 2"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                  stet amet eirmod eos labore diam
                </p>
                <h5 className="text-truncate">Client Name</h5>
                <span>Profession</span>
              </div>
            </div>
            <div className="text-center">
              <Image
                className="img-fluid mx-auto"
                src="/img/testimonial-3.jpg"
                alt="Testimonial client 3"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                  stet amet eirmod eos labore diam
                </p>
                <h5 className="text-truncate">Client Name</h5>
                <span>Profession</span>
              </div>
            </div>
            <div className="text-center">
              <Image
                className="img-fluid mx-auto"
                src="/img/testimonial-4.jpg"
                alt="Testimonial client 4"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                  stet amet eirmod eos labore diam
                </p>
                <h5 className="text-truncate">Client Name</h5>
                <span>Profession</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
