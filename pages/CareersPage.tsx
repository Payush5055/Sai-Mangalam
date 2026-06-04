import React, { useState } from 'react';
import { Resend } from 'resend';
import PageWrapper from '../components/PageWrapper';
import { seedImages } from '../constants/seed-images';

const CareersPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const name     = (form.querySelector('#careers-name')     as HTMLInputElement)?.value;
    const email    = (form.querySelector('#careers-email')    as HTMLInputElement)?.value;
    const position = (form.querySelector('#careers-position') as HTMLInputElement)?.value;
    const message  = (form.querySelector('#careers-message')  as HTMLTextAreaElement)?.value;

    try {
      const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from: 'SaiMangalam Website <onboarding@resend.dev>',
        to: 'saimangalam.electrical@gmail.com',
        replyTo: email,
        subject: `Career Application — ${position || 'General'}`,
        html: `
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Position:</strong> ${position || 'Not specified'}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      });

      if (error) throw new Error(error.message);

      setSubmitStatus('success');
      form.reset();
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1a1814] text-white text-[10px] tracking-widest uppercase px-8 py-3 hover:bg-[#2d5a3d] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Application'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-[#2d5a3d] text-sm mt-3">
                  Application submitted successfully. We will be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm mt-3">
                  Something went wrong. Please try again or email us directly at saimangalam.electrical@gmail.com
                </p>
              )}
            </div>
          </form>
        </div>
      </PageWrapper>
    </div>
  );
};

export default CareersPage;
