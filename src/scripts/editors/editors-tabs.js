import { id } from '../utils';

const htmlTabs = id('html-tabs');
const activeTabClass = 'active-tab';

id('add-page').click(event => {
  event.stopPropagation();
  addHtmlTab();
});

id('add-page').on('dblclick', event => {
  event.stopPropagation();
});

function addHtmlTab() {
  const currentTabsCount = htmlTabs.childNodes.length;
  const tab = document.createElement('div');
  tab.dataset.page = currentTabsCount;
  tab.classList.add('page-tab');
  localStorage.setItem(`html-page-${currentTabsCount}`, '');
  document.querySelectorAll('.page-tab').forEach(item => {
    item.classList.remove(activeTabClass);
    item.dataset.status = 'inactive';
  });
  tab.classList.add(activeTabClass);
  tab.dataset.status = 'active';

  tab.addEventListener('click', event => {
    openPage(tab);
    document.querySelectorAll('.page-tab').forEach(item => {
      item.classList.remove(activeTabClass);
      item.dataset.status = 'inactive';
    });
    event.target.dataset.status = 'active';
    event.target.classList.add(activeTabClass);
  });

  tab.addEventListener('dblclick', event => {
    event.stopPropagation();
  });

  tab.innerHTML = `Page ${currentTabsCount + 1}`;
  htmlTabs.appendChild(tab);
}

function openPage(tab) {
  if (tab.dataset.status === 'inactive') {
    console.log(localStorage.getItem(`html-page-${tab.dataset.page}`));
  }
}
