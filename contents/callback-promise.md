---
date: '2023-05-10'
title: 'Callback & Promise 톺아보기'
categories: ['JS']
summary: '콜백과 프로미스에 대해 스터디한 것을 기록합니다.'
thumbnail: './thumbnail/TIL.png'
---

# 콜백 함수(Callback Function)

- `함수의 매개 변수를 통해 다른 함수의 내부로 전달되는 함수`입니다.
- 자바스크립트에서 비동기성을 표현하고 관리하는 가장 일반적인 기법이자 사실상 자바스크립트 언어에서 가장 기본적인 비동기 패턴입니다.

```jsx
function func(param) {
  // 고차 함수
  console.log('func');
  param();
}

function callback1() {
  // 콜백 함수
  console.log(1);
}

function callback2() {
  // 콜백 함수
  console.log(2);
}

func(callback1);
func(callback2);

/*
	실행결과 
	func
	1
	func
	2
*/
```

func의 매개변수인 param으로 callback1(), callback2()가 전달되어 실행되었습니다. 이처럼 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백함수라고 합니다.

또한, 매개 변수를 통해 외부에서 콜백 함수를 전달받은 함수를 고차 함수라고 합니다.

func() 내부에서 콜백함수를 언제 호출하는지에 따라 `콜백함수의 호출 시점을 결정할 수 있습니다.`

```jsx
let result;

function func(param) {
  // 고차 함수
  return param();
}

function callback() {
  // 콜백 함수
  return 1;
}

result = func(callback);
console.log(result); // 1
```

위의 예시는 콜백함수의 반환값인 1을 고차 함수에서 전달 받을 수 있음을 나타냅니다. callback()에서 1이라는 값을 리턴하면 func()에서는 그 값을 result라는 전역 변수에 넣는 것이 가능해 집니다.

즉, `콜백 함수를 이용하면 함수의 호출 시점을 결정할 수 있고, 반환 값을 외부에 전달할 수 있습니다.`

따라서, 비동기 통신의 문제점인 비동기 함수 내부의 값을 외부로 반환하지 못하는 점을 콜백 함수를 이용하게 되면 해결할 수 있게 됩니다.

```jsx
const get = callback => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.response)); // callback으로 response 전달
    } else {
      console.error('Error', xhr.status, xhr.statusText);
    }
  };
};

get(function (data) {
  console.log(data);
});
```

callback을 이용하여 익명함수 안에서 response를 인자로 전달하여 출력했습니다.

---

# map, filter를 callback으로 구현해보기

```jsx
const arr = [1, 2, 3];

// ✔️map
function map(func) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(func(arr[i], i, arr));
  }
  return result;
}

const result = map((item, i, array) => {
  return item * 2;
});

console.log(result);

// ✔️filer
const arr = [1, 2, 3];

function filter(func) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i, arr) ? result.push(arr[i]) : null;
  }
  return result;
}

const result = filter((item, i, array) => item >= 2);

console.log(result);
```

---

# 콜백의 문제점

### 1. 가독성이 좋지 않음(흐름이 순차적이지 않음)

- 사람의 두뇌는 순차적인 방식을 좋아하지만, 콜백은 비동기 흐름을 비순차적인 방향으로 나타내므로 구현된 코드를 이해하기가 어렵습니다. 추론하기 곤란한 코드는 곧 나쁜 코드로 이어집니다.
- 중첩과 들여쓰기로 인해 가독성을 해치는 `콜백 지옥`에 빠질 수 있습니다.

  ```jsx
  setTimeout(() => {
    console.log('1');
    setTimeout(() => {
      console.log('2');
      setTimeout(() => {
        console.log('3');
        setTimeout(() => {
          console.log('4');
        }, 0);
      }, 0);
    }, 0);
  }, 0);
  ```

  콜백지옥을 아래처럼 풀어 쓸 수 있습니다.

  ```jsx
  const first = function () {
    console.log('1');
    second();
  };

  const second = function () {
    console.log('2');
    third();
  };

  const third = function () {
    console.log('3');
    fourth();
  };

  first();
  ```

  이 또한 순차적으로 코드를 읽으려면 코드 베이스 전체를 널뛰기해야 하므로 추론이 어렵습니다.

### 2. 제어권의 역전

- 제어권이 넘어가면 예상보다 더 자주 콜백이 호출되거나 아예 호출되지 않거나, 콜백을 너무 늦게 부르거나.. 등등 골치아픈 일들이 발생합니다. 그것들을 해결하기 위해 방어 코드를 작성해야하고, 그렇게 되면 코드가 장황해지고 재사용이 불가능해지며, 해결하기가 쉽지 않습니다.

### 3. 에러 처리의 한계

```jsx
try {
  setTimeout(() => {
    throw new Error('Error!');
  }, 1000);
} catch (e) {
  console.log('error 발생!');
  console.error(e);
}
```

- 에러가 catch 블록에서 캐치되지 않습니다. 그 이유는 에러는 호출자 방향으로 전파됩니다. 그런데 setTimeout 함수의 콜백 함수를 호출한 것이 setTimeout 함수가 아니기 때문에, catch 블록에서 캐치되지 않습니다. (setTimeout 함수는 태스크 큐로 푸시되고 이벤트 루프에 의해 콜스택으로 푸시되어 실행됩니다)

이러한 콜백의 문제점을 해결하기위해 Promise가 등장했습니다.

---

# Promise

