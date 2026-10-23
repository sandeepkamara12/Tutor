import { useState } from 'react';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const INTERESTS = [
    { value: 'alphabet', label: 'Cyrillic alphabet' },
    { value: 'pronunciation', label: 'Pronunciation' },
    { value: 'vocabulary', label: 'Vocabulary' },
    { value: 'grammar', label: 'Grammar' },
    { value: 'conversation', label: 'Speaking / conversation' },
    { value: 'exam', label: 'Exam preparation' },
    { value: 'free-material', label: 'Free study material' },
    { value: 'other', label: 'Something else' },
];

const LEVELS = [
    { value: 'beginner', label: 'Complete beginner' },
    { value: 'knows-alphabet', label: 'I know the alphabet' },
    { value: 'elementary', label: 'Elementary (Basic phrases)' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
];

const empty = {
    name: '',
    email: '',
    phone: '',
    interest: '',
    level: '',
    message: '',
    consent: false,
    newsletter: false,
    website: '', // honeypot: hidden from people, bots fill it in
};

const inputClass =
    'w-full rounded border border-gray-200 bg-white min-h-11 px-4 py-2 placeholder:text-gray-400 text-gray-600 focus:outline-hidden focus:border-russian-blue resize-none';
const labelClass = 'font-bold text-russian-dark-blue text-sm';

function Field({ label, error, optional, children }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className={labelClass}>
                {label}
                {optional ? <span className="font-medium text-gray-500 text-xs"> (Optional)</span> : <span className="font-medium text-russian-red">*</span>}
            </span>
            {children}
            {error && <span className="text-sm text-russian-red">{error}</span>}
        </label>
    );
}

export default function ContactForm() {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [serverMessage, setServerMessage] = useState('');

    const change = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
        setErrors((e) => ({ ...e, [name]: undefined })); // clear the error of the field being edited
    };

    // quick checks in the browser (the server checks everything again)
    const check = () => {
        const found = {};
        if (form.name.trim().length < 2) found.name = 'Please enter your name.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) found.email = 'Please enter a valid email.';
        if (form.message.trim().length < 10) found.message = 'Please write at least 10 characters.';
        if (!form.consent) found.consent = 'Please accept the privacy policy.';
        return found;
    };

    const submit = async (event) => {
        event.preventDefault();
        if (status === 'sending') return;

        const found = check();
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus('sending');
        setServerMessage('');
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setStatus('success');
                setServerMessage(data.message || 'Thank you, Your message has been sent.');
                setForm(empty);
            } else {
                setStatus('error');
                setErrors(data.errors || {});
                setServerMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setServerMessage('Could not reach the server. Please check your connection and try again.');
        }
    };

    return (
        <section
            id="contact"
            className="z-40 relative py-12 lg:py-20 flex items-center flex-wrap"
        >
            <div className="custom-container relative z-40">

                <div className="grid gap-6 w-full lg:w-4/5 mx-auto">
                    <div className="flex flex-wrap flex-col justify-between gap-6 w-full">
                        
                        <div className="flex flex-col items-center lg:w-1/2 lg:mx-auto gap-6 text-center">
                            <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Contact me</p>
                            <h1 className="heading">We’d love to <span className="text-russian-red">hear from you</span></h1>
                            <p>Have a question about a course, or not sure where to start? Send me a message and I will reply within 24 hours.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-6 items-center justify-center">
                                <a
                                    href="mailto:hello@example.com"
                                    className="flex items-center gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-solid fa-envelope"></i></span>
                                    <p className="group-hover:text-russian-red transition-all">hello@example.com</p>
                                </a>

                                <a
                                    href="https://wa.me/910000000000"
                                    className="flex items-center gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-brands fa-whatsapp"></i></span>
                                    <p className="group-hover:text-russian-red transition-all">+91 xxxx xxx xxx</p>
                                </a>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 text-xs"><i
                                            className="fa-solid fa-location-dot"
                                        ></i></span>
                                    <p>123 Tech Avenue, San Francisco, USA</p>
                                </div>

                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <p className="font-bold text-russian-dark-blue leading-none">Follow me <span
                                    className="text-gray-600 font-normal"
                                >to get daily words &amp; video lessons</span></p>
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="text-gray-600 hover:text-russian-red"
                                    ><i className="fa-brands fa-facebook"></i></a>
                                    <a
                                        href="#"
                                        aria-label="YouTube"
                                        className="text-gray-600 hover:text-russian-red"
                                    ><i className="fa-brands fa-twitter"></i></a>
                                    <a
                                        href="#"
                                        aria-label="YouTube"
                                        className="text-gray-600 hover:text-russian-red"
                                    ><i className="fa-brands fa-youtube"></i></a>
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="text-gray-600 hover:text-russian-red"
                                    ><i className="fa-brands fa-instagram"></i></a>
                                    <a
                                        href="#"
                                        aria-label="YouTube"
                                        className="text-gray-600 hover:text-russian-red"
                                    ><i className="fa-brands fa-pinterest-p"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        noValidate
                        className="bg-white p-6 md:p-8 rounded flex flex-col gap-3 border-t-4 border-russian-dark-blue shadow-lg w-full mx-auto max-w-2xl"
                    >
                        <div className="grid sm:grid-cols-2 gap-3">
                            <Field label="Fullname" error={errors.name}>
                                <input name="name" value={form.name} onChange={change} placeholder="John Doe" autoComplete="name" className={inputClass} />
                            </Field>
                            <Field label="Email" error={errors.email}>
                                <input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" autoComplete="email" className={inputClass} />
                            </Field>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <Field label="Phone" optional error={errors.phone}>
                                <input name="phone" type="tel" value={form.phone} onChange={change} placeholder="+xx-xxxx-xxx-xxx" autoComplete="tel" className={inputClass} />
                            </Field>
                            <Field label="Russian level" optional error={errors.level}>
                                {/* <Select options={options} /> */}
                                <select name="level" value={form.level} onChange={change} className={inputClass}>
                                    <option value="">Choose level</option>
                                    {LEVELS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="I want to learn" optional error={errors.interest}>
                            <select name="interest" value={form.interest} onChange={change} className={inputClass}>
                                <option value="">Choose interest</option>
                                {INTERESTS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Message" error={errors.message}>
                            <textarea name="message" rows={5} value={form.message} onChange={change} placeholder="Tell me about your goals..." className={inputClass} />
                        </Field>

                        {/* honeypot: people never see it */}
                        <div className="absolute left-[-9999px]" aria-hidden="true">
                            <label>
                                Website
                                <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={change} />
                            </label>
                        </div>

                        <label className="flex items-start gap-2 text-sm text-gray-600">
                            <input type="checkbox" name="consent" checked={form.consent} onChange={change} className="mt-1" />
                            <span>
                                I agree to the <a href="#" className="text-russian-dark-blue hover:text-russian-red">Privacy Policy</a> and that my details are used to reply to me.
                            </span>
                        </label>
                        {errors.consent && <span className="text-sm text-russian-red -mt-2">{errors.consent}</span>}

                        <label className="flex items-start gap-2 text-sm text-gray-600">
                            <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={change} className="mt-1" />
                            <span>Send me free Russian tips and study material by email.</span>
                        </label>

                        <button type="submit" disabled={status === 'sending'} className="button button-russian-blue w-fit disabled:opacity-60">
                            <span>{status === 'sending' ? 'Sending...' : 'Send message'}</span>
                        </button>

                        {serverMessage && (
                            <p role="status" className={`font-medium text-sm ${status === 'success' ? 'text-green-700' : 'text-russian-red'}`}>
                                {serverMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
