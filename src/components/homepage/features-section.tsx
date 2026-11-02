import Image from "next/image";

const services = [
  {
    title: "Quality Cars",
    description: "Carefully selected, rigorously inspected, and guaranteed road-ready for your peace of mind.",
    image: "/service-toyota.png",
    alt: "Toyota sedan",
    label: "Toyota · inspected & ready",
  },
  {
    title: "Great Deals",
    description: "Fair market pricing, transparent financing, and maximum value when trading or buying.",
    image: "/service-lexus.png",
    alt: "Lexus sedan",
    label: "Lexus · value that moves you",
  },
  {
    title: "Trusted Service",
    description: "Hassle-free car swaps, quick orders, and dedicated assistance via phone and WhatsApp.",
    image: "/service-bmw.png",
    alt: "BMW sedan",
    label: "BMW · here when you need us",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#031B3D] via-[#062A5E] to-[#0757A6] py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FFC40033,_transparent_32%),radial-gradient(circle_at_bottom_left,_#D9ECFA1A,_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <p className="text-base font-semibold uppercase tracking-widest text-[#FFC400] drop-shadow-[0_0_8px_#FFC400] md:text-xl">
            Drive With Confidence
          </p>
          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
            We Sell • We Buy • We Swap
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#D9ECFA] md:text-lg">
            Experience premium car dealership services with guaranteed quality cars, great deals, and trusted service every step of the way.
          </p>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 text-left md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#031B3D]/55 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#FFC400]/80 hover:shadow-[0_24px_50px_-20px_#FFC400]"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-85 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031B3D] via-[#031B3D]/20 to-[#031B3D]/10" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#031B3D]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D9ECFA] backdrop-blur-sm">
                    0{index + 1} · {service.label}
                  </span>
                </div>
                <div className="relative p-6 pt-4">
                  <div className="absolute right-0 top-0 h-px w-1/2 bg-gradient-to-l from-[#FFC400] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#FFC400] shadow-[0_0_14px_#FFC400] transition-transform duration-500 group-hover:scale-150" />
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#D9ECFA]">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[23rem] overflow-hidden rounded-2xl border border-white/25 bg-[#031B3D] shadow-2xl sm:min-h-[30rem] xl:min-h-[34rem]">
            <video
              src="/b_cinematic_automotive.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031B3D]/80 via-[#031B3D]/20 to-[#062A5E]/55" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#031B3D]/85 to-transparent" />
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <Image
                  src="/logo.png"
                  width={360}
                  height={180}
                  alt="STBN AUTOS"
                  className="h-auto w-48 object-contain drop-shadow-[0_12px_24px_rgba(3,27,61,0.9)] sm:w-64"
                />
                <span className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white drop-shadow-md sm:text-xs">
                  Drive with confidence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
