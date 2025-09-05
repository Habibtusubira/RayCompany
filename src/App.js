import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutPage from './components/AboutPage';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import ImageModal from './components/ImageModal';
import dataManager from './lib/dataManager';

const ArchitecturalPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  // Site content from data manager
  const [siteContent, setSiteContent] = useState(dataManager.getSiteContent());

  // Projects from data manager
  const [projects, setProjects] = useState(dataManager.getProjects());

  // Fetch initial data
  useEffect(() => {
    // Check if we have data in localStorage (from previous edits)
    const savedSiteContent = localStorage.getItem('siteContent');
    const savedProjects = localStorage.getItem('projects');
    
    if (savedSiteContent) {
      setSiteContent(JSON.parse(savedSiteContent));
    }
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    
    setLoading(false);
  }, []);

  const updateSiteContent = async (updatedContent) => {
    try {
      await dataManager.updateSiteContent(updatedContent);
      setSiteContent(updatedContent);
      return true;
    } catch (error) {
      console.error('Error updating site content:', error);
      return false;
    }
  };

  // Add this useEffect to handle authentication state manually
  useEffect(() => {
    // Check if user session exists in localStorage
    const savedSession = localStorage.getItem("isAdminLoggedIn");
    if (savedSession === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function using data manager
  // Add this state for login attempts
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);

  // Enhanced login function with rate limiting
  const handleLogin = async () => {
    if (isLoginDisabled) {
      alert('Too many failed attempts. Please try again later.');
      return;
    }

    try {
      // Verify credentials against data manager
      const isValid = await dataManager.verifyAdminCredentials(
        loginForm.username,
        loginForm.password
      );

      if (isValid) {
        // Successful login
        setIsLoggedIn(true);
        setShowLogin(false);
        setLoginForm({ username: '', password: '' });
        setLoginAttempts(0);
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTimestamp', Date.now().toString());
      } else {
        // Failed login
        handleFailedLogin();
      }
    } catch (error) {
      console.error('Login error:', error);
      handleFailedLogin();
    }
  };

  // Handle failed login attempts
  const handleFailedLogin = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      setIsLoginDisabled(true);
      setTimeout(() => {
        setIsLoginDisabled(false);
        setLoginAttempts(0);
      }, 30000); // 30 second lockout
      alert('Too many failed attempts. Please try again in 30 seconds.');
    } else {
      alert(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
    }
  };

  // Check session expiration on app load
  useEffect(() => {
    const checkSession = () => {
      const loginTimestamp = localStorage.getItem('loginTimestamp');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn && loginTimestamp) {
        const eightHours = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        const currentTime = Date.now();
        
        if (currentTime - parseInt(loginTimestamp) > eightHours) {
          // Session expired
          handleLogout();
          alert('Your session has expired. Please log in again.');
        } else {
          setIsLoggedIn(true);
        }
      }
    };
    
    checkSession();
  }, []);

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditMode(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  const updateContent = async (field, value) => {
    const updatedContent = {
      ...siteContent,
      [field]: value
    };
    
    const success = await updateSiteContent(updatedContent);
    if (success) {
      setSiteContent(updatedContent);
    }
  };

  const updateContact = async (field, value) => {
    const updatedContent = {
      ...siteContent,
      contacts: {
        ...siteContent.contacts,
        [field]: value
      }
    };
    
    const success = await updateSiteContent(updatedContent);
    if (success) {
      setSiteContent(updatedContent);
    }
  };

  const addProject = async () => {
    const newProject = {
      title: 'New Project',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Project description...',
      location: 'Location',
      year: new Date().getFullYear().toString(),
      size: 'Size'
    };

    try {
      const addedProject = await dataManager.addProject(newProject);
      setProjects([addedProject, ...projects]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = async (id, field, value) => {
    try {
      await dataManager.updateProject(id, field, value);
      setProjects(prev => prev.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      ));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await dataManager.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
        <div className="text-[#E0E1DD] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      <LoginModal 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
      />
      
      <ImageModal 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      
      <Sidebar 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
        editMode={editMode}
        setEditMode={setEditMode}
        handleLogout={handleLogout}
      />

      <div className="pt-16">
        <HeroSection 
          siteContent={siteContent}
          editMode={editMode}
          updateContent={updateContent}
        />
        
        <AboutPage 
          siteContent={siteContent}
          editMode={editMode}
          updateContent={updateContent}
        />
        
        <ServicesSection 
          siteContent={siteContent}
          editMode={editMode}
          updateContent={updateContent}
        />
        
        <ProjectsSection 
          projects={projects}
          editMode={editMode}
          addProject={addProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
          setSelectedImage={setSelectedImage}
        />
        
        <ContactSection 
          siteContent={siteContent}
          editMode={editMode}
          updateContact={updateContact}
        />
        
        <Footer 
          siteContent={siteContent}
        />
      </div>
    </div>
  );
};

export default ArchitecturalPortfolio;