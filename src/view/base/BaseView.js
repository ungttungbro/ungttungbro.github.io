import { ViewerWindow } from "../../modules/viewerWindow/ViewerWindow.js";
import { shell } from "../../modules/shell/Shell.js";
import { Templates } from "../../modules/site/Templates.js";
import { taskbar } from "../../modules/taskbar/TaskBar.js";
import { ViewerStateManager } from "../../modules/viewerWindow/ViewerStateManager.js";

export class BaseView {
    constructor(){}

    mountContents(viewer_config, task_id, header, contents, footer) {        
        if (document.getElementById(viewer_config.element.elementId)) {
            ViewerStateManager.bringToFront(document.getElementById(viewer_config.element.elementId));
            return; 
        }

        const viewer = new ViewerWindow();
        viewer.configureWindow(
            viewer_config,
            Templates.createContentPanel('blog-header-panel', header),
            Templates.createContentPanel('blog-content-panel', contents),
            Templates.createContentPanel('blog-footer-panel', footer)
        );

        viewer.targetId = task_id;

        Templates.setupResponsiveViewer(taskbar, viewer);

        shell.mountTaskItem(
            viewer_config.meta.contentType, 
            viewer.targetId, 
            viewer.id, 
            viewer_config.meta.titleIconPath, 
            viewer_config.meta.titleText
        );

        viewer.show();
    }
}