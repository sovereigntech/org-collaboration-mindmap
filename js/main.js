// Main application entry point
import { loadData } from './data-loader.js';
import { RadialLayout } from './radial-layout.js';

// Initialize the application when the page loads
async function initApp() {
  try {
    // Load data first
    const result = await loadData();
    
    if (result.success) {
      console.log('Data loaded successfully');
    } else {
      console.log('Using fallback data');
    }
    
    // Initialize the radial layout
    new RadialLayout();
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp); 