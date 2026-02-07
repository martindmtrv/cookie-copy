// Storage key for extension configurations
const STORAGE_KEY = 'cookie_copy_configs';

// DOM Elements
const configList = document.getElementById('config-list');
const noConfigs = document.getElementById('no-configs');
const addSiteBtn = document.getElementById('add-site-btn');
const configModal = document.getElementById('config-modal');
const configForm = document.getElementById('config-form');
const modalTitle = document.getElementById('modal-title');
const closeBtns = document.querySelectorAll('.close-btn');

// State
let configs = [];
let editingId = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfigs();
    renderConfigs();
});

// Load configs from storage
async function loadConfigs() {
    const data = await browser.storage.local.get(STORAGE_KEY);
    configs = data[STORAGE_KEY] || [];
}

// Save configs to storage
async function saveConfigs() {
    await browser.storage.local.set({ [STORAGE_KEY]: configs });
}

// Render the list of configurations
function renderConfigs() {
    configList.innerHTML = '';
    
    if (configs.length === 0) {
        configList.appendChild(noConfigs);
        return;
    }

    configs.forEach(config => {
        const card = document.createElement('div');
        card.className = 'config-card';
        
        // Header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        
        const domainName = document.createElement('div');
        domainName.className = 'domain-name';
        domainName.textContent = config.domain;
        
        const cardActions = document.createElement('div');
        cardActions.className = 'card-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn icon secondary edit-btn';
        editBtn.setAttribute('data-id', config.id);
        editBtn.title = 'Edit';
        const editSpan = document.createElement('span');
        editSpan.textContent = 'Edit';
        editBtn.appendChild(editSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn icon danger delete-btn';
        deleteBtn.setAttribute('data-id', config.id);
        deleteBtn.title = 'Delete';
        const deleteSpan = document.createElement('span');
        deleteSpan.textContent = 'Delete';
        deleteBtn.appendChild(deleteSpan);
        
        cardActions.appendChild(editBtn);
        cardActions.appendChild(deleteBtn);
        cardHeader.appendChild(domainName);
        cardHeader.appendChild(cardActions);
        
        // Cookies
        const cookieList = document.createElement('div');
        cookieList.className = 'cookie-list';
        config.cookies.split(',').forEach(c => {
            const span = document.createElement('span');
            span.className = 'cookie-tag';
            span.textContent = c.trim();
            cookieList.appendChild(span);
        });
        
        // Template
        const templatePreview = document.createElement('div');
        templatePreview.className = 'template-preview';
        templatePreview.textContent = config.template;
        
        card.appendChild(cardHeader);
        card.appendChild(cookieList);
        card.appendChild(templatePreview);
        
        configList.appendChild(card);
    });

    // Add event listeners to newly created buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            openModal(id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            deleteConfig(id);
        });
    });
}

// Open modal for add or edit
function openModal(id = null) {
    editingId = id;
    if (id) {
        const config = configs.find(c => c.id === id);
        document.getElementById('domain').value = config.domain;
        document.getElementById('cookie-keys').value = config.cookies;
        document.getElementById('template').value = config.template;
        modalTitle.textContent = 'Edit Site Configuration';
    } else {
        configForm.reset();
        modalTitle.textContent = 'Add New Site';
    }
    configModal.classList.add('active');
}

// Close modal
function closeModal() {
    configModal.classList.remove('active');
    editingId = null;
}

// Delete configuration
async function deleteConfig(id) {
    if (confirm('Are you sure you want to delete this configuration?')) {
        configs = configs.filter(c => c.id !== id);
        await saveConfigs();
        renderConfigs();
    }
}

// Handle form submission
configForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const domain = document.getElementById('domain').value.trim();
    const cookies = document.getElementById('cookie-keys').value.trim();
    const template = document.getElementById('template').value.trim();

    if (editingId) {
        const index = configs.findIndex(c => c.id === editingId);
        configs[index] = { ...configs[index], domain, cookies, template };
    } else {
        configs.push({
            id: Date.now().toString(),
            domain,
            cookies,
            template
        });
    }

    await saveConfigs();
    renderConfigs();
    closeModal();
});

// Event Listeners
addSiteBtn.addEventListener('click', () => openModal());
closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === configModal) {
        closeModal();
    }
});
