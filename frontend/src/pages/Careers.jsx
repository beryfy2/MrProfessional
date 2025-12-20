import React, { useEffect, useState } from "react";
import WhyCompanySection from "./WhyUs";
import TestimonialsSection from "./TestimonialsSection";
import TrustedBy from "../components/TrustBy";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const Careers = () => {
  const [formData, setFormData] = useState({
    jobType: '',
    name: '',
    email: '',
    phone: '',
    qualification: '',
    message: '',
    linkedin: '',
    expectedSalary: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [expandedJob, setExpandedJob] = useState(null);

  const [jobOpenings, setJobOpenings] = useState([
    {
      title: 'Social Media Manager',
      urgent: true,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Manage social media presence across all platforms, create engaging content, analyze performance metrics, and develop social media strategies to increase brand awareness and engagement.',
      responsibilities: [
        'Create and curate engaging content for social media platforms',
        'Develop and execute social media marketing strategies',
        'Monitor social media trends and adapt content accordingly',
        'Analyze performance metrics and prepare reports',
        'Manage community engagement and respond to comments/messages',
        'Collaborate with marketing team for brand consistency'
      ],
      qualifications: [
        'Bachelor\'s degree in Marketing, Communications, or related field',
        '2-4 years of social media management experience',
        'Proficiency in social media platforms and tools',
        'Strong understanding of social media analytics',
        'Excellent written and verbal communication skills',
        'Creative thinking and content creation abilities'
      ]
    },
    {
      title: 'Accounts Executive',
      urgent: true,
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Handle accounting operations, maintain financial records, prepare reports, and ensure compliance with accounting standards and regulations.',
      responsibilities: [
        'Maintain accurate financial records and ledgers',
        'Prepare financial statements and reports',
        'Process invoices, payments, and reconciliations',
        'Ensure compliance with accounting standards',
        'Assist in budget preparation and monitoring',
        'Coordinate with auditors and tax professionals'
      ],
      qualifications: [
        'Bachelor\'s degree in Commerce, Accounting, or Finance',
        '1-3 years of accounting experience',
        'Knowledge of accounting software and MS Excel',
        'Understanding of GST and tax regulations',
        'Strong analytical and numerical skills',
        'Attention to detail and accuracy'
      ]
    },
    {
      title: 'Semi Qualified CS',
      urgent: true,
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Assist in company secretarial work, maintain statutory records, handle compliance requirements, and support corporate governance activities.',
      responsibilities: [
        'Maintain statutory registers and records',
        'Prepare and file statutory forms and returns',
        'Assist in board meeting documentation',
        'Handle company incorporation and compliance',
        'Coordinate with regulatory authorities',
        'Support corporate governance activities'
      ],
      qualifications: [
        'Pursuing or completed CS course',
        '1-2 years of experience in company secretarial work',
        'Knowledge of Companies Act and corporate laws',
        'Proficiency in MS Office and compliance software',
        'Strong organizational and documentation skills',
        'Understanding of regulatory compliance'
      ]
    },
    {
      title: 'Content Writer',
      urgent: true,
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Create engaging content for websites, blogs, social media, and marketing materials. Research topics, write compelling copy, and optimize content for SEO.',
      responsibilities: [
        'Research and write engaging content for various platforms',
        'Create blog posts, articles, and website content',
        'Develop social media content and captions',
        'Optimize content for SEO best practices',
        'Edit and proofread content for accuracy and clarity',
        'Collaborate with marketing and design teams'
      ],
      qualifications: [
        'Bachelor\'s degree in English, Journalism, or related field',
        '1-3 years of content writing experience',
        'Excellent written and verbal communication skills',
        'Knowledge of SEO principles and content marketing',
        'Proficiency in content management systems',
        'Creative thinking and research abilities'
      ]
    },
    {
      title: 'Import and Export Compliance Executive',
      urgent: true,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Ensure compliance with import-export regulations, handle documentation, coordinate with customs authorities, and manage international trade compliance.',
      responsibilities: [
        'Ensure compliance with import-export regulations',
        'Prepare and review customs documentation',
        'Coordinate with customs and port authorities',
        'Manage HS codes and tariff classifications',
        'Handle export-import licensing and permits',
        'Monitor regulatory changes and updates'
      ],
      qualifications: [
        'Bachelor\'s degree in Commerce, Business, or related field',
        '2-4 years of import-export experience',
        'Knowledge of customs regulations and procedures',
        'Understanding of international trade laws',
        'Strong analytical and documentation skills',
        'Proficiency in compliance software'
      ]
    },
    {
      title: 'Graphic Designer',
      urgent: true,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create visual content for marketing materials, websites, and branding. Design graphics, logos, and marketing collateral using design software.',
      responsibilities: [
        'Create visual designs for marketing materials',
        'Design logos, brochures, and promotional content',
        'Develop website graphics and UI elements',
        'Ensure brand consistency across all materials',
        'Collaborate with marketing and content teams',
        'Present design concepts and revisions'
      ],
      qualifications: [
        'Bachelor\'s degree in Graphic Design or related field',
        '2-4 years of graphic design experience',
        'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
        'Strong portfolio demonstrating design skills',
        'Understanding of design principles and typography',
        'Knowledge of web design and digital media'
      ]
    },
    {
      title: 'Next.js Developer',
      urgent: false,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Develop and maintain web applications using Next.js framework. Build responsive user interfaces, implement features, and optimize performance.',
      responsibilities: [
        'Develop web applications using Next.js and React',
        'Build responsive and interactive user interfaces',
        'Implement frontend features and functionality',
        'Optimize application performance and SEO',
        'Collaborate with backend developers and designers',
        'Write clean, maintainable, and well-documented code'
      ],
      qualifications: [
        'Bachelor\'s degree in Computer Science or related field',
        '2-4 years of Next.js/React development experience',
        'Strong knowledge of JavaScript, HTML, and CSS',
        'Experience with REST APIs and state management',
        'Understanding of web performance optimization',
        'Knowledge of version control systems (Git)'
      ]
    },
    {
      title: 'CS Intern',
      urgent: false,
      type: 'Internship',
      experience: '0-1 year',
      description: 'Learn company secretarial practices, assist in compliance work, and gain hands-on experience in corporate governance and regulatory compliance.',
      responsibilities: [
        'Assist in maintaining statutory records',
        'Learn about company incorporation processes',
        'Support compliance documentation and filing',
        'Research regulatory requirements',
        'Assist in board meeting preparations',
        'Learn about corporate governance practices'
      ],
      qualifications: [
        'Pursuing CS (Company Secretary) course',
        'Basic knowledge of corporate laws',
        'Strong learning attitude and attention to detail',
        'Good communication and organizational skills',
        'Proficiency in MS Office applications',
        'Interest in corporate compliance and governance'
      ]
    },
    {
      title: 'MSDS Expert',
      urgent: false,
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Create and maintain Material Safety Data Sheets (MSDS) for chemical products. Ensure compliance with safety regulations and provide hazard information.',
      responsibilities: [
        'Create and update Material Safety Data Sheets',
        'Research chemical properties and hazards',
        'Ensure compliance with safety regulations',
        'Review and validate MSDS documentation',
        'Collaborate with product development teams',
        'Maintain MSDS database and records'
      ],
      qualifications: [
        'Degree in Chemistry, Chemical Engineering, or related field',
        '3-5 years of experience in MSDS preparation',
        'Knowledge of chemical safety regulations',
        'Understanding of hazard classification systems',
        'Strong research and analytical skills',
        'Attention to detail and accuracy'
      ]
    },
    {
      title: 'Import and Export Compliance Intern',
      urgent: false,
      type: 'Internship',
      experience: '0-1 year',
      description: 'Learn about import-export compliance, assist in documentation, and gain practical experience in international trade regulations.',
      responsibilities: [
        'Learn import-export compliance procedures',
        'Assist in preparing customs documentation',
        'Research trade regulations and requirements',
        'Support compliance monitoring activities',
        'Help maintain import-export records',
        'Learn about international trade practices'
      ],
      qualifications: [
        'Pursuing degree in Commerce, Business, or International Trade',
        'Basic knowledge of import-export processes',
        'Strong analytical and research skills',
        'Attention to detail and accuracy',
        'Good communication skills',
        'Interest in international business'
      ]
    },
    {
      title: 'CA Article',
      urgent: false,
      type: 'Article',
      experience: '0-1 year',
      description: 'Work as a Chartered Accountant article under qualified CA guidance. Learn auditing, taxation, and accounting practices through hands-on training.',
      responsibilities: [
        'Assist in auditing and accounting work',
        'Learn taxation and compliance procedures',
        'Prepare financial statements and reports',
        'Gain exposure to various business sectors',
        'Develop professional accounting skills',
        'Work under CA supervision and guidance'
      ],
      qualifications: [
        'Completed CA Foundation or Intermediate',
        'Pursuing CA Final course',
        'Strong mathematical and analytical skills',
        'Knowledge of accounting principles',
        'Attention to detail and accuracy',
        'Commitment to professional development'
      ]
    },
    {
      title: 'Content Writer Intern',
      urgent: false,
      type: 'Internship',
      experience: '0-1 year',
      description: 'Learn content writing skills, create engaging content, and gain experience in digital marketing and content creation.',
      responsibilities: [
        'Write blog posts and articles',
        'Create social media content',
        'Learn SEO and content marketing principles',
        'Research and fact-check information',
        'Edit and proofread content',
        'Collaborate with content and marketing teams'
      ],
      qualifications: [
        'Pursuing degree in English, Journalism, or Marketing',
        'Strong writing and communication skills',
        'Basic knowledge of SEO principles',
        'Creative thinking and research abilities',
        'Proficiency in MS Office and content tools',
        'Interest in digital marketing'
      ]
    },
    {
      title: 'BIS Consultant',
      urgent: false,
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Provide consultancy services for Bureau of Indian Standards (BIS) certification. Assist clients with product certification and compliance requirements.',
      responsibilities: [
        'Provide BIS certification consultancy',
        'Assist clients with product testing requirements',
        'Prepare and review certification documentation',
        'Ensure compliance with BIS standards',
        'Coordinate with testing laboratories',
        'Advise on product certification processes'
      ],
      qualifications: [
        'Degree in Engineering or related technical field',
        '3-5 years of experience in BIS certification',
        'Knowledge of BIS standards and procedures',
        'Understanding of product certification processes',
        'Strong client communication skills',
        'Technical writing and documentation abilities'
      ]
    },
    {
      title: 'EPR Consultant',
      urgent: false,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Provide Extended Producer Responsibility (EPR) consultancy services. Help businesses comply with EPR regulations for waste management and recycling.',
      responsibilities: [
        'Provide EPR compliance consultancy',
        'Develop waste management strategies',
        'Assist with EPR registration and reporting',
        'Ensure compliance with environmental regulations',
        'Prepare EPR documentation and plans',
        'Advise on sustainable waste management practices'
      ],
      qualifications: [
        'Degree in Environmental Science, Engineering, or related field',
        '2-4 years of experience in EPR compliance',
        'Knowledge of environmental regulations and EPR laws',
        'Understanding of waste management practices',
        'Strong analytical and problem-solving skills',
        'Client advisory and communication abilities'
      ]
    },
    {
      title: 'Business Development Executive',
      urgent: false,
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Drive business growth through client acquisition, relationship management, and market expansion. Identify opportunities and develop strategic partnerships.',
      responsibilities: [
        'Identify and pursue new business opportunities',
        'Develop and maintain client relationships',
        'Conduct market research and analysis',
        'Prepare proposals and presentations',
        'Achieve sales targets and revenue goals',
        'Collaborate with marketing and product teams'
      ],
      qualifications: [
        'Bachelor\'s degree in Business, Marketing, or related field',
        '2-4 years of business development experience',
        'Strong sales and negotiation skills',
        'Excellent communication and presentation abilities',
        'Understanding of market dynamics',
        'Relationship building and networking skills'
      ]
    },
    {
      title: 'Telecaller Executive',
      urgent: false,
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Handle outbound calls to potential clients, promote services, generate leads, and maintain customer relationships through effective communication.',
      responsibilities: [
        'Make outbound calls to potential clients',
        'Promote company services and solutions',
        'Generate and qualify leads',
        'Maintain customer database and records',
        'Follow up on inquiries and convert leads',
        'Provide excellent customer service'
      ],
      qualifications: [
        'Bachelor\'s degree in any field',
        '1-2 years of telecalling or sales experience',
        'Excellent verbal communication skills',
        'Persuasive and confident speaking ability',
        'Strong listening and problem-solving skills',
        'Proficiency in CRM software and MS Office'
      ]
    }
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/jobs`).then((r) => r.json()).then((jobs) => {
      if (Array.isArray(jobs) && jobs.length > 0) {
        setJobOpenings(jobs.map((j) => ({
          title: j.title,
          urgent: j.urgent || false,
          type: j.type || 'Full-time',
          experience: j.experience || '',
          description: j.description || '',
          responsibilities: [],
          qualifications: []
        })));
      }
    }).catch(() => {});
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = `Job Application: ${formData.jobType}`;
      const message = `Name: ${formData.name}\nPhone: ${formData.phone}\nQualification: ${formData.qualification}\nExpected Salary: ${formData.expectedSalary}\nLinkedIn: ${formData.linkedin}\nMessage: ${formData.message}`;
      
      const data = new FormData();
      data.append('companyName', 'Careers');
      data.append('contactPerson', formData.name);
      data.append('email', formData.email);
      data.append('subject', subject);
      data.append('message', message);
      if (formData.resume) {
        data.append('file', formData.resume);
      }

      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        body: data
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitMessage('Thank you for your application! We will review your submission and get back to you soon.');
      setFormData({
        jobType: '',
        name: '',
        email: '',
        phone: '',
        qualification: '',
        message: '',
        linkedin: '',
        expectedSalary: '',
        resume: null
      });
    } catch {
      setSubmitMessage('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 h-96 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join The Professional Utilities Team
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-300">
                One-Stop Corporate Solution
              </h2>
              <p className="text-lg mb-8">
                Be part of a dynamic team that's revolutionizing corporate services in India. We're looking for passionate individuals ready to make an impact.
              </p>
              <button
                onClick={() => document.getElementById('job-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Apply Now
              </button>
            </div>

            {/* Right Side */}
            <div className="flex justify-center">
              <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-green-400 text-xl font-semibold mb-6 text-center">Career Opportunities</h3>
                <div className="space-y-4 text-center">
                  <div className="bg-green-500 text-white px-4 py-2 rounded">
                    <span className="font-bold">15+</span> Open Positions
                  </div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded">
                    <span className="font-bold">Fast-Growing</span> Company
                  </div>
                  <div className="bg-purple-500 text-white px-4 py-2 rounded">
                    <span className="font-bold">Learning</span> Environment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work at Professional Utilities */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
            Why work at Professional Utilities
          </h2>
          <div className="text-white text-center mb-12">
            <p className="text-lg max-w-4xl mx-auto">
              At Professional Utilities, you'll be part of an exciting, fast-moving environment with a flat hierarchy.
              We're always exploring growth opportunities, so there's lots of potential to take on new tasks and help shape the company.
              Individually, the ability to make informed, independent decisions while justifying how they add value to the business is highly prized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl text-green-400 mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-3">Growth Opportunities</h3>
              <p className="text-gray-300">
                Fast-paced environment with ample opportunities to learn, grow, and take on new challenges.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl text-green-400 mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-3">Flat Hierarchy</h3>
              <p className="text-gray-300">
                Direct access to decision-makers with the freedom to make independent, impactful decisions.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl text-green-400 mb-4">💡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation Focus</h3>
              <p className="text-gray-300">
                Work on cutting-edge solutions in corporate services and help shape the future of business compliance.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => document.getElementById('job-openings').scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Join Us?
            </button>
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section id="job-openings" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Current Job Openings
          </h2>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {/* Job Header */}
                <button
                  onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    {job.urgent && (
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        Urgent Hiring
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600 font-medium">{job.type}</span> • {job.experience}
                    </div>
                    <span className="text-gray-600 text-2xl font-bold">
                      {expandedJob === index ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {/* Expanded Job Details */}
                {expandedJob === index && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="pt-6 space-y-6">
                      {/* Job Description */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h4>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>

                      {/* Key Responsibilities */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Responsibilities</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Qualifications */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Qualifications & Skills</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {job.qualifications.map((qualification, idx) => (
                            <li key={idx}>{qualification}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Employment Type</div>
                          <div className="text-blue-600 font-semibold">{job.type}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Experience Level</div>
                          <div className="text-blue-600 font-semibold">{job.experience}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Location</div>
                          <div className="text-blue-600 font-semibold">New Delhi</div>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="text-center pt-4">
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, jobType: job.title }));
                            document.getElementById('job-form').scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Apply for this Position
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application Form */}
      <section id="job-form" className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
            Apply for Job
          </h2>

          {submitMessage && (
            <div className="bg-green-900 border border-green-500 rounded-lg p-4 mb-8 text-center">
              <p className="text-green-400 font-semibold">{submitMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Type */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  In-Office Job *
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Position</option>
                  {jobOpenings.map((job, index) => (
                    <option key={index} value={job.title}>{job.title}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Qualification *
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., B.Com, MBA, CA, etc."
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Expected Salary *
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹3,00,000 per annum"
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* LinkedIn Profile */}
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position..."
                  rows="4"
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              {/* Resume Upload */}
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">
                  Upload Resume *
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white px-12 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'APPLY NOW'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Why Professional Utilities? */}
      <div className="bg-gray-900">
        <WhyCompanySection />
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Trusted By */}
      <div className="bg-gray-900">
        <TrustedBy />
      </div>
    </div>
  );
};

export default Careers;
