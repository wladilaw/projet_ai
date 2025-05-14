// payment-system.js - Système de paiement avec Stripe

// Ajouter les styles CSS directement dans le document
function addPaymentStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Styles pour le système de paiement */

    /* Page de paiement avec formules */
    .page-paiement {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    }

    .container-paiement {
        background-color: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 10px;
        max-width: 900px;
        width: 90%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-height: 90vh;
        overflow-y: auto;
    }

    .container-paiement h2 {
        color: #D46836;
        margin-bottom: 10px;
        font-size: 28px;
        text-align: center;
    }

    .pricing-intro {
        text-align: center;
        margin-bottom: 25px;
        color: #666;
        font-size: 18px;
    }

    /* Grille de formules */
    .pricing-plans {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        grid-gap: 20px;
        margin-top: 30px;
    }

    /* Style des formules individuelles */
    .pricing-plan {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s, box-shadow 0.3s;
        position: relative;
        overflow: hidden;
    }

    .pricing-plan:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .pricing-plan.popular {
        border: 2px solid #D46836;
        transform: scale(1.03);
    }

    .popular-badge {
        position: absolute;
        top: 10px;
        right: -30px;
        background-color: #D46836;
        color: white;
        padding: 5px 40px;
        font-size: 14px;
        transform: rotate(45deg);
        font-weight: bold;
    }

    .plan-header {
        text-align: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px;
    }

    .plan-header h3 {
        color: #333;
        font-size: 20px;
        margin-bottom: 15px;
    }

    .plan-price {
        font-size: 20px;
        color: #333;
        margin-bottom: 5px;
    }

    .plan-price .currency {
        vertical-align: super;
        font-size: 14px;
        margin-right: 2px;
    }

    .plan-price .amount {
        font-size: 36px;
        font-weight: bold;
        color: #D46836;
    }

    .plan-tokens {
        color: #666;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .plan-tokens .token-count {
        font-weight: bold;
        color: #333;
    }

    .plan-description {
        color: #777;
        font-size: 14px;
        margin-bottom: 0;
    }

    .plan-features {
        flex-grow: 1;
        padding: 0;
    }

    .plan-features ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .plan-features li {
        padding: 8px 0;
        position: relative;
        padding-left: 25px;
        font-size: 14px;
        color: #555;
    }

    .plan-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #D46836;
        font-weight: bold;
    }

    .plan-footer {
        text-align: center;
        margin-top: 20px;
    }

    .select-plan-btn {
        background-color: #D46836;
        color: white;
        border: none;
        padding: 10px 20px;
        width: 100%;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .select-plan-btn:hover {
        background-color: #c04e26;
    }

    /* Formulaire de paiement */
    .payment-header {
        text-align: center;
        margin-bottom: 25px;
        position: relative;
    }

    .back-to-plans {
        position: absolute;
        left: 0;
        top: 5px;
        background: none;
        border: none;
        color: #D46836;
        cursor: pointer;
        padding: 0;
        font-size: 16px;
        display: flex;
        align-items: center;
    }

    .back-to-plans:hover {
        text-decoration: underline;
    }

    .payment-summary {
        margin: 10px 0 25px;
        font-size: 18px;
        color: #666;
    }

    #stripe-payment-form {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }

    .form-group input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
    }

    #card-element {
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        margin-bottom: 5px;
    }

    #card-error {
        color: #D46836;
        text-align: left;
        font-size: 14px;
        margin-top: 5px;
        min-height: 20px;
        transition: opacity 0.5s;
    }

    #boutonPayer {
        background-color: #D46836;
        color: white;
        padding: 14px 20px;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 20px 0 10px;
        transition: background-color 0.3s;
        width: 100%;
        position: relative;
    }

    #boutonPayer:hover {
        background-color: #c04e26;
    }

    #boutonPayer:disabled {
        background-color: #888;
        cursor: not-allowed;
    }

    .spinner {
        color: #ffffff;
        font-size: 22px;
        text-indent: -99999px;
        margin: 0px auto;
        position: relative;
        width: 20px;
        height: 20px;
        box-shadow: inset 0 0 0 2px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        display: none;
        position: absolute;
        top: 50%;
        left: 20px;
        margin-top: -10px;
    }

    .spinner:before,
    .spinner:after {
        position: absolute;
        content: "";
    }

    .spinner:before {
        width: 10.4px;
        height: 20.4px;
        background: #D46836;
        border-radius: 20.4px 0 0 20.4px;
        top: -0.2px;
        left: -0.2px;
        -webkit-transform-origin: 10.4px 10.2px;
        transform-origin: 10.4px 10.2px;
        -webkit-animation: loading 2s infinite ease 1.5s;
        animation: loading 2s infinite ease 1.5s;
    }

    .spinner:after {
        width: 10.4px;
        height: 10.2px;
        background: #D46836;
        border-radius: 0 10.2px 10.2px 0;
        top: -0.1px;
        left: 10.2px;
        -webkit-transform-origin: 0px 10.2px;
        transform-origin: 0px 10.2px;
        -webkit-animation: loading 2s infinite ease;
        animation: loading 2s infinite ease;
    }

    @keyframes loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
    
    // Initialiser l'affichage des prix
    initPricingDisplay();
    
    return pagePaiement;
}

