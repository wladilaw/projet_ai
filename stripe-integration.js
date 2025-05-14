// stripe-integration.js - Intégration de Stripe pour le système de paiement

// Configuration de Stripe
const stripePublicKey = 'pk_test_51RC0EwPF17ULbIY5M0isx7mJOrJRRcjlvzUDpfnCNopkNJGuCNbzLIvlGSHL2i5LKGGpFl4EiUvPDPqF1E7G8gtL00w0WwSo93'; // Remplacez par votre clé publique Stripe réelle
const stripe = Stripe(stripePublicKey);

// Plans de paiement disponibles
const pricingPlans = [
    {
        id: 'basic',
        name: 'Formule Basique',
        price: 1.00,
        tokens: 10,
        description: 'Idéal pour des besoins ponctuels',
        features: ['10 lettres de motivation', 'Téléchargement en .txt', 'Accès à tous les templates']
    },
    {
        id: 'standard',
        name: 'Formule Standard',
        price: 4.99,
        tokens: 50,
        description: 'Pour plusieurs candidatures',
        popular: true,
        features: ['50 lettres de motivation', 'Téléchargement en .txt et .docx', 'Historique de vos lettres']
    },
    {
        id: 'premium',
        name: 'Formule Premium',
        price: 9.99,
        tokens: 120,
        description: 'Pour les demandeurs d\'emploi actifs',
        features: ['120 lettres de motivation', 'Téléchargement en tous formats', 'Support prioritaire', 'Accès à des templates exclusifs']
    },
    {
        id: 'unlimited',
        name: 'Formule Illimitée',
        price: 19.99,
        tokens: -1, // -1 signifie illimité
        description: 'Usage professionnel sans limite',
        features: ['Lettres de motivation illimitées', 'Tous les formats de téléchargement', 'Support VIP', 'Tous les templates premium']
    }
];

// Fonction pour afficher les formules de paiement
function displayPricingPlans(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Vider le conteneur
    
    // Créer un titre
    const title = document.createElement('h2');
    title.textContent = 'Choisissez votre formule';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.color = '#D46836';
    container.appendChild(title);
    
    // Créer un conteneur pour les plans
    const plansGrid = document.createElement('div');
    plansGrid.style.display = 'grid';
    plansGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    plansGrid.style.gap = '20px';
    plansGrid.style.marginTop = '20px';
    
    // Ajouter chaque plan
    pricingPlans.forEach(plan => {
        const planCard = createPlanCard(plan);
        plansGrid.appendChild(planCard);
    });
    
    container.appendChild(plansGrid);
}

