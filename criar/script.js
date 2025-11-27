let currentStep = 0;
let selectedType = '';
let selectedRating = 0;

function updateProgress() {
    const progress = (currentStep / 2) * 100; // 3 steps total (0, 1, 2)
    document.getElementById('progressBar').style.width = progress + '%';
}

function updateNavButtons() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    btnPrev.disabled = currentStep === 0;
    
    // Change next button to check icon on last step
    if (currentStep === 2) {
        btnNext.innerHTML = '<i class="fas fa-check"></i>';

        btnNext.addEventListener('click', () => {
            window.location.href = "../menu/index.html"
        })
    } else {
        btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    }
}

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step' + stepNumber).classList.add('active');
    currentStep = stepNumber;
    updateProgress();
    updateNavButtons();
}

function selectOption(type) {
    selectedType = type;
    
    // Update labels and placeholders based on type
    if (type === 'vicio') {
        document.getElementById('field1Label').textContent = 'Vício*';
        document.getElementById('field1Input').placeholder = 'Alcoolismo, drogas...';
        document.getElementById('field2Label').textContent = 'Gatilhos*';
        document.getElementById('field2Input').placeholder = 'Saída com amigos, solidão, tédio...';
        document.getElementById('field3Label').textContent = 'Grau do Vício*';
    } else {
        document.getElementById('field1Label').textContent = 'Hábito*';
        document.getElementById('field1Input').placeholder = 'Exercício físico, leitura...';
        document.getElementById('field2Label').textContent = 'Descrição*';
        document.getElementById('field2Input').placeholder = 'Descreva o hábito que deseja criar...';
        document.getElementById('field3Label').textContent = 'Dificuldade*';
    }
    
    nextStep();
}

function selectRating(rating) {
    selectedRating = rating;
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function nextStep() {
    if (currentStep === 1) {
        // Update summary before moving to step 2
        updateSummary();
    }
    
    if (currentStep < 2) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

function updateSummary() {
    const field1Value = document.getElementById('field1Input').value || 'Alcoolismo';
    const ratingValue = selectedRating || 4;
    
    document.getElementById('summaryTitle').textContent = field1Value;
    
    if (selectedType === 'vicio') {
        document.getElementById('summaryIcon').className = 'fas fa-wine-bottle';
        document.getElementById('summarySubtitle').textContent = 'Grau: ' + ratingValue;
    } else {
        document.getElementById('summaryIcon').className = 'fas fa-person-running';
        document.getElementById('summarySubtitle').textContent = 'Dificuldade: ' + ratingValue;
    }
}

function editInfo() {
    showStep(1);
}

// Initialize
updateProgress();
updateNavButtons();