// Remplacer la fonction verifierEssaisGratuits existante
function verifierEssaisGratuits() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const tokens = currentUser.tokens || 0;
    
    // Si l'utilisateur a des jetons illimités ou est marqué comme premium
    if (tokens === -1 || currentUser.premium === true || localStorage.getItem('premiumActive') === 'true') {
        return true;
    }
    
    // Si l'utilisateur a des jetons, en utiliser un
    if (tokens > 0) {
        currentUser.tokens = tokens - 1;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI(); // Mettre à jour l'affichage des jetons
        return true;
    }
    
    // Sinon, vérifier les essais gratuits comme avant
    let utilisations = localStorage.getItem('utilisationsCompteur');
    
    if (utilisations === null) {
        utilisations = 0;
        localStorage.setItem('utilisationsCompteur', utilisations);
    } else {
        utilisations = parseInt(utilisations);
    }
    
    // Mettre à jour le compteur affiché
    mettreAJourCompteurAffiche();
    
    if (utilisations >= 5) {
        // Afficher la page de paiement avec les formules
        afficherPagePaiement();
        return false;
    } else {
        localStorage.setItem('utilisationsCompteur', utilisations + 1);
        mettreAJourCompteurAffiche();
        return true;
    }
}

// Fonction pour mettre à jour le compteur affiché
function mettreAJourCompteurAffiche() {
    const compteurElement = document.querySelector('.compteur-utilisations-externe');
    if (compteurElement) {
        const utilisations = parseInt(localStorage.getItem('utilisationsCompteur') || '0');
        const restantes = 5 - utilisations;
        compteurElement.querySelector('span').textContent = Math.max(0, restantes);
    }
}