// Fonction pour créer une carte de plan
function createPlanCard(plan) {
    const card = document.createElement('div');
    card.className = 'plan-card';
    card.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    card.style.borderRadius = '8px';
    card.style.padding = '20px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.transition = 'transform 0.3s, box-shadow 0.3s';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.style.border = plan.popular ? '2px solid #D46836' : '1px solid rgba(255, 255, 255, 0.3)';
    
    // Ajouter un effet de survol
    card.onmouseover = function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    };
    card.onmouseout = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    };
    
    // Badge "Populaire" si applicable
    if (plan.popular) {
        const badge = document.createElement('div');
        badge.className = 'popular-badge';
        badge.textContent = 'Populaire';
        badge.style.position = 'absolute';
        badge.style.top = '10px';
        badge.style.right = '-30px';
        badge.style.background = '#D46836';
        badge.style.color = 'white';
        badge.style.padding = '5px 30px';
        badge.style.transform = 'rotate(45deg)';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = 'bold';
        card.appendChild(badge);
    }
    
    // En-tête de la carte
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '20px';
    
    const name = document.createElement('h3');
    name.textContent = plan.name;
    name.style.color = 'white';
    name.style.margin = '0 0 10px 0';
    
    const price = document.createElement('div');
    price.className = 'price';
    price.innerHTML = `<span style="font-size: 14px; vertical-align: top;">€</span><span style="font-size: 30px; font-weight: bold; color: #D46836;">${plan.price.toFixed(2)}</span>`;
    
    const tokens = document.createElement('div');
    tokens.textContent = plan.tokens === -1 ? '∞ Jetons illimités' : `${plan.tokens} jetons`;
    tokens.style.color = 'rgba(255, 255, 255, 0.9)';
    tokens.style.marginBottom = '5px';
    
    const description = document.createElement('p');
    description.textContent = plan.description;
    description.style.color = 'rgba(255, 255, 255, 0.7)';
    description.style.fontSize = '14px';
    description.style.margin = '5px 0';
    
    header.appendChild(name);
    header.appendChild(price);
    header.appendChild(tokens);
    header.appendChild(description);
    
    // Liste des fonctionnalités
    const features = document.createElement('ul');
    features.style.listStyleType = 'none';
    features.style.padding = '0';
    features.style.margin = '0';
    features.style.flexGrow = '1';
    
    plan.features.forEach(feature => {
        const item = document.createElement('li');
        item.textContent = feature;
        item.style.padding = '8px 0';
        item.style.position = 'relative';
        item.style.paddingLeft = '25px';
        item.style.color = 'rgba(255, 255, 255, 0.8)';
        
        // Ajouter une icône de vérification
        const checkmark = document.createElement('span');
        checkmark.textContent = '✓';
        checkmark.style.position = 'absolute';
        checkmark.style.left = '0';
        checkmark.style.color = '#D46836';
        checkmark.style.fontWeight = 'bold';
        
        item.prepend(checkmark);
        features.appendChild(item);
    });
    
    // Bouton d'achat
    const button = document.createElement('button');
    button.textContent = 'Acheter';
    button.className = 'purchase-btn';
    button.style.backgroundColor = '#D46836';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '12px 20px';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.marginTop = '20px';
    button.style.fontFamily = 'Raleway, sans-serif';
    button.style.fontWeight = '500';
    button.style.fontSize = '16px';
    button.style.transition = 'opacity 0.3s';
    
    button.onmouseover = function() {
        this.style.opacity = '0.9';
    };
    button.onmouseout = function() {
        this.style.opacity = '1';
    };
    
    // Ajouter l'événement d'achat
    button.addEventListener('click', function() {
        initiatePurchase(plan);
    });
    
    // Assembler la carte
    card.appendChild(header);
    card.appendChild(features);
    card.appendChild(button);
    
    return card;
}

// Fonction pour initier un achat
function initiatePurchase(plan) {
    console.log(`Initiation de l'achat du plan: ${plan.name}`);
    
    // En mode réel, vous feriez un appel à Stripe ici
    // Pour l'exemple, nous allons simuler le paiement
    
    // Afficher un message de confirmation
    if (confirm(`Vous allez acheter la ${plan.name} pour ${plan.price.toFixed(2)}€. Êtes-vous sûr?`)) {
        // Créer une session de paiement Stripe (simulé)
        createPaymentSession(plan);
    }
}

// Fonction pour créer une session de paiement (simulée)
function createPaymentSession(plan) {
    // Dans une intégration réelle, vous feriez un appel à votre backend ici
    // Le backend créerait une session Stripe et vous renverrait l'ID de session
    
    // Simulation du processus de paiement
    showLoadingOverlay('Préparation du paiement...');
    
    setTimeout(() => {
        // Simuler la redirection vers Stripe
        showLoadingOverlay('Redirection vers le système de paiement sécurisé...');
        
        setTimeout(() => {
            // Simuler un paiement réussi
            processSuccessfulPayment(plan);
        }, 2000);
    }, 1500);
}

