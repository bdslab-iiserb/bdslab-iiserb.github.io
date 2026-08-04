// src/data/courses/index.ts
// Registry of all courses shown on the /courses page.
// Add a new course here after creating its data file to list it.
import { advancedNlpCourse, type CourseInfo } from './advancedNlp';

export const courses: CourseInfo[] = [advancedNlpCourse];

export function getCourseBySlug(slug: string): CourseInfo | undefined {
  return courses.find((course) => course.slug === slug);
}
