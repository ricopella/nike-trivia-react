export const staggerParentVarients = {
  animate: "visible",
  initial: "hidden",
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
};

export const staggerChildLeftVarients = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
};

export const staggerChildRightVarients = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
};

export const slideDownFadeInOptions = {
  animate: "visible",
  exit: "exit",
  initial: "hidden",
  variants: {
    exit: { opactiy: 0, y: -40 },
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0
    }
  }
};
