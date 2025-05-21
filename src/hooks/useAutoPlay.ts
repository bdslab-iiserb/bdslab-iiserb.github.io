// src/hooks/useAutoPlay.ts
import { useState, useEffect, useCallback } from 'react';

export const useAutoPlay = (
  slideCount: number,
  interval: number = 20000,
  autoPlayEnabled: boolean = true
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlayEnabled && slideCount > 1) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [autoPlayEnabled, slideCount]);

  const nextSlide = useCallback(() => {
    if (slideCount > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    if (slideCount > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
    }
  }, [slideCount]);

  const togglePlay = useCallback(() => {
    if (slideCount > 1) {
      setIsPlaying(prev => !prev);
    } else {
      setIsPlaying(false);
    }
  }, [slideCount]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && autoPlayEnabled && slideCount > 1) {
      timer = setInterval(nextSlide, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, autoPlayEnabled, slideCount, interval, nextSlide]);

  useEffect(() => {
    if (slideCount > 0 && currentIndex >= slideCount) {
      setCurrentIndex(0);
    } else if (slideCount === 0 && currentIndex !== 0) {
      setCurrentIndex(0);
    }
  }, [slideCount, currentIndex]);

  return {
    currentIndex,
    isPlaying,
    nextSlide,
    prevSlide,
    togglePlay,
    setCurrentIndex,
  };
};