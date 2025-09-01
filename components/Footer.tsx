
import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white border-t border-slate-700">
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src="/brand/Logo.jpg" alt="SaiMangalam Mark" className="h-10 w-10" />
                            <span className="text-xl font-bold text-white leading-tight">SaiMangalam Electrical &amp; Engineerings</span>
                        </Link>
                        <p className="mt-4 text-slate-400">Powering reliable distribution for utilities, industry, and renewables.</p>
                        <div className="mt-6 flex space-x-4">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/about" className="text-base text-slate-400 hover:text-white">About Us</Link></li>
                            <li><Link to="/products" className="text-base text-slate-400 hover:text-white">Products</Link></li>
                            <li><Link to="/#services" className="text-base text-slate-400 hover:text-white">Services</Link></li>
                             <li><Link to="/contact" className="text-base text-slate-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/resources" className="text-base text-slate-400 hover:text-white">Downloads</Link></li>
                            <li><Link to="/#services" className="text-base text-slate-400 hover:text-white">Services</Link></li>
                            <li><Link to="/quality" className="text-base text-slate-400 hover:text-white">Quality & Compliance</Link></li>
                            {/* <li><Link to="/careers" className="text-base text-slate-400 hover:text-white">Careers</Link></li> */}
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Contact Us</h3>
                        <ul className="mt-4 space-y-4 text-slate-400">
                           <li className="flex items-start"><span className="font-semibold mr-2 shrink-0">A:</span> SR.NO.253/2,PLOT N0 9,KUKDEL,SHIVAR,-PRAKASHA ROAD,SHAHADA,DIST-NANDURBAR 425409</li>
                           <li>
                             <a href="tel:+919881215798" className="hover:text-white flex items-start">
                                <span className="font-semibold mr-2 shrink-0">P:</span>
                                <span>+91 9881215798</span>
                             </a>
                            </li>
                           <li>
                            <a href="mailto:saimangalam.electrical@gmail.com" className="hover:text-white flex items-start">
                                <span className="font-semibold mr-2 shrink-0">E:</span>
                                <span>saimangalam.electrical@gmail.com</span>
                            </a>
                           </li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Certifications</h3>
                        <div className="mt-4 flex space-x-4">
                            <div className="bg-slate-700 p-2 rounded text-slate-200 font-bold border border-slate-600">ISO 9001</div>
                             <div className="bg-slate-700 p-2 rounded text-slate-200 font-bold border border-slate-600">CE</div>
                             <div className="bg-slate-700 p-2 rounded text-slate-200 font-bold border border-slate-600">IEEE</div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8 text-center">
                    <p className="text-base text-slate-400">&copy; {new Date().getFullYear()} SaiMangalam Electrical & Engineerings. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;