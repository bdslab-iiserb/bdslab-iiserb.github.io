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
  placeholder?: boolean;
}

export interface CourseSession {
  code: string;
  title: string;
  detail?: string;
  tag?: 'core' | 'lab' | 'key' | 'iiserb';
}

export interface CoursePhase {
  id: string;
  label: string;
  note?: string;
  core?: boolean;
  sessions: CourseSession[];
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
  phases: CoursePhase[];
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
    'A 30-session graduate course tracing NLP from its rule-based origins through statistical and neural methods to attention, Transformers, large language models and agentic systems, with a dedicated focus on Indic and low-resource NLP.',
  instructor: [
    {
      name: 'Dr. Tanmay Basu',
      email: 'tanmay@iiserb.ac.in',
      title: 'Assistant Professor, Department of Data Science and Engineering, IISER Bhopal',
      website: 'https://sites.google.com/view/tanmaybasu/'
    }
  ],
  teachingAssistants: [
    { name: 'To be announced', role: 'Head Teaching Assistant', placeholder: true },
    { name: 'To be announced', role: 'Teaching Assistant', placeholder: true }
  ],
  overview:
    'This course traces the arc of Natural Language Processing from rule-based and statistical beginnings through neural sequence models to attention, Transformers and large language models. Roughly a fifth of the course is devoted entirely to attention mechanisms and the Transformer architecture — the mathematical core that underlies virtually every modern NLP system — building from first principles up to a from-scratch implementation. The second half of the course covers pretraining at scale, prompting and in-context learning, core NLP tasks, low-resource and Indic NLP, multimodal and efficient LLMs, and closes with retrieval-augmented generation and agentic systems.',
  objectives: [
    'Trace the historical arc of NLP from symbolic and statistical methods to neural and LLM-based approaches.',
    'Derive and implement scaled dot-product and multi-head self-attention, and build a Transformer block from scratch.',
    'Understand how large language models are pretrained, adapted (fine-tuning, PEFT, RLHF/DPO) and prompted.',
    'Apply NLP methods to core tasks: sequence labelling, machine translation, question answering and summarization.',
    'Understand the specific challenges of low-resource and Indic language NLP.',
    'Understand modern systems built on LLMs: multimodal models, efficient inference, RAG and autonomous agents.',
    'Critically read and reproduce recent NLP research.'
  ],
  prerequisites: [
    'Python programming (numpy, pandas).',
    'Basics of machine learning (supervised learning, evaluation).',
    'Basic probability, linear algebra and calculus.',
    'Familiarity with PyTorch is helpful but not required.'
  ],
  phases: [
    {
      id: 'A',
      label: 'History of NLP',
      note: 'Full arc: rules → stats → neural → LLMs',
      sessions: [
        {
          code: 'L1',
          title: 'Rule-based and symbolic era',
          detail:
            'ELIZA, SHRDLU, hand-crafted grammars; parse trees; expert systems; why symbolic AI worked on toy problems and broke in the wild — the brittleness problem.'
        },
        {
          code: 'L2',
          title: 'Statistical NLP and the first neural wave',
          detail:
            'N-gram language models; HMMs for POS/NER; CRFs; SMT; then feedforward neural nets, Word2Vec, GloVe — distributional semantics and why embeddings changed everything.'
        },
        {
          code: 'L3',
          title: 'From sequence models to the LLM era',
          detail:
            'RNNs → attention → Transformers → BERT → GPT-3 → ChatGPT → GPT-4 → agents; key paradigm shifts; what "understanding" means at each stage; open questions today.'
        }
      ]
    },
    {
      id: 'B',
      label: 'Foundations — Text, Tokens, Embeddings',
      note: 'Ground truth before the architectures',
      sessions: [
        {
          code: 'L4',
          title: 'Tokenization and language model basics',
          detail:
            'Why whitespace splitting fails; BPE (byte-pair encoding) — the merge algorithm step by step; WordPiece; SentencePiece; how tokenization breaks for Hindi, Tamil, Arabic; perplexity as a metric.'
        },
        {
          code: 'L5',
          title: 'Word2Vec — deep dive',
          detail:
            'Distributional hypothesis; skip-gram and CBOW objectives; negative sampling; the embedding matrix; what the geometry of learned vectors means; analogical reasoning (king − man + woman).'
        },
        {
          code: 'L6',
          title: 'GloVe, FastText and the geometry of meaning',
          detail:
            'GloVe: co-occurrence matrices + log-bilinear model; FastText: subword embeddings and why they help morphology; evaluating static embeddings; bias and debiasing; limits of static representations.'
        }
      ]
    },
    {
      id: 'C',
      label: 'Sequence Models — The Road to Attention',
      note: 'Context for why attention was invented',
      sessions: [
        {
          code: 'L7',
          title: 'RNNs, LSTMs and GRUs',
          detail:
            'Vanilla RNN and the vanishing gradient problem; LSTM forget/input/output gates — how they fix it mathematically; GRU simplification; limitations at long range; why none of this scaled.'
        },
        {
          code: 'L8',
          title: 'Seq2Seq and the alignment problem',
          detail:
            'Encoder-decoder for machine translation; information bottleneck in the fixed-length vector; beam search; BLEU; Bahdanau attention — the alignment matrix as a window into what the model "looks at".'
        }
      ]
    },
    {
      id: 'D',
      label: 'Attention Mechanisms and Transformers',
      note: 'The heart of the course — 6 sessions',
      core: true,
      sessions: [
        {
          code: 'L9',
          title: 'Attention — from alignment to self-attention',
          tag: 'core',
          detail:
            'Bahdanau recap; Luong (general, dot, concat); the key generalisation: query, key, value; attention as soft retrieval; why self-attention (attending to your own sequence) is the breakthrough.'
        },
        {
          code: 'L10',
          title: 'Scaled dot-product attention — mathematical deep dive',
          tag: 'core',
          detail:
            'QKV matrices in full; scaled dot-product: why we divide by √d_k; the softmax bottleneck; masking (padding mask, causal mask); complexity O(n²·d); visualising attention weights.'
        },
        {
          code: 'L11',
          title: 'Multi-head attention and the full Transformer block',
          tag: 'core',
          detail:
            'Why multiple heads? Each head specialises on different relations; concatenation + projection; one full Transformer layer: MHA → Add+Norm → FFN → Add+Norm; sinusoidal positional encoding.'
        },
        {
          code: 'L12',
          title: 'Transformer architecture end-to-end',
          tag: 'core',
          detail:
            'Encoder stack, decoder stack, cross-attention; full "Attention Is All You Need" walkthrough; encoder-only vs decoder-only vs encoder-decoder: what changes and why.'
        },
        {
          code: 'L13',
          title: 'Modern Transformer engineering',
          tag: 'core',
          detail:
            'RoPE (rotary positional embedding); RMSNorm vs LayerNorm; Grouped-Query Attention (GQA); FlashAttention: IO-aware exact attention; KV caching at inference.'
        },
        {
          code: 'L14',
          title: 'Build a Transformer from scratch — hands-on',
          tag: 'lab',
          detail:
            'Implement scaled dot-product attention, multi-head attention, positional encoding, one full encoder block in PyTorch; train a miniature language model; inspect attention maps.'
        }
      ]
    },
    {
      id: 'E',
      label: 'Pretraining at Scale',
      note: 'The paradigm shift: pretrain once, adapt everywhere',
      sessions: [
        {
          code: 'L15',
          title: 'BERT and the encoder family',
          detail:
            'Masked language model (MLM) and NSP objectives; fine-tuning paradigm; why bidirectionality matters; RoBERTa, ALBERT, DistilBERT.'
        },
        {
          code: 'L16',
          title: 'GPT series and autoregressive language models',
          detail:
            'Left-to-right autoregressive LM; GPT → GPT-2 → GPT-3; T5 and BART; how decoder-only models came to dominate; emergent abilities at scale.'
        },
        {
          code: 'L17',
          title: 'Pretraining at scale — data, compute and laws',
          detail:
            'Data curation and deduplication (CommonCrawl → FineWeb); scaling laws (Kaplan 2020); Chinchilla — optimal token-to-parameter ratio; LLaMA, Mistral, Falcon.'
        },
        {
          code: 'L18',
          title: 'Adapting pretrained models',
          detail:
            'Full fine-tuning vs frozen backbone; PEFT: LoRA, adapters, prefix tuning; instruction tuning (FLAN, Alpaca); RLHF with PPO; DPO; constitutional AI.'
        }
      ]
    },
    {
      id: 'F',
      label: 'Prompting and In-Context Learning',
      note: 'Using LLMs without updating weights',
      sessions: [
        {
          code: 'L19',
          title: 'In-context learning and prompt engineering',
          detail:
            'Zero-shot, one-shot, few-shot; why ICL works (debated); prompt sensitivity; hard prompts vs soft prompts; prompt formatting heuristics.'
        },
        {
          code: 'L20',
          title: 'Chain-of-Thought and advanced prompting',
          detail:
            'CoT: show your working; self-consistency sampling; least-to-most prompting; ReAct as a prompt strategy (preview); instruction tuning vs prompting.'
        }
      ]
    },
    {
      id: 'G',
      label: 'Core NLP Tasks',
      note: 'What all this machinery is actually solving',
      sessions: [
        {
          code: 'L21',
          title: 'Sequence labeling, parsing and information extraction',
          detail:
            'NER, POS, chunking — CRF baseline then token-classifier LLM; dependency parsing; constituency; relation extraction; event detection; knowledge graph construction.'
        },
        {
          code: 'L22',
          title: 'Machine translation and question answering',
          detail:
            'NMT history → Transformer MT; evaluation: BLEU, chrF, COMET, MQM; SQuAD, TriviaQA, HotpotQA; extractive vs generative QA; multi-hop reasoning.'
        },
        {
          code: 'L23',
          title: 'Summarization, text generation and evaluation',
          detail:
            'Extractive vs abstractive summarization; ROUGE, BERTScore, hallucination in summaries; dialogue and story generation; controlled generation.'
        }
      ]
    },
    {
      id: 'H',
      label: 'Indic and Low-Resource NLP',
      note: 'IISERB focus — Indian language NLP',
      sessions: [
        {
          code: 'L24',
          title: 'Low-resource NLP and cross-lingual transfer',
          detail:
            'What makes a language low-resource; morphological richness challenges (agglutination, script diversity); mBERT, XLM-R; zero-shot cross-lingual transfer; back-translation.'
        },
        {
          code: 'L25',
          title: 'Indic NLP — models, benchmarks and open problems',
          tag: 'iiserb',
          detail:
            'AI4Bharat ecosystem; IndicBERT and IndicBERT v2; Dhruva (speech); IndicGLUE benchmark tasks; Indic NMT and ASR; tokenization failure modes for Devanagari and Dravidian scripts.'
        }
      ]
    },
    {
      id: 'I',
      label: 'Advanced Modern Systems',
      note: 'Multimodal, efficient, and long-context LLMs',
      sessions: [
        {
          code: 'L26',
          title: 'Multimodal LLMs',
          detail:
            'CLIP (contrastive vision-language pretraining); ViT; LLaVA, Chameleon, GPT-4V; image captioning, VQA, visual grounding; text-to-image briefly.'
        },
        {
          code: 'L27',
          title: 'Efficient inference, MoE and long-context',
          detail:
            'Quantization (INT8, INT4, GPTQ, GGUF); speculative decoding; MoE architecture (Mixtral, DeepSeekMoE); SSMs — Mamba; FlashAttention for long context.'
        }
      ]
    },
    {
      id: 'J',
      label: 'RAG and Agentic Systems',
      note: 'The frontier: retrieve, reason, act',
      sessions: [
        {
          code: 'L28',
          title: 'Retrieval-Augmented Generation (RAG)',
          tag: 'key',
          detail:
            'Why parametric memory alone fails; sparse (BM25) vs dense retrieval (DPR, ColBERT); FAISS indexing; chunking and reranking strategies; Self-RAG; hallucination vs faithfulness.'
        },
        {
          code: 'L29',
          title: 'LLM agents and tool use',
          tag: 'key',
          detail:
            'ReAct (reasoning + acting); Toolformer; code agents — SWE-agent, Devin; memory (episodic, semantic, in-context); planning; AgentBench; failure modes and safety.'
        },
        {
          code: 'L30',
          title: 'Multi-agent systems and open research',
          tag: 'key',
          detail:
            'Agent orchestration, debate, critique loops; multi-agent evaluation; hallucination propagation in pipelines; what the field genuinely doesn’t know yet; project showcase.'
        }
      ]
    }
  ],
  assignments: [
    {
      title: 'Assignment 1: Text Preprocessing and n-gram Models',
      dueDate: '',
      status: 'Upcoming',
      description: 'Implement a text preprocessing pipeline and an n-gram language model with smoothing from scratch.',
      link: ''
    },
    {
      title: 'Assignment 2: Attention and Transformers from Scratch',
      dueDate: '',
      status: 'Upcoming',
      description: 'Implement scaled dot-product and multi-head attention, and train a miniature Transformer language model.',
      link: ''
    },
    {
      title: 'Assignment 3: Fine-tuning and Adaptation',
      dueDate: '',
      status: 'Upcoming',
      description: 'Fine-tune a pre-trained transformer (or apply LoRA) for a downstream task and compare with classical baselines.',
      link: ''
    },
    {
      title: 'Course Project',
      dueDate: '',
      status: 'Upcoming',
      description: 'Group project applying modern NLP methods to a problem of choice, with a focus on Indic/biomedical text encouraged, culminating in a final presentation and report.',
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
      title: 'Speech and Language Processing (3rd ed. draft)',
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
    },
    {
      title: 'The Illustrated Transformer',
      authors: 'Jay Alammar',
      link: 'https://jalammar.github.io/illustrated-transformer/'
    }
  ],
  announcements: [
    {
      date: '2026-08-05',
      text: 'Welcome to Advanced NLP. The syllabus below reflects the full 30-session plan; the schedule, staff list and materials will be filled in as the semester begins.'
    }
  ],
  contactEmail: 'tanmay@iiserb.ac.in'
};
