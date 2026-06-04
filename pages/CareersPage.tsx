import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { seedImages } from '../constants/seed-images';

const CareersPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name     = (document.getElementById('careers-name')     as HTMLInputElement)?.value;
    const email    = (document.getElementById('careers-email')    as HTMLInputElement)?.value;
    const position = (document.getElementById('careers-position') as HTMLInputElement)?.value;
    const message  = (document.getElementById('careers-message')  as HTMLTextAreaElement)?.value;

    const subject = encodeURIComponent(`Career Application - ${position || 'General'}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPosition: ${position}\n\nMessage:\n${message}`
    );
    window.location.href =
      `mailto:saimangalam.electrical@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#f5efe4] text-[#6b6258]">
      <div className="relative bg-[#1a1814] text-white py-24 text-center">
        <img
          src={seedImages.careersHero}
          alt="Team of engineers collaborating in a modern office"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ objectPosition: 'center center' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))' }} />
        <PageWrapper className="py-0 relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>Join Our Team</h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
            Be a part of a dynamic and innovative company shaping the future of energy. Send us your application below.
          </p>
        </PageWrapper>
      </div>

      <PageWrapper>
        <div className="max-w-2xl mx-auto mt-10 bg-white border border-[#ddd8cf] p-12 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-[#1a1814] text-center mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Apply Here</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="careers-name" className="block text-sm font-medium text-[#6b6258]">Full Name</label>
              <input type="text" id="careers-name" className="mt-1 block w-full px-3 py-2 form-input" required />
            </div>
            <div>
              <label htmlFor="careers-email" className="block text-sm font-medium text-[#6b6258]">Email Address</label>
              <input type="email" id="careers-email" className="mt-1 block w-full px-3 py-2 form-input" required />
            </div>
            <div>
              <label htmlFor="careers-position" className="block text-sm font-medium text-[#6b6258]">Position Applied For</label>
              <input type="text" id="careers-position" className="mt-1 block w-full px-3 py-2 form-input" />
            </div>
            <div>
              <label htmlFor="careers-message" className="block text-sm font-medium text-[#6b6258]">Cover Letter / Message</label>
              <textarea id="careers-message" rows={5} className="mt-1 block w-full px-3 py-2 form-input" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </PageWrapper>
    </div>
  );
};

export default CareersPage;
