"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Check, Droplet, Shirt, Truck, Clock, Users, Star, Phone, Mail, MapPin } from 'lucide-react';

export default function LaundryWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Lottie Animation Component
  const LottieAnimation = ({ animationData, height = 'h-96' }) => {
    const [animationJson, setAnimationJson] = useState(null);

    useEffect(() => {
      // Fetch Lottie animation from URL
      if (animationData) {
        fetch(animationData)
          .then(res => res.json())
          .then(data => setAnimationJson(data))
          .catch(err => console.log('Animation load error:', err));
      }
    }, [animationData]);

    return (
      <div className={`${height} w-full flex items-center justify-center relative`}>
        {animationJson && (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Animated SVG elements */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="2" 
              style={{
                animation: 'spin 3s linear infinite',
                transformOrigin: '100px 100px'
              }}
            />
            <circle cx="100" cy="100" r="60" fill="none" stroke="url(#grad2)" strokeWidth="2" 
              style={{
                animation: 'spin 4s linear infinite reverse',
                transformOrigin: '100px 100px'
              }}
            />
            <circle cx="100" cy="50" r="12" fill="#06b6d4" 
              style={{
                animation: 'float 2s ease-in-out infinite'
              }}
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        )}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  };

  // Animated Counter
  const AnimatedCounter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration * 60);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(interval);
    }, [end, duration]);

    return <span>{count}</span>;
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bobbing {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-slide-in-left { animation: slideInFromLeft 0.6s ease-out; }
        .animate-slide-in-right { animation: slideInFromRight 0.6s ease-out; }
        .animate-slide-in-top { animation: slideInFromTop 0.6s ease-out; }
        .animate-fade-scale { animation: fadeInScale 0.6s ease-out; }
        .animate-bob { animation: bobbing 3s ease-in-out infinite; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold animate-slide-in-left">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-bob">
              💧
            </div>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              LaundryPro
            </span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {['home', 'services', 'how-it-works', 'pricing', 'testimonials', 'contact'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="capitalize hover:text-cyan-500 transition-colors duration-300 text-sm font-medium hover:scale-110"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item}
              </button>
            ))}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110">
              Book Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-cyan-500/20 animate-slide-in-top">
            <div className="px-4 py-4 space-y-3">
              {['home', 'services', 'how-it-works', 'pricing', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize hover:text-cyan-500 transition-colors p-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,255,255,0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center px-4 max-w-6xl mx-auto">
          <div className="animate-slide-in-left">
            <div className="mb-6 inline-block">
              <div className="animate-pulse px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-semibold">
                ✨ Premium Laundry Services
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Clothes,
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {' '}Our Care
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Professional laundry services with advanced technology and eco-friendly solutions for your complete peace of mind
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </button>
              <button className="border-2 border-cyan-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-500/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative h-96 md:h-[500px] flex items-center justify-center group">
              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300 shadow-2xl shadow-cyan-500/20 group-hover:shadow-cyan-500/40">
                <img 
                  src="/1.jpg" 
                  alt="Premium Laundry Service"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bob">
                  ⭐ Premium Quality
                </div>
                
                {/* Bottom Info Card */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <p className="text-cyan-400 font-semibold mb-1">Professional Service</p>
                  <p className="text-white font-bold text-lg">Expert Care & Quick Delivery</p>
                </div>
              </div>

              {/* Background Animated Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-black to-blue-950/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-top">
            <h2 className="text-5xl font-bold mb-4">Our Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shirt, title: 'Dry Cleaning', desc: 'Professional dry cleaning for delicate and premium clothing' },
              { icon: Droplet, title: 'Wet Washing', desc: 'Advanced washing technology with eco-friendly detergents' },
              { icon: Truck, title: 'Pickup & Delivery', desc: 'Free pickup and delivery within your area' },
              { icon: Clock, title: 'Express Service', desc: '24-hour turnaround available for urgent orders' },
              { icon: Users, title: 'Corporate Orders', desc: 'Specialized services for bulk and corporate clients' },
              { icon: Star, title: 'Premium Care', desc: 'Luxury fabric treatment with premium starch options' }
            ].map((service, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 hover:-translate-y-2 animate-fade-scale"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  transform: `translateY(${Math.sin(scrollY * 0.01 + idx) * 20}px)`,
                }}
              >
                <service.icon className="w-12 h-12 mb-4 text-cyan-500 group-hover:text-blue-500 transition-colors" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(139,92,246,0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-in-top">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              {[
                { num: '01', title: 'Schedule Pickup', desc: 'Book a pickup at your convenience via our app' },
                { num: '02', title: 'We Collect', desc: 'Our team picks up your laundry from your doorstep' },
                { num: '03', title: 'Expert Care', desc: 'Professional washing and ironing with premium care' },
                { num: '04', title: 'Delivery', desc: 'Fresh clothes delivered back to you on time' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-slide-in-right">
              <LottieAnimation height="h-96" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: 5000, label: 'Happy Customers', icon: '😊' },
              { number: 15000, label: 'Orders Completed', icon: '📦' },
              { number: 98, label: 'Customer Satisfaction %', icon: '⭐' },
              { number: 24, label: 'Hour Support', icon: '💬' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105 animate-fade-scale"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-cyan-500 mb-2">
                  <AnimatedCounter end={stat.number} />
                  {stat.number > 100 ? '%' : '+'}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-top">
            <h2 className="text-5xl font-bold mb-4">Pricing Plans</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$9.99', features: ['Up to 5kg', 'Standard Wash', '3-day delivery', 'Basic Starch'] },
              { name: 'Premium', price: '$19.99', features: ['Up to 15kg', 'Delicate Wash', '24-hour delivery', 'Premium Starch', 'Free Pickup'], highlighted: true },
              { name: 'Elite', price: '$34.99', features: ['Unlimited', 'Premium Care', 'Same-day delivery', 'Luxury Treatment', 'Priority Support'] }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-4 animate-fade-scale ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-cyan-500/60 shadow-2xl shadow-cyan-500/30'
                    : 'bg-gray-900/50 border-gray-800 hover:border-cyan-500/40'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-cyan-500 mb-6">{plan.price}<span className="text-lg text-gray-400">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={20} className="text-cyan-500" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50'
                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-top">
            <h2 className="text-5xl font-bold mb-4">What Customers Say</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'Best laundry service ever! My clothes come back perfectly clean and fresh.', rating: 5 },
              { name: 'Mike Chen', text: 'The pickup and delivery service is so convenient. Saves me so much time!', rating: 5 },
              { name: 'Emma Davis', text: 'Excellent quality and professional staff. Highly recommended!', rating: 5 }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 animate-fade-scale"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-cyan-500 text-cyan-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-lg">{testimonial.text}</p>
                <p className="font-bold text-cyan-400">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,255,255,0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-in-top">
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 animate-slide-in-left">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <Phone className="text-cyan-500" size={24} />
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-lg font-bold">+91-987564123</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <Mail className="text-cyan-500" size={24} />
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-lg font-bold">hello@laundrypro.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <MapPin className="text-cyan-500" size={24} />
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-lg font-bold">78/74, New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 animate-slide-in-right">
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-colors mb-6 resize-none"
              />
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-8 px-4 bg-black/50 text-center">
        <p className="text-gray-400">© 2025 LaundryPro. All rights reserved. | Crafted with joel paulin raj </p>
      </footer>
    </div>
  );
}