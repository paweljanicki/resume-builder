import { id } from '../utils';

const htmlTabs = id('html-tabs');

id('add-page').click(event => {
  event.stopPropagation();
  addHtmlTab();
});

function addHtmlTab() {
  const currentTabsCount = htmlTabs.childNodes.length;
  const tab = document.createElement('div');
  tab.innerHTML = `Page ${currentTabsCount + 1}`;
  htmlTabs.appendChild(tab);
}
