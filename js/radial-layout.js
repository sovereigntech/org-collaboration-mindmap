// Radial Layout module
import { collaborationValues, centerContent } from './data-loader.js';
import { buildValueArm, buildCenterArm } from './arm-builder.js';
import { removeActiveClass, addActiveClass } from './dom-utils.js';

export class RadialLayout {
  constructor() {
    this.container = document.getElementById('container');
    this.centerNode = document.getElementById('center-node');
    this.radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.activeArm = null;
    
    this.init();
  }
  
  init() {
    this.createValueNodes();
    this.createConnectionLines();
    this.setupEventListeners();
    this.centerNode.addEventListener('click', () => this.showCenterDetails());
  }
  
  createValueNodes() {
    collaborationValues.forEach(value => {
      const node = document.createElement('div');
      node.className = 'value-node';
      node.id = value.id;
      
      // Check if we're on mobile
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // On mobile, create mindmap structure with visual connections
        node.innerHTML = `
          <div class="mindmap-indicator"></div>
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="flex: 1; font-weight: 600;">${value.title}</div>
            <div style="font-size: 1.3rem; opacity: 0.7; color: #667eea;">→</div>
          </div>
        `;
        node.style.position = 'relative';
        node.style.left = 'auto';
        node.style.top = 'auto';
      } else {
        // On desktop, use simple title
        node.innerHTML = value.title;
        // Calculate circular position
        const angle = (value.position * Math.PI) / 180;
        const x = this.centerX + this.radius * Math.cos(angle);
        const y = this.centerY + this.radius * Math.sin(angle);
        
        node.style.left = `${x - 100}px`;
        node.style.top = `${y - 100}px`;
      }
      
      node.addEventListener('click', () => this.toggleArm(value));
      
      this.container.appendChild(node);
    });
  }
  
  createConnectionLines() {
    // Only create connection lines on desktop
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;
    
    collaborationValues.forEach((value, index) => {
      const line = document.createElement('div');
      line.className = 'connection-line';
      line.setAttribute('data-value-id', value.id);
      
      const angle = (value.position * Math.PI) / 180;
      const endX = this.centerX + this.radius * Math.cos(angle);
      const endY = this.centerY + this.radius * Math.sin(angle);
      
      const length = Math.sqrt(Math.pow(endX - this.centerX, 2) + Math.pow(endY - this.centerY, 2));
      
      // Calculate the actual angle from center to the node
      const actualAngle = Math.atan2(endY - this.centerY, endX - this.centerX) * 180 / Math.PI;
      const angleDeg = actualAngle;
      
      line.style.width = `${length}px`;
      line.style.left = `${this.centerX}px`;
      line.style.top = `${this.centerY}px`;
      line.style.transform = `rotate(${angleDeg}deg)`;
      
      this.container.appendChild(line);
    });
  }
  
  toggleArm(value) {
    // Remove active class from all nodes
    removeActiveClass('.value-node');
    
    // Add active class to clicked node
    addActiveClass(document.getElementById(value.id));
    
    // Close any existing arm
    if (this.activeArm) {
      this.closeArm();
    }
    
    // Create and open new arm
    this.createArm(value);
  }
  
  createArm(value) {
    const arm = document.createElement('div');
    arm.className = 'expanding-arm';
    arm.id = `arm-${value.id}`;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, position as a block in the flow
      arm.style.position = 'relative';
      arm.style.left = 'auto';
      arm.style.top = 'auto';
      arm.style.transform = 'none';
    } else {
      // On desktop, calculate position for the arm - extend from center outward
      const angle = (value.position * Math.PI) / 180;
      const armDistance = this.radius + 100; // Distance from center
      const armX = this.centerX + armDistance * Math.cos(angle);
      const armY = this.centerY + armDistance * Math.sin(angle);
      
      arm.style.left = `${armX - 175}px`;
      arm.style.top = `${armY - 125}px`;
    }
    
    // Build arm content using the arm builder module
    const { armContent, closeBtn, toggleButtons } = buildValueArm(value);
    
    // Add event listeners
    closeBtn.addEventListener('click', () => this.closeArm());
    
    arm.appendChild(armContent);
    this.container.appendChild(arm);
    this.activeArm = arm;
    
    // Highlight the existing connection line instead of creating a new one (desktop only)
    if (!isMobile) {
      removeActiveClass('.connection-line');
      
      // Find and highlight the connection line for this value using data attribute
      const targetLine = document.querySelector(`.connection-line[data-value-id="${value.id}"]`);
      if (targetLine) {
        addActiveClass(targetLine);
      }
    }
    
    // Add toggle button functionality
    setTimeout(() => {
      arm.classList.add('open');
      this.setupToggleButtons(toggleButtons, arm, value);
    }, 10);
  }
  
  closeArm() {
    if (this.activeArm) {
      this.activeArm.remove();
      this.activeArm = null;
      
      // Remove active class from all connection lines and value nodes
      removeActiveClass('.connection-line');
      removeActiveClass('.value-node');
    }
  }
  
  showCenterDetails() {
    // Close any existing arm
    this.closeArm();
    
    // Remove active class from all nodes
    removeActiveClass('.value-node');
    
    // Create center arm
    const arm = document.createElement('div');
    arm.className = 'expanding-arm';
    arm.id = 'center-arm';
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, position as a block in the flow
      arm.style.position = 'relative';
      arm.style.left = 'auto';
      arm.style.top = 'auto';
      arm.style.transform = 'none';
    } else {
      // On desktop, position relative to the center
      arm.style.left = `${this.centerX - 175}px`;
      arm.style.top = `${this.centerY - 125}px`;
    }
    
    const overview = centerContent.overview || {
      title: 'Collaboration Guiding Principles',
      description: 'This interactive visualization shows the core collaboration values.',
      instructions: 'Click on any value around the circle to explore:',
      features: ['How each value affects daily work', 'Skills needed to build collaboration']
    };
    
    // Build center arm content using the arm builder module
    const { armContent, closeBtn, toggleButtons } = buildCenterArm(overview, collaborationValues);
    
    // Add event listeners
    closeBtn.addEventListener('click', () => this.closeArm());
    
    arm.appendChild(armContent);
    this.container.appendChild(arm);
    this.activeArm = arm;
    
    setTimeout(() => {
      arm.classList.add('open');
      this.setupToggleButtons(toggleButtons, arm);
    }, 10);
  }
  
  setupToggleButtons(toggleButtons, arm, value = null) {
    const toggleBtns = toggleButtons.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        addActiveClass(btn);
        
        // Hide all content sections
        arm.querySelectorAll('.content-section').forEach(section => {
          section.classList.remove('active');
        });
        
        // Show selected content section
        const sectionId = value ? btn.dataset.section + '-' + value.id : btn.dataset.section;
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          addActiveClass(targetSection);
          // Expand the modal when content is shown
          arm.classList.add('expanded');
        }
      });
    });
  }
  
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
      this.centerX = window.innerWidth / 2;
      this.centerY = window.innerHeight / 2;
      this.updatePositions();
    });
    
    // Handle click outside modal to close
    document.addEventListener('click', (event) => {
      if (this.activeArm && !this.activeArm.contains(event.target) && 
          !event.target.closest('.value-node') && 
          !event.target.closest('#center-node')) {
        this.closeArm();
      }
    });
  }
  
  updatePositions() {
    const isMobile = window.innerWidth <= 768;
    
    collaborationValues.forEach(value => {
      const node = document.getElementById(value.id);
      if (node) {
        if (isMobile) {
          // On mobile, keep as blocks in flow
          node.style.position = 'relative';
          node.style.left = 'auto';
          node.style.top = 'auto';
        } else {
          // On desktop, calculate circular position
          const angle = (value.position * Math.PI) / 180;
          const x = this.centerX + this.radius * Math.cos(angle);
          const y = this.centerY + this.radius * Math.sin(angle);
          
          node.style.left = `${x - 100}px`;
          node.style.top = `${y - 100}px`;
        }
      }
    });
    
    // Update connection lines (desktop only)
    if (!isMobile) {
      document.querySelectorAll('.connection-line').forEach((line, index) => {
        const value = collaborationValues[index];
        const angle = (value.position * Math.PI) / 180;
        const endX = this.centerX + this.radius * Math.cos(angle);
        const endY = this.centerY + this.radius * Math.sin(angle);
        
        const length = Math.sqrt(Math.pow(endX - this.centerX, 2) + Math.pow(endY - this.centerY, 2));
        
        // Calculate the actual angle from center to the node (same as createConnectionLines)
        const actualAngle = Math.atan2(endY - this.centerY, endX - this.centerX) * 180 / Math.PI;
        const angleDeg = actualAngle;
        
        line.style.width = `${length}px`;
        line.style.left = `${this.centerX}px`;
        line.style.top = `${this.centerY}px`;
        line.style.transform = `rotate(${angleDeg}deg)`;
      });
    }
  }
} 