// Fonction pour traiter un paiement réussi
function processSuccessfulPayment(plan) {
    // Mettre à jour l'utilisateur actuel
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Si l'utilisateur est connecté, mettre à jour ses jetons
    if (currentUser.nom) {
        // Déterminer le nombre de jetons à ajouter (ou définir comme illimité)
        if (plan.tokens === -1) {
            currentUser.tokens = -1;
            currentUser.premium = true;
        } else {
            // Si l'utilisateur a déjà des jetons illimités, ne pas les changer
            if (currentUser.tokens !== -1) {
                currentUser.tokens = (currentUser.tokens || 0) + plan.tokens;
            }
            // Si le plan est premium, marquer l'utilisateur comme premium
            if (plan.id === 'premium' || plan.id === 'unlimited') {
                currentUser.premium = true;
            }
        }
        
        // Ajouter l'historique de paiement
        if (!currentUser.payments) {
            currentUser.payments = [];
        }
        
        // Ajouter le nouveau paiement
        currentUser.payments.push({
            id: 'payment_' + Date.now(),
            planId: plan.id,
            planName: plan.name,
            amount: plan.price,
            tokens: plan.tokens,
            date: new Date().toISOString()
        });
        
        // Sauvegarder les modifications
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Mettre à jour la liste des utilisateurs (si l'utilisateur existe dans la liste)
        updateUserInList(currentUser);
    } else {
        // Si l'utilisateur n'est pas connecté, stocker les jetons temporairement
        localStorage.setItem('premiumActive', 'true');
        localStorage.setItem('temporaryTokens', plan.tokens === -1 ? '-1' : plan.tokens.toString());
    }
    
    // Afficher la page de succès
    showSuccessPage(plan);
}

// Fonction pour mettre à jour un utilisateur dans la liste des utilisateurs
function updateUserInList(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...user };
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Fonction pour afficher une page de succès
function showSuccessPage(plan) {
    // Masquer l'overlay de chargement
    hideLoadingOverlay();
    
    // Créer un élément pour la page de succès
    const successPage = document.createElement('div');
    successPage.style.position = 'fixed';
    successPage.style.top = '0';
    successPage.style.left = '0';
    successPage.style.width = '100%';
    successPage.style.height = '100%';
    successPage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    successPage.style.display = 'flex';
    successPage.style.justifyContent = 'center';
    successPage.style.alignItems = 'center';
    successPage.style.zIndex = '9999';
    
    // Contenu de la page de succès
    const content = document.createElement('div');
    content.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    content.style.borderRadius = '10px';
    content.style.padding = '30px';
    content.style.maxWidth = '500px';
    content.style.textAlign = 'center';
    
    // Icône de succès
    const successIcon = document.createElement('div');
    successIcon.innerHTML = '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 12 14 8 10"></polyline></svg>';
    
    // Titre
    const title = document.createElement('h2');
    title.textContent = 'Paiement réussi !';
    title.style.color = '#28a745';
    title.style.marginTop = '20px';
    
    // Message
    const message = document.createElement('p');
    message.innerHTML = `Merci pour votre achat ! Vous avez acquis <strong>${plan.tokens === -1 ? 'des jetons illimités' : plan.tokens + ' jetons'}</strong> pour créer vos lettres de motivation.`;
    message.style.marginBottom = '20px';
    
    // Bouton pour retourner à l'application
    const button = document.createElement('button');
    button.textContent = 'Retourner à l\'application';
    button.style.backgroundColor = '#D46836';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '12px 20px';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    
    button.addEventListener('click', function() {
        document.body.removeChild(successPage);
        // Recharger la page pour refléter les changements
        window.location.reload();
    });
    
    // Assembler le contenu
    content.appendChild(successIcon);
    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(button);
    successPage.appendChild(content);
    
    // Ajouter à la page
    document.body.appendChild(successPage);
}

// Fonction pour afficher un overlay de chargement
function showLoadingOverlay(message) {
    // Supprimer l'overlay existant s'il y en a un
    hideLoadingOverlay();
    
    // Créer un nouvel overlay
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    
    // Spinner de chargement
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTop = '5px solid #D46836';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Ajouter une règle CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Message de chargement
    const text = document.createElement('p');
    text.textContent = message || 'Chargement...';
    text.style.color = 'white';
    text.style.marginTop = '20px';
    text.style.fontSize = '18px';
    
    overlay.appendChild(spinner);
    overlay.appendChild(text);
    document.body.appendChild(overlay);
}

// Fonction pour masquer l'overlay de chargement
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Fonction pour afficher la page de paiement
function showPaymentPage(containerId) {
    // Récupérer le conteneur
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Masquer le contenu de l'application
    document.querySelectorAll('.container').forEach(el => {
        if (el.id !== containerId) {
            el.style.display = 'none';
        }
    });
    
    // Afficher le conteneur de paiement
    container.style.display = 'block';
    
    // Afficher les plans de paiement
    displayPricingPlans(containerId);
}

// Exporter les fonctions
window.stripeIntegration = {
    showPaymentPage: showPaymentPage,
    displayPricingPlans: displayPricingPlans,
    initiatePurchase: initiatePurchase
};