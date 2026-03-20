"use client";
import { CheckCircle, User, CreditCard, MessageSquare, CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description:
        "Create your account directly on our site with secure checkout powered by Stripe.",
      highlight: "Stripe",
      highlightColor: "text-green-400",
      icon: <CreditCard size={32} className="text-green-400 mb-3 mx-auto" />,
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/stripe.webp?alt=media&token=5c9a6f4a-3a35-40c2-955d-bbe445aa6548",
    },
    {
      title: "Connect Discord",
      description:
        "Link your Discord account in your user settings to unlock premium server access.",
      highlight: "premium server access",
      highlightColor: "text-green-400",
      icon: <MessageSquare size={32} className="text-green-400 mb-3 mx-auto" />,
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/discordlogocut.webp?alt=media&token=8d9ed054-3f5a-4f96-b36f-9a85dabedd30", 
    },
    {
      title: "Start Winning",
      description:
        "Get real-time picks from cappers, and use your dashboard for vip picks and insights.",
      icon: <User size={32} className="text-green-400 mb-3 mx-auto" />,
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/circle-check-big256.png?alt=media&token=62a7d249-921b-4a87-b328-938baa94fd39", 
    },
  ];

const features = [
  { feature: "Premium Discord", site: true, whop: true },
  { feature: "AI Tools & Insights", site: true, whop: false },
  { feature: "Exclusive AI Picks", site: true, whop: false },
];



  return (
    <section className="bg-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Get access to our premium picks in just a few simple steps. Choose the path that works best for you.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-white mb-3">
                {idx + 1}. {step.title}
              </h3>
              <p className="text-gray-400 text-center mb-4">
                {step.description.split(step.highlight || "").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className={step.highlightColor}>{step.highlight}</span>
                    </span>
                  ) : (
                    part
                  )
                )}
              </p>

             {step.image && (
  <div className="mt-4 flex justify-center">
    {(() => {
      const smallImageURL = "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/circle-check-big256.png?alt=media&token=62a7d249-921b-4a87-b328-938baa94fd39";
      const isSmall = step.image === smallImageURL;
      const size = isSmall ? 80 : 100;

      return (
        <Image
          src={step.image}
          alt={`${step.title} logo`}
          width={size}
          height={size}
          className={`object-contain w-[${size}px] h-[${size}px]`}
        />
      );
    })()}
  </div>
)}

            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="grid border border-gray-800 rounded-2xl overflow-hidden shadow-xl text-center mb-12">
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-800 text-gray-400 font-medium">
            <div className="p-6 text-left">Feature</div>
            <div className="p-6">Our Site</div>
            <div className="p-6">Whop</div>
          </div>

          {/* Rows */}
          {features.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 border-t border-gray-800 ${
                idx % 2 === 0 ? "bg-gray-900" : "bg-gray-950"
              }`}
            >
              <div className="p-6 text-left text-gray-300">{row.feature}</div>
              <div className="p-6 flex justify-center items-center">
                {row.site ? <CheckCircle className="text-green-400" size={20} /> : <span className="text-gray-500">—</span>}
              </div>
              <div className="p-6 flex justify-center items-center">
                {row.whop ? <CheckCircle className="text-green-400" size={20} /> : <span className="text-gray-500">—</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="mt-6">
          <Link
            href="/get-started"
            className="inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition"
          >
            Get Started 🚀
          </Link>
        </div>

        {/* Whop Alternative Section */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg text-center mb-12">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/whoplogowhitecut.png?alt=media&token=30ed520b-5e0a-4620-acf6-42f8c129f7d7"
            alt="Whop Logo"
            width={600}
            height={200}
            className="mx-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-auto"
          />
          <h3 className="text-2xl font-semibold text-white mb-4">Prefer Whop?</h3>
          <p className="text-gray-400 mb-6">
            You can also purchase our premium picks through Whop and get access to our premium Discord server.
          </p>
          <a
            href="https://whop.com/thebookiereaper/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition"
          >
            Buy via Whop
          </a>
        </div>
      </div>
    </section>
  );
}