- callback을 이용하면 순차적인 코드 작성과 제어권을 상실, 에러처리가 힘들다는 문제점을 확인했습니다. 이러한 문제점을 해소한 것이 Promise입니다.
- Promise는 `비동기 처리 상태와 처리 결과를 관리`하는 객체입니다.
- Promise는 완료상태를 반환합니다. 외부로부터 캡슐화하기 때문에 프로미스 자체는 시간 독립적입니다. 또한 프로미스는 한번 호출되고 일단 귀결된 후에는 상태가 그대로 유지되며 불변합니다. 그러므로 콜백의 문제점이었던 너무 콜백을 일찍 호출하거나, 너무 늦게 호출하거나(또는 호출하지 않거나) 너무 적게, 또는 많이 콜백을 호출하거나 하는 문제점을 해소할 수 있습니다.

## Promise 형태

```jsx
const promise = new Promise((resolve, reject) => {
	// promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
	if(){ // 비동기 처리 성공
		resolve('result');
	} else { // 비동기 처리 실패
		reject('failure reason')
	}
});
```

Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스 객체를 생성합니다. 인수로 resolve, reject 콜백함수를 받습니다.

```jsx
const get = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

get().then(data => console.log(data));
```

앞서 작성했었던 비동기 코드를 promise를 이용하여 작성했습니다. 비동기 로직에 성공했으면 resolve 콜백 함수 안에 결과를 인수로 넣고, 에러가 발생했다면 reject 콜백함수에 에러를 인수로 넣어 호출하여 사용합니다.

---

## 프로미스의 상태 정보

| 프로미스 상태 정보 | 의미                                  | 상태 변경 조건                   |
| ------------------ | ------------------------------------- | -------------------------------- |
| pending            | 비동기 처리가 아직 수행되지 않은 상태 | 프로미스가 생성된 직후 기본 상태 |
| fulfilled          | 비동기 처리가 수행된 상태(성공)       | resolve 함수 호출                |
| rejected           | 비동기 처리가 수행된 상태(실패)       | reject 함수 호출                 |

생성된 직후의 프로미스는 기본적으로 pending 상태입니다. 이후 비동기 처리가 수행되면 비동기 처리 결과에 따라 위와 같이 프로미스의 상태가 변경됩니다.

---

## 프로미스 후속 처리 메서드

- 프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야 합니다. 예를 들어, fulfilled 상태가 되면 프로미스의 처리 결과를 가지고 무언가를 해야 하고, 프로미스가 rejected 상태가 되면 프로미스의 처리 결과(에러)를 처리해야 합니다.
- 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출되고, 이때 후속 처리 메서드의 콜백 함수에 `프로미스의 처리 결과가 전달`됩니다.
- 모든 후속 처리 메서드는 `프로미스를 반환`하고, 비동기로 동작합니다.

### Promise.prototype.then

- fulfilled, rejected 상태가 되면 호출
- Promise를 반환합니다. 첫번째 콜백 함수는 fulfilled 상태이면 호출되고, 결과를 인수로 받습니다. 두번째 콜백 함수는 rejected 상태이면 호출되고, 에러를 인수로 받습니다.

```jsx
new Promise(resolve => resolve('fullfilled')).then(
  v => console.log(v),
  e => console.log(e),
);

new Promise((_, reject) => reject(new Error('rejected'))).then(
  v => console.log(v),
  e => console.log(e),
);

// fullfilled
// Error: rejected
```

### Promise.prototype.catch

catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출됩니다.

```jsx
new Promise((_, reject) => reject(new Error('rejected'))).catch(e =>
  console.error(e),
);

// Error: rejected
```

### Promise.prototype.finally

finally 메서드의 콜백 함수는 프로미스의 성공 또는 실패와 상관없이 무조건 한번만 호출됩니다.

```jsx
new Promise(() => {}).finally(() => console.log('finally'));
```

---

## 프로미스 에러처리

프로미스에서의 에러 처리는 then의 두번째 콜백 함수로 처리하거나 catch를 이용하는 방법이 있습니다.

```jsx
promiseGet('https://jsonplaceholder.typicode.com/todos/1').then(
  (res => console.log(res), err => console.log(err)),
);

// 권장하는 방법!
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

catch 메서드를 모든 then 메서드를 호출한 이후에 호출하면 비동기 처리에서 발생한 에러 뿐만 아니라 then 메서드 내부에서 발생한 에러까지 모두 캐치할 수 있습니다. 그러니 두번째 방법을 권장합니다.

---

## 프로미스 스케줄링

별개의 두 프로미스에서 연쇄된 콜백 사이의 상대적인 실행 순서는 장담할 수 없습니다.

```jsx
const p3 = new Promise(function (resolve, reject) {
  resolve('B');
});

const p1 = new Promise(function (resolve, reject) {
  resolve(p3);
});

p2 = new Promise(function (resolve, reject) {
  resolve('A');
});

p1.then(function (v) {
  console.log(v);
});

p2.then(function (v) {
  console.log(v);
});

// A B
```

여러 프로미스에 걸친 `콜백의 순서, 스케줄링에 의존해선 안됩니다.` 처음부터 다중 콜백의 순서가 문제를 일으키지 않는 방향으로 코딩을 하는 것이 바람직 합니다.

```jsx
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

// 2 3 1
// 콜백함수는 마이크로태스크 큐에 저장되는데
// 마이크로태스크 큐는 태스트 큐보다 우선순위가 높기에
// Promise먼저 실행된다.
```

콜백함수는 마이크로태스크 큐에 저장되는데 마이크로태스크 큐는 태스트 큐보다 우선순위가 높기에 Promise먼저 실행됩니다.
