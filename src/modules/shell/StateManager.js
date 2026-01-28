'use strict';

import { SiteLibrary } from "../common/SiteLibrary.js";

export class StateManager {
    static state = new Map();

    static set(groupKey, key, value) {
        if (!StateManager.state.has(groupKey)) {
            StateManager.state.set(groupKey, new Map());
        }
        StateManager.state.get(groupKey).set(key, value);
    }

    static setGroup(groupKey, stateObject) {
        for (const [key, value] of Object.entries(stateObject)) {
            StateManager.set(groupKey, key, value);
    }}

    static get(groupKey, key) {
        if (!StateManager.state.has(groupKey)) return undefined;
        return StateManager.state.get(groupKey).get(key);
    }

    static has(groupKey) {
        if (!StateManager.state.has(groupKey)) return false;
        return StateManager.state.get(groupKey).has(key);
    }

    static removeGroup(groupKey) {
        if (!StateManager.state.has(groupKey)) return;        
            StateManager.state.delete(groupKey);
    }

    static removeItem(groupKey, key) {
        if (!StateManager.state.has(groupKey)) return;

        const innerMap = StateManager.state.get(groupKey);
        innerMap.delete(key);

        if (innerMap.size === 0) {
            StateManager.state.delete(groupKey);
        }
    }

    static getGroup(groupKey) {
        return StateManager.state.get(groupKey) ?? new Map();
    }

    static clearGroup(groupKey) {
        StateManager.state.delete(groupKey);
    }

    static clearAll() {
        StateManager.state.clear();
    }

    static stateLog(element) {
        const snapshot = {
            ['group']: element.dataset.group,
            ['className']: element.className,
            ['width']: element.getBoundingClientRect().width,
            ['height']: element.getBoundingClientRect().height,            
            ['visibility']: getComputedStyle(element).visibility,
            ['clientRect']: element.getBoundingClientRect(),
            ['zIndex'] : getComputedStyle(element).zIndex
        };

        StateManager.setGroup(element.id, snapshot);
    }

    static maxZIndex() {
        let max = 0;
        for (const [key] of StateManager.state) {
            const zIndex = StateManager.get(key,'zIndex');
            if (zIndex && !isNaN(zIndex)) {
                max = Math.max(max, zIndex);
            }
        }
        
        return max;
    }

    static bringToFront(element) {
        let isOverlap = false;

        for (const [key, value] of StateManager.state) {
            if (!value.get('clientRect') || key === element.id) continue;

            if (SiteLibrary.isRectOverlap(element.getBoundingClientRect(), value.get('clientRect'))) {
                if (value.get('visibility') === 'visible'){
                    isOverlap = true;
                    break;
                }
            }
        }

        if (isOverlap && (element.style.zIndex < StateManager.maxZIndex())) {
            element.style.zIndex = StateManager.maxZIndex() + 1;

            if (getComputedStyle(element).visibility === 'hidden') {
                SiteLibrary.elementVisibility(element.id);
            }                
        } else {
            SiteLibrary.elementVisibility(element.id);           
        }

        StateManager.stateLog(element);
    }
}