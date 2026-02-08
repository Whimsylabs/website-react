import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BubbleContainer from './BubbleContainer';
import ContactUs from './ContactUs';
import './Services.css';

const Services = ({ language }) => {
    return (
            <main className="container-fluid text-center p-0">
            <Header language={language} />

                <section className="services-hero">
                    <div className="container py-4">
                        <h1 className="services-title">Virtual Lab for Schools: Educational Services</h1>
                        <p className="services-subtitle">WhimsyLabs provides comprehensive virtual laboratory solutions for educational institutions of all sizes. From ready-to-use curriculum-aligned labs to fully customized experiments, we make hands-on science accessible and affordable.</p>
                    </div>
                </section>
                <BubbleContainer>

                    <h2>AI-Powered Experiment Creator</h2>
                    <p style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto', marginBottom: '20px' }}>
                        Don't wait for expensive custom development. Our <strong>AI Experiment Builder</strong> lets teachers create
                        bespoke lab scenarios in minutes, not months. Simply paste your protocol, and our AI generates a fully
                        interactive virtual experiment complete with equipment, reagents, and assessment criteria.
                    </p>
                    <ul style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        <li><strong>Create in Minutes:</strong> Turn any written protocol into a working virtual lab without programming knowledge.</li>
                        <li><strong>Curriculum-Aligned:</strong> Build experiments that match your specific syllabus requirements — IB, A-Level, AP, or national standards.</li>
                        <li><strong>No Extra Cost:</strong> The AI Experiment Builder is included with every WhimsyLabs subscription at no additional charge.</li>
                        <li><strong>Community Library:</strong> Access thousands of labs created by educators worldwide, or contribute your own.</li>
                    </ul>

                    <h2>Ready-to-Use Lab Library</h2>
                    <p style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto', marginBottom: '20px' }}>
                        Get started immediately with our extensive library of pre-built experiments covering Biology, Chemistry, Physics,
                        and Electronics. All labs include pre-lab questions, guided procedures, and automated assessment.
                    </p>

                    <h2>School-Wide Solutions</h2>
                    <ul style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        <li><strong>Affordable Per-Student Pricing:</strong> Transparent pricing that scales with your institution — no hidden fees or surprise costs.</li>
                        <li><strong>LMS Integration:</strong> Seamlessly connect with Google Classroom, Canvas, Schoology, and other learning management systems.</li>
                        <li><strong>Teacher Training:</strong> Comprehensive onboarding and ongoing professional development at no extra cost.</li>
                        <li><strong>Technical Support:</strong> Dedicated support team available during school hours to assist with any issues.</li>
                        <li><strong>Offline Capability:</strong> Labs work without internet — perfect for schools with unreliable connectivity.</li>
                    </ul>

                    <h2>Custom Development Services</h2>
                    <p style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto', marginBottom: '20px' }}>
                        Need something truly unique? Our development team can create fully bespoke simulations for specialized
                        curricula, research institutions, or corporate training programs.
                    </p>
                    <ul style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        <li><strong>Specialized Equipment:</strong> Custom apparatus and instruments modeled to your exact specifications.</li>
                        <li><strong>Branded Environments:</strong> White-label solutions with your institution's branding and design.</li>
                        <li><strong>VR & AR Ready:</strong> Full compatibility with Meta Quest, HTC Vive, and other VR/AR platforms.</li>
                        <li><strong>Enterprise Deployment:</strong> On-premises hosting options for organizations with strict data requirements.</li>
                    </ul>

                    <h2>Get Started Today</h2>
                    <p style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        Whether you're a single teacher looking to enhance your classroom or a district deploying across hundreds of schools,
                        WhimsyLabs has a solution that fits your budget. Contact us for a free demo and personalized quote.
                    </p>

                    <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
                        <p>
                            Explore our <a href="/features/" style={{ color: '#6B4EAA', fontWeight: 'bold' }}>full feature set</a> or 
                            <a href="/bett/" style={{ color: '#6B4EAA', fontWeight: 'bold', marginLeft: '5px' }}>meet us at BETT 2026</a> for a live demo!
                        </p>
                    </div>

                <ContactUs />
            </BubbleContainer>
            <Footer language={language} />
            </main>
    );
};

export default Services;
