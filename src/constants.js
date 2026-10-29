export const animationTop = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
  }  
};

export const animationImg = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.6,
    delay: 0,
    // ease: "easeOut",
    type: "spring"
  }  
};

export const animationWidth = {
  initial:{width: 0, height:0 },
  whileInView:{ width: "auto", height: "auto" },
  // initial: { opacity: 0, scale: 0.8 },
  // whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
    // type: "spring"
  }  
};

export const badgeVariants = {
  hidden: { width: 0, height: 0 },
  show: (delay = 0) => ({
    width: "auto",
    height: "auto",
    transition: {
      height: { duration: 0.4, ease: "easeOut", delay },        // red border grows first
      width: { duration: 0.5, ease: "easeOut", delay: delay + 0.4 }, // then width opens and reveals the text
    },
  }),
};