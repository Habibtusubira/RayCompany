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
import { supabase } from './lib/supabase';

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
  
  // Default site content structure
  const [siteContent, setSiteContent] = useState({
    companyName: 'Ergonomics',
    subtitle: 'Design & Construction',
    slogan: 'Building Excellence Through Innovation',
    description: 'We specialize in architectural design, project management, and construction services. Our team delivers exceptional results that blend functionality with aesthetic appeal.',
    heroImage: '',
    services: [
      'Architectural Design',
      'Project Management', 
      'Construction Services',
      'Interior Design',
      'Renovation & Remodeling'
    ],
    contacts: {
      phone1: '0702780285',
      phone2: '0760395798',
      email: 'ergonomicsd&c@gmail.com',
      location: 'Kampala, Uganda'
    }
  });

  // Sample project data
  const [projects, setProjects] = useState([]);
  // const [adminCredentials, setAdminCredentials] = useState({
  //   username: 'ergonomics_admin',
  //   password: 'ergo2024!'
  // });

  // Fetch site content from Supabase
  useEffect(() => {
    fetchSiteContent();
    fetchProjects();
    fetchAdminCredentials();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching site content:', error);
      } else if (data) {
        setSiteContent(data.content);
      }
    } catch (error) {
      console.error('Error in fetchSiteContent:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error in fetchProjects:', error);
    }
  };

  const fetchAdminCredentials = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching admin credentials:', error);
      } else if (data) {
          const username= data.admin_username;
          const password= data.admin_password;
      }
    } catch (error) {
      console.error('Error in fetchAdminCredentials:', error);
    }
  };

  const updateSiteContent = async (updatedContent) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: 1,
          content: updatedContent,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating site content:', error);
        return false;
      }
      setSiteContent(updatedContent);
      return true;
    } catch (error) {
      console.error('Error in updateSiteContent:', error);
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

// Login function using admin_settings table
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
    // Verify credentials against admin_settings table
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('admin_username', loginForm.username)
      .eq('admin_password', loginForm.password)
      .single();

    if (error) {
      console.error('Database query error:', error);
      handleFailedLogin();
      return;
    }

    if (data) {
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
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();

      if (error) {
        console.error('Error adding project:', error);
      } else if (data) {
        setProjects([data[0], ...projects]);
      }
    } catch (error) {
      console.error('Error in addProject:', error);
    }
  };

  const updateProject = async (id, field, value) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ [field]: value })
        .eq('id', id);

      if (error) {
        console.error('Error updating project:', error);
      } else {
        setProjects(prev => prev.map(project => 
          project.id === id ? { ...project, [field]: value } : project
        ));
      }
    } catch (error) {
      console.error('Error in updateProject:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
      } else {
        setProjects(prev => prev.filter(project => project.id !== id));
      }
    } catch (error) {
      console.error('Error in deleteProject:', error);
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
        loginCredentials={fetchAdminCredentials}
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