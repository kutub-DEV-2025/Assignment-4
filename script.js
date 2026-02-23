
// Data Lists
let interviewList = [];
let rejectedList = [];


// Dashboard Elements

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');

// Buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

//  Sections
const allCardsSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');

// Initial Total Count
function calculateCount() {
    total.innerText = allCardsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// Toggle Tabs
function toggleStyle(id) {

    const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];

    // Reset style
    buttons.forEach(btn => {
        btn.classList.remove('bg-black', 'text-white');
        btn.classList.add('bg-gray-300', 'text-black');
    });

    // Active button
    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-black', 'text-white');

    // Section control
    if (id === 'all-filter-btn') {
        allCardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id === 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(interviewList, 'Interview');
    }
    else if (id === 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(rejectedList, 'Rejected');
    }
}


// Render Filtered Cards
function renderFiltered(list, type) {

    filterSection.innerHTML = '';

    if (list.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center p-10 text-gray-500">
                <h3 class="text-xl font-bold">No ${type} Jobs</h3>
            </div>
        `;
        return;
    }

    list.forEach(job => {

        const div = document.createElement('div');
        div.className = 'bg-white p-5 shadow rounded mb-4';

        div.innerHTML = `
            <h3 class="font-bold text-lg">${job.company}</h3>
            <p>${job.position}</p>
            <p class="text-sm text-gray-500 mb-2">${job.details}</p>

            <button class="btn btn-sm mb-2 
            ${type === 'Interview' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
            ${type}
            </button>

            <p class="text-sm text-gray-500">${job.description}</p>
        `;

        filterSection.appendChild(div);
    });
}


// Card Click Events

mainContainer.addEventListener('click', function (e) {

    const card = e.target.closest('.jobCard');
    if (!card) return;

    const company = card.querySelector('h3').innerText;
    const position = card.querySelector('p').innerText;
    const details = card.querySelector('.text-gray-500').innerText;
    const description = card.querySelectorAll('.text-gray-500')[1]?.innerText || '';

    const jobData = {
        company,
        position,
        details,
        description
    };

    // Interview 
    if (e.target.classList.contains('interview')) {

        // Update status text
        const statusBtn = card.querySelector('.status-text');
        statusBtn.innerText = 'Interview';
        statusBtn.classList.remove('bg-blue-100');
        statusBtn.classList.add('bg-green-100', 'text-green-700');

        // Add to list if not exists
        if (!interviewList.find(job => job.company === company)) {
            interviewList.push(jobData);
        }

        // Remove from rejected
        rejectedList = rejectedList.filter(job => job.company !== company);

        calculateCount();
    }

    //  Rejected 
    if (e.target.classList.contains('rejected')) {

        const statusBtn = card.querySelector('.status-text');
        statusBtn.innerText = 'Rejected';
        statusBtn.classList.remove('bg-blue-100');
        statusBtn.classList.add('bg-red-100', 'text-red-700');

        if (!rejectedList.find(job => job.company === company)) {
            rejectedList.push(jobData);
        }

        interviewList = interviewList.filter(job => job.company !== company);

        calculateCount();
    }
});