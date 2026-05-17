/**
 * Shared Framer Motion animation variants.
 * Centralizes motion patterns used across the dashboard.
 */

/** Standard card entrance — fade up with spring */
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/** Container variant that staggers children */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/** Child variant for use inside a stagger container */
export const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Shared spring config for sidebar / layout */
export const layoutSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Hover lift — reusable whileHover preset */
export const hoverLift = {
  y: -2,
  transition: { duration: 0.2 },
};
