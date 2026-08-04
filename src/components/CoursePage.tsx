// src/components/CoursePage.tsx
// Standalone academic-style renderer for a course, deliberately kept
// visually separate from the rest of the lab site (no shared Navbar,
// no gradients/motion cards) so it reads like a self-contained course
// page (in the spirit of Stanford/MIT OpenCourseWare pages) rather
// than another section of the lab's marketing site.
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail, UserRound } from 'lucide-react';
import type { CourseInfo } from '../data/courses/advancedNlp';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-200 pb-3 mb-6">
      {children}
    </h2>
  );
}

const tagLabel: Record<string, string> = {
  core: 'Core',
  lab: 'Hands-on',
  key: 'Key session',
  iiserb: 'IISERB focus'
};

export default function CoursePage({ course }: { course: CourseInfo }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const totalSessions = course.phases.reduce((sum, phase) => sum + phase.sessions.length, 0);

  const navItems = [
    course.announcements.length > 0 && { id: 'announcements', label: 'Announcements' },
    course.overview && { id: 'overview', label: 'Overview' },
    (course.objectives.length > 0 || course.prerequisites.length > 0) && { id: 'objectives', label: 'Objectives' },
    course.phases.length > 0 && { id: 'syllabus', label: 'Syllabus' },
    course.assignments.length > 0 && { id: 'assignments', label: 'Assignments' },
    course.grading.length > 0 && { id: 'grading', label: 'Grading' },
    course.textbooks.length > 0 && { id: 'resources', label: 'Resources' },
    { id: 'staff', label: 'Staff' }
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Minimal back-link bar, replaces the lab site's Navbar on this page */}
      <div className="border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft size={14} />
            BDS Lab, IISER Bhopal
          </Link>
          <span className="text-stone-400 hidden sm:inline">
            Department of Data Science and Engineering
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="pt-14 pb-10 border-b border-stone-200">
          <p className="text-sm font-medium tracking-wide text-stone-500 uppercase mb-3">
            {[course.code, course.semester].filter(Boolean).join(' · ') || 'Course'}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-5">
            {course.title}
          </h1>
          {course.shortDescription && (
            <p className="text-lg text-stone-600 leading-relaxed max-w-3xl mb-6">
              {course.shortDescription}
            </p>
          )}
          {course.instructor.length > 0 && (
            <p className="text-stone-700">
              <span className="text-stone-500">Instructor:</span>{' '}
              {course.instructor.map((person, index) => (
                <span key={person.name}>
                  {index > 0 && ', '}
                  {person.website ? (
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600"
                    >
                      {person.name}
                    </a>
                  ) : (
                    <span className="font-medium text-stone-900">{person.name}</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </header>

        {/* In-page nav */}
        <nav className="sticky top-0 bg-white/95 backdrop-blur border-b border-stone-200 py-3 flex flex-wrap gap-x-6 gap-y-1 text-sm z-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="py-12 space-y-16">
          {/* Announcements */}
          {course.announcements.length > 0 && (
            <section id="announcements" className="scroll-mt-16">
              <SectionTitle>Announcements</SectionTitle>
              <div className="space-y-5">
                {course.announcements.map((announcement, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-sm text-stone-400 font-mono whitespace-nowrap pt-0.5">
                      {announcement.date}
                    </span>
                    <p className="text-stone-700 leading-relaxed">{announcement.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Overview */}
          {course.overview && (
            <section id="overview" className="scroll-mt-16">
              <SectionTitle>Overview</SectionTitle>
              <p className="text-stone-700 leading-relaxed text-[17px]">{course.overview}</p>
            </section>
          )}

          {/* Objectives & Prerequisites */}
          {(course.objectives.length > 0 || course.prerequisites.length > 0) && (
            <section id="objectives" className="scroll-mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              {course.objectives.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-4">Learning Objectives</h3>
                  <ul className="space-y-2.5">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex gap-3 text-stone-700 leading-relaxed">
                        <span className="text-stone-300 select-none">—</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {course.prerequisites.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-4">Prerequisites</h3>
                  <ul className="space-y-2.5">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex gap-3 text-stone-700 leading-relaxed">
                        <span className="text-stone-300 select-none">—</span>
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Syllabus */}
          {course.phases.length > 0 && (
            <section id="syllabus" className="scroll-mt-16">
              <SectionTitle>Syllabus</SectionTitle>
              <p className="text-stone-500 text-sm mb-6">
                {totalSessions} sessions across {course.phases.length} units. Expand a unit for session-by-session detail.
              </p>
              <div className="divide-y divide-stone-200 border-y border-stone-200">
                {course.phases.map((phase) => (
                  <details key={phase.id} className="group py-4" open={phase.core}>
                    <summary className="flex items-center gap-3 cursor-pointer list-none">
                      <span
                        className={
                          'flex-shrink-0 text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center border ' +
                          (phase.core
                            ? 'border-red-900 text-red-900'
                            : 'border-stone-300 text-stone-500')
                        }
                      >
                        {phase.id}
                      </span>
                      <span className="font-serif text-lg font-medium text-stone-900 flex-1">
                        {phase.label}
                      </span>
                      {phase.core && (
                        <span className="text-xs font-medium text-red-900 border border-red-900/40 rounded-full px-2 py-0.5">
                          Core focus
                        </span>
                      )}
                      <span className="text-sm text-stone-400 whitespace-nowrap">
                        {phase.sessions.length} session{phase.sessions.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-stone-400 transition-transform group-open:rotate-90">›</span>
                    </summary>
                    {phase.note && (
                      <p className="text-sm text-stone-500 italic mt-2 ml-9">{phase.note}</p>
                    )}
                    <ol className="mt-4 ml-9 space-y-4">
                      {phase.sessions.map((session) => (
                        <li key={session.code} className="flex gap-4">
                          <span className="text-xs font-mono text-stone-400 pt-0.5 whitespace-nowrap">
                            {session.code}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-stone-900">{session.title}</span>
                              {session.tag && (
                                <span className="text-[11px] uppercase tracking-wide text-stone-500 border border-stone-300 rounded px-1.5 py-0.5">
                                  {tagLabel[session.tag] ?? session.tag}
                                </span>
                              )}
                            </div>
                            {session.detail && (
                              <p className="text-stone-600 text-sm leading-relaxed mt-1">{session.detail}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Assignments */}
          {course.assignments.length > 0 && (
            <section id="assignments" className="scroll-mt-16">
              <SectionTitle>Assignments</SectionTitle>
              <div className="divide-y divide-stone-200 border-y border-stone-200">
                {course.assignments.map((assignment, index) => (
                  <div key={index} className="py-4 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                    <div className="md:w-24 flex-shrink-0 text-xs uppercase tracking-wide text-stone-500">
                      {assignment.status}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-medium text-stone-900">{assignment.title}</span>
                        {assignment.dueDate && (
                          <span className="text-sm text-stone-500">Due {assignment.dueDate}</span>
                        )}
                        {assignment.link && (
                          <a
                            href={assignment.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-900 hover:underline"
                          >
                            <ExternalLink size={12} />
                            View
                          </a>
                        )}
                      </div>
                      {assignment.description && (
                        <p className="text-stone-600 text-sm leading-relaxed mt-1">{assignment.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Grading */}
          {course.grading.length > 0 && (
            <section id="grading" className="scroll-mt-16">
              <SectionTitle>Grading</SectionTitle>
              <table className="w-full max-w-md text-left">
                <tbody className="divide-y divide-stone-200">
                  {course.grading.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2.5 text-stone-700">{item.component}</td>
                      <td className="py-2.5 text-stone-900 font-medium text-right">{item.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Resources */}
          {course.textbooks.length > 0 && (
            <section id="resources" className="scroll-mt-16">
              <SectionTitle>Textbooks &amp; Resources</SectionTitle>
              <ul className="space-y-3">
                {course.textbooks.map((book, index) => (
                  <li key={index}>
                    {book.link ? (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900 hover:underline font-medium"
                      >
                        {book.title}
                      </a>
                    ) : (
                      <span className="font-medium text-stone-900">{book.title}</span>
                    )}
                    {book.authors && <span className="text-stone-500"> — {book.authors}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Staff */}
          <section id="staff" className="scroll-mt-16">
            <SectionTitle>Staff</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {course.instructor.map((person) => (
                <div key={person.name}>
                  <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mb-3">
                    <UserRound className="text-stone-400" size={28} />
                  </div>
                  <p className="font-medium text-stone-900">{person.name}</p>
                  {person.title && <p className="text-sm text-stone-500 mb-2">{person.title}</p>}
                  <div className="flex flex-wrap gap-3 text-sm">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1 text-blue-900 hover:underline"
                      >
                        <Mail size={13} />
                        Email
                      </a>
                    )}
                    {person.website && (
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-900 hover:underline"
                      >
                        <ExternalLink size={13} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {course.teachingAssistants.map((ta, index) => (
                <div key={`${ta.name}-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mb-3">
                    <UserRound className="text-stone-300" size={28} />
                  </div>
                  <p className={'font-medium ' + (ta.placeholder ? 'text-stone-400 italic' : 'text-stone-900')}>
                    {ta.name}
                  </p>
                  {ta.role && <p className="text-sm text-stone-500 mb-2">{ta.role}</p>}
                  {ta.email && (
                    <a
                      href={`mailto:${ta.email}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-900 hover:underline"
                    >
                      <Mail size={13} />
                      Email
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          {course.contactEmail && (
            <section className="border-t border-stone-200 pt-8 pb-4 text-sm text-stone-500">
              For course-related queries, contact{' '}
              <a href={`mailto:${course.contactEmail}`} className="text-blue-900 hover:underline">
                {course.contactEmail}
              </a>
              .
            </section>
          )}
        </div>
      </div>

      <footer className="border-t border-stone-200 py-8 mt-4">
        <div className="max-w-4xl mx-auto px-6 text-sm text-stone-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>Biomedical Data Science Lab · IISER Bhopal</span>
          <Link to="/courses" className="hover:text-stone-700 transition-colors">
            All courses →
          </Link>
        </div>
      </footer>
    </div>
  );
}
