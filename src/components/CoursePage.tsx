// src/components/CoursePage.tsx
// Standalone academic-style renderer for a course, deliberately kept
// visually separate from the rest of the lab site (no shared Navbar,
// no lab-site gradients/motion cards) so it reads like a self-contained
// course page (in the spirit of Stanford/MIT OpenCourseWare pages)
// rather than another section of the lab's marketing site. It still
// carries its own restrained color system so it doesn't read as bare
// black-and-white text.
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText, GraduationCap, Info, Mail, UserRound } from 'lucide-react';
import type { CourseInfo, CoursePhase } from '../data/courses/advancedNlp';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-200 pb-3 mb-6">
      {children}
    </h2>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center min-w-[92px]">
      <div className="font-serif text-xl font-semibold text-white">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-white/70">{label}</div>
    </div>
  );
}

const tagStyle: Record<string, { bg: string; text: string; label: string }> = {
  core: { bg: '#1baf7a1f', text: '#0f7a52', label: 'Core' },
  lab: { bg: '#eb68341f', text: '#a8461c', label: 'Hands-on' },
  key: { bg: '#e87ba41f', text: '#a4426a', label: 'Key session' },
  iiserb: { bg: '#e349481f', text: '#a8302f', label: 'IISERB focus' }
};

function TrackChart({ course }: { course: CourseInfo }) {
  const totals = course.tracks.map((track) => ({
    ...track,
    count: course.phases
      .filter((phase) => phase.track === track.id)
      .reduce((sum, phase) => sum + phase.sessions.length, 0)
  }));
  const total = totals.reduce((sum, t) => sum + t.count, 0);
  if (total === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex gap-[2px] h-6 rounded overflow-hidden">
        {totals.map((t) => (
          <div
            key={t.id}
            style={{ backgroundColor: t.color, width: `${(t.count / total) * 100}%` }}
            title={`${t.label}: ${t.count} sessions`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
        {totals.map((t) => (
          <div key={t.id} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: t.color }} />
            <span className="text-stone-700">{t.label}</span>
            <span className="text-stone-400">· {t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseBlock({ phase, trackColor }: { phase: CoursePhase; trackColor: string }) {
  return (
    <details className="group py-4 pl-4 -ml-4 border-l-[3px]" style={{ borderColor: trackColor }} open={phase.core}>
      <summary className="flex items-center gap-3 cursor-pointer list-none">
        <span
          className="flex-shrink-0 text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: trackColor }}
        >
          {phase.id}
        </span>
        <span className="font-serif text-lg font-medium text-stone-900 flex-1">{phase.label}</span>
        {phase.core && (
          <span className="text-xs font-medium text-red-800 border border-red-800/30 bg-red-50 rounded-full px-2 py-0.5">
            Core focus
          </span>
        )}
        <span className="text-sm text-stone-400 whitespace-nowrap">
          {phase.sessions.length} session{phase.sessions.length !== 1 ? 's' : ''}
        </span>
        <span className="text-stone-400 transition-transform group-open:rotate-90">›</span>
      </summary>
      {phase.note && <p className="text-sm text-stone-500 italic mt-2 ml-9">{phase.note}</p>}
      <ol className="mt-4 ml-9 space-y-4">
        {phase.sessions.map((session) => (
          <li key={session.code} className="flex gap-4">
            <span className="text-xs font-mono text-stone-400 pt-0.5 whitespace-nowrap">{session.code}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-stone-900">{session.title}</span>
                {session.tag && (
                  <span
                    className="text-[11px] font-medium rounded px-1.5 py-0.5"
                    style={{ backgroundColor: tagStyle[session.tag].bg, color: tagStyle[session.tag].text }}
                  >
                    {tagStyle[session.tag].label}
                  </span>
                )}
              </div>
              {session.detail && <p className="text-stone-600 text-sm leading-relaxed mt-1">{session.detail}</p>}
              {(session.slides || session.reading) && (
                <div className="flex gap-4 mt-1.5">
                  {session.slides && (
                    <a
                      href={session.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                      style={{ color: tagStyle.core.text }}
                    >
                      <FileText size={12} />
                      Slides
                    </a>
                  )}
                  {session.reading && (
                    <a
                      href={session.reading}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                      style={{ color: tagStyle.key.text }}
                    >
                      <ExternalLink size={12} />
                      Reading
                    </a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

export default function CoursePage({ course }: { course: CourseInfo }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const totalSessions = course.phases.reduce((sum, phase) => sum + phase.sessions.length, 0);
  const coreSessions = course.phases
    .filter((phase) => phase.core)
    .reduce((sum, phase) => sum + phase.sessions.length, 0);
  const trackColor = (trackId: string) => course.tracks.find((t) => t.id === trackId)?.color ?? '#78716c';

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
    <div className="min-h-screen bg-[#f9f9f7] text-stone-900">
      {/* Minimal back-link bar, replaces the lab site's Navbar on this page */}
      <div className="border-b border-stone-200 bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft size={14} />
            BDS Lab, IISER Bhopal
          </Link>
          <span className="text-stone-400 hidden sm:inline">Department of Data Science and Engineering</span>
        </div>
      </div>

      {/* Header banner — deep, restrained color instead of the lab's cyan/blue gradient */}
      <header
        className="py-14 px-6"
        style={{ background: 'linear-gradient(135deg, #211a4a 0%, #342a6b 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-wide text-white/70 uppercase mb-3">
            {[course.code, course.semester].filter(Boolean).join(' · ') || 'Course'}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-white mb-5">
            {course.title}
          </h1>
          {course.shortDescription && (
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-6">{course.shortDescription}</p>
          )}
          {course.instructor.length > 0 && (
            <p className="text-white/90 mb-8">
              <span className="text-white/60">Instructor:</span>{' '}
              {course.instructor.map((person, index) => (
                <span key={person.name}>
                  {index > 0 && ', '}
                  {person.website ? (
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                    >
                      {person.name}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{person.name}</span>
                  )}
                </span>
              ))}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <StatChip value={String(totalSessions)} label="Sessions" />
            <StatChip value={String(course.tracks.length)} label="Tracks" />
            <StatChip value={String(coreSessions)} label="Core sessions" />
            {course.credits && <StatChip value={course.credits} label="Credits" />}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        {/* Advanced-course / prerequisite callout */}
        {course.advancedNote && (
          <div className="flex gap-3 bg-[#eeecfa] border border-[#4a3aa7]/25 rounded-lg px-5 py-4 mt-8">
            <Info size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#4a3aa7' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#2f2566' }}>
              {course.advancedNote}
            </p>
          </div>
        )}

        {/* In-page nav */}
        <nav className="sticky top-0 bg-[#f9f9f7]/95 backdrop-blur border-b border-stone-200 py-3 mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm z-10">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-stone-500 hover:text-stone-900 transition-colors">
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
                        <span style={{ color: '#2a78d6' }} className="select-none">
                          —
                        </span>
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
                        <span style={{ color: '#4a3aa7' }} className="select-none">
                          —
                        </span>
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
              <p className="text-stone-500 text-sm mb-4">
                {totalSessions} sessions across {course.phases.length} units, grouped into {course.tracks.length}{' '}
                tracks. Expand a unit for session-by-session detail.
              </p>
              <TrackChart course={course} />
              <div className="divide-y divide-stone-200 border-y border-stone-200">
                {course.phases.map((phase) => (
                  <PhaseBlock key={phase.id} phase={phase} trackColor={trackColor(phase.track)} />
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
                        {assignment.dueDate && <span className="text-sm text-stone-500">Due {assignment.dueDate}</span>}
                        {assignment.link && (
                          <a
                            href={assignment.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm hover:underline"
                            style={{ color: '#2a78d6' }}
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
                        className="font-medium hover:underline"
                        style={{ color: '#2a78d6' }}
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
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: '#eeecfa' }}
                  >
                    <GraduationCap style={{ color: '#4a3aa7' }} size={28} />
                  </div>
                  <p className="font-medium text-stone-900">{person.name}</p>
                  {person.title && <p className="text-sm text-stone-500 mb-2">{person.title}</p>}
                  <div className="flex flex-wrap gap-3 text-sm">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1 hover:underline"
                        style={{ color: '#2a78d6' }}
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
                        className="inline-flex items-center gap-1 hover:underline"
                        style={{ color: '#2a78d6' }}
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
                      className="inline-flex items-center gap-1 text-sm hover:underline"
                      style={{ color: '#2a78d6' }}
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
              <a href={`mailto:${course.contactEmail}`} className="hover:underline" style={{ color: '#2a78d6' }}>
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
