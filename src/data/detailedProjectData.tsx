// src/data/detailedProjectsData.ts
import { ProjectDetailCardProps } from '../components/ProjectDeatailCard'; // Ensure this path is correct
import { Brain, BookOpen, TestTubeIcon } from 'lucide-react';

const getImagePath = (name: string): string => `/images/${name}`;

// Interface for ProjectDetailCard now includes githubUrl
export interface ExtendedProjectDetailCardProps extends ProjectDetailCardProps {
  githubUrl?: string; // Optional GitHub URL
}

// Interface for projects that WILL open a detailed modal
// It now extends the new ExtendedProjectDetailCardProps
export interface ModalProject extends ExtendedProjectDetailCardProps {
  previewTitle: string;
  previewIcon: JSX.Element;
  shortDescription: string;
  previewImage: string;
}

export const modalProjects: ModalProject[] = [
  {
    previewTitle: "Automated Brain Hemorrhage Classification",
    previewIcon: <Brain size={36} />,
    shortDescription: "AI for rapid detection and classification of brain hemorrhages from CT scans, aiding in faster, more accurate emergency diagnoses.",
    previewImage: getImagePath('hemorrhage.png'),
    // Modal Content (DeepNeuroScan)
    title: "DeepNeuroScan: Automated Brain Hemorrhage Classification",
    authors: "by Srutanik Bhaduri and Prateek Sarangi",
    abstract: "Brain haemorrhage represents a critical medical emergency, where timely detection and accurate classification of its subtypes from CT scans is paramount for effective treatment. Current diagnostic processes are largely manual, time-consuming, and error-prone, particularly for subtypes like subdural or epidural requiring meticulous spatial feature identification. In India, radiologists often struggle with poor CT quality and limited time. Existing automated AI solutions frequently demonstrate poor performance in capturing subtle radiological distinctions, potentially compromising patient care. To address these challenges, DeepNeuroScan, a novel Deep Learning image classification system, has been developed to accurately identify and differentiate various brain haemorrhage subtypes from non-contrast CT scans. DeepNeuroScan employs an ensemble learning strategy, integrating an attention-gated ResNeXt model for robust spatial feature extraction—focusing on subtle subtypes—and a Discrete Wavelet Transform (DWT) model to analyse CT images in the frequency domain, capturing unique patterns. This dual approach achieves promising performance, with an accuracy of 98.01%, ROC of 0.985, and specificity of 0.993 on the benchmarked RSNA 2019 dataset. ",
    presentationImageFolderName: "deepneuroscan",
    presentationNumPages: 11,
    presentationCaption: "DeepNeuroScan: Research Overview",
    videoUrl: "https://www.youtube.com/embed/xfFgQGGQGDs",
    githubUrl: "https://github.com/your-repo/deepneuroscan" // EXAMPLE: Replace with actual URL or remove if none
  },
  {
    previewTitle: "Scientific Literature Mining for Evidence Synthesis",
    previewIcon: <BookOpen size={36} />,
    shortDescription: "NLP-driven models to extract, analyze, and synthesize insights from scientific literature for evidence-based decision-making.",
    previewImage: getImagePath('clinical.png'),
    // Modal Content (CLARITY)
    title: "CLARITY: AI Powered PICO Extraction & Systematic Review",
    authors: "by Saisab Sadhu and Sumit Kumar",
    abstract: "Subjectivity in histopathological gland segmentation for cancer diagnosis contributes to diagnostic variability. Current AI tools often lack robust validation and fail to address inherent uncertainties adequately. To overcome these limitations, we propose an AI-based semantic segmentation solution featuring key innovations: an optimized UNet++ architecture tailored for glandular morphology and a dual uncertainty quantification framework that provides confidence maps by distinguishing between model and data ambiguities. This approach aims to minimize uncertainties, reduce subjectivity, and enhance diagnostic consistency and efficiency, significantly advancing histopathological analysis.", // HistAI abstract
    presentationImageFolderName: "clarity",
    presentationNumPages: 11,
    presentationCaption: "CLARITY: System and Methodology",
    videoUrl: "https://www.youtube.com/embed/8-Hf4Nhj01E",
    githubUrl: "https://github.com/your-repo/clarity" // EXAMPLE: Replace with actual URL or remove if none
  },
  {
    previewTitle: "Precise Histopathology Diagnosis",
    previewIcon: <TestTubeIcon size={36} />,
    shortDescription: "Advanced deep learning for precise histopathological diagnosis, improving accuracy in identifying pathological features in tissue samples.",
    previewImage: getImagePath('histopath.jpg'),
    // Modal Content (HistAI)
    title: "HistAI: Precise Histopathology Diagnosis",
    authors: "by Ashim Dhor and Rasel Mondal",
    abstract: "Subjectivity in histopathological gland segmentation for cancer diagnosis... (Full HistAI Abstract)",
    presentationImageFolderName: "histai",
    presentationNumPages: 10,
    presentationCaption: "HistAI: Research Overview",
    videoUrl: "https://www.youtube.com/embed/P5rIK4-4YeU",
    githubUrl: "https://github.com/your-repo/histai" // EXAMPLE: Replace with actual URL or remove if none
  }
];

// Remember to fill in the full abstracts where placeholders are used.
// Example full abstracts were provided in previous responses.