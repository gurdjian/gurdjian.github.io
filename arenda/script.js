const percent = document.querySelector('#komissiapercent');
const komissia = document.querySelector('#komissianumber');
const annual = document.querySelector('#annualpay');
const sum = document.querySelector('#sum');
const komRange = document.querySelector('#komissiarange');
const annRange = document.querySelector('#annualpayrange');

function calcKomisFromRange() {
  percent.value = this.value;
  komissia.value = Math.round(this.value * annual.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}
function calcAnnualFromRange() {
  annual.value = this.value;
  komissia.value = Math.round(this.value * percent.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}

function calcAnnualFromNum() {
  annRange.value = this.value;
  komissia.value = Math.round(this.value * percent.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}

function calcKomisFromNum() {
  komRange.value = this.value;
  komissia.value = Math.round(this.value * annual.value * 0.01);
  sum.value = annual.value * 2 + +komissia.value;
}
komRange.addEventListener('input', calcKomisFromRange);
komRange.addEventListener('change', calcKomisFromRange);
percent.addEventListener('input', calcKomisFromNum);
percent.addEventListener('change', calcKomisFromNum);

annRange.addEventListener('input', calcAnnualFromRange);
annRange.addEventListener('change', calcAnnualFromRange);
annual.addEventListener('input', calcAnnualFromNum);
annual.addEventListener('change', calcAnnualFromNum);
