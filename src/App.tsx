import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoGallery } from './components/VideoGallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { EditingStudioSimulator } from './components/EditingStudioSimulator';
import { TechSynergySection } from './components/TechSynergySection';
import { DavinciResolveSkills } from './components/DavinciResolveSkills';
import { VideoModal } from './components/VideoModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { FloatingSocials } from './components/FloatingSocials';
import { FullPage3DBackground } from './components/FullPage3DBackground';
import { INITIAL_PROJECTS } from './data/portfolioData';
import { VideoProject } from './types';

export default function App() {
  const [projects, setProjects] = useState<VideoProject[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  
  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState('');

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const data = await res.json();
        if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
          setProjects(data.videos);
        } else {
          setProjects(INITIAL_PROJECTS);
        }
      } else {
        setProjects(INITIAL_PROJECTS);
      }
    } catch (err) {
      console.error('Error fetching videos from database:', err);
      setProjects(INITIAL_PROJECTS);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenContactWithMessage = (msg: string) => {
    setContactInitialMessage(msg);
    setIsContactOpen(true);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const watchDemoReel = () => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* Full Page 3D Scroll Scene Background */}
      <FullPage3DBackground />

      {/* Header Bar */}
      <Header
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => {
          setContactInitialMessage('');
          setIsContactOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="space-y-4 relative z-10">
        
        {/* 1. Hero with 3D Canvas */}
        <HeroSection
          onExploreProjects={scrollToGallery}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenContact={() => {
            setContactInitialMessage('');
            setIsContactOpen(true);
          }}
          onWatchDemoReel={watchDemoReel}
        />

        {/* 2. Video Gallery with YouTube/Instagram/Facebook Embeds & Filtering */}
        <VideoGallery
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 3. Color Grading Before/After Slider */}
        <BeforeAfterSlider />

        {/* 4. Multi-Track Timeline DAW Simulator */}
        <EditingStudioSimulator />

        {/* 5. DaVinci Resolve — What I Use */}
        <DavinciResolveSkills />

        {/* 6. B.Tech CSE + Video Editing Synergy — Also a 🕸 Developer */}
        <TechSynergySection />

      </main>

      {/* MODALS */}
      
      {/* Video Detail & Player Modal */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          if (selectedProject) {
            setContactInitialMessage(`Hi Nitish, I saw your project "${selectedProject.title}" on your portfolio and want to discuss a similar edit.`);
          }
          setIsContactOpen(true);
        }}
      />

      {/* Database & Video Admin Panel */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        videos={projects}
        onRefreshVideos={fetchVideos}
      />

      {/* Interactive Cost Estimator Modal */}
      <ProjectEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSendInquiry={handleOpenContactWithMessage}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onOpenContact={() => {
          setContactInitialMessage('');
          setIsContactOpen(true);
        }}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMessage={contactInitialMessage}
      />

      {/* Floating Social Media Quick Action Buttons */}
      <FloatingSocials />

    </div>
  );
}


