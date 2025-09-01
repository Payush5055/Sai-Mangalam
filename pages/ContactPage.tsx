import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import PageWrapper from '../components/PageWrapper';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { seedImages } from '../constants/seed-images';
import { motion, AnimatePresence } from 'framer-motion';

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>(''); // New: For file validation errors
    const fileInputRef = useRef<HTMLInputElement>(null); // New: Ref to clear file input
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const timerRef = React.useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => { const newErrors = { ...prev }; delete newErrors[id]; return newErrors; });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFileError(''); // Clear error

        if (selectedFile) {
            // Validate type and size
            const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(selectedFile.type)) {
                setFileError('Invalid file type. Allowed: PDF, DOCX, JPG, PNG.');
                return;
            }
            if (selectedFile.size > maxSize) {
                setFileError('File too large. Maximum size: 5MB.');
                return;
            }

            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileError('');
        if (fileInputRef.current) fileInputRef.current.value = ''; // Clear input
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required.';
        if (fileError) newErrors.file = fileError; // Include file error

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (timerRef.current) clearTimeout(timerRef.current);

        if (!validate()) return;

        setIsSubmitting(true);
        setSubmissionStatus('idle');

        const data = new FormData();
        data.append('name', formData.name); // Changed keys to match backend
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('message', formData.message);
        if (file) data.append('attachment', file);

        try {
            // Point to your backend (update URL for production, e.g., https://your-domain.com/send-email)
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setFile(null);
                setFileError('');
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
            timerRef.current = window.setTimeout(() => {
                setSubmissionStatus('idle');
            }, 5000); // 5 seconds
        }
    };

    const inputErrorClasses = 'border-red-500/80 focus:border-red-500/80 focus:ring-red-500/50';

    return (
        <div className="bg-transparent text-slate-300">
            <div className="bg-slate-900/50 py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">Contact Us</h1>
                    <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                        We're here to help. Reach out to us for sales inquiries, technical support, or any other questions.
                    </p>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="glass-surface p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-slate-100 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                                    <input type="text" id="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 form-input ${errors.name ? inputErrorClasses : ''}`} placeholder="John Doe" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                                    {errors.name && <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                    <input type="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 form-input ${errors.email ? inputErrorClasses : ''}`} placeholder="patilaayush262@gmail.com" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300">Phone</label>
                                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 form-input" placeholder="+91 9881215798"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                    <textarea id="message" rows={5} value={formData.message} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 form-input ${errors.message ? inputErrorClasses : ''}`} placeholder="Your inquiry..." required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
                                    {errors.message && <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300">Attach File (for RFQs)</label>
                                    <div className="mt-1 flex items-center">
                                        <label htmlFor="file" className="cursor-pointer bg-slate-700 text-blue-300 hover:bg-slate-600 font-semibold py-2 px-4 rounded-full text-sm transition-colors">
                                            Choose File
                                        </label>
                                        <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} className="sr-only" accept=".pdf,.docx,.jpg,.png" /> {/* Added accept for types */}
                                        {file && (
                                            <div className="ml-4 flex items-center">
                                                <span className="text-sm text-slate-400 truncate">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveFile}
                                                    className="ml-2 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                                                    aria-label="Remove attached file"
                                                >
                                                    <XCircleIcon className="h-5 w-5" /> {/* Or use a trash icon */}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {fileError && <p className="mt-1 text-sm text-red-400">{fileError}</p>}
                                </div>
                                <div className="text-right">
                                    <motion.button 
                                        type="submit"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                        className="btn-primary flex items-center justify-center min-w-[150px]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Spinner /> : "Send Message"}
                                    </motion.button>
                                </div>
                            </form>
                            <div className="mt-4 h-12 flex items-center justify-end">
                                <AnimatePresence>
                                    {submissionStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                            className="flex items-center p-3 rounded-md bg-green-500/20 text-green-300"
                                            role="alert"
                                        >
                                            <CheckCircleIcon className="h-6 w-6 mr-2"/>
                                            <p className="font-semibold text-sm">Your inquiry was sent successfully!</p>
                                        </motion.div>
                                    )}
                                    {submissionStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                            className="flex items-center p-3 rounded-md bg-red-500/20 text-red-300"
                                            role="alert"
                                        >
                                            <XCircleIcon className="h-6 w-6 mr-2"/>
                                            <p className="font-semibold text-sm">Message failed to send. Please try again.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="glass-surface p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-slate-100">Contact Information</h3>
                            <ul className="mt-4 space-y-3 text-slate-300">
                                <li className="flex items-start">
                                    <MapPinIcon className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0"/>
                                    <span>
                                        <strong>Head Office:</strong><br/>
                                        123 Power Lane, Electra City, EC 54321
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <PhoneIcon className="h-6 w-6 text-blue-400 mr-3"/>
                                    <span>+91 9881215798</span>
                                </li>
                                <li className="flex items-center">
                                    <EnvelopeIcon className="h-6 w-6 text-blue-400 mr-3"/>
                                    <span>saimangalam.electrical@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-100">Our Location</h3>
                            <div className="mt-4 rounded-lg overflow-hidden shadow-md border border-slate-700">
                                <img src={seedImages.contactMap} alt="Map showing the location of SaiMangalam Head Office" className="w-full h-auto object-cover"/>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default ContactPage;
