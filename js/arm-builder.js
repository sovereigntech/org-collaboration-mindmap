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

export function buildCenterArm(overview, values, collaboration) {
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
  const collaborationBtn = createButton('toggle-btn', 'Contribute', { section: 'collaboration' });
  
  toggleButtons.appendChild(overviewBtn);
  toggleButtons.appendChild(valuesBtn);
  toggleButtons.appendChild(collaborationBtn);
  
  // Create overview section
  const overviewSection = createElement('div', 'content-section active', null);
  overviewSection.id = 'overview';
  
  const overviewTitle = createElement('h3', null, overview.title);
  const overviewDesc = createElement('p', null, overview.description);
  const overviewInstructions = createElement('p', 'instructions', overview.instructions);
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
  
  // Create collaboration section
  const collaborationSection = createElement('div', 'content-section', null);
  collaborationSection.id = 'collaboration';
  
  const collaborationTitle = createElement('h3', null, collaboration.title);
  const collaborationDesc = createElement('p', null, collaboration.description);
  const collaborationCall = createElement('p', null, collaboration.callToAction);
  
  // Create repository link
  const repoLink = createElement('a', 'repo-link', 'View Repository on GitHub');
  repoLink.href = collaboration.repository;
  repoLink.target = '_blank';
  repoLink.rel = 'noopener noreferrer';
  
  const contributionTitle = createElement('h4', null, 'Ways to contribute:');
  const contributionList = createList(collaboration.contributionIdeas);
  
  collaborationSection.appendChild(collaborationTitle);
  collaborationSection.appendChild(collaborationDesc);
  collaborationSection.appendChild(collaborationCall);
  collaborationSection.appendChild(repoLink);
  collaborationSection.appendChild(contributionTitle);
  collaborationSection.appendChild(contributionList);
  
  // Assemble the arm
  armContent.appendChild(header);
  armContent.appendChild(toggleButtons);
  armContent.appendChild(overviewSection);
  armContent.appendChild(valuesSection);
  armContent.appendChild(collaborationSection);
  
  return { armContent, closeBtn, toggleButtons };
} 