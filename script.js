// Keep track of added subjects and counter
const addedSubjects = new Set();
let sectionCounter = 2;

document.getElementById('addSubjectBtn').addEventListener('click', function() {
    const select = document.getElementById('subjectSelect');
    const selectedSubject = select.value;

    if (select.selectedIndex === 0) {
        alert('Bitte wählen Sie ein Fach aus.');
        return;
    }

    // Add subject to tracking set
    addedSubjects.add(selectedSubject);

    const newSection = document.createElement('section');
    newSection.className = 'mb-5';
    newSection.dataset.subject = selectedSubject;
    newSection.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h2>${sectionCounter}. Fach: ${selectedSubject}</h2>
            <button type="button" class="btn btn-danger btn-sm delete-section">Löschen</button>
        </div>
        <div class="mb-3">
            <label for="vocabRecognition_${selectedSubject}" class="form-label">Wortartenerkennung</label>
            <select class="form-select" id="vocabRecognition_${selectedSubject}">
                <option selected>Auswählen...</option>
                <option>Ausgezeichnet</option>
                <option>Gut</option>
                <option>Verbesserungswürdig</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="compoundTenses_${selectedSubject}" class="form-label">Umgang mit zusammengesetzten Zeiten</label>
            <select class="form-select" id="compoundTenses_${selectedSubject}">
                <option selected>Auswählen...</option>
                <option>Richtig erkannt</option>
                <option>Teilweise fehlerhaft</option>
                <option>Unsicher</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="irregularVerbs_${selectedSubject}" class="form-label">Beherrschung unregelmässiger Verben</label>
            <select class="form-select" id="irregularVerbs_${selectedSubject}">
                <option selected>Auswählen...</option>
                <option>Gut</option>
                <option>Mittelmässig</option>
                <option>Übungsbedürftig</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="punctuation_${selectedSubject}" class="form-label">Satzzeichen & komplexe Satzstrukturen</label>
            <select class="form-select" id="punctuation_${selectedSubject}">
                <option selected>Auswählen...</option>
                <option>Korrekt</option>
                <option>Teilweise korrekt</option>
                <option>Fehleranfällig</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="comments_${selectedSubject}" class="form-label">Zusätzliche Bemerkungen</label>
            <textarea class="form-control" id="comments_${selectedSubject}" rows="3" 
                placeholder="Weitere Beobachtungen zum Fach ${selectedSubject}"></textarea>
        </div>
    `;

    // Insert the new section before the dropdown container
    const dropdownContainer = document.querySelector('.d-flex.gap-2.mb-5');
    dropdownContainer.before(newSection);

    // Move dropdown after the new section
    document.getElementById('recommendations').before(dropdownContainer);

    // Update dropdown options
    updateDropdownOptions();

    // Increment counter for next section
    sectionCounter++;
});

// Handle section deletion
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-section')) {
        const section = e.target.closest('section');
        const subject = section.dataset.subject;
        addedSubjects.delete(subject);
        section.remove();
        updateDropdownOptions();
        updateSectionNumbers();
    }
});

function updateDropdownOptions() {
    const select = document.getElementById('subjectSelect');
    const allSubjects = ['Mathematik', 'Französisch'];

    // Clear existing options except the first one
    select.innerHTML = '<option selected disabled>Fach auswählen...</option>';

    // Add only subjects that haven't been used
    allSubjects
        .filter(subject => !addedSubjects.has(subject))
        .forEach(subject => {
            const option = new Option(subject, subject);
            select.add(option);
        });

    // Hide dropdown and button if no subjects left
    const container = select.closest('.d-flex');
    container.style.display = select.options.length > 1 ? 'flex' : 'none';
}

function updateSectionNumbers() {
    const sections = document.querySelectorAll('section[data-subject]');
    sections.forEach((section, index) => {
        const h2 = section.querySelector('h2');
        if (h2) {
            h2.textContent = h2.textContent.replace(/^\d+/, index + 2);
        }
    });
    sectionCounter = sections.length + 2;
}