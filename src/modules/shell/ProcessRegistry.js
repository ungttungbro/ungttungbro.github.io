export class ProcessRegistry {
  constructor() {
    this.registry = new Map(); // key: snapName, value: 함수
  }

  // 스냅 등록
  register(key, snapFn) {
    this.registry.set(key, snapFn);
  }

  // 스냅 존재 여부 확인
  has(key) {
    return this.registry.has(key);
  }

  // 스냅 실행
  execute(key, ...args) {
    if (this.registry.has(key)) {
      const fn = this.registry.get(key);
      fn(...args);
    }
  }
}
