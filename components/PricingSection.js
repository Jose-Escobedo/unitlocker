export default function PricingSection() {
  const plans = [
    {
      name: "Monthly",
      price: "$49",
      description: "Billed every month. Cancel anytime.",
      features: ["Full VIP access", "Daily picks", "Win tracking"],
      cta: "Join Monthly",
    },
    {
      name: "Quarterly",
      price: "$129",
      description: "Save more with a 3-month plan.",
      features: ["Full VIP access", "Daily picks", "Win tracking"],
      cta: "Join Quarterly",
    },
    {
      name: "Yearly",
      price: "$399",
      description: "Best value. One payment for the year.",
      features: ["Full VIP access", "Daily picks", "Win tracking"],
      cta: "Join Yearly",
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Choose Your Plan
        </h2>
        <p className="text-gray-400 mb-12">
          Gain access to exclusive VIP picks and start beating the books today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:scale-105 transition-transform"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-2">{plan.price}</p>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-2 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-green-500">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
