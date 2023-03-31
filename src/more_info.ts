const moreInfo = () => {
  const app = document.querySelector('#app') as HTMLElement;
  const moreInfoBtn = document.querySelector('.more-btn') as HTMLDivElement;
  const moreInfoBtnText = moreInfoBtn.querySelector('p') as HTMLParagraphElement;

  moreInfoBtn.addEventListener('click', () => {
    if (app.classList.contains('closed')) {
      app.classList.add('open');
      app.classList.remove('closed');
      moreInfoBtnText.innerText = 'Less';
    } else {
      app.classList.remove('open');
      app.classList.add('closed');
      moreInfoBtnText.innerText = 'More';
    }
  });
};

export default moreInfo;
