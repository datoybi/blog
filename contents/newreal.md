---
date: '2022-09-01'
title: '비동기처리와 콜백, Promise'
categories: ['Web']
summary: '본격적으로 ReScript를 소개하기 앞서 얘기하고 싶은 내용이 있는데요. 제가 ReScript를 공부하기 시작하면서 가장 혼란스러웠던 점은 많은 용어들이 혼재되어 사용되고 있다는 점이었어요.'
thumbnail: './promise.png'
---

# 비동기

- 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.
- 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것

# 비동기 처리의 문제점

### 순차적으로 실행되어야 할 때 문제가 된다.

```jsx
function getData() {
  var tableData;
  $.get('https://domain.com/products/1', function (response) {
    tableData = response;
  });
  return tableData;
}

console.log(getData()); // undefined
```

위같은 경우, $.get()로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 return tableData; 를 실행했기 때문에 콘솔값은 undefined가 찍힌다.

```jsx
// #1
console.log('Hello');
// #2
setTimeout(function () {
  console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

비동기 처리에 대한 이해가 없다면 위 코드를 보면 아마 다음과 같은 결과값을 기대할것이다

```
'Hello'
3초 지나고 'Bye'
'Hello Again'
```

그러나 실제 결과값은 이러하다.

```
'Hello'
'Hello Again'
3초 지나고 'Bye'
```

setTimeout() 역시 비동기 방식으로 실행되므로 3초를 기다렸다 다음 코드를 실행하는 것이 아니라 hello가 출력되고 Hello Again이 찍힌 후 3초가 지나면 Bye가 출력된다.

# 비동기 처리의 해결방안 → 콜백함수

## 콜백함수

- 인자로 함수를 전달받아, 함수 내부에서 실행하는 함수
- 동작방식은 식당 자리 예약으로 이해하면 된다. 대기자 명단에 이름을 쓰고 다른일을 하고 있으면 해당 식당에서 자리가 났다고 연락이 온다. 연락이 오는 시점은 콜백함수가 호출되는 시점이다.
  자리가 났을 때만 연락이 오기 때문에 기다릴 필요도 없고, 직접 식당 안을 확인 할 필요도 없다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에만 특정 함수를 수행할 수 있다.

## 콜백지옥 (Callback hell)

비동기를 처리하기위해 콜백 안에 콜백을 사용한다면 이렇게 가독성이 좋지 않은 코드가 나온다.

```jsx
$.get('url', function (response) {
  parseValue(response, function (id) {
    auth(id, function (result) {
      display(result, function (text) {
        console.log(text);
      });
    });
  });
});
```

## 콜백 지옥을 해결하는 방법

Promise나 Async를 사용하기, 만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 분리하면 된다.

```jsx
function parseValueDone(id) {
  auth(id, authDone);
}
function authDone(result) {
  display(result, displayDone);
}
function displayDone(text) {
  console.log(text);
}
$.get('url', function (response) {
  parseValue(response, parseValueDone);
});
```

---

# 비동기 처리의 해결방안 → Promise

- 프로미스는 자바스크립트 비동기 처리에 사용되는 객체
- 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용

## 기초

```jsx
function getData(callbackFunc) {
  $.get('url 주소/products/1', function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

위 코드는 데이터를 받아올 때 비동기 처리를 콜백으로 해주는 코드이다.

이제 promise를 사용하여 구현해보자.

```jsx
function getData(callback) {
  // new Promise() 추가
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function (tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

콜백함수를 처리하던 구조에서 new Promist(), resolve(), then()과 같은 프로미스 API를 사용한 구조로 바뀌었습니다.

## 프로미스 3가지 상태(states)

프로미스의 가장 기본적인 개념은 프로미스의 상태(states)이다. 여기서 말하는 상태란 프로미스의 처리 과정을 의미한다. new Promise()로 프로미스를 생성하고 종료될 때까지 3가지의 상태를 갖는다.

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

### Pending(대기)

먼저 아래와 같이 new Promise() 메서드를 호출하면 대기(Pending) 상태가 된다.

```jsx
new Promise();
```

new Promise() 메서드를 호출할 때 콜백함수를 선언할 수 있고, 콜백함수의 인자는 resolve, reject이다.

```jsx
new Promise(function (resolve, reject) {
  // ...
});
```

### Fulfilled(이행)

여기서 콜백 함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfulled)상태가 된다.

```jsx
new Promise(function (resolve, reject) {
  resolve();
});
```

그리고 이행 상태가 되면 아래와 같이 then()을 이용하여 처리 결과 값을 받을 수 있다.

```jsx
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolveData로 받음
getData().then(function (resolvedData) {
  console.log(resolvedData); // 100
});
```

‘이행’ 상태를 좀 다르게 표현해보면 ‘완료’이다.

### Rejected(실패)

new Promise()로 프로미스 객체를 생성하면 콜백 함수 인자로 resolve와 reject를 사용할 수 있다고 했다. 여기서 reject를 아래와 같이 호출하면 실패(Rejected)상태가 된다.

```jsx
new Promise(function (resolve, reject) {
  reject();
});
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 catch()로 받을 수 있다.

```jsx
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error('Request is failed'));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData()
  .then()
  .catch(function (err) {
    console.log(err); // Error: request is failed
  });
```

## 프로미스 (쉬운예)

```jsx
function getData() {
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error('Request is failed'));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData()
  .then(function (data) {
    console.log(data); // response 값 출력
  })
  .catch(function (err) {
    console.error(err); // Error 출력
  });
```

위 코드는 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 응답이 없으면 reject() 메서드를 호출한다. 호출된 메서드에 따라 then()이나 catch()로 분기하여 응답 결과 또는 오류를 출력한다.

## 여러개의 프로미스 연결하기 (Promise Chaining)

```jsx
function getData() {
  return new Promise({
    // ...
  });
}

getData()
  .then(function (data) {
    // ...
  })
  .then(function () {
    // ...
  })
  .then(function () {
    // ...
  });
```

```jsx
new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 2000);
})
  .then(function (result) {
    console.log(result); // 1
    return result + 10;
  })
  .then(function (result) {
    console.log(result); // 11
    return result + 20;
  })
  .then(function (result) {
    console.log(result); // 31
  });
```

## 프로미스의 에러 처리 방법

에러 처리 방법은 다음과 같이 2가지 방법이 있다.

1. then()의 두 번째 인자로 에러를 처리하는 방법

```jsx
getData().then(handleSuccess, handleError);
```

1. catch()를 이용하는 방법

```jsx
getData().then().catch();
```

위 두가지 방법 모두 프로미스의 reject() 메서드를 호출하여 실패 상태가 된 경우에 실행된다.

아래와 같이 응용할 수 있다.

```jsx
function getData() {
  return new Promise(function (resolve, reject) {
    reject('failed');
  });
}

// 1. then()의 두 번째 인자로 에러를 처리하는 코드
getData().then(
  function () {
    // ...
  },
  function (err) {
    console.log(err);
  },
);

// 2. catch()로 에러를 처리하는 코드
getData()
  .then()
  .catch(function (err) {
    console.log(err);
  });
```

### `그러나 가급적 catch()를 사용하는 게 좋다.`

그 이유는 아래의 코드를 보면 이해할 수 있다.

```jsx
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(
  function (result) {
    console.log(result);
    throw new Error('Error in then()'); // Uncaught (in promise) Error: Error in then()
  },
  function (err) {
    console.log('then error : ', err);
  },
);
```

then()의 첫번째 콜백 함수 내부에서 오류가 나는 경우 오류를 제대로 잡아내지 못한다. 하지만 똑같은 오류를 catch()를 사용하면 다른 결과가 나온다.

```jsx
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result);
  throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
}.catch(function(err) {
  console.log('then error : ', err);
});
```

따라서, 더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 catch()를 붙이기로 하자.

---

### reference

[https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
