// src/data/blogData.ts
import { BlogPostProps } from '../components/BlogPost';

export const blogPosts: BlogPostProps[] = [
  {
    title: "DeepNeuroScan: A Tool to Automatically Identify Brain Haemorrhage in Radiology",
    authors: "by Srutanik Bhaduri and Prateek Sarangi",
    abstract: "Brain haemorrhage represents a critical medical emergency...",
    presentationImageFolderName: "deepneuroscan", // Subfolder name in public/presentation_images/
    presentationNumPages: 11, // Manually set: total number of images (e.g., 1.png to 25.png)
    presentationCaption: "DeepNeuroScan: Research Overview",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "CLARITY: AI Powered PICO Extraction & Systematic Review",
    authors: "by Saisab Sadhu and Sumit Kumar",
    abstract: "Systematic reviews using PICO...",
    presentationImageFolderName: "clarity",
    presentationNumPages: 11,
    presentationCaption: "CLARITY: System and Methodology",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "HistAI: Histopathology Analysis and Imaging",
    authors: "by Ashim Dhor and Rasel Mondal",
    abstract: "Subjectivity in histopathological gland segmentation...",
    presentationImageFolderName: "histai",
    presentationNumPages: 30,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];