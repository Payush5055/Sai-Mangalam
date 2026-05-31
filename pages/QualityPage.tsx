import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { qualityPageData } from '../constants/data';
import { ArrowDownTrayIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const CERT_PILLS = ['ISO 9001:2015', 'ISO 14001:2015', 'NABL Accredited', 'IEC 60076', 'IS 2026'];

const QualityPage: React.FC = () => {
  return (
    <div className="bg-[#f4f1eb] text-[#6b6258]">
      {/* ── Dark hero with cert pills ── */}
      <div className="bg-[#1a1814] pt-16 pb-12">
        <PageWrapper className="py-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Quality &amp; Compliance
          </h1>
          <p className="mt-6 text-base text-[#6b6258] max-w-2xl mx-auto text-center leading-7">
            {qualityPageData.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CERT_PILLS.map((pill) => (
              <span
                key={pill}
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  padding: '5px 14px',
                  border: '1px solid rgba(45,90,61,0.5)',
                  borderRadius: 2,
                  color: 'rgba(187,247,208,0.7)',
                  background: 'rgba(45,90,61,0.15)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </PageWrapper>
      </div>

      {/* ── Content: sidebar + sections ── */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 border-b border-[#ddd8cf]">

        {/* Sidebar */}
        <aside className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#ddd8cf] px-8 py-10 lg:sticky top-36 h-min">
          <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
          <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-5">On this page</div>
          <ul className="space-y-1">
            {qualityPageData.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-center gap-2 py-1.5 text-sm text-[#6b6258] hover:text-[#2d5a3d] transition-colors duration-200"
                >
                  <span className="text-[10px] text-[#a09585]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="border-b border-transparent group-hover:border-[#2d5a3d]/40 transition-colors duration-200 leading-snug">
                    {section.title}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#downloads"
                className="group flex items-center gap-2 py-1.5 text-sm text-[#6b6258] hover:text-[#2d5a3d] transition-colors duration-200"
              >
                <span className="text-[10px] text-[#a09585]">{String(qualityPageData.sections.length + 1).padStart(2, '0')}</span>
                <span className="border-b border-transparent group-hover:border-[#2d5a3d]/40 transition-colors duration-200">
                  Quality Documents
                </span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 divide-y divide-[#ddd8cf]">
          {qualityPageData.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="px-10 py-12 scroll-mt-32">
              <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
              <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 26, color: '#1a1814', lineHeight: 1.2, marginBottom: 14 }}>
                {section.title}
              </h2>
              <p className="text-sm text-[#6b6258] leading-7 mb-6">{section.content}</p>
              <ul className="space-y-3">
                {section.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2d5a3d] shrink-0" />
                    <span className="text-sm text-[#6b6258] leading-7">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Downloads */}
          <section id="downloads" className="px-10 py-12 scroll-mt-32">
            <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
            <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Resources</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 26, color: '#1a1814', lineHeight: 1.2, marginBottom: 20 }}>
              Quality Documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#ddd8cf]">
              {qualityPageData.downloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  className="group flex items-center gap-3 bg-[#f4f1eb] px-5 py-4 hover:bg-[#eeeae2] transition-colors duration-200"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-[#2d5a3d] shrink-0" />
                  <span className="text-sm text-[#1a1814]" style={{ fontFamily: "'Instrument Serif', serif" }}>{doc.title}</span>
                </a>
              ))}
            </div>
          </section>

          {/* QA Contact */}
          <section id="contact-qa" className="px-10 py-12 scroll-mt-32">
            <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
            <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Contact</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 26, color: '#1a1814', lineHeight: 1.2, marginBottom: 14 }}>
              Contact Our QA Team
            </h2>
            <p className="text-sm text-[#6b6258] leading-7 max-w-xl mb-8">
              Have a question about our quality processes or need to schedule an audit? Our Quality Assurance team is ready to assist.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm text-white bg-[#1a1814] hover:bg-[#2d5a3d] transition-colors duration-300"
              style={{ letterSpacing: '0.08em', fontFamily: "'Instrument Serif', serif" }}
            >
              <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
              Request a Quality Audit
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QualityPage;
