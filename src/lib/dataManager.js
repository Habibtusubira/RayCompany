import data from '../data/data.json';
import bcrypt from 'bcryptjs';

class DataManager {
  constructor() {
    // Try to load data from localStorage first to persist changes across sessions.
    // Fall back to the initial data.json if nothing is in localStorage.
    const siteContentFromStorage = localStorage.getItem('siteContent');
    const projectsFromStorage = localStorage.getItem('projects');
    const adminFromStorage = localStorage.getItem('admin');

    this.data = {
      siteContent: siteContentFromStorage ? JSON.parse(siteContentFromStorage) : { ...data.siteContent },
      projects: projectsFromStorage ? JSON.parse(projectsFromStorage) : [...data.projects],
      admin: adminFromStorage ? JSON.parse(adminFromStorage) : { ...data.admin },
    };
  }

  // Get all site content
  getSiteContent() {
    return this.data.siteContent;
  }

  // Update site content
  updateSiteContent(updatedContent) {
    this.data.siteContent = { ...this.data.siteContent, ...updatedContent };
    // In a real browser environment, we can't write to files directly
    // For this implementation, we'll store in localStorage as a simulation
    localStorage.setItem('siteContent', JSON.stringify(this.data.siteContent));
    return Promise.resolve(true);
  }

  // Get all projects
  getProjects() {
    return this.data.projects;
  }

  // Add a new project
  addProject(project) {
    const newId = this.data.projects.length > 0 
      ? Math.max(...this.data.projects.map(p => p.id)) + 1 
      : 1;
    
    const newProject = { ...project, id: newId };
    this.data.projects = [newProject, ...this.data.projects];
    // Store in localStorage as a simulation
    localStorage.setItem('projects', JSON.stringify(this.data.projects));
    return Promise.resolve(newProject);
  }

  // Update a project
  updateProject(id, field, value) {
    this.data.projects = this.data.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    // Store in localStorage as a simulation
    localStorage.setItem('projects', JSON.stringify(this.data.projects));
    return Promise.resolve(true);
  }

  // Delete a project
  deleteProject(id) {
    this.data.projects = this.data.projects.filter(project => project.id !== id);
    // Store in localStorage as a simulation
    localStorage.setItem('projects', JSON.stringify(this.data.projects));
    return Promise.resolve(true);
  }

  // Verify admin credentials
  async verifyAdminCredentials(username, password) {
    const admin = this.data.admin;
    if (admin.username === username) {
      // Use bcrypt to compare the password
      return await bcrypt.compare(password, admin.password);
    }
    return false;
  }

  // Update admin credentials with password hashing
  async updateAdminCredentials(username, password) {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    this.data.admin = {
      username: username,
      password: hashedPassword
    };
    // Store in localStorage as a simulation
    localStorage.setItem('admin', JSON.stringify(this.data.admin));
    return Promise.resolve(true);
  }

  // Method to get admin username (without password)
  getAdminUsername() {
    return this.data.admin.username;
  }
}

// Create a singleton instance
const dataManager = new DataManager();

export default dataManager;