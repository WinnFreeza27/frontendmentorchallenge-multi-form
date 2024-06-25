const month = document.getElementById('monthly');
const year = document.getElementById('yearly');
const biji = document.getElementById('biji');
const harga = document.querySelectorAll('.harga');
const FREE_MONTHS_CLASS = 'text-blue-950';

const sections = document.querySelectorAll('.section-main');
const backBtn = document.getElementById('back');
const submitBtn = document.getElementById('submit');
const subsElement = document.getElementById('subs');
const packRadio = document.querySelectorAll('input[name="subscription"]');
const addonCheckboxes = document.querySelectorAll('.custom-checkbox');
const labels = document.querySelectorAll('.custom-label');
const addonElementPagePrice = document.querySelectorAll('.addon-price');
const packElementName = document.querySelector('.pack-element-name');
const packElementPrice = document.querySelector('.pack-element-price');
const totalElementPrice = document.querySelector('.total-price-element');
const totalElementTitle = document.querySelector('.total-title-element');
const numberingElement = document.querySelectorAll('.numbering-element');
const confirmPopBtn = document.getElementById('confirmpopbtn');
const cancelPopBtn = document.getElementById('cancelpopbtn');
const confirmBtn = document.getElementById('confirm');
const confirmationPopupElement = document.getElementById('confirmpop');
const changePlan = document.getElementById('changeplan');

let data = {
    pack: { name: "undefined", price : 0, subs : false},
    addons : {  online : { name : 'undefined', price : 0},
                storage : { name : 'undefined', price : 0},
                customize : { name : 'undefined', price : 0}
             }
}

let currentSectionIndex = 0;


submitBtn.addEventListener('click', () => updatePages(1));
backBtn.addEventListener('click', () => updatePages(-1));
confirmBtn.addEventListener('click', confirmPopupVisibility);
changePlan.addEventListener('click', changePlanArea);

confirmPopBtn.addEventListener('click', function(){
    wrapper.classList.remove('blur-lg');
    confirmationPopupElement.classList.add('hidden');
    updatePages(1);
});
cancelPopBtn.addEventListener('click', function(){
    wrapper.classList.remove('blur-lg');
    confirmationPopupElement.classList.add('hidden');
});

function updatePages(direction) {
    storeData();
    currentSectionIndex += direction;
    updateVisual();
    pagesVisibility();
    btnVisibility();
}

function storeData() {
    if (currentSectionIndex === 1) {
        for (const radio of packRadio) {
            if (radio.checked) {
                checkPack(radio.id,subsElement.checked);
                break;
            }
        }
    }
    if (currentSectionIndex === 2) {
        for (const addon of addonCheckboxes) {
            if (addon.checked) {
                console.log(addon)
                checkAddon(addon.id);
            }
        }
    }
}

function updateVisual () {
    numberingElement.forEach((element, index) => {
        if (currentSectionIndex === index) {
            element.classList.add('bg-cyan-500', 'text-black');
        } else {
            element.classList.remove('bg-cyan-500', 'text-black');
        }
    });
    if (currentSectionIndex === 1) {
        if (data.pack.name === "undefined") {
            packRadio[0].checked = true;
            }
        };

    if (currentSectionIndex === 2) {
        resetAddons();
        const addonPrice = [1, 1, 2];

        addonElementPagePrice.forEach((element, index) => {
            const basePrice = addonPrice[index];
            const formattedPrice = data.pack.subs ? basePrice * 10 + "$/Yr" : basePrice + "$/Mo";

           element.innerText = formattedPrice;
           
        });
    }
    if (currentSectionIndex === 3) {
        packElementName.innerText = data.pack.subs ? data.pack.name + " (Yearly)" : data.pack.name + " (Monthly)";
        packElementPrice.innerText = data.pack.subs ? "$" + data.pack.price + "/yr" : "$" + data.pack.price + "/mo";
        totalElementTitle.innerText = data.pack.subs ? "Total (per year)" : "Total (per month)";
        totalPayment();

        const contentContainer = document.querySelector(".content-container-confirm");
        contentContainer.innerHTML = "";
        for (const key in data.addons) {
            if (data.addons[key].name !== "undefined") {
                const divParent = document.createElement('div');
                divParent.classList.add('flex', 'justify-between', 'items-center', 'my-3');

                const titlePara = document.createElement('p');
                titlePara.textContent = data.addons[key].name;
                titlePara.classList.add('text-gray-400');

                const titlePrice = document.createElement('p');
                
                titlePrice.textContent = data.pack.subs ? "$" + data.addons[key].price + "/yr" : "$" + data.addons[key].price + "/mo" ;
                titlePrice.classList.add('text-blue-950');

                divParent.appendChild(titlePara);
                divParent.appendChild(titlePrice);

                contentContainer.appendChild(divParent);
            }
        }
       
    }
}

