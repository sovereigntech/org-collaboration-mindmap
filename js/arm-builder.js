// Arm building module
import { createElement, createButton, createList, removeActiveClass, addActiveClass } from './dom-utils.js';

export function buildValueArm(value) {
  const armContent = createElement('div', 'arm-content');
  
  // Create header
  const header = createElement('div', 'arm-header');
  const title = createElement('div', 'arm-title', value.title);
  const closeBtn = createElement('button', 'close-arm', '×');
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  
  // Create description
  const description = createElement('div', 'arm-description', value.description);
  
  // Create toggle buttons
  const toggleButtons = createElement('div', 'toggle-buttons');
  const dailyWorkBtn = createButton('toggle-btn', 'How that affects my daily work?', { section: 'daily-work' });
  const skillsBtn = createButton('toggle-btn', 'How can we build this skill?', { section: 'skills' });
  
  toggleButtons.appendChild(dailyWorkBtn);
  toggleButtons.appendChild(skillsBtn);
  
  // Create content sections (initially hidden)
  const dailyWorkSection = createElement('div', 'content-section', null);
  dailyWorkSection.id = `daily-work-${value.id}`;
  
  const dailyWorkList = createList(value.dailyWork);
  dailyWorkSection.appendChild(dailyWorkList);
  
  const skillsSection = createElement('div', 'content-section', null);
  skillsSection.id = `skills-${value.id}`;
  
  const skillsList = createList(value.skills);
  skillsSection.appendChild(skillsList);
  
  // Assemble the arm
  armContent.appendChild(header);
  armContent.appendChild(description);
  armContent.appendChild(toggleButtons);
  armContent.appendChild(dailyWorkSection);
  armContent.appendChild(skillsSection);
  
  return { armContent, closeBtn, toggleButtons };
}

export function buildCenterArm(overview, values) {
  const armContent = createElement('div', 'arm-content');
  
  // Create header
  const header = createElement('div', 'arm-header');
  const title = createElement('div', 'arm-title', 'STA - Collaboration Guiding Principles');
  const closeBtn = createElement('button', 'close-arm', '×');
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  
  // Create toggle buttons
  const toggleButtons = createElement('div', 'toggle-buttons');
  const overviewBtn = createButton('toggle-btn active', 'Overview', { section: 'overview' });
  const valuesBtn = createButton('toggle-btn', 'Principles', { section: 'values' });
  
  toggleButtons.appendChild(overviewBtn);
  toggleButtons.appendChild(valuesBtn);
  
  // Create overview section
  const overviewSection = createElement('div', 'content-section active', null);
  overviewSection.id = 'overview';
  
  const overviewTitle = createElement('h3', null, overview.title);
  const overviewDesc = createElement('p', null, overview.description);
  const overviewInstructions = createElement('p', null, overview.instructions);
  const overviewList = createList(overview.features);
  
  overviewSection.appendChild(overviewTitle);
  overviewSection.appendChild(overviewDesc);
  overviewSection.appendChild(overviewInstructions);
  overviewSection.appendChild(overviewList);
  
  // Create values section
  const valuesSection = createElement('div', 'content-section', null);
  valuesSection.id = 'values';
  
  const valuesTitle = createElement('h3', null, values.title);
  const valuesList = createList(values.map(v => v.title));
  
  valuesSection.appendChild(valuesTitle);
  valuesSection.appendChild(valuesList);
  
  // Assemble the arm
  armContent.appendChild(header);
  armContent.appendChild(toggleButtons);
  armContent.appendChild(overviewSection);
  armContent.appendChild(valuesSection);
  
  return { armContent, closeBtn, toggleButtons };
} 