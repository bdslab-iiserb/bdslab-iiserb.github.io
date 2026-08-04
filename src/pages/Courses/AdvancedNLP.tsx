// src/pages/Courses/AdvancedNLP.tsx
// Thin wrapper page. All content lives in the course data file:
// src/data/courses/advancedNlp.tsx
import CoursePage from '../../components/CoursePage';
import { advancedNlpCourse } from '../../data/courses/advancedNlp';

export default function AdvancedNLP() {
  return <CoursePage course={advancedNlpCourse} />;
}