function resetAddons() {
    data.addons.online = { name: 'undefined', price: 0 };
    data.addons.storage = { name: 'undefined', price: 0 };
    data.addons.customize = { name: 'undefined', price: 0 };
}

function confirmPopupVisibility() {
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.add('blur-lg')
    confirmationPopupElement.classList.remove('hidden');
}

function totalPayment() {
    const totalAddons = Object.values(data.addons).reduce((total, addonx) => total + addonx.price,0);
    const totalPrice = data.pack.price + totalAddons;
    totalElementPrice.innerText = data.pack.subs ? "$" + totalPrice + "/yr" : "$" + totalPrice + "/mo";
}


function checkPack(value, condition) {
    const packInfo = {
        arcade :    { name : "Arcade", price : 9},
        advanced :  { name : "Advanced", price : 12},
        pro :       { name : "Pro", price : 15}
    };
    const packSelected = packInfo[value];
    data.pack.name = packInfo[value].name;
    data.pack.subs = condition;
    data.pack.price = packInfo[value].price * (condition ? 10 : 1);
}

function checkAddon(val) {
    const addonInfo = {
        online :    { name : "Online Service", price : 1},
        storage :   { name : "Larger Storage", price : 1},
        customize : { name : "Customize Profile", price : 2}
    };
    const selectedAddon = addonInfo[val];
    data.addons[val].name = selectedAddon.name;
    data.addons[val].price = selectedAddon.price *(data.pack.subs ? 10 : 1);
}



function pagesVisibility() {
    sections.forEach((section, index) => {
        section.classList.toggle('hidden', currentSectionIndex !== index);
    });
}

function btnVisibility() {
    backBtn.parentNode.classList.toggle('justify-between', currentSectionIndex !== 0)
    backBtn.classList.toggle('hidden', currentSectionIndex === 0 || currentSectionIndex === sections.length - 1 );
    submitBtn.classList.toggle('hidden', currentSectionIndex === sections.length - 1 || currentSectionIndex === 3);
    confirmBtn.classList.toggle('hidden', currentSectionIndex !== 3);
}

function changePlanArea() {
    currentSectionIndex = 1;
    console.log(currentSectionIndex);
    updatePages(0);
}
window.addEventListener('load', (event) => {
    subsElement.checked = false;
    addonCheckboxes.forEach(element => {
        element.checked = false;
    });
});

subsElement.addEventListener("click", fungsiku);

function fungsiku(){
    if (subsElement.checked) {
        console.log('check');
        year.classList.add('text-blue-950');
        month.classList.remove('text-blue-950');
        biji.classList.add('translate-x-6');
    } else {
        console.log('uncheck');
        year.classList.remove('text-blue-950');
        month.classList.add('text-blue-950');
        biji.classList.remove('translate-x-6');
    }
    updateFreeMonthsVisibility();
}

function updateFreeMonthsVisibility() {
    const hargaData = [9, 12, 15];
    harga.forEach((element, index) => {
        console.log("p")
        rawPrice = hargaData[index];
        formatPrice = subsElement.checked ? rawPrice * 10 + "$/yr" : rawPrice + "$/mo";

        element.textContent = formatPrice;
    
        let freeMonthsElement = element.querySelector(`.${FREE_MONTHS_CLASS}`);

        if (subsElement.checked) {
            if (!freeMonthsElement) {
                freeMonthsElement = document.createElement('p');
                freeMonthsElement.textContent = "2 months free";
                freeMonthsElement.classList.add('text-blue-950');
                freeMonthsElement.classList.add('text-sm');
                element.appendChild(freeMonthsElement);
            }
        } else {
            if (freeMonthsElement) {
                element.removeChild(freeMonthsElement);
            }
        }
    });
}


    addonCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', function() {
            updateLabelBackground(this, labels[index]);
        });
    });

    function updateLabelBackground(checkbox, label) {
        if (checkbox.checked) {
            label.classList.add('bg-gray-400/10'); // Change to the desired background color
        } else {
            label.classList.remove('bg-gray-400/10'); // Reset to the default background color
        }
    }

    // function storeData() {
    //     updateVisual();
    //     direction ++;
    //     inputType();
    // }

    // function updateVisual() {
    //     if (!VisibilityOfBtn) {
    //         return;
    //     } else {
    //         console.log("continue the code");
    //     }
    // }