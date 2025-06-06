import { useEffect, useState } from "react";

export function useSectionProgress(sectionId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Oblicz ile sekcji jest widoczne w viewport
      const visible =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const percent = Math.max(
        0,
        Math.min(1, visible / Math.min(sectionHeight, windowHeight))
      );

      // Progres: 0 na górze, 1 na dole sekcji
      let scrollProgress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScroll =
          windowHeight + sectionHeight;
        const scrolled =
          windowHeight - rect.top;
        scrollProgress = Math.max(
          0,
          Math.min(1, scrolled / totalScroll)
        );
      }
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionId]);

  return progress;
}