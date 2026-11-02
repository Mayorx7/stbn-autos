import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-20">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#D9ECFA]">
          <Image
            src="/service-bmw.png"
            alt="A vehicle available from STBN AUTOS"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-xl px-5 sm:px-8 md:px-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A6500]">
            Get in touch
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#062A5E] sm:text-4xl">
            Contact STBN AUTOS
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#53657A] sm:text-base">
            Whether you are buying, selling, or swapping a vehicle, our team is
            ready to help you find the right next step.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#53657A] sm:text-base">
            Reach us directly for vehicle availability, pricing, inspections,
            and every other enquiry.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:08161163069"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#031B3D] transition-colors hover:bg-[#FFD34D]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call 0816 116 3069
            </a>
            <a
              href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0757A6] px-5 py-3 text-sm font-bold text-[#0757A6] transition-colors hover:bg-[#D9ECFA]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="relative min-h-[24rem] overflow-hidden sm:min-h-[30rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/poster.png"
        >
          <source src="/b_cinematic_automotive.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#031B3D]/95 via-[#031B3D]/35 to-[#031B3D]/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-16">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D9ECFA]">
            Here when you need us
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
            Personal service for every car journey.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
