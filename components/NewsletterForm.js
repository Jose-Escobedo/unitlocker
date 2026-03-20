'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: '✅ You are subscribed!' });
        setEmail(''); // clear input
      } else {
        setMessage({ type: 'error', text: '❌ ' + data.error });
      }
    } catch (err) {
      console.error('Newsletter signup failed:', err);
      setMessage({ type: 'error', text: '❌ Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="text-white bg-cyan-900 py-20 px-6 md:px-12 text-center">
  <div className="max-w-xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">Join Our Free Newsletter</h2>
    <p className="text-white/80 mb-8">
      Get free daily betting tips, high-confidence picks, and insider updates straight to your inbox.
    </p>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full sm:w-auto flex-1 p-3 rounded-md bg-gray-200 text-black placeholder-gray-400 focus:ring-2 focus:ring-br-gold"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-900 cursor-pointer text-br-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>

    {message && (
      <p
        className={`mt-4 text-center text-sm ${
          message.type === 'success' ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {message.text}
      </p>
    )}
  </div>
</section>

  );
}
