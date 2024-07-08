'use client'
import { Button, Image } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import styles from "./page.module.scss";
import ProjectCard from "@/components/ProjectCard";

export default function Welcome() {
  return (
    <div className={styles.frame}>
      <div className={styles.feature}>
        <div className={styles.header}>
          <div className={styles.title}>Welcome to SoftDev 3!</div>
          <div className={styles.subtitle}>A purposely made website for CPEPE462/SD students of CIT-U.</div>
        </div>
        <div className={styles.backdrop}>
          <Image src="/backdrop.png" alt="backdrop image"/>
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <div className={styles.bannerTitle}>Aspire to Inspire !</div>
          <div className={styles.bannerSubtitle}>You can try to create your portfolio website here !</div>
        </div>
        <Button size="sm" className={styles.button}>Try it now!</Button>
      </div>
      <div className={styles.projects}>
        <div className={styles.heading}>
          <div className={styles.title}>Sample Projects</div>
        </div>
        <motion.div
          className={styles.content}
          animate={{ height: "fit-content" }}
          transition={{ ease: "linear", duration: 0.3 }}
        >
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
        </motion.div>
      </div>
    </div>
  );
}
