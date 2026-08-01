import React, { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  className = "",
  style,
}) => (
  <div className={`scroll-stack-card ${itemClassName} ${className}`.trim()} style={style}>
    {children}
  </div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 80,
  itemScale = 0.04,
  itemStackDistance = 20,
  stackPosition = "18%",
  scaleEndPosition = "8%",
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === "number" ? value : parseFloat(value);
  }, []);

  // Measures layout static top positions once or on resize to prevent forced layout thrashing on scroll
  const measureOffsets = useCallback(() => {
    if (!cardsRef.current.length) return;

    // Temporarily reset card transforms to measure true static offsetTop
    cardsRef.current.forEach((card) => {
      if (card) card.style.transform = "none";
    });

    const getStaticTop = (el: HTMLElement): number => {
      let top = 0;
      let curr: HTMLElement | null = el;
      while (curr && curr !== document.body) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      return top;
    };

    cardTopsRef.current = cardsRef.current.map((card) => (card ? getStaticTop(card) : 0));

    const endElement = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (scrollerRef.current?.querySelector(".scroll-stack-end") as HTMLElement | null);

    endElementTopRef.current = endElement ? getStaticTop(endElement) : 0;
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = useWindowScroll
      ? window.scrollY
      : scrollerRef.current
        ? scrollerRef.current.scrollTop
        : 0;

    const containerHeight = useWindowScroll
      ? window.innerHeight
      : scrollerRef.current
        ? scrollerRef.current.clientHeight
        : window.innerHeight;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementTopRef.current;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!card) continue;

      const cardTop = cardTopsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      let scaleProgress = 0;
      if (scrollTop >= triggerStart && triggerEnd > triggerStart) {
        scaleProgress = Math.min(1, (scrollTop - triggerStart) / (triggerEnd - triggerStart));
      } else if (scrollTop >= triggerEnd) {
        scaleProgress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;

      if (blurAmount > 0) {
        let blur = 0;
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          blur = (topCardIndex - i) * blurAmount;
        }
        card.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : "none";
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }
  }, [
    baseScale,
    blurAmount,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ]);

  const requestUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller
          ? scroller.querySelectorAll(".scroll-stack-card")
          : [],
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    measureOffsets();
    updateCardTransforms();

    const handleResize = () => {
      measureOffsets();
      requestUpdate();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    if (useWindowScroll) {
      window.addEventListener("scroll", requestUpdate, { passive: true });
    } else if (scroller) {
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner") || scroller,
        smoothWheel: true,
      });

      lenis.on("scroll", requestUpdate);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
      if (useWindowScroll) {
        window.removeEventListener("scroll", requestUpdate);
      }
    };
  }, [itemDistance, useWindowScroll, measureOffsets, updateCardTransforms, requestUpdate]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? "scroll-stack-scroller--window" : ""} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
