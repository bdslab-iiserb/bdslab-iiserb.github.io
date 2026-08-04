// src/components/CoursePage.tsx
// Generic renderer for a course. It renders everything from a
// CourseInfo object, so adding a new course only means creating a
// data file and a thin page (see src/pages/Courses/AdvancedNLP.tsx).
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers,
  Link2,
  Mail,
  Megaphone,
  Target,
  Users
} from 'lucide-react';
import type { CourseInfo } from '../data/courses/advancedNlp';
import { cn } from '../utils/cn';

function SectionHeading({
  icon,
  title
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
      <span className="text-blue-600">{icon}</span>
      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
  );
}

const statusStyles: Record<string, string> = {
  Open: 'bg-green-100 text-green-700 border-green-300',
  Upcoming: 'bg-amber-100 text-amber-700 border-amber-300',
  Closed: 'bg-gray-100 text-gray-600 border-gray-300'
};

export default function CoursePage({ course }: { course: CourseInfo }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          All Courses
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-700 text-white rounded-2xl p-8 md:p-12 shadow-2xl mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {course.code && (
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                <GraduationCap size={16} />
                {course.code}
              </span>
            )}
            {course.semester && (
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                <Calendar size={16} />
                {course.semester}
              </span>
            )}
            {course.credits && (
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                <Award size={16} />
                {course.credits} Credits
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
          {course.shortDescription && (
            <p className="text-white/90 text-lg md:text-xl max-w-4xl leading-relaxed">
              {course.shortDescription}
            </p>
          )}
        </motion.div>

        {/* Instructor & TAs */}
        {(course.instructor.length > 0 || course.teachingAssistants.length > 0) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <SectionHeading icon={<Users size={28} />} title="Instructor & Teaching Assistants" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {course.instructor.map((person) => (
                <div
                  key={person.name}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{person.name}</h3>
                  {person.title && <p className="text-gray-600 text-sm mb-3">{person.title}</p>}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Mail size={14} />
                        Email
                      </a>
                    )}
                    {person.website && (
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <ExternalLink size={14} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {course.teachingAssistants.map((ta) => (
                <div
                  key={ta.name}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{ta.name}</h3>
                  {ta.role && <p className="text-gray-600 text-sm mb-3">{ta.role}</p>}
                  {ta.email && (
                    <a
                      href={`mailto:${ta.email}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Announcements */}
        {course.announcements.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <SectionHeading icon={<Megaphone size={28} />} title="Announcements" />
            <div className="space-y-4">
              {course.announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-600"
                >
                  <p className="text-sm text-gray-500 mb-2">{announcement.date}</p>
                  <p className="text-gray-800 leading-relaxed">{announcement.text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Overview */}
        {course.overview && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <SectionHeading icon={<BookOpen size={28} />} title="Course Overview" />
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-lg">{course.overview}</p>
            </div>
          </motion.section>
        )}

        {/* Objectives & Prerequisites */}
        {(course.objectives.length > 0 || course.prerequisites.length > 0) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.objectives.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <Target className="text-blue-600" size={22} />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-3">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {course.prerequisites.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <Layers className="text-blue-600" size={22} />
                    Prerequisites
                  </h3>
                  <ul className="space-y-3">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Schedule */}
        {course.schedule.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <SectionHeading icon={<Clock size={28} />} title="Schedule & Lectures" />
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                        Week
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                        Topic
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                        Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                        Materials
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {course.schedule.map((lecture, index) => (
                      <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {lecture.week}
                          {lecture.date && (
                            <div className="text-xs text-gray-500 font-normal">{lecture.date}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{lecture.topic}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lecture.description || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex flex-col gap-1">
                            {lecture.slides && (
                              <a
                                href={lecture.slides}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                              >
                                <FileText size={14} />
                                Slides
                              </a>
                            )}
                            {lecture.reading && (
                              <a
                                href={lecture.reading}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-800 font-medium"
                              >
                                <Link2 size={14} />
                                Reading
                              </a>
                            )}
                            {!lecture.slides && !lecture.reading && <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        )}

        {/* Assignments */}
        {course.assignments.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
          >
            <SectionHeading icon={<ClipboardList size={28} />} title="Assignments" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
                    <span
                      className={cn(
                        'flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full border',
                        statusStyles[assignment.status]
                      )}
                    >
                      {assignment.status}
                    </span>
                  </div>
                  {assignment.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {assignment.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    {assignment.dueDate && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} />
                        Due: {assignment.dueDate}
                      </p>
                    )}
                    {assignment.link && (
                      <a
                        href={assignment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <ExternalLink size={14} />
                        View Assignment
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Grading */}
        {course.grading.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <SectionHeading icon={<Award size={28} />} title="Grading Scheme" />
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden max-w-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                      Component
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-800 uppercase tracking-wide">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {course.grading.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.component}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{item.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}

        {/* Textbooks & Resources */}
        {course.textbooks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-12"
          >
            <SectionHeading icon={<BookOpen size={28} />} title="Textbooks & Resources" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {course.textbooks.map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h3>
                  {book.authors && <p className="text-gray-600 text-sm mb-4">{book.authors}</p>}
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      <ExternalLink size={14} />
                      Open Resource
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact */}
        {course.contactEmail && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-700 text-white rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <Mail className="text-cyan-300" size={28} />
              Course Queries
            </h2>
            <p className="text-white/90 mb-6">
              For course related questions, reach out to the course team.
            </p>
            <a
              href={`mailto:${course.contactEmail}`}
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <Mail size={18} />
              {course.contactEmail}
            </a>
          </motion.section>
        )}
      </div>
    </div>
  );
}
