import { aboutData, INTERESTS, CERTIFICATIONS, EXPERIENCE } from './aboutData'

export const AboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-8xl mb-4">{aboutData.avatar}</div>
        <h1 className="text-5xl font-bold text-green-800 dark:text-green-400 mb-3">
          {aboutData.name}
        </h1>
        <p className="text-xl text-green-700 dark:text-green-300 mb-4">{aboutData.tagline}</p>
        <div className="flex items-center justify-center gap-6 text-green-700 dark:text-green-300">
          <span>📍 {aboutData.location}</span>
          <a
            href={`mailto:${aboutData.email}`}
            className="hover:text-green-900 dark:hover:text-green-100 transition-colors"
          >
            ✉️ {aboutData.email}
          </a>
        </div>
      </div>

      {/* Bio Card */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-4 border-green-200 dark:border-green-700 rounded-3xl p-8 mb-12 shadow-xl">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6">About Me</h2>
        <div className="space-y-4">
          {aboutData.bio.map((paragraph, index) => (
            <p key={index} className="text-green-900 dark:text-green-100 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 text-center">
          Certifications & Clearances
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-3 border-green-200 dark:border-green-700 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-green-400 dark:hover:border-green-500"
            >
              <div className="text-5xl mb-3">{cert.icon}</div>
              <div className="font-semibold text-green-800 dark:text-green-300 text-sm">
                {cert.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 text-center">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {EXPERIENCE.map((job, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-3 border-green-200 dark:border-green-700 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:border-green-400 dark:hover:border-green-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-400">
                    {job.company}
                  </h3>
                  <p className="text-green-700 dark:text-green-300 font-semibold">{job.role}</p>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm md:text-base mt-2 md:mt-0">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-2">
                {job.highlights.map((highlight, hIndex) => (
                  <li
                    key={hIndex}
                    className="text-green-900 dark:text-green-100 flex items-start gap-2"
                  >
                    <span className="text-green-500 dark:text-green-400 mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 text-center">
          Technical Skills
        </h2>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-3 border-green-200 dark:border-green-700 rounded-2xl p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {aboutData.skills.map((skill) => (
              <span
                key={skill}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-semibold text-sm border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-200 dark:hover:bg-green-800 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 text-center">
          Education
        </h2>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-3 border-green-200 dark:border-green-700 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400">
            {aboutData.education.degree}
          </h3>
          <p className="text-green-700 dark:text-green-300 font-semibold">
            {aboutData.education.school}
          </p>
          <p className="text-green-600 dark:text-green-400">
            Graduated {aboutData.education.graduated} • GPA: {aboutData.education.gpa}
          </p>
        </div>
      </div>

      {/* Interests Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 text-center">
          Interests & Hobbies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {INTERESTS.map((interest) => (
            <div
              key={interest.name}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-3 border-green-200 dark:border-green-700 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-green-400 dark:hover:border-green-500"
            >
              <div className="text-5xl mb-3">{interest.emoji}</div>
              <div className="font-semibold text-green-800 dark:text-green-300">{interest.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
