document.getElementById('student-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const studentName = document.getElementById('name').value;
    const studentEmail = document.getElementById('email').value;
    const studentPhone = document.getElementById('phone').value;

    fetch('/submit_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${studentName}&email=${studentEmail}&phone=${studentPhone}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('test-options-container').classList.remove('hidden');
    });
});

document.getElementById('mock-test-btn').addEventListener('click', function () {
    fetch('/mock_test', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const questionsList = document.getElementById('questions-list');
        questionsList.innerHTML = '';
        data.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p><strong>${question.subject}</strong>: ${question.question}</p>
                <ul>
                    ${question.options.map(opt => `<li>${opt}</li>`).join('')}
                </ul>
            `;
            questionsList.appendChild(questionElement);
        });
        document.getElementById('test-options-container').classList.add('hidden');
        document.getElementById('mock-test-container').classList.remove('hidden');
    });
});

document.getElementById('conceptual-test-btn').addEventListener('click', function () {
    document.getElementById('test-options-container').classList.add('hidden');
    document.getElementById('conceptual-test-container').classList.remove('hidden');
});

document.getElementById('next-btn').addEventListener('click', function () {
    const subject = document.getElementById('subject-select').value;
    if (subject) {
        fetch('/conceptual_test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('conceptual-test-container').classList.add('hidden');
            document.getElementById('chapter-selection').classList.remove('hidden');
            const chapterSelect = document.getElementById('chapter-select');
            chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
            data.questions.forEach(chapter => {
                chapterSelect.innerHTML += `<option value="${chapter.question}">${chapter.question}</option>`;
            });
        });
    }
});

document.getElementById('submit-chapter-btn').addEventListener('click', function () {
    const chapter = document.getElementById('chapter-select').value;
    if (chapter) {
        alert(`You selected ${chapter}. Test paper generated!`);
    }
});
