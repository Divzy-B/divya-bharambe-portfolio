const projects = [
  {
    id: '01', category: 'ml', categoryLabel: 'ML & AI', featured: true,
    name: 'Industrial Defect Detection',
    repo: 'industrial-defect-detection',
    description: 'Production-oriented computer vision system for industrial surface-defect detection.',
    summary: 'A YOLOv8 defect-detection workflow packaged as an inspectable API and interactive application.',
    stack: ['YOLOv8', 'FastAPI', 'ONNX', 'Docker', 'Streamlit'],
    points: ['Production-oriented vision pipeline', 'API, UI, containerization, and CI in one workflow', 'Designed for practical surface-quality inspection'],
    tone: 'vision'
  },
  {
    id: '02', category: 'ml', categoryLabel: 'ML & AI', featured: true,
    name: 'Intelligent Recommendation Engine',
    repo: 'intelligent-recommendation-engine',
    description: 'Personalized recommendation system with retrieval, modeling, API, and application layers.',
    summary: 'A production-ready recommendation engine that brings model serving, vector search, and a usable interface together.',
    stack: ['PyTorch', 'FAISS', 'FastAPI', 'Streamlit'],
    points: ['Personalized recommendation workflow', 'Vector similarity search with FAISS', 'Service and interface layers built for review'],
    tone: 'recs'
  },
  {
    id: '03', category: 'ml', categoryLabel: 'ML & AI', featured: false,
    name: 'Retail Demand Forecasting',
    repo: 'retail-demand-forecasting',
    description: 'Demand forecasting application using chronological evaluation and production-ready delivery.',
    summary: 'An XGBoost forecasting project emphasizing time-aware evaluation, automated tests, and deployable delivery.',
    stack: ['XGBoost', 'FastAPI', 'Docker', 'Streamlit'],
    points: ['Chronological evaluation for realistic validation', 'Forecasting API and visual application', 'Automated-test and Docker workflow'],
    tone: 'forecast'
  },
  {
    id: '04', category: 'ml', categoryLabel: 'ML & AI', featured: false,
    name: 'FraudGuard',
    repo: 'FraudGuard',
    description: 'Reproducible synthetic-fraud detection project with model explainability.',
    summary: 'An applied classification workflow pairing XGBoost detection with SHAP explanations and deployment tooling.',
    stack: ['XGBoost', 'SHAP', 'FastAPI', 'Docker', 'CI'],
    points: ['Synthetic fraud-detection modeling', 'SHAP-informed model explainability', 'Reproducible API, container, and CI setup'],
    tone: 'fraud'
  },
  {
    id: '05', category: 'genai', categoryLabel: 'Generative AI', featured: true,
    name: 'Chatlytics',
    repo: 'Chatlytics',
    description: 'Conversational analytics for PDFs, CSVs, and Excel files with validated chart creation.',
    summary: 'A safe data-questioning interface that grounds responses in uploaded business documents and validates visualization requests.',
    stack: ['Streamlit', 'LangChain', 'FAISS', 'Groq', 'Plotly'],
    points: ['PDF retrieval with local session embeddings', 'Conversational exploration of spreadsheet data', 'Guardrails that avoid executing LLM-generated Python'],
    tone: 'chat'
  },
  {
    id: '06', category: 'genai', categoryLabel: 'Generative AI', featured: false,
    name: 'How to Train Your DragGANs',
    repo: 'How-to-train-your-DragGANs',
    description: 'Hands-on generative-image work built around a StyleGAN2 implementation.',
    summary: 'A generative-model exploration with StyleGAN2 code, checkpoints, image generation, and saved outputs.',
    stack: ['Python', 'StyleGAN2', 'GANs'],
    points: ['StyleGAN2 implementation and image generation', 'Includes model checkpoints and generated imagery', 'Focused on controllable generative vision experimentation'],
    tone: 'gan'
  },
  {
    id: '07', category: 'genai', categoryLabel: 'Generative AI', featured: false,
    name: 'GENAI',
    repo: 'GENAI',
    description: 'Generative AI coursework and notebook-based experimentation.',
    summary: 'A collection of notebook assignments documenting foundational generative AI exploration.',
    stack: ['Jupyter Notebook', 'Generative AI'],
    points: ['Notebook-based experimentation', 'Coursework repository', 'A record of iterative learning'],
    tone: 'genai'
  },
  {
    id: '08', category: 'software', categoryLabel: 'Software', featured: false,
    name: 'NeetCode Submissions',
    repo: 'neetcode-submissions-6expt6kl',
    description: 'A public record of algorithm and data-structure problem solving.',
    summary: 'Practice submissions that demonstrate sustained attention to core engineering problem-solving skills.',
    stack: ['Algorithms', 'Data Structures'],
    points: ['Algorithmic practice archive', 'Problem-solving across common engineering patterns', 'Maintained through NeetCode'],
    tone: 'code'
  },
  {
    id: '09', category: 'software', categoryLabel: 'Software', featured: false,
    name: 'JPMC Forage MIDAS',
    repo: 'forage-midas',
    description: 'Advanced software engineering virtual-experience project from JPMorgan Chase & Co.',
    summary: 'A forked training project completed through the JPMC Advanced Software Engineering Forage program.',
    stack: ['Java', 'Software Engineering'],
    points: ['JPMC Advanced Software Engineering virtual experience', 'Training project built from the Forage repository', 'Included as a learning and engineering-practice artifact'],
    tone: 'midas', fork: true
  }
];

const grid = document.querySelector('#project-grid');
const filters = document.querySelectorAll('.filter');
const dialog = document.querySelector('#project-dialog');

function projectCard(project) {
  const featuredClass = project.featured ? ' project-card--featured' : '';
  const fork = project.fork ? '<span class="fork-label">forked</span>' : '';
  return `
    <article class="project-card ${project.tone}${featuredClass}">
      <button class="project-open" data-project="${project.repo}" aria-label="View details for ${project.name}">
        <span class="project-top"><span class="project-number">${project.id}</span><span class="project-type">${project.categoryLabel}${fork}</span></span>
        <span class="project-art" aria-hidden="true"><i></i><b></b><em></em></span>
        <span class="project-content"><span class="project-name">${project.name}</span><span class="project-description">${project.description}</span></span>
        <span class="project-bottom"><span class="project-tags">${project.stack.slice(0, 3).map(tag => `<small>${tag}</small>`).join('')}</span><span class="project-arrow">↗</span></span>
      </button>
    </article>`;
}

function renderProjects(filter = 'all') {
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  grid.innerHTML = visible.map(projectCard).join('');
  grid.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
}

function openProject(repo) {
  const project = projects.find(item => item.repo === repo);
  document.querySelector('#dialog-index').textContent = project.id;
  document.querySelector('#dialog-type').textContent = project.categoryLabel;
  document.querySelector('#dialog-title').textContent = project.name;
  document.querySelector('#dialog-description').textContent = project.summary;
  document.querySelector('#dialog-points').innerHTML = project.points.map(point => `<li>${point}</li>`).join('');
  document.querySelector('#dialog-stack').innerHTML = project.stack.map(tag => `<span>${tag}</span>`).join('');
  document.querySelector('#dialog-github').href = `https://github.com/Divzy-B/${project.repo}`;
  dialog.showModal();
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    renderProjects(button.dataset.filter);
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
renderProjects();

