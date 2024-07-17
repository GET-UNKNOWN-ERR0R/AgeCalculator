document.addEventListener('DOMContentLoaded', (event) => {
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');

    // Populate year select
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Populate day select
    populateDays();

    yearSelect.addEventListener('change', populateDays);
    monthSelect.addEventListener('change', populateDays);

    function populateDays() {
        daySelect.innerHTML = '';
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    document.getElementById('calculate-age').addEventListener('click', function() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value) - 1;
        const day = parseInt(daySelect.value);
        const dob = new Date(year, month, day);
        
        if (isNaN(dob)) {
            alert('Please enter a valid date of birth.');
            return;
        }

        const age = calculateAge(dob);
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
    });

    function calculateAge(dob) {
        const now = new Date();
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        return { years, months, days };
    }
});
