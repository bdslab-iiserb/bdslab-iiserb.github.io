// src/data/courses/advancedNlp.tsx
// ============================================================
// SINGLE SOURCE OF TRUTH FOR THE "ADVANCED NLP" COURSE PAGE.
// Teaching Assistants can update this page by editing ONLY this
// file. Every field below renders directly on the course page, so
// keep the data shapes valid (booleans stay true/false, numbers
// stay numbers, strings stay strings). Empty strings or empty
// arrays hide the corresponding section from the page.
// ============================================================

export interface CourseInstructor {
  name: string;
  email?: string;
  website?: string;
  title?: string;
}

export interface CourseAssistant {
  name: string;
  email?: string;
  role?: string;
}

export interface CourseLecture {
  week?: string;
  date?: string;
  topic: string;
  description?: string;
  slides?: string;
  reading?: string;
}

export interface CourseAssignment {
  title: string;
  dueDate?: string;
  status: 'Open' | 'Upcoming' | 'Closed';
  description?: string;
  link?: string;
}

export interface GradingComponent {
  component: string;
  weight: string;
}

export interface Textbook {
  title: string;
  authors?: string;
  link?: string;
}

export interface CourseAnnouncement {
  date: string;
  text: string;
}

export interface CourseInfo {
  slug: string;
  title: string;
  shortDescription: string;
  code?: string;
  semester?: string;
  credits?: string;
  instructor: CourseInstructor[];
  teachingAssistants: CourseAssistant[];
  overview: string;
  objectives: string[];
  prerequisites: string[];
  schedule: CourseLecture[];
  assignments: CourseAssignment[];
  grading: GradingComponent[];
  textbooks: Textbook[];
  announcements: CourseAnnouncement[];
  contactEmail?: string;
}

export const advancedNlpCourse: CourseInfo = {
  slug: 'advanced-nlp',
  title: 'Advanced Natural Language Processing',
  code: '',
  semester: 'Monsoon 2026',
  credits: '',
  shortDescription:
    'A deep dive into modern NLP covering neural language models, transformers, large language models and their applications to biomedical text.',
  instructor: [
    {
      name: 'Dr. Tanmay Basu',
      email: 'tanmay@iiserb.ac.in',
      title: 'Assistant Professor, DSE, IISER Bhopal',
      website: 'https://sites.google.com/view/tanmaybasu/'
    }
  ],
  teachingAssistants: [
    { name: 'Saisab Sadhu', email: 'saisa21@iiserb.ac.in', role: 'Head TA' },
    { name: 'Himadri Sonowal', email: 'himadri20@iiserb.ac.in', role: 'TA' },
    { name: 'Sumit Kumar', email: 'sumit23@iiserb.ac.in', role: 'TA' }
  ],
  overview:
    'This course covers the core ideas of modern natural language processing: from classical text representation and statistical models to neural sequence models, attention mechanisms, transformers and large language models. A significant part of the course focuses on NLP applications in the biomedical and clinical domain, including literature mining, retrieval-augmented generation and evidence synthesis.',
  objectives: [
    'Understand the mathematical and linguistic foundations of NLP.',
    'Implement and train modern neural language models, including transformers.',
    'Understand how large language models are trained, aligned and evaluated.',
    'Build end-to-end NLP pipelines for real-world biomedical and clinical text.',
    'Critically read and reproduce recent NLP research.'
  ],
  prerequisites: [
    'Python programming (numpy, pandas).',
    'Basics of machine learning (supervised learning, evaluation).',
    'Basic probability and linear algebra.',
    'Familiarity with PyTorch is helpful but not required.'
  ],
  schedule: [
    {
      week: 'Week 1',
      date: '',
      topic: 'Introduction to NLP and Text Processing',
      description: 'Course overview, text normalization, tokenization, n-grams.'
    },
    {
      week: 'Week 2',
      date: '',
      topic: 'Language Modelling I',
      description: 'N-gram language models, smoothing, perplexity.'
    },
    {
      week: 'Week 3',
      date: '',
      topic: 'Language Modelling II',
      description: 'Neural language models, word embeddings (word2vec, GloVe).'
    },
    {
      week: 'Week 4',
      date: '',
      topic: 'Sequence Labelling',
      description: 'HMMs, CRFs, POS tagging, named entity recognition.'
    },
    {
      week: 'Week 5',
      date: '',
      topic: 'Neural Sequence Models',
      description: 'RNNs, LSTMs, sequence-to-sequence models and attention.'
    },
    {
      week: 'Week 6',
      date: '',
      topic: 'Transformers',
      description: 'Self-attention, positional encodings, BERT-style pre-training.'
    },
    {
      week: 'Week 7',
      date: '',
      topic: 'Pre-trained Language Models',
      description: 'BERT, RoBERTa, T5 and transfer learning for downstream tasks.'
    },
    {
      week: 'Week 8',
      date: '',
      topic: 'Large Language Models',
      description: 'Scaling laws, instruction tuning, RLHF, alignment.'
    },
    {
      week: 'Week 9',
      date: '',
      topic: 'Retrieval-Augmented Generation',
      description: 'RAG pipelines, dense retrieval, knowledge conflicts.'
    },
    {
      week: 'Week 10',
      date: '',
      topic: 'NLP for Biomedical Text I',
      description: 'Biomedical entities, clinical notes, medical ontologies.'
    },
    {
      week: 'Week 11',
      date: '',
      topic: 'NLP for Biomedical Text II',
      description: 'Evidence synthesis, systematic reviews, PICO extraction.'
    },
    {
      week: 'Week 12',
      date: '',
      topic: 'Project Presentations',
      description: 'Course project demos and wrap-up.'
    }
  ],
  assignments: [
    {
      title: 'Assignment 1: Text Preprocessing and n-gram Models',
      dueDate: '',
      status: 'Open',
      description: 'Implement a text preprocessing pipeline and an n-gram language model with smoothing from scratch.',
      link: ''
    },
    {
      title: 'Assignment 2: Fine-tuning a Transformer',
      dueDate: '',
      status: 'Upcoming',
      description: 'Fine-tune a pre-trained transformer for a downstream classification task and compare with classical baselines.',
      link: ''
    },
    {
      title: 'Course Project',
      dueDate: '',
      status: 'Upcoming',
      description: 'Group project applying NLP to a biomedical problem, with a final presentation and report.',
      link: ''
    }
  ],
  grading: [
    { component: 'Assignments', weight: '30%' },
    { component: 'Course Project', weight: '40%' },
    { component: 'Final Examination', weight: '30%' }
  ],
  textbooks: [
    {
      title: 'Speech and Language Processing',
      authors: 'Dan Jurafsky and James H. Martin',
      link: 'https://web.stanford.edu/~jurafsky/slp3/'
    },
    {
      title: 'Introduction to Natural Language Processing',
      authors: 'Jacob Eisenstein',
      link: 'https://github.com/jacobeisenstein/gt-nlp-class'
    },
    {
      title: 'Attention Is All You Need',
      authors: 'Vaswani et al., 2017',
      link: 'https://arxiv.org/abs/1706.03762'
    }
  ],
  announcements: [
    {
      date: '2026-08-01',
      text: 'Welcome to Advanced NLP. The course page will be updated regularly with lecture slides and materials.'
    }
  ],
  contactEmail: 'saisa21@iiserb.ac.in'
};
