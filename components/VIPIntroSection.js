"use client";

export default function VIPIntroSection() {
  return (
    <section className="max-w-4xl mx-auto text-center mb-12 p-8 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
      <h2 className="text-4xl font-bold text-yellow-400 mb-4 tracking-wider">
        Welcome to the VIP Dashboard
      </h2>
      <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
        This is your premium section where you get exclusive access to our VIP tools 
        including MLB Edge Picks, data-driven insights, and other advanced features. 
        You&apos;re now part of the elite experience.
      </p>
    </section>
  );
}