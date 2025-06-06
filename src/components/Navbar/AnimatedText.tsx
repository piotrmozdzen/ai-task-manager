"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

type AnimatedTextProps = {
  text: string;
  wordContainerVariants: any;
  letter1Variants: any;
  letter2Variants: any;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  wordContainerVariants,
  letter1Variants,
  letter2Variants,
}) => (
  <motion.div
    className={styles["button-text-wrapper"]}
    variants={wordContainerVariants}
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {/* Pierwsza warstwa */}
    <span className={styles["button-text"]}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`text1-${i}`}
          className="inline-block"
          custom={i}
          variants={letter1Variants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
    {/* Druga warstwa */}
    <span className={`${styles["button-text"]} ${styles["is-2"]}`}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`text2-${i}`}
          className="inline-block"
          custom={i}
          variants={letter2Variants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  </motion.div>
);

export default AnimatedText;
