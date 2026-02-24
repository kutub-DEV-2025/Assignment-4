
let interviewList = [];
let rejectedList = [];


const totalEl = document.getElementById('total');
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const allCardsSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');


function calculateCount() {
    totalEl.innerText = allCardsSection.children.length;
    interviewCountEl.innerText = interviewList.length;
    rejectedCountEl.innerText = rejectedList.length;
}
calculateCount();


function toggleStyle(id) {
    const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
    buttons.forEach(btn => {
        btn.classList.remove('bg-black','text-white');
        btn.classList.add('bg-gray-300','text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300','text-black');
    selected.classList.add('bg-black','text-white');

    if(id==='all-filter-btn'){
        allCardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if(id==='interview-filter-btn'){
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(interviewList,'Interview');
    } else if(id==='rejected-filter-btn'){
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(rejectedList,'Rejected');
    }
}

function renderFiltered(list,type){
    filterSection.innerHTML='';
    if(list.length===0){
        filterSection.innerHTML=`<div class="text-center p-10 text-gray-500" style="display: flex;justify-content: center;align-content: center;align-items: center;flex-direction: column;">
        <img class="text-center" src="./jobs.png">
        <h3 class="text-xl font-bold">No ${type} Jobs</h3>
        <p style="color:gray">Check back soon for new job opportunities</p>
        </div>`;
        return;
    }
    list.forEach(job=>{
        const div=document.createElement('div');
        div.className='bg-white p-5 shadow rounded mb-4 flex justify-between';
        div.innerHTML=`
        <div class="jobCard">
            <h3 class="font-bold text-lg">${job.company}</h3>
            <p>${job.position}</p>
            <p class="text-sm text-gray-500 mb-2">${job.details}</p>
            <button class="status-text btn btn-sm mb-2 ${
                type==='Interview' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }">${type}</button>
            <p class="text-sm text-gray-500">${job.description}</p>
        </div>
        <div>
            <button class="delete-btn rounded-[50%] btn">🗑</button>
        </div>`;
        filterSection.appendChild(div);
    });
}

mainContainer.addEventListener('click',function(e){

    if(e.target.closest('.delete-btn')){
        const btn = e.target.closest('.delete-btn');
        const parentCard = btn.closest('.bg-white');
        if(!parentCard) return;

        const companyName = parentCard.querySelector('h3')?.innerText;
        interviewList = interviewList.filter(job=>job.company!==companyName);
        rejectedList = rejectedList.filter(job=>job.company!==companyName);

        parentCard.remove();
        calculateCount();

        // Refresh filtered view if active
        if(!allCardsSection.classList.contains('hidden')){
            return;
        }
        if(interviewFilterBtn.classList.contains('bg-black')) renderFiltered(interviewList,'Interview');
        if(rejectedFilterBtn.classList.contains('bg-black')) renderFiltered(rejectedList,'Rejected');
        return;
    }

    const card = e.target.closest('.jobCard');
    if(!card) return;

    const company = card.querySelector('h3').innerText;
    const position = card.querySelector('p').innerText;
    const details = card.querySelector('.text-gray-500').innerText;
    const description = card.querySelectorAll('.text-gray-500')[1]?.innerText || '';
    const jobData = {company,position,details,description};

    if(e.target.classList.contains('interview')){
        const statusBtn=card.querySelector('.status-text');
        statusBtn.innerText='Interview';
        statusBtn.classList.remove('bg-blue-100','text-black');
        statusBtn.classList.add('bg-green-100','text-green-700');

        if(!interviewList.find(job=>job.company===company)) interviewList.push(jobData);
        rejectedList = rejectedList.filter(job=>job.company!==company);
        calculateCount();
    }

    if(e.target.classList.contains('rejected')){
        const statusBtn=card.querySelector('.status-text');
        statusBtn.innerText='Rejected';
        statusBtn.classList.remove('bg-blue-100','text-black');
        statusBtn.classList.add('bg-red-100','text-red-700');

        if(!rejectedList.find(job=>job.company===company)) rejectedList.push(jobData);
        interviewList = interviewList.filter(job=>job.company!==company);
        calculateCount();
    }
});