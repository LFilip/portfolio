export interface Interest {
  name: string
  emoji: string
}

export interface Certification {
  name: string
  icon: string
}

export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export const INTERESTS: Interest[] = [
  { name: 'Coding', emoji: '💻' },
  { name: 'Photography', emoji: '📸' },
  { name: 'Design', emoji: '🎨' },
  { name: 'Cloud', emoji: '☁️' },
  { name: 'Security', emoji: '🔒' },
  { name: 'Gaming', emoji: '🎮' },
]

export const CERTIFICATIONS: Certification[] = [
  { name: 'CompTIA Security+', icon: '🔐' },
  { name: 'CompTIA Linux+', icon: '🐧' },
  { name: 'CompTIA Cloud+', icon: '☁️' },
  { name: 'Top Secret Clearance', icon: '🛡️' },
]

export const EXPERIENCE: Experience[] = [
  {
    company: 'Booz Allen Hamilton',
    role: 'Mid-Level Full Stack Developer',
    period: 'May 2024 - Oct 2025',
    highlights: [
      'Developed secure government applications using React, Next.js, and TypeScript',
      'Built backend services and APIs with NestJS',
      'Implemented comprehensive unit testing for code reliability',
    ],
  },
  {
    company: 'Iva\'al Solutions',
    role: 'Mid-Level Full Stack Developer (Interim Team Lead)',
    period: 'Feb 2023 - May 2024',
    highlights: [
      'Led team integration of microservices with third-party systems',
      'Engineered dynamic dashboards with React and TypeScript',
      'Leveraged Terraform for infrastructure as code on AWS',
    ],
  },
  {
    company: 'Blue Halo',
    role: 'Full Stack Developer',
    period: 'Feb 2022 - Jan 2023',
    highlights: [
      'Built 3D browser-based real-time map with React and TypeScript',
      'Developed design system using molecular design methodology',
      'Maintained GitLab CI/CD pipelines for microservices',
    ],
  },
  {
    company: 'A.I. Solutions',
    role: 'Senior Software Engineer',
    period: 'Apr 2021 - Feb 2022',
    highlights: [
      'Product Owner for major system component in classified environment',
      'Automated system tasks with Linux scripts, improving efficiency by 20%',
      'Completed Security+ and Linux+ certifications 6 months early',
    ],
  },
  {
    company: 'SAIC',
    role: 'Software Engineer',
    period: 'Feb 2019 - Apr 2021',
    highlights: [
      'Developed C++ embedded software per DO-178C standards',
      'Rewrote printf function to be deterministic, eliminating memory leaks',
      'Led team and presented in Team Lead capacity when needed',
    ],
  },
]

export const aboutData = {
  name: 'Louis J. Filip',
  tagline: 'Full-Stack Developer | Defense & Cloud Specialist',
  avatar: '👨‍💻',
  location: 'Madison, AL',
  email: 'louisfilip@gmail.com',
  phone: '(256) 508-6304',
  bio: [
    'Welcome to my interactive portfolio! I\'m a full-stack developer with a passion for building secure, scalable applications. This virtual pet experience showcases my approach to React architecture, TypeScript, and delightful UX design.',
    'I specialize in modern web technologies with a strong focus on government and defense applications. From real-time 3D mapping systems to AWS cloud infrastructure, I build robust solutions that meet the highest security standards.',
    'My journey includes everything from embedded C++ development (DO-178C certified) to leading teams in React/TypeScript microservice architectures. I hold Security+, Linux+, and Cloud+ certifications, along with an active Top Secret clearance.',
    'Before transitioning to software engineering, I spent 10 years as a Lead Photographer, which taught me creative problem-solving, client communication, and attention to detail - skills that continue to enhance my development work today.',
  ],
  education: {
    school: 'University of Alabama in Huntsville',
    degree: 'B.S. Computer Science',
    graduated: 'December 2018',
    gpa: '3.54',
  },
  skills: [
    'TypeScript', 'React', 'Node.js', 'Next.js', 'NestJS',
    'AWS', 'Terraform', 'Docker', 'Kubernetes',
    'C++', 'Python', 'Java',
    'Unit Testing', 'CI/CD', 'GitLab', 'GitHub',
    'DO-178C', 'Security', 'DevOps',
  ],
}
