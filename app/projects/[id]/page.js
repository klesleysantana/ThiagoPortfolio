import { projectsData } from '../../../lib/projectsData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Carousel from './Carousel';
import styles from './project.module.css';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return <div className={styles.notFound}>Projeto não encontrado</div>;
  }

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <main className={styles.main}>
      {/* Header Navigation */}
      <nav className={styles.nav}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} /> Voltar para Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.meta}>
            <span className={styles.tag}>{project.category}</span>
            <span className={styles.tag}>{project.role}</span>
            <span className={styles.tag}>{project.year}</span>
          </div>
        </div>
        <div className={styles.coverWrapper}>
          <Image 
            src={project.coverImage} 
            alt={project.title} 
            width={1920} 
            height={1080} 
            className={styles.coverImage}
            priority
          />
        </div>
      </header>

      {/* Narrative Section */}
      <section className={styles.narrative}>
        <div className="container">
          <div className={styles.textBlock}>
            <h2>O Desafio</h2>
            <p>{project.context}</p>
          </div>
          
          <div className={styles.textBlock}>
            <h2>Minha Atuação</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{project.strategy}</p>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className={styles.gallery}>
        <div className={`container ${styles.galleryGrid}`}>
          {project.mediaBlocks ? project.mediaBlocks.map((block, idx) => {
            if (block.type === 'carousel') {
              return <Carousel key={idx} images={block.images} title={project.title} index={idx} />;
            }
            if (block.type === 'video') {
              return (
                <div key={idx} className={styles.videoGrid}>
                  {block.videos.map((vid, i) => (
                    <div key={`vid-${i}`} className={styles.videoContainer}>
                      <video 
                        src={vid} 
                        controls 
                        className={styles.videoPlayer}
                        preload="metadata"
                      />
                    </div>
                  ))}
                </div>
              );
            }
            if (block.type === 'instagram') {
              return (
                <div key={idx} className={styles.instagramContainer}>
                  <iframe 
                    src={block.url}
                    className={styles.instagramIframe}
                    allowTransparency="true"
                    allowFullScreen={true}
                    scrolling="no"
                  />
                </div>
              );
            }
            return null;
          }) : project.images?.map((img, idx) => (
            <div key={idx} className={styles.imageWrapper}>
              <Image 
                src={img} 
                alt={`${project.title} image ${idx + 1}`} 
                width={1200} 
                height={800} 
                className={styles.galleryImage}
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className={styles.results}>
        <div className="container">
          <div className={styles.resultsCard}>
            <h2>O Resultado</h2>
            <p className={styles.resultsText}>{project.results}</p>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className={styles.nextProject}>
        <div className="container">
          <p>Próximo Projeto</p>
          <Link href={`/projects/${nextProject.id}`} className={styles.nextLink}>
            <h2>{nextProject.title}</h2>
            <ArrowRight size={40} />
          </Link>
        </div>
      </section>
    </main>
  );
}
