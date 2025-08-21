// DOM utility functions
export function createElement(tag, className, textContent = null) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

export function createButton(className, textContent, dataset = {}) {
  const button = createElement('button', className, textContent);
  Object.entries(dataset).forEach(([key, value]) => {
    button.dataset[key] = value;
  });
  return button;
}

export function createList(items) {
  const ul = createElement('ul');
  items.forEach(item => {
    const li = createElement('li', null, item);
    ul.appendChild(li);
  });
  return ul;
}

export function removeActiveClass(selector, className = 'active') {
  document.querySelectorAll(selector).forEach(element => {
    element.classList.remove(className);
  });
}

export function addActiveClass(element, className = 'active') {
  element.classList.add(className);
} 