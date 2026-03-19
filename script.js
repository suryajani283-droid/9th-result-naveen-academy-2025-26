let studentsData = [];

// Fetch data from JSON
fetch('results.json')
    .then(response => response.json())
    .then(data => {
        // रैंकिंग को ऑटोमेट करने के लिए डेटा को सॉर्ट करें
        // सबसे ज्यादा नंबर वाले को पहले रखें
        studentsData = data.sort((a, b) => parseInt(b.total) - parseInt(a.total));
        
        // प्रत्येक छात्र को उसकी गणना की गई रैंक असाइन करें
        studentsData.forEach((student, index) => {
            student.calculatedRank = (index + 1);
        });
    });

function checkResult() {
    const roll = document.getElementById('roll-no').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const errorMsg = document.getElementById('error-msg');

    const student = studentsData.find(s => s.roll_no === roll && s.dob === dob);

    if (student) {
        errorMsg.innerText = "";
        showResult(student);
    } else {
        errorMsg.innerText = "रोल नंबर या जन्म तिथि गलत है!";
    }
}

function showResult(s) {
    document.getElementById('login-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    document.getElementById('res-name').innerText = s.name;
    document.getElementById('res-father').innerText = s.father_name;
    document.getElementById('res-roll').innerText = s.roll_no;
    
    const marksBody = document.getElementById('marks-body');
    marksBody.innerHTML = `
        <tr><td>हिंदी</td><td>${s.hindi}</td></tr>
        <tr><td>अंग्रेजी</td><td>${s.english}</td></tr>
        <tr><td>संस्कृत</td><td>${s.sanskrit}</td></tr>
        <tr><td>गणित</td><td>${s.math}</td></tr>
        <tr><td>विज्ञान</td><td>${s.science}</td></tr>
        <tr><td>सामाजिक विज्ञान</td><td>${s.social_science}</td></tr>
    `;

    // यहां s.rank की जगह s.calculatedRank का उपयोग किया गया है
    document.getElementById('res-total').innerText = s.total;
    document.getElementById('res-percentage').innerText = s.percentage;
    document.getElementById('res-status').innerText = s.result;
    document.getElementById('res-rank').innerText = s.calculatedRank + " (मेरिट सूची के अनुसार)";
}

function goBack() {
    document.getElementById('login-card').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');
}
