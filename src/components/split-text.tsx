import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;

  triggerOnMount?: boolean;

  threshold?: number;
  rootMargin?: string;

  mountDelay?: number;

  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;

  /** NEW — LOOPING SUPPORT **/
  loop?: boolean;              // repeat forever
  loopDelay?: number;          // delay antar loop (seconds)
  yoyo?: boolean;              // reverse animation
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  triggerOnMount = false,
  threshold = 0.1,
  rootMargin = '-100px',
  mountDelay = 0,
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,

  /** NEW DEFAULTS **/
  loop = false,
  loopDelay = 0,
  yoyo = false
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') setFontsLoaded(true);
    else document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      const el = ref.current as HTMLElement & { _rbsplitInstance?: GSAPSplitText };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      }

      let targets: Element[] = [];

      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars?.length) targets = self.chars;
        if (!targets.length && splitType.includes('words') && self.words.length)
          targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length)
          targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };

      /** utility animation builder with looping support */
      const buildAnimation = () => ({
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        repeat: loop ? -1 : 0,
        yoyo,
        repeatDelay: loopDelay,
        onComplete: onLetterAnimationComplete
      });

      /** --- MODE: MOUNT (NO SCROLLTRIGGER) --- */
      if (triggerOnMount) {
        const splitInstance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          autoSplit: splitType === 'lines',
        });

        el._rbsplitInstance = splitInstance;
        assignTargets(splitInstance);

        setTimeout(() => {
          gsap.fromTo(targets, { ...from }, buildAnimation());
        }, mountDelay);

        return () => {
          try {
            splitInstance.revert();
          } catch (_) {}
        };
      }

      /** --- MODE: SCROLLTRIGGER --- */
      const startPct = (1 - threshold) * 100;
      const start = `top ${startPct}%`;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);

          gsap.fromTo(targets, { ...from }, {
            ...buildAnimation(),
            scrollTrigger: {
              trigger: el,
              start,
              once: !loop,
            },
          });
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        try {
          splitInstance.revert();
        } catch (_) {}
      };
    },
    {
      dependencies: [
        text, delay, duration, ease,
        splitType, JSON.stringify(from),
        JSON.stringify(to), triggerOnMount,
        threshold, rootMargin, mountDelay,
        loop, loopDelay, yoyo,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      style={{ textAlign, willChange: 'transform, opacity' }}
      className={`split-parent inline-block overflow-hidden ${className}`}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
