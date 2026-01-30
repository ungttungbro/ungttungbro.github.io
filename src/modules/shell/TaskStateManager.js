'use strict';

export class TaskStateManager {
    // taskGroupMap: groupKey -> Map(taskId -> taskData)
    static taskGroupMap = new Map();

    // 그룹 생성
    static createGroup(groupKey) {
        if (!this.taskGroupMap.has(groupKey)) {
            this.taskGroupMap.set(groupKey, new Map());
        }
    }

    // 태스크 추가
    static addTask(groupKey, element) {
        this.createGroup(groupKey);

        const group = this.taskGroupMap.get(groupKey);

        group.set(element.id, {
            element,
            className: element.className
        });
    }

    // 태스크 제거
    static removeTask(groupKey, taskId) {
        const group = this.taskGroupMap.get(groupKey);
        if (!group) return;

        group.delete(taskId);

        // 비어 있으면 그룹도 제거
        if (group.size === 0) {
            this.taskGroupMap.delete(groupKey);
        }
    }

    // 조회
    static getTask(groupKey, taskId) {
        return this.taskGroupMap.get(groupKey)?.get(taskId);
    }

    static getGroup(groupKey) {
        return this.taskGroupMap.get(groupKey);
    }
}