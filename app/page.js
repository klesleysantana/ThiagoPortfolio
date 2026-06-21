'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../lib/projectsData';
import styles from './page.module.css';

const dynamicWords = ['ideias', 'pesquisa', 'contexto'];

export default function Home() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <div className={styles.logo}>
            Thiago<span className={styles.lastName}> Henrique</span>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="#work">Projetos</Link></li>
            <li><Link href="#about">Sobre</Link></li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.titleContainer}
          >
            <div className={styles.titleImageContainer}>
              <motion.div 
                style={{ rotate }} 
                className={styles.starWrapper}
              >
                <Image 
                  src="/images/YellowStar.png" 
                  alt="Yellow Star" 
                  width={450} 
                  height={450} 
                  className={styles.starImage} 
                />
              </motion.div>
              <Image 
                src="/images/NomeHome.png" 
                alt="Thiago Portfolio" 
                width={800} 
                height={200} 
                className={styles.titleImage} 
                priority
              />
            </div>
            <p className={styles.description}>
              Transformando{' '}
              <span className={styles.dynamicWordWrapper}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={styles.dynamicWord}
                  >
                    {dynamicWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              em conteúdo.
            </p>
            <div className={styles.actions}>
              <button className={styles.primaryBtn} onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
                Ver Trabalhos <ArrowRight size={20} />
              </button>
              <a href="https://wa.me/5579991437315" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                Entre em Contato
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className={styles.projects}>
        <div className="container">
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>Trabalhos Recentes</h2>
            <p className={styles.sectionDesc}>Uma seleção dos meus melhores projetos.</p>
          </motion.div>

          <div className={styles.grid}>
            {projectsData.map((project, i) => (
              <Link href={`/projects/${project.id}`} key={project.id} className={styles.cardLink}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={styles.card}
                >
                  <Image 
                    src={project.coverImage} 
                    alt={project.title} 
                    width={800} 
                    height={600} 
                    className={styles.cardImage} 
                  />
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <span className={styles.cardCategory}>{project.category}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLogo}>Thiago Henrique</div>
          <p className={styles.footerText}>© {new Date().getFullYear()} Thiago Portfolio. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
