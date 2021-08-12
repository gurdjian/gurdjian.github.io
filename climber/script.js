let climberPosition = {
  x: 0,
  y: 0,
};
let stepsWin = [false, false, false, false, false, false];
function centerPosition(rect) {
  const newRect = rect;
  newRect.x = (rect.right + rect.left) / 2;
  newRect.y = (rect.top + rect.bottom) / 2;
  return newRect;
}
function moveKey(e) {
  const blinds = document.querySelector('.blinds');
  if (blinds.style.display !== 'none' || document.querySelector('.congrats').classList.contains('visible')) {
    return;
  }
  const climber = document.querySelector('#climber');
  // eslint-disable-next-line max-len
  const imgClimberRect = centerPosition(JSON.parse(JSON.stringify(climber.getBoundingClientRect())));
  switch (e.code) {
    case 'KeyA':
    case 'ArrowLeft':
      climberPosition.x = imgClimberRect.left - 10 < 0 ? 0 : climberPosition.x - 10;
      break;
    case 'KeyD':
    case 'ArrowRight':
      climberPosition.x = imgClimberRect.right + 10 > visualViewport.width
        ? visualViewport.width - imgClimberRect.width : climberPosition.x + 10;
      break;
    case 'KeyW':
    case 'ArrowUp':
      climberPosition.y = imgClimberRect.top - 10 < 0 ? climberPosition.y : climberPosition.y - 10;
      break;
    case 'KeyS':
    case 'ArrowDown':
      climberPosition.y = imgClimberRect.bottom + 10 > visualViewport.height
        ? climberPosition.y : climberPosition.y + 10;
      break;
    default:
      break;
  }
  climber.style.transform = `translate3d(${climberPosition.x}px, ${climberPosition.y}px, 0)`;
  const steps = document.querySelectorAll('.step');
  for (let i = 0; i < steps.length; i++) {
    const stepRect = centerPosition(JSON.parse(JSON.stringify(steps[i].getBoundingClientRect())));
    // eslint-disable-next-line max-len
    if (Math.abs(stepRect.x - imgClimberRect.x) < (Math.abs(stepRect.width + imgClimberRect.width) / 2)
    // eslint-disable-next-line max-len
          && (Math.abs(stepRect.y - imgClimberRect.y) < (Math.abs(stepRect.height + imgClimberRect.height) / 2))) {
      stepsWin[i] = true;
      steps[i].classList.add('flagged');
      break;
    }
    // eslint-disable-next-line max-len
    // console.log(`left ${stepRect.x} - ${imgClimberRect.x} < width ${stepRect.width} + ${imgClimberRect.width} / 2 ${(Math.abs(stepRect.x - imgClimberRect.x) < (Math.abs(stepRect.width + imgClimberRect.width) / 2))}
    // eslint-disable-next-line max-len
    // top ${stepRect.y} -${imgClimberRect.y} < height ${stepRect.height} + ${imgClimberRect.height} / 2 ${(Math.abs(stepRect.y - imgClimberRect.y) < (Math.abs(stepRect.height + imgClimberRect.height) / 2))}`);
  }
  const result = stepsWin.filter((value) => value);
  document.querySelector('.result').innerText = result.length ? result.length : 0;
  function restart() {
    document.querySelector('.congrats').classList.remove('visible');
    document.querySelector('#win').classList.remove('visible');
    blinds.style.display = 'flex';
    stepsWin = [false, false, false, false, false, false];
    climberPosition = {
      x: 0,
      y: 0,
    };
    climber.style.transform = `translate3d(${climberPosition.x}px, ${climberPosition.y}px, 0)`;
    steps.forEach((value) => value.classList.remove('flagged'));
    document.querySelector('.result').innerText = 0;
  }
  if (result.length === steps.length) {
    document.querySelector('#win').classList.add('visible');
    document.querySelector('.congrats').classList.add('visible');
    setTimeout(restart, 3000);
    // document.querySelector('.star').style.boxShadow = '0 0 40px #dfb5a9';
  }
}


function startFunction() {
  document.querySelector('.results > h1').innerText = document.querySelector('.username > input').value === '' ? 'Имя пользователя'
    : document.querySelector('.username > input').value;
  const blinds = document.querySelector('.blinds');
  blinds.style.display = 'none';
}
document.addEventListener('keydown', moveKey);
document.querySelector('.startdiv').addEventListener('click', startFunction);
