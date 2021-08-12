const percent = document.querySelector('#komissiapercent');
const komissia = document.querySelector('#komissianumber');
const annual = document.querySelector('#annualpay');
const sum = document.querySelector('#sum');
const komRange = document.querySelector('#komissiarange');
const annRange = document.querySelector('#annualpayrange');

function calcKomis() {
  percent.value = this.value;
  komissia.value = Math.round(this.value * annual.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}
function calcAnnual() {
  percent.value = komRange.value;
  annual.value = this.value;
  komissia.value = Math.round(this.value * percent.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}

komRange.addEventListener('input', calcKomis);
komRange.addEventListener('change', calcKomis);
annRange.addEventListener('input', calcAnnual);
annRange.addEventListener('change', calcAnnual);
