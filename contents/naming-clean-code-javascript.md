---
date: '2022-11-08'
title: 'Javascript 네이밍(naming)과 클린 코드(clean code)'
categories: ['최적화']
summary: '네이밍과 클린코드의 규칙에 대해 정리했습니다.'
thumbnail: './images/20221108/20221108.png'
---

# `네이밍(naming)`

언제나 힘들고 고민스러운 네이밍..😕 그 조건들을 정리합니다.

## 기본사항

변수명은 자체 설명적이어야 함

```jsx
// bad
const value = 'Robin';
const val = 'Robin';

// good
const firstName = 'Robin';
```

자바스크립트에서는 camelCase, PascalCase를 사용

---

## Arrays

변수 이름에 복수, 단수 표현하기

```jsx
// bad
const fruit = ['apple', 'banana', 'cucumber'];
// okay
const fruitArr = ['apple', 'banana', 'cucumber'];
// good
const fruits = ['apple', 'banana', 'cucumber'];

// great
const fruitNames = ['apple', 'banana', 'cucumber'];
const fruits = [
  { name: 'apple', genus: 'malus' },
  { name: 'banana', genus: 'musa' },
  { name: 'cucumber', genus: 'cucumis' },
];
```

---

## Booleans

is, has, can로 시작하여 변수의 타입을 암시하기

```jsx
// bad
const open = true;
const write = true;
const fruit = true;
const equal = true;
const visible = true;

// good
const isOpen = true;
const canWrite = true;
const hasFruit = true;
const areEqual = true;
const isVisible = true;
```

### 만약 함수의 return 값이 boolean이라면?

함수명을 check나 get으로 시작하기

```jsx
const user = { fruits: ['apple'] };
const checkHasFruit = (user, fruitName) => user.fruits.includes(fruitName);
const hasFruit = checkHasFruit(user, 'apple');

checkTodoData();
```

---

## Numbers

변수명에 maximum, minimum, total 포함하기

```jsx
// bad
const pugs = 3;

// good
const minPugs = 1;
const maxPugs = 5;
const totalPugs = 3;
```

---

## Functions

동사를 사용하여 명명하기

```jsx
// bad
userData(userId);
userDataFunc(userId);
totalOfItems(items);
elementValidator(elements);

// good
getUser(userId);
calculateTotal(items);
validateElement(elements);
```

to를 앞에 명명하는 것은 오래된 컨벤션

```jsx
toDollars('euros', 20);
toUppercase('a string');
```

반복문 안에서의 변수는 단수형을 사용하기

```jsx
// bad
const newFruits = fruits.map(x => {
  return doSomething(x);
});

// good
const newFruits = fruits.map(fruit => {
  return doSomething(fruit);
});
```

---

# Components & Class

컴포넌트는 클래스와 같이 대문자로 사용

```jsx
// bad
function userProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}

// good
function UserProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}
```

---

# Constant

대문자에 \_를 사용

```jsx
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;
var DAY = SECONDS * MINUTES * HOURS;
var DAYS_UNTIL_TOMORROW = 1;
```

---

# `Clean Code`

많은 클린코드 규칙이 있지만 제가 놓치고 있던 것들 위주로 정리했습니다.

## **Object Lookup table**

다수의 switch-case문은 JSON table화 하기

<span style="color:#D32A2A">**BAD**</span>

```jsx
function getUserType(type) {
  switch (key) {
    case 'ADMIN':
      return '관리자';
    case 'INSTRUCTOR':
      return '강사';
    case 'STUDENT':
      return '학생';
    default:
      return '해당 없음';
  }
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function getUserType(type) {
  const USER_TYPE = {
    ADMIN: '관리자',
    INSTRUCTOR: '강사',
    STUDENT: '수강생',
  };

  return USER_TYPE[type] || '해당 없음';
}
```

---

## 긍정 우선 코드

<span style="color:#D32A2A">**BAD**</span>

```jsx
if(!(typeof data === 'string')){ ... }
```

---

## 조건문엔 함수

어떤 연산을 위한 조건문인지 알아보기 쉬움

<span style="color:#D32A2A">**BAD**</span>

```jsx
if(n % 1 === 0) { ... }
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
if(isInt(n)) { ... }
```

---

## 중첩 그냥 두지말기

<span style="color:#D32A2A">**BAD**</span>

```jsx
for (let i = range - 1; i < d.length; i++) {
  let sum = 0;
  for (let j = i - range + 1; j <= i; j++) {
    sum += d[j];
  }
  result.push(sum);
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
for(let i=0; i<range; i++) {
	sum += d[i];
}

for(let k 1-i; j < d.length; j++) {
	if(j === (range-1)) {
		console.log(sum);
		continue;
	}
	let start = j - range;
	sum += d[j] - d[start];
	console.log(sum);
}
```

---

## 복잡한 것 숨기기

재사용 되는 건 덤

<span style="color:#D32A2A">**BAD**</span>

```jsx
const validEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9+\.)+[a-zA-z]{2,}))$/.test(
    str,
  );
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
const validEmail = isValidEmail(eMail);
```

---

## short circuiting 대신 default parameters 사용

주의할 것은 `undefined만 default parameter가 적용`됩니다. 즉, falsy 값인 ‘’, “”, false, null, 0, NaN은 default value로 대체되지 않습니다.

<span style="color:#D32A2A">**BAD**</span>

```jsx
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  // ...
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // ...
}
```

---

## function parameters는 2개로 제한하기

<span style="color:#D32A2A">**BAD**</span>

```jsx
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
```

---

## 함수는 한가지 일만 수행하기

<span style="color:#D32A2A">**BAD**</span>

```jsx
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

---

## 함수는 하나의 개념으로 추상화하기

<span style="color:#D32A2A">**BAD**</span>

```jsx
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

---

## Object.assign으로 object deafult value 설정

<span style="color:#D32A2A">**BAD**</span>

```jsx
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true,
};

function createMenu(config) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true,
};

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true,
    },
    config,
  );
  return finalConfig;
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

---

## flag를 함수의 매개변수로 사용하지 말기

<span style="color:#D32A2A">**BAD**</span>

```jsx
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```

---

## 조건문 캡슐화

<span style="color:#D32A2A">**BAD**</span>

```jsx
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```

---

## 에러 무시하지 말기

<span style="color:#D32A2A">**BAD**</span>

```jsx
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
```

---

## 에러를 catch 하기

<span style="color:#D32A2A">**BAD**</span>

```jsx
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    console.log(error);
  });
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
  });
```

---

## 함수 호출자와 피호출자는 가까이 두기

<span style="color:#D32A2A">**BAD**</span>

```jsx
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

<span style="color:#206F8C">**GOOD**</span>

```jsx
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

---

## 리팩토링

- 복잡한 코드가 나오기 전에 짧은 주기의 리펙토링 (설계 → 개발 → 리펙토링)
- 리펙토링의 시작은 중복을 없애는 것
- (클래스, 함수의) 크기만 줄여나가도 절반은 성공
- 전역변수 제거

---

## reference

[https://hackernoon.com/the-art-of-naming-variables-52f44de00aad](https://hackernoon.com/the-art-of-naming-variables-52f44de00aad)

[https://www.robinwieruch.de/javascript-naming-conventions/](https://www.robinwieruch.de/javascript-naming-conventions/)

[https://github.com/ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

[https://speakerdeck.com/nigayo/uahan-jabaseukeuribteu-gaebal](https://speakerdeck.com/nigayo/uahan-jabaseukeuribteu-gaebal)
