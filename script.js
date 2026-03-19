let studentsData = [];

// JSON से डेटा लोड करें
fetch('results.json')
    .then(response => response.json())
    .then(data => {
        // 1. ऑटो कैलकुलेशन: Total और Percentage निकालें
        studentsData = data.map(s => {
            const totalMarks = 
                parseInt(s.hindi) + 
                parseInt(s.english) + 
                parseInt(s.sanskrit) + 
                parseInt(s.math) + 
                parseInt(s.science) + 
                parseInt(s.social_science);
            
            const perc = ((totalMarks / 1200) * 100).toFixed(2);
            
            return {
                ...s,
                total: totalMarks,
                percentage: perc + "%"
            };
        });

        // 2. ऑटो रैंकिंग: Total के आधार पर सॉर्ट करें (बड़े से छोटा)
        studentsData.sort((a, b) => b.total - a.total);

        // 3. रैंक असाइन करें (1st, 2nd, 3rd format में)
        studentsData.forEach((student, index) => {
            const rank = index + 1;
            let suffix = "th";
            if (rank % 10 === 1 && rank % 100 !== 11) suffix = "st";
            else if (rank % 10 === 2 && rank % 100 !== 12) suffix = "nd";
            else if (rank % 10 === 3 && rank % 100 !== 13) suffix = "rd";
            
            student.autoRank = rank + suffix;
        });
    })
    .catch(err => console.error("Data loading error:", err));

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

    document.getElementById('res-total').innerText = s.total;
    document.getElementById('res-percentage').innerText = s.percentage;
    document.getElementById('res-status').innerText = s.total >= 396 ? "PASS" : "FAIL"; // 33% passing criteria
    document.getElementById('res-rank').innerText = s.autoRank;
}

function goBack() {
    document.getElementById('login-card').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');
}
