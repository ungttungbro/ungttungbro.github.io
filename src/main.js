'use strict';

import { shell } from './modules/shell/Shell.js';
import { taskbar } from './modules/shell/TaskBar.js';

import { AboutService } from './service/AboutService.js';
import { BlogService } from './service/BlogService.js';
import { PhotologService } from './service/PhotologService.js';
import { LinksService } from './service/LinksService.js';

import { AboutSection } from './view/AboutSection.js';
import { BlogSection } from './view/BlogSection.js';
import { PhotologSection } from './view/PhotologSection.js';
import { LinksSection } from './view/LinksSection.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.fonts.ready.then(() => {
    document.body.classList.add('font-loaded');
  });

  const taskbar_element = document.getElementById('taskbar');
  shell.initialize(taskbar_element);

  const about_service = new AboutService();
  await about_service.initialize();
  new AboutSection(about_service).show();

  const blog_service = new BlogService();
  await blog_service.initialize();
  new BlogSection(blog_service).show();

  const photolog_service = new PhotologService();
  await photolog_service.initialize();
  new PhotologSection(photolog_service).show();

  const links_service = new LinksService();
  await links_service.initialize();
  new LinksSection(links_service).show();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('ready');
    });
  });
});