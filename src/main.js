'use strict';

import { shell } from './modules/shell/Shell.js';

import { MainService } from './service/MainService.js';
import { BlogService } from './service/BlogService.js';

import { AboutSection } from './view/AboutSection.js';
import { WritingsSection } from './view/WritingsSection.js';
import { ReflectionSection } from './view/ReflectionSection.js';
import { LifelogSection } from "./view/LifelogSection.js";
import { ArchiveSection } from './view/ArchiveSection.js';
import { PhotologSection } from './view/PhotologSection.js';
import { LinksSection } from './view/LinksSection.js';

document.addEventListener('DOMContentLoaded', async () => {
  const blog_service = new BlogService();
  const main_service = new MainService();
 
  const taskbar_element = document.getElementById('taskbar');

  await Promise.all([
    blog_service.initialize(),
    main_service.initialize(),   
    shell.initialize(taskbar_element)
  ]);
   
  await Promise.all([
    new AboutSection(main_service).show(),
    new LinksSection(main_service).show(),
    new WritingsSection(main_service, blog_service).show(),
    new ReflectionSection(main_service, blog_service).show(),
    new LifelogSection(main_service, blog_service).show(),
    new ArchiveSection(main_service, blog_service).show(),
    new PhotologSection(main_service, blog_service).show()
  ]);
   
  shell.initLayoutMemory();
  shell.updateLayout();
});