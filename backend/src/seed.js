import mongoose from 'mongoose';
import dotenv from 'dotenv';
import NavItem from './models/NavItem.js';
import Employee from './models/Employee.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mrpro';

async function run() {
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    NavItem.deleteMany({}),
    Employee.deleteMany({}),
    Enquiry.deleteMany({})
  ]);

  const navNames = [
    'Business Setup',
    'Registrations',
    'Import Export',
    'Compliance',
    'BIS',
    'IPR',
    'Tax',
    'Legal',
    'Tender',
    'Blogs'
  ];

  const navItems = await NavItem.insertMany(
    navNames.map((name, i) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), order: i + 1 }))
  );

  const employees = [
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', position: 'Senior Developer', department: 'Engineering', phone: '+1 234-567-8901' },
    { name: 'Michael Chen', email: 'michael.c@company.com', position: 'Project Manager', department: 'Product', phone: '+1 234-567-8902' },
    { name: 'Emily Davis', email: 'emily.d@company.com', position: 'UI/UX Designer', department: 'Design', phone: '+1 234-567-8903' },
    { name: 'James Wilson', email: 'james.w@company.com', position: 'Backend Developer', department: 'Engineering', phone: '+1 234-567-8904' },
    { name: 'Lisa Brown', email: 'lisa.b@company.com', position: 'QA Engineer', department: 'Quality', phone: '+1 234-567-8905' },
    { name: 'David Miller', email: 'david.m@company.com', position: 'Data Analyst', department: 'Analytics', phone: '+1 234-567-8906' },
    { name: 'Olivia Taylor', email: 'olivia.t@company.com', position: 'HR Manager', department: 'HR', phone: '+1 234-567-8907' },
    { name: 'Noah Anderson', email: 'noah.a@company.com', position: 'DevOps Engineer', department: 'Infrastructure', phone: '+1 234-567-8908' }
  ];
  await Employee.insertMany(employees);

  const enquiries = [
    { companyName: 'Global Tech Solutions', contactPerson: 'John Smith', email: 'john@globaltech.com', subject: 'Website Development Inquiry', message: 'We are looking for a team to develop a modern e-commerce website...' },
    { companyName: 'Creative Agency', contactPerson: 'Emma Wilson', email: 'emma@creative.com', subject: 'Mobile App Partnership', message: 'Interested in collaborating on a mobile app project for our client...' },
    { companyName: 'Finance Corp', contactPerson: 'David Brown', email: 'david@financecorp.com', subject: 'Custom CRM Development', message: 'Looking for a custom CRM solution tailored to our business needs...' },
    { companyName: 'Retail Group', contactPerson: 'Sophia Lee', email: 'sophia@retailgroup.com', subject: 'Digital Marketing Services', message: 'Need assistance with SEO and social media strategies...' },
    { companyName: 'HealthCare Inc', contactPerson: 'Mark Davis', email: 'mark@healthcare.com', subject: 'Patient Portal Upgrade', message: 'Seeking upgrade of our patient portal with new features...' }
  ];
  await Enquiry.insertMany(enquiries);

  console.log('Database seeded');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

