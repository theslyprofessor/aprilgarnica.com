import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const animationVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface Props {
  children: ReactNode;
  variant?: keyof typeof animationVariants;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  className = '',
}: Props) {
  const variants = animationVariants[variant];

  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for stagger children — each child gets animated individually
export function AnimatedItem({
  children,
  variant = 'fadeUp',
  className = '',
}: {
  children: ReactNode;
  variant?: keyof typeof animationVariants;
  className?: string;
}) {
  return (
    <motion.div
      variants={animationVariants[variant]}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
