document.addEventListener('DOMContentLoaded', () => {
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
header.classList.add('header-active');
} else {
header.classList.remove('header-active');
}
});
const sliderBudget = document.getElementById('sliderBudget');
const sliderConv = document.getElementById('sliderConv');
const sliderAov = document.getElementById('sliderAov');
const valBudget = document.getElementById('valBudget');
const valConv = document.getElementById('valConv');
const valAov = document.getElementById('valAov');
const metricCurSales = document.getElementById('metricCurSales');
const metricOptSales = document.getElementById('metricOptSales');
const metricIncrease = document.getElementById('metricIncrease');
const valEstimatedRoi = document.getElementById('valEstimatedRoi');
const ESTIMATED_CPC = 180;
function formatKwanza(value) {
return Math.round(value).toLocaleString('pt-PT') + ' Kz';
}
function calculateROI() {
const budget = parseFloat(sliderBudget.value);
const currentConv = parseFloat(sliderConv.value) / 100;
const aov = parseFloat(sliderAov.value);
valBudget.textContent = formatKwanza(budget);
valConv.textContent = (currentConv * 100).toFixed(1) + '%';
valAov.textContent = formatKwanza(aov);
const clicks = budget / ESTIMATED_CPC;
const currentSales = clicks * currentConv;
const optimizedConv = Math.min(Math.max(currentConv * 2.2, 0.025), 0.06);
const optimizedSales = clicks * optimizedConv;
const currentRevenue = currentSales * aov;
const optimizedRevenue = optimizedSales * aov;
const increaseRevenue = optimizedRevenue - currentRevenue;
metricCurSales.textContent = Math.round(currentSales) + ' leads';
metricOptSales.textContent = Math.round(optimizedSales) + ' leads';
metricIncrease.textContent = formatKwanza(increaseRevenue);
valEstimatedRoi.textContent = formatKwanza(optimizedRevenue);
}
if (sliderBudget && sliderConv && sliderAov) {
sliderBudget.addEventListener('input', calculateROI);
sliderConv.addEventListener('input', calculateROI);
sliderAov.addEventListener('input', calculateROI);
calculateROI(); // Inicialização
}
let currentStep = 1;
const totalSteps = 3;
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const panel3 = document.getElementById('panel3');
const servicePrices = {
aut: 450000,  // Automação e IA
web: 650000,  // Websites & Landing Pages de Elite
ads: 350000,  // Meta Ads e Publicidade Paga
red: 300000,  // Gestão de Redes Sociais
dom: 80000,   // Venda e Gestão de Domínios
eml: 120000   // Configuração de E-mails Corporativos
};
const serviceNames = {
aut: "Automação e IA",
web: "Websites de Elite",
ads: "Marketing Digital & Tráfego",
red: "Redes Sociais",
dom: "Segurança & Presença Web",
eml: "E-mails Corporativos"
};
const scaleMultipliers = {
sm: 1.0, // Startup
md: 1.3, // PME
lg: 1.8  // Grande Corporação
};
function updateConfiguratorSummary() {
const checkboxes = [
document.getElementById('chkPillar1'),
document.getElementById('chkPillar2'),
document.getElementById('chkPillar3'),
document.getElementById('chkPillar4'),
document.getElementById('chkPillar5'),
document.getElementById('chkPillar6')
];
const summaryEmpty = document.getElementById('summaryEmpty');
const summaryList = document.getElementById('summaryList');
const priceVal = document.getElementById('priceVal');
summaryList.innerHTML = '';
let selectedCount = 0;
let baseTotal = 0;
checkboxes.forEach(chk => {
if (chk && chk.checked) {
selectedCount++;
const val = chk.value;
baseTotal += servicePrices[val];
const li = document.createElement('li');
li.className = 'summary-item';
li.textContent = serviceNames[val];
summaryList.appendChild(li);
}
});
const selectedScale = document.querySelector('input[name="scale"]:checked');
const multiplier = selectedScale ? scaleMultipliers[selectedScale.value] : 1.0;
const finalTotal = baseTotal * multiplier;
if (selectedCount > 0) {
summaryEmpty.style.display = 'none';
summaryList.style.display = 'flex';
priceVal.textContent = formatKwanza(finalTotal);
} else {
summaryEmpty.style.display = 'block';
summaryList.style.display = 'none';
priceVal.textContent = 'A calcular...';
}
}
const checkboxes = document.querySelectorAll('.pillars-checkbox-grid input[type="checkbox"]');
checkboxes.forEach(chk => chk.addEventListener('change', updateConfiguratorSummary));
const radios = document.querySelectorAll('input[name="scale"]');
radios.forEach(rad => rad.addEventListener('change', updateConfiguratorSummary));
function showStep(step) {
panel1.classList.remove('active');
panel2.classList.remove('active');
panel3.classList.remove('active');
if (step === 1) {
panel1.classList.add('active');
btnPrev.style.visibility = 'hidden';
btnNext.textContent = 'Próximo';
} else if (step === 2) {
panel2.classList.add('active');
btnPrev.style.visibility = 'visible';
btnNext.textContent = 'Próximo';
} else if (step === 3) {
panel3.classList.add('active');
btnPrev.style.visibility = 'visible';
btnNext.textContent = 'Submeter Pedido';
}
dot1.classList.remove('active');
dot2.classList.remove('active');
dot3.classList.remove('active');
if (step >= 1) dot1.classList.add('active');
if (step >= 2) dot2.classList.add('active');
if (step >= 3) dot3.classList.add('active');
}
btnNext.addEventListener('click', () => {
if (currentStep < totalSteps) {
if (currentStep === 1) {
const selected = document.querySelectorAll('.pillars-checkbox-grid input[type="checkbox"]:checked');
if (selected.length === 0) {
triggerAlert('Aviso', 'Selecione pelo menos um serviço para continuar.');
return;
}
}
currentStep++;
showStep(currentStep);
} else {
submitForm();
}
});
btnPrev.addEventListener('click', () => {
if (currentStep > 1) {
currentStep--;
showStep(currentStep);
}
});
function submitForm() {
const inputName = document.getElementById('inputName').value.trim();
const inputPhone = document.getElementById('inputPhone').value.trim();
const inputEmail = document.getElementById('inputEmail').value.trim();
const inputMessage = document.getElementById('inputMessage').value.trim();
if (!inputName || !inputPhone || !inputEmail) {
triggerAlert('Aviso', 'Por favor, preencha todos os campos obrigatórios.');
return;
}
const selectedServices = [];
const summaryItems = document.querySelectorAll('#summaryList .summary-item');
summaryItems.forEach(item => selectedServices.push(item.textContent));
const priceVal = document.getElementById('priceVal').textContent;
const selectedScale = document.querySelector('input[name="scale"]:checked');
const scaleText = selectedScale ? selectedScale.nextElementSibling.querySelector('div').textContent : 'Não especificado';
const to = "hello@domhamaraldigitalsystems.com";
const cc = "contact@domhamaraldigitalsystems.com";
const subject = "Novo Projeto - Dom Hamaral Digital Systems Lda.";
let body = `Olá Dom Hamaral Digital Systems Lda.,\n\n`;
body += `Gostaria de solicitar um orçamento com os seguintes detalhes:\n\n`;
body += `--- DADOS DO CLIENTE ---\n`;
body += `Nome: ${inputName}\n`;
body += `WhatsApp: ${inputPhone}\n`;
body += `E-mail: ${inputEmail}\n\n`;
body += `--- DETALHES DO ECOSSISTEMA ---\n`;
body += `Dimensão do Negócio: ${scaleText}\n`;
body += `Serviços Selecionados: ${selectedServices.join(', ')}\n`;
body += `Configuração Estimada: ${priceVal}\n\n`;
if (inputMessage) {
body += `--- NOTA ADICIONAL ---\n`;
body += `${inputMessage}\n\n`;
}
body += `Melhores cumprimentos,\n${inputName}`;
const mailtoUrl = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
window.location.href = mailtoUrl;
triggerAlert('Sucesso!', 'A abrir o seu cliente de e-mail para enviar o pedido de orçamento...');
document.getElementById('inputName').value = '';
document.getElementById('inputPhone').value = '';
document.getElementById('inputEmail').value = '';
document.getElementById('inputMessage').value = '';
checkboxes.forEach(chk => chk.checked = false);
document.getElementById('radScale1').checked = true;
currentStep = 1;
showStep(currentStep);
updateConfiguratorSummary();
}
const alertPopup = document.getElementById('alertPopup');
const alertTitle = document.getElementById('alertTitle');
const alertMsg = document.getElementById('alertMsg');
function triggerAlert(title, message) {
alertTitle.textContent = title;
alertMsg.textContent = message;
alertPopup.classList.add('show');
setTimeout(() => {
alertPopup.classList.remove('show');
}, 5000);
}
updateConfiguratorSummary();
});