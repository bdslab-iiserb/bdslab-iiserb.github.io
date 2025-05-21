// src/data/blogData.ts
import { BlogPostProps } from '../components/BlogPost';

export const blogPosts: BlogPostProps[] = [
  {
    title: "DeepNeuroScan: A Tool to Automatically Identify Brain Haemorrhage in Radiology",
    authors: "by Srutanik Bhaduri and Prateek Sarangi",
    abstract: "Brain haemorrhage represents a critical medical emergency, where timely detection and accurate classification of its subtypes from CT scans is paramount for effective treatment. Current diagnostic processes are largely manual, time-consuming, and error-prone, particularly for subtypes like subdural or epidural requiring meticulous spatial feature identification. In India, radiologists often struggle with poor CT quality and limited time. Existing automated AI solutions frequently demonstrate poor performance in capturing subtle radiological distinctions, potentially compromising patient care. To address these challenges, DeepNeuroScan, a novel Deep Learning image classification system, has been developed to accurately identify and differentiate various brain haemorrhage subtypes from non-contrast CT scans. DeepNeuroScan employs an ensemble learning strategy, integrating an attention-gated ResNeXt model for robust spatial feature extraction—focusing on subtle subtypes—and a Discrete Wavelet Transform (DWT) model to analyse CT images in the frequency domain, capturing unique patterns. This dual approach achieves promising performance, with an accuracy of 98.01%, ROC of 0.985, and specificity of 0.993 on the benchmarked RSNA 2019 dataset. ",
    presentationImageFolderName: "deepneuroscan", // Subfolder name in public/presentation_images/
    presentationNumPages: 11, // Manually set: total number of images (e.g., 1.png to 25.png)
    presentationCaption: "DeepNeuroScan: Research Overview",
    videoUrl: "https://www.youtube.com/embed/xfFgQGGQGDs"
  },
  {
    title: "CLARITY: AI Powered PICO Extraction & Systematic Review",
    authors: "by Saisab Sadhu and Sumit Kumar",
    abstract: "Systematic reviews using PICO (Population, Intervention, Comparison, Outcome) are crucial for biomedical evidence synthesis but remain slow and resource-intensive. Researchers often spend 8–10 months per review, with up to 80% of the time consumed by manually screening and extracting PICO elements. Existing tools offer partial automation but lack integration and fail to translate findings into actionable clinical insights. While LLMs like ChatGPT show promise, they often produce overly broad results due to imprecise or incomplete PICO framing. There's a need for an automated, AI-based solution that delivers focused, structured PICO information based on specific topics and keywords. CLARITY addresses this gap using a three-phase approach. First, a domain-expert-curated training corpus is built by extracting relevant sentences using regex and PICO-specific keywords. Second, BioGPT is fine-tuned on this corpus to identify and extract PICO elements with expert-validated outputs. Finally, CLARITY is deployed as a web interface, enabling users to input biomedical texts and receive structured, PICO-based summaries without needing prompt engineering—streamlining systematic review generation across biomedical fields.",
    presentationImageFolderName: "clarity",
    presentationNumPages: 11,
    presentationCaption: "CLARITY: System and Methodology",
    videoUrl: "https://www.youtube.com/embed/8-Hf4Nhj01E"
  },
  {
    title: "HistAI: Histopathology Analysis and Imaging",
    authors: "by Ashim Dhor and Rasel Mondal",
    abstract: "Subjectivity in histopathological gland segmentation for cancer diagnosis contributes to diagnostic variability. Current AI tools often lack robust validation and fail to address inherent uncertainties adequately. To overcome these limitations, we propose an AI-based semantic segmentation solution featuring key innovations: an optimized UNet++ architecture tailored for glandular morphology and a dual uncertainty quantification framework that provides confidence maps by distinguishing between model and data ambiguities. This approach aims to minimize uncertainties, reduce subjectivity, and enhance diagnostic consistency and efficiency, significantly advancing histopathological analysis.",
    presentationImageFolderName: "histai",
    presentationNumPages: 10,
    videoUrl: "https://www.youtube.com/embed/P5rIK4-4YeU"
  }
];