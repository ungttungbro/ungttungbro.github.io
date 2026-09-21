'use strict';

import { shell } from './modules/shell/Shell.js';

import { MainService } from './service/MainService.js';
import { BlogService } from './service/BlogService.js';
//import { LinksService } from './service/LinksService.js';

import { AboutSection } from './view/AboutSection.js';
import { BlogSection } from './view/BlogSection.js';
import { PhotologSection } from './view/PhotologSection.js';
import { LinksSection } from './view/LinksSection.js';

document.addEventListener('DOMContentLoaded', async () => {
  const blog_service = new BlogService();
  const main_service = new MainService();
  //const links_service = new LinksService();
  const taskbar_element = document.getElementById('taskbar');

  await Promise.all([
    blog_service.initialize(),
    main_service.initialize(),
    //links_service.initialize(),
    shell.initialize(taskbar_element)
  ]);
   
  new BlogSection(blog_service).show();  
  new AboutSection(main_service).show();  
  new PhotologSection(blog_service).show();  
  new LinksSection(main_service).show();  
   
  shell.initLayoutMemory();
  shell.updateLayout();
});