const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const buildDir = path.join(__dirname, 'build');
const outputFileName = '../quantisation-dashboard.html';

// Read the built index.html
const indexHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
const dom = new JSDOM(indexHtml);
const document = dom.window.document;

// Get the path to the main.js file
const staticJsDir = path.join(buildDir, 'static/js');
const files = fs.readdirSync(staticJsDir);
const mainJsFiles = files.filter(file => file.startsWith('main') && file.endsWith('.js'));
const mainJsFile = mainJsFiles[0];
const reactPath = path.join(staticJsDir, mainJsFile);
const reactContent = fs.readFileSync(reactPath, 'utf8');

// Inline CSS
document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  const href = link.getAttribute('href');
  const filePath = path.join(buildDir, href);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const style = document.createElement('style');
    style.textContent = content;
    link.parentNode.replaceChild(style, link);
  } else {
    console.warn(`CSS file not found: ${filePath}`);
  }
});

// Check if CSS was inlined properly
console.log('Inlined styles:', document.querySelectorAll('style').length);

// Inline JavaScript
document.querySelectorAll('script[src]').forEach(script => {
  const src = script.getAttribute('src');
  const filePath = path.join(buildDir, src);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    script.removeAttribute('src');
    script.textContent = content;
  } else {
    console.warn(`JavaScript file not found: ${filePath}`);
  }
});

// Safely remove elements if they exist
const safeRemove = (selector) => {
  const elem = document.querySelector(selector);
  if (elem) elem.remove();
};

safeRemove('meta[name="theme-color"]');
safeRemove('link[rel="manifest"]');
safeRemove('link[rel="icon"]');
safeRemove('link[rel="apple-touch-icon"]');

// Wrap the body content in a div with id "root" and a specific class
const bodyContent = document.body.innerHTML;
document.body.innerHTML = `
  <div id="root" class="quantisation-dashboard-content">${bodyContent}</div>
`;


// Ensure quantisation-dashboard div is present
if (!document.getElementById('quantisation-dashboard')) {
  const dashboardDiv = document.createElement('div');
  dashboardDiv.id = 'quantisation-dashboard';
  document.body.appendChild(dashboardDiv);
}

// Add debug script
const debugScript = `
<script>
  console.log('Debug script running');
  console.log('Window object keys:', Object.keys(window));
  console.log('Document ready state:', document.readyState);
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    console.log('React available:', typeof React !== 'undefined');
    console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');
    console.log('QuantisationVisualisations available:', typeof QuantisationVisualisations !== 'undefined');
  });
</script>
`;
document.body.innerHTML += debugScript;

// Insert React content and initialization script
const combinedScript = `
<script>
${reactContent}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  const rootElement = document.getElementById('quantisation-dashboard');
  if (rootElement && typeof React !== 'undefined' && typeof ReactDOM !== 'undefined' && typeof QuantisationVisualisations !== 'undefined') {
    console.log('All requirements met, initializing React app');
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        React.createElement(React.StrictMode, null,
          React.createElement(QuantisationVisualisations)
        )
      );
      console.log('React app initialized');
    } catch (error) {
      console.error('Error initializing React app:', error);
    }
  } else {
    console.error('Missing requirements for React initialization');
    console.log('React available:', typeof React !== 'undefined');
    console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');
    console.log('QuantisationVisualisations available:', typeof QuantisationVisualisations !== 'undefined');
    console.log('Root element found:', rootElement !== null);
  }
});
</script>
`;

document.body.innerHTML += combinedScript;

// Write the modified HTML to a new file
fs.writeFileSync(path.join(buildDir, outputFileName), dom.serialize());
console.log(`Generated ${outputFileName}`);
