import './style.css'
import Login from './pages/Login.ts';
import type { ElementInterface } from './interfaces/interfaces.ts';
import { create } from './tools/theme-manager.ts';
import { change } from './tools/theme-changer.ts';

try{    
  const pathname: string = window.location.pathname;
  let element: HTMLElement;
  const elementInterface: ElementInterface = {
    themeChanger: () => change(document.querySelector<HTMLElement>('#app'))
  };
  create();
  switch(pathname){
    case '/':
    case '/login':
      element = Login(elementInterface);
      break;
    default:
      throw new Error('undefined pathname: ' + pathname);
  }

  const app = document.querySelector<HTMLDivElement>('#app');
  if (app === null){    
    throw new Error('App element not found!');    
  }
  
  app.append(element);  
} catch (e){
  console.error(e);
}