// Initialiser le système au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les styles
    addPaymentStyles();
    
    // Mettre à jour l'interface utilisateur
    updateUserUI();
});
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .payment-methods {
        text-align: center;
        margin: 30px 0 20px;
    }

    .payment-methods p {
        color: #888;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .payment-icons {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    .payment-icons img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    .note {
        text-align: center;
        font-size: 14px;
        color: #888;
        margin-top: 20px;
        font-style: italic;
    }

    /* Message de succès */
    .payment-success {
        text-align: center;
        padding: 30px;
    }

    .success-icon {
        width: 80px;
        height: 80px;
        background-color: #2ecc71;
        color: white;
        font-size: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 20px;
        animation: scale-in 0.5s ease-out;
    }

    @keyframes scale-in {
        0% {
            transform: scale(0);
        }
        80% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    .payment-success h2 {
        color: #2ecc71;
        margin-bottom: 20px;
    }

    .payment-success p {
        margin-bottom: 15px;
        color: #555;
        font-size: 16px;
    }

    .btn-success {
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .btn-success:hover {
        background-color: #27ae60;
    }

    /* Affichage des jetons */
    .token-display {
        position: absolute;
        top: 15px;
        right: 200px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(5px);
    }

    .token-display .token-count {
        font-weight: bold;
        margin-right: 5px;
        font-size: 18px;
    }

    .premium-tokens {
        background-color: rgba(255, 215, 0, 0.3);
        color: white;
        border: 1px solid rgba(255, 215, 0, 0.5);
    }

    /* Badge Premium */
    .premium-badge {
        background-color: #FFD700;
        color: #333;
        padding: 5px 10px;
        border-radius: 15px;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-right: 15px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        animation: glow 2s infinite alternate;
    }

    @keyframes glow {
        from {
            box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }
        to {
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
        }
    }
    `;
    document.head.appendChild(styleElement);
}

// Initialisation de Stripe avec la clé publique
const stripePublicKey = 'pk_test_oKhSR5nslBRnBZpjO6KuzZeX';
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
        tokens: 'illimité',
        description: 'Usage professionnel sans limite',
        features: ['Lettres de motivation illimitées', 'Tous les formats de téléchargement', 'Support VIP', 'Tous les templates premium']
    }
];

// Initialiser l'affichage des formules
function initPricingDisplay() {
    const planContainer = document.createElement('div');
    planContainer.className = 'pricing-plans';
    
    pricingPlans.forEach(plan => {
        const planElement = createPlanElement(plan);
        planContainer.appendChild(planElement);
    });
    
    const containerPaiement = document.querySelector('.container-paiement');
    if (containerPaiement) {
        containerPaiement.innerHTML = '';
        containerPaiement.appendChild(planContainer);
    }
    
    return planContainer;
}

// Créer un élément HTML pour un plan
function createPlanElement(plan) {
    const planDiv = document.createElement('div');
    planDiv.className = 'pricing-plan';
    if (plan.popular) planDiv.classList.add('popular');
    
    planDiv.innerHTML = `
        <div class="plan-header">
            ${plan.popular ? '<span class="popular-badge">Populaire</span>' : ''}
            <h3>${plan.name}</h3>
            <div class="plan-price">
                <span class="currency">€</span>
                <span class="amount">${plan.price.toFixed(2)}</span>
            </div>
            <div class="plan-tokens">
                <span class="token-count">${plan.tokens}</span> jetons
            </div>
            <p class="plan-description">${plan.description}</p>
        </div>
        <div class="plan-features">
            <ul>
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <div class="plan-footer">
            <button class="select-plan-btn" data-plan-id="${plan.id}">Choisir</button>
        </div>
    `;
    
    // Ajouter l'événement au bouton
    setTimeout(() => {
        const button = planDiv.querySelector('.select-plan-btn');
        button.addEventListener('click', () => selectPlan(plan));
    }, 0);
    
    return planDiv;
}

// Gestion de la sélection d'un plan
function selectPlan(plan) {
    console.log(`Plan sélectionné: ${plan.name} à ${plan.price}€`);
    
    // Afficher le formulaire de paiement
    showPaymentForm(plan);
}

// Afficher le formulaire de paiement Stripe
function showPaymentForm(plan) {
    const containerPaiement = document.querySelector('.container-paiement');
    
    containerPaiement.innerHTML = `
        <div class="payment-header">
            <button class="back-to-plans">&larr; Retour aux formules</button>
            <h2>Paiement pour ${plan.name}</h2>
            <p class="payment-summary">
                Vous allez obtenir <strong>${plan.tokens}</strong> jetons pour <strong>${plan.price.toFixed(2)}€</strong>
            </p>
        </div>
        
        <form id="stripe-payment-form">
            <div class="form-group">
                <label for="name">Nom complet</label>
                <input type="text" id="name" placeholder="Votre nom complet" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Votre email" required>
            </div>
            
            <div class="form-group">
                <label for="card-element">Informations de paiement</label>
                <div id="card-element">
                    <!-- Les éléments Stripe seront insérés ici -->
                </div>
                <div id="card-error" role="alert"></div>
            </div>
            
            <button id="boutonPayer" type="submit">
                <div class="spinner" id="spinner"></div>
                <span id="button-text">Payer ${plan.price.toFixed(2)}€</span>
            </button>
        </form>
        
        <div class="payment-methods">
            <p>Méthodes de paiement acceptées:</p>
            <div class="payment-icons">
                <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/visa.svg" alt="Visa">
                <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/mastercard.svg" alt="Mastercard">
                <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/amex.svg" alt="American Express">
                <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/paypal.svg" alt="PayPal">
            </div>
        </div>
        
        <p class="note">* Pour tester, utilisez le numéro de carte 4242 4242 4242 4242, une date future et un code CVC à 3 chiffres.</p>
    `;
    
    // Gérer le retour vers les plans
    document.querySelector('.back-to-plans').addEventListener('click', () => {
        initPricingDisplay();
    });
    
    // Initialiser les éléments Stripe
    const card = initStripeElements();
    
    // Gérer la soumission du formulaire
    const form = document.getElementById("stripe-payment-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        processPayment(card, plan);
    });
}

// Initialiser les éléments de carte Stripe
function initStripeElements() {
    const elements = stripe.elements();
    const style = {
        base: {
            color: "#32325d",
            fontFamily: 'Raleway, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#D46836",
            iconColor: "#D46836"
        }
    };
    
    const card = elements.create("card", { style: style });
    card.mount("#card-element");
    
    // Gérer les erreurs de validation de la carte
    card.on("change", function(event) {
        const displayError = document.getElementById("card-error");
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = "";
        }
    });
    
    return card;
}

// Traiter le paiement
function processPayment(card, plan) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (!name || !email) {
        showPaymentError('Veuillez remplir tous les champs.');
        return;
    }
    
    // Désactiver le bouton pendant le traitement du paiement
    const boutonPayer = document.getElementById("boutonPayer");
    boutonPayer.disabled = true;
    document.getElementById("spinner").style.display = "inline-block";
    document.getElementById("button-text").style.opacity = "0.5";
    
    // Créer un token de paiement avec Stripe
    stripe.createToken(card, {
        name: name,
        email: email
    }).then(function(result) {
        if (result.error) {
            // Afficher l'erreur à l'utilisateur
            showPaymentError(result.error.message);
            
            // Réactiver le bouton de paiement
            boutonPayer.disabled = false;
            document.getElementById("spinner").style.display = "none";
            document.getElementById("button-text").style.opacity = "1";
        } else {
            // En environnement réel, envoyer le token au serveur
            console.log("Token de paiement créé avec succès:", result.token);
            
            // Simuler une réponse de serveur réussie après 1.5 secondes
            setTimeout(function() {
                completePayment(plan, email);
            }, 1500);
        }
    });
}

// Afficher une erreur de paiement
function showPaymentError(message) {
    const errorElement = document.getElementById('card-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    setTimeout(() => {
        errorElement.style.opacity = '0';
        setTimeout(() => {
            errorElement.style.display = 'none';
            errorElement.style.opacity = '1';
        }, 500);
    }, 3000);
}

// Finaliser le paiement avec succès
function completePayment(plan, email) {
    // Mettre à jour l'utilisateur avec les jetons achetés
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Ajouter les jetons au compte de l'utilisateur
    const currentTokens = currentUser.tokens || 0;
    const newTokens = plan.tokens === 'illimité' ? -1 : currentTokens + plan.tokens; // -1 représente un nombre illimité
    
    // Mettre à jour les données utilisateur
    currentUser.tokens = newTokens;
    currentUser.premium = newTokens === -1 ? true : (currentUser.premium || false);
    
    // Ajouter l'information de paiement
    if (!currentUser.payments) currentUser.payments = [];
    currentUser.payments.push({
        plan: plan.id,
        planName: plan.name,
        amount: plan.price,
        tokens: plan.tokens,
        date: new Date().toISOString(),
        paymentId: 'pi_' + Math.random().toString(36).substr(2, 9)
    });
    
    // Sauvegarder les données utilisateur
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Dans le cas d'un nombre illimité, activer aussi le flag global
    if (newTokens === -1) {
        localStorage.setItem('premiumActive', 'true');
    }
    
    // Réinitialiser le compteur d'utilisations
    localStorage.setItem('utilisationsCompteur', '0');
    
    // Afficher un message de succès
    const containerPaiement = document.querySelector('.container-paiement');
    containerPaiement.innerHTML = `
        <div class="payment-success">
            <div class="success-icon">✓</div>
            <h2>Paiement réussi !</h2>
            <p>Merci pour votre achat. Vous avez maintenant ${plan.tokens === 'illimité' ? 'un accès illimité' : plan.tokens + ' jetons'} pour créer des lettres de motivation de qualité.</p>
            <p>Un reçu a été envoyé à l'adresse email ${email}.</p>
            <button id="retourApp" class="btn-success">Accéder à mon compte</button>
        </div>
    `;
    
    document.getElementById("retourApp").addEventListener('click', function() {
        // Fermer la modal de paiement
        const pagePaiement = document.querySelector('.page-paiement');
        if (pagePaiement) {
            pagePaiement.remove();
        }
        
        // Afficher à nouveau l'application
        document.querySelector('.container').style.display = 'block';
        
        // Mettre à jour l'UI pour refléter le nouveau statut
        updateUserUI();
    });
}

// Mettre à jour l'interface utilisateur en fonction des jetons disponibles
function updateUserUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const tokens = currentUser.tokens || 0;
    const isPremium = tokens === -1 || currentUser.premium === true;
    
    // Mettre à jour l'affichage des jetons
    const tokenDisplay = document.querySelector('.token-display') || createTokenDisplay();
    
    if (isPremium) {
        tokenDisplay.innerHTML = `<span class="token-count">∞</span> Jetons illimités`;
        tokenDisplay.classList.add('premium-tokens');
    } else {
        tokenDisplay.innerHTML = `<span class="token-count">${tokens}</span> Jetons disponibles`;
        tokenDisplay.classList.remove('premium-tokens');
    }
    
    // Ajouter un badge premium dans la navbar si nécessaire
    const authLinks = document.querySelector('.auth-links');
    if (authLinks && isPremium && !document.querySelector('.premium-badge')) {
        const premiumBadge = document.createElement('span');
        premiumBadge.className = 'premium-badge';
        premiumBadge.innerHTML = '👑 Premium';
        authLinks.prepend(premiumBadge);
    }
    
    // Supprimer le compteur d'essais si l'utilisateur est premium
    if (isPremium) {
        const compteurExterne = document.querySelector('.compteur-utilisations-externe');
        if (compteurExterne) {
            compteurExterne.remove();
        }
    }
}

// Créer un affichage pour les jetons
function createTokenDisplay() {
    const tokenDisplay = document.createElement('div');
    tokenDisplay.className = 'token-display';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(tokenDisplay);
    } else {
        document.body.appendChild(tokenDisplay);
    }
    
    return tokenDisplay;
}

// Fonction pour afficher la page de paiement avec les différentes formules
function afficherPagePaiement() {
    // Cacher le contenu de l'application
    document.querySelector('.container').style.display = 'none';
    
    // Créer et afficher la page de paiement
    let pagePaiement = document.querySelector('.page-paiement');
    
    if (!pagePaiement) {
        pagePaiement = document.createElement('div');
        pagePaiement.className = 'page-paiement';
        pagePaiement.innerHTML = `
            <div class="container-paiement">
                <h2>Choisissez votre formule</h2>
                <p class="pricing-intro">Sélectionnez l'offre qui correspond le mieux à vos besoins</p>
                <!-- Les plans seront ajoutés ici dynamiquement -->
            </div>
        `;
        
        document.body.appendChild(pagePaiement);
    } else {
        // Réinitialiser le contenu existant
        const containerPaiement = pagePaiement.querySelector('.container-paiement');
        containerPaiement.innerHTML = `
            <h2>Choisissez votre formule</h2>
            <p class="pricing-intro">Sélectionnez l'offre qui correspond le mieux à vos besoins</p>
        `;
    }
    
    // Initialiser l'affichage des prix
    initPricingDisplay();
    
    return pagePaiement;
}
// Fonction pour afficher les offres dans le profil utilisateur
function afficherOffresProfile() {
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!currentUser.nom) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        window.location.href = 'connexion.html';
        return;
    }
    
    // Créer le contenu du profil
    const profileContent = document.createElement('div');
    profileContent.className = 'profile-content';
    
    // En-tête du profil
    const profileHeader = document.createElement('div');
    profileHeader.className = 'profile-header';
    profileHeader.innerHTML = `
        <h2>Bienvenue, ${currentUser.nom}</h2>
        <p class="profile-email">${currentUser.email}</p>
        <div class="profile-stats">
            <div class="stat-item">
                <span class="stat-value">${currentUser.tokens || 0}</span>
                <span class="stat-label">Jetons disponibles</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${currentUser.premium ? 'Oui' : 'Non'}</span>
                <span class="stat-label">Statut Premium</span>
            </div>
        </div>
    `;
    
    // Section des offres
    const offersSection = document.createElement('div');
    offersSection.className = 'profile-offers-section';
    offersSection.innerHTML = `
        <h3>Offres disponibles</h3>
        <p>Augmentez votre nombre de jetons pour créer plus de lettres de motivation.</p>
    `;
    
    // Grille des offres
    const offersGrid = document.createElement('div');
    offersGrid.className = 'profile-offers-grid';
    
    // Ajouter les plans de paiement
    pricingPlans.forEach(plan => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        if (plan.popular) offerCard.classList.add('popular');
        
        offerCard.innerHTML = `
            <div class="offer-header">
                ${plan.popular ? '<span class="popular-tag">Populaire</span>' : ''}
                <h4>${plan.name}</h4>
                <div class="offer-price">${plan.price.toFixed(2)}€</div>
                <div class="offer-tokens">${plan.tokens} jetons</div>
            </div>
            <div class="offer-features">
                <ul>
                    ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="offer-btn" data-plan-id="${plan.id}">Obtenir</button>
        `;
        
        offersGrid.appendChild(offerCard);
    });
    
    // Ajouter la grille d'offres à la section des offres
    offersSection.appendChild(offersGrid);
    
    // Historique des paiements
    const paymentsHistory = document.createElement('div');
    paymentsHistory.className = 'profile-payments-history';
    
    // En-tête de l'historique
    paymentsHistory.innerHTML = `
        <h3>Historique des paiements</h3>
    `;
    
    // Tableau des paiements
    const paymentsTable = document.createElement('table');
    paymentsTable.className = 'payments-table';
    
    // En-tête du tableau
    paymentsTable.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Formule</th>
                <th>Montant</th>
                <th>Jetons</th>
            </tr>
        </thead>
        <tbody>
            ${(currentUser.payments || []).map(payment => `
                <tr>
                    <td>${new Date(payment.date).toLocaleDateString()}</td>
                    <td>${payment.planName}</td>
                    <td>${payment.amount.toFixed(2)}€</td>
                    <td>${payment.tokens}</td>
                </tr>
            `).join('') || '<tr><td colspan="4">Aucun paiement effectué</td></tr>'}
        </tbody>
    `;
    
    paymentsHistory.appendChild(paymentsTable);
    
    // Ajouter tous les éléments au contenu du profil
    profileContent.appendChild(profileHeader);
    profileContent.appendChild(offersSection);
    profileContent.appendChild(paymentsHistory);
    
    // Afficher le contenu du profil dans un modal
    const profileModal = document.createElement('div');
    profileModal.className = 'profile-modal';
    profileModal.innerHTML = `
        <div class="profile-container">
            <button class="close-profile-btn">&times;</button>
            <div class="profile-content-wrapper"></div>
        </div>
    `;
    
    document.body.appendChild(profileModal);
    profileModal.querySelector('.profile-content-wrapper').appendChild(profileContent);
    
    // Ajouter l'événement pour fermer le modal
    profileModal.querySelector('.close-profile-btn').addEventListener('click', () => {
        profileModal.remove();
    });
    
    // Ajouter les événements aux boutons d'achat
    profileModal.querySelectorAll('.offer-btn').forEach(button => {
        button.addEventListener('click', () => {
            const planId = button.getAttribute('data-plan-id');
            const plan = pricingPlans.find(p => p.id === planId);
            if (plan) {
                profileModal.remove();
                afficherPagePaiement();
                // Pré-sélectionner le plan cliqué
                setTimeout(() => {
                    const planButton = document.querySelector(`.pricing-plan [data-plan-id="${planId}"] .select-plan-btn`);
                    if (planButton) {
                        planButton.click();
                    }
                }, 100);
            }
        });
    });
}

// CSS pour le profil
function addProfileStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .profile-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        }
        
        .profile-container {
            background-color: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 10px;
            max-width: 900px;
            width: 90%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-profile-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            color: #555;
            cursor: pointer;
        }
        
        .profile-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .profile-header h2 {
            color: #D46836;
            margin-bottom: 5px;
        }
        
        .profile-email {
            color: #777;
            margin-bottom: 20px;
        }
        
        .profile-stats {
            display: flex;
            justify-content: center;
            gap: 40px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            display: block;
        }
        
        .stat-label {
            color: #777;
            font-size: 14px;
        }
        
        .profile-offers-section {
            margin-bottom: 40px;
        }
        
        .profile-offers-section h3 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .profile-offers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .offer-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            padding: 15px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        
        .offer-card.popular {
            border: 2px solid #D46836;
        }
        
        .popular-tag {
            position: absolute;
            top: 10px;
            right: -30px;
            background-color: #D46836;
            color: white;
            padding: 3px 30px;
            font-size: 12px;
            transform: rotate(45deg);
        }
        
        .offer-header {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .offer-header h4 {
            margin: 10px 0;
            color: #333;
        }
        
        .offer-price {
            font-size: 24px;
            font-weight: bold;
            color: #D46836;
        }
        
        .offer-tokens {
            color: #777;
            margin-bottom: 10px;
        }
        
        .offer-features {
            flex-grow: 1;
        }
        
        .offer-features ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        
        .offer-features li {
            padding: 5px 0;
            font-size: 13px;
            color: #555;
            position: relative;
            padding-left: 20px;
        }
        
        .offer-features li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #D46836;
        }
        
        .offer-btn {
            background-color: #D46836;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        
        .offer-btn:hover {
            background-color: #c04e26;
        }
        
        .profile-payments-history {
            margin-top: 40px;
        }
        
        .profile-payments-history h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        .payments-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .payments-table th, .payments-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        
        .payments-table th {
            background-color: #f9f9f9;
            font-weight: bold;
            color: #333;
        }
        
        .payments-table tbody tr:hover {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(styleElement);
}

// Ajouter les styles du profil lors du chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    addProfileStyles();
    
    // Ajouter l'événement pour ouvrir le profil si on clique sur un élément avec la classe "profile-link"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('profile-link') || 
            event.target.closest('.profile-link')) {
            event.preventDefault();
            afficherOffresProfile();
        }
    });
});