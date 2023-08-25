---
date: '2023-07-05'
title: 'React State Update와 Rendering'
categories: ['최적화']
summary: '리엑트 공식문서를 스터디하고 State Update와 Rendering 관련 사항을 기록합니다.'
thumbnail: './thumbnail/react_state_update_rendering.png'
---

# 렌더링 순서

1. 렌더링 trigger
2. 컴포넌트 호출(렌더링)
3. DOM에 커밋

---

## Step1: 렌더링 trigger

렌더링이 일어나는 데는 두가지 이유가 있습니다.

1. 컴포넌트의 `첫 렌더링`인 경우

   - 첫 렌더링을 하기위해 **createRoot**를 호출한 다음 컴포넌트로 **render** 메서드를 호출합니다.

   ```jsx
   import Image from './Image.js';
   import { createRoot } from 'react-dom/client';

   const root = createRoot(document.getElementById('root'));
   root.render(<Image />);
   ```

1. 컴포넌트의 `state(또는 상위 요소 중 하나)가 업데이트` 된 경우
   - 컴포넌트의 state를 업데이트하면 자동으로 렌더링이 대기열에 추가됩니다.

## Step2: 컴포넌트 호출(렌더링)

렌더링이 trigger되면, React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악합니다. `렌더링은 React에서 컴포넌트를 호출하는 것`입니다.

이 과정은 `재귀적`입니다. 업데이트된 컴포넌트가 다른 컴포넌트를 반환하면 React는 다음으로 해당 컴포넌트를 렌더링하고 해당 컴포넌트도 컴포넌트를 반환하면 반환된 컴포넌트를 다음에 렌더링 하는 방식입니다. 중첩된 컴포넌트가 더이상 없고 React가 화면에 표시되어야 하는 내용을 정확히 알 때까지 이 단계는 계속됩니다.

## Step3: React가 DOM에 변경사항을 커밋

컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정합니다.

- 초기 렌더링의 경우 React는 `appendChild()` DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시합니다.
- 리렌더링의 경우 React는 필요한 최소한의 작업(렌더링 하는 동안 계산된 것)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 합니다.

**React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경합니다.** 일례로 매초 다시 렌더링하는 컴포넌트가 있습니다. 그때 입력한 input text는 사라지지 않습니다.

---

### 렌더링 과정의 예시

```jsx
export default function Form() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Your message is on its way!</h1>;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setIsSent(true);
      }}
    >
      <button type="submit">Send</button>
    </form>
  );
}
```

1. onSubmit 이벤트 핸들러가 실행됩니다.
2. setIsSent(true)가 isSent를 true로 설정하고 새 렌더링을 큐에 대기시킵니다.
3. React는 새로운 isSent 값에 따라 컴포넌트를 다시 렌더링합니다.

---

# state의 성질

## state는 격리되고 프라이빗합니다.

동일한 컴포넌트를 두군데에서 렌더링하면 각 사본은 완전히 격리된 state를 갖게 됩니다. 즉, **다른 컴포넌트에 영향을 주지 않고 state를 추가하거나 제거할 수 있습니다.**

```jsx
import { useState } from 'react';

export default function FeedbackForm() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <>
      <p>{a}</p>
      <p>{b}</p>
      <button onClick={() => setA(prev => prev + 1)}>a</button>
      <button onClick={() => setB(prev => prev + 1)}>b</button>
    </>
  );
}
```

## state는 스냅샷처럼 동작합니다.

state는 스냅샷처럼 동작합니다. 렌더링은 그 시점의 스냅샷을 찍습니다.

**렌더링이란 React가 컴포넌트 즉, 함수를 호출한다는 뜻**입니다. 해당 함수에서 반환하는 **JSX는 UI의 스냅샷**과 같습니다. props, 이벤트 핸들러, 로컬 변수는 모두 `렌더링 당시의 state`를 사용해 계산됩니다.

### React가 컴포넌트를 다시 렌더링할 때

1. React가 함수를 다시 호출합니다. (state가 변경되어서)
2. 함수가 새로운 JSX 스냅샷을 반환합니다.
3. React가 반환한 스냅샷을 화면에 업데이트 합니다.

### Snapshot 예시

```jsx
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>
```

1. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.
   - React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.
2. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.
   - React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.
3. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.
   - React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

setNumber(number + 1)를 세번 호출했지만, 이 랜더링에서 이벤트 핸들러의 number는 항상 0 이므로 state를 1로 세번 설정했습니다. 따라서 onClick이 완료된 이후 number가 1로 렌더링이 됩니다.

---

## state 업데이트는 큐에 담기고 실행됩니다.

state 변수를 설정하면 다음 렌더링이 큐에 들어갑니다. 그리고 일괄처리(batching)가 됩니다.

```jsx
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>
```

React는 state 업데이트를 하기 전에 `이벤트 핸들러의 모든 코드가 실행될 때까지 기다립니다.` 이때문에 리렌더링은 모든 setNumber() 호출이 완료된 이후에만 일어납니다.

이렇게 일괄처리(batching)을 하는 이유는 React 앱을 훨씬 빠르게 실행할 수 있게 합니다.

### 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기

다음 렌더링 전에 동일한 state 변수를 여러번 업데이트 하고 싶다면 setNumber(number + 1)와 같은 다음 state 값을 전달하는 대신, `setNumber(n ⇒ n + 1)`와 같이 큐의 이전 state를 기반으로 다음 state를 계산하는 함수를 전달할 수 있습니다.

```jsx
<button
  onClick={() => {
    setNumber(n => n + 1);
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  }}
>
  +3
</button>
```

### 작동 방식

1. setNumber(n => n + 1): n => n + 1 함수를 큐에 추가합니다.
2. setNumber(n => n + 1): n => n + 1 함수를 큐에 추가합니다.
3. setNumber(n => n + 1): n => n + 1 함수를 큐에 추가합니다.

다음 렌더링 중에 useState를 호출하면 React는 큐를 순회합니다. 이전 number state는 0이었으므로 React는 이를 첫번째 업데이터 함수에 n의 인수로 전달합니다. 그런 다음 React는 이전 업데이터 함수의 반환값을 가져와서 다음 업데이터 함수에 n으로 전달하는 식으로 반복합니다.

React는 **3**을 최종 결과로 저장하고 **useState에서 반환**합니다.

---

## 네이밍

```jsx
// ❌
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);

// ⭕
setEnabled(enabled => !enabled);
setEnabled(prevEnabled => !prevEnabled);
```

---

# 객체 state 업데이트하기

state는 객체를 포함해서, 어떤 종류의 Javascript 값이든 저장할 수 있습니다. 그러나 업데이트 할때에는 `새 객체를 생성`하고(혹은 기존 객체의 복사본을 만들고), 해당 복사본을 사용하도록 state를 설정해야 합니다.

### **mutation** (변이)

`객체 자체의 내용을 변경하는 것`을 변이(mutation)라고 합니다.

```tsx
position.x = 5;
```

React state의 객체는 기술적으로는 변이할 수 있지만, 객체를 직접 변이하는 대신, 항상 `교체`해야 합니다.

```jsx
// ❌
<div
    onPointerMove={e => {
      position.x = e.clientX;
      position.y = e.clientY;
    }}>
</div>

// ⭕
<div
  onPointerMove={e => {
	  setPosition({
	    x: e.clientX,
	    y: e.clientY
	  });
}}>
</div>
```

setPosition을 사용하게되면 다음을 지시합니다.

- position을 새 객체로 바꿔라
- 이 컴포넌트를 다시 렌더링하라

---

### 전개구문을 사용하여 객체 복사하기

```jsx
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email,
});

// 전개구문 사용
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value, // But override this one
});
```

주의할 것 : 전개구문은 얕은 복사를 하여 한단계 깊이만 복사합니다.

### 중첩된 객체 업데이트하기

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  },
});

person.artwork.city = 'New Delhi';

setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi',
  },
});
```

---

### Immer사용하기

https://github.com/immerjs/use-immer

꽤나 코드가 간결해집니다.

---

## 배열 state 업데이트하는 방법

객체와 마찬가지로 state에 저장된 배열을 업데이트 하려면 새로운 배열을 만들고, `새 배열을 사용`하도록 state를 설정해야 합니다.

### 변이없이 배열 업데이트하기

```jsx
// ❌
arr[0] = 'bird';
arr.push();
arr.pop();

// ⭕
arr.filter();
arr.map();
```

|      | 비추천(mutates the array) | **추천**(returns a new array) |
| ---- | ------------------------- | ----------------------------- |
| 추가 | push, unshift             | concat, […arr]                |
| 삭제 | pop, shift, splice        | filter, slice                 |
| 교체 | splice, arr[i] = a        | map                           |
| 정렬 | reverse, sort             | 배열을 복사한 다음 처리       |

### 배열 안에 객체 업데이트하기

```jsx
const initialProducts = [
  {
    id: 0,
    name: 'Baklava',
    count: 1,
  },
  {
    id: 1,
    name: 'Cheese',
    count: 5,
  },
  {
    id: 2,
    name: 'Spaghetti',
    count: 2, // 🚩여기 업데이트
  },
];

const result = initialProducts.map(product => {
  if (product.id === 2) {
    return {
      ...product,
      count: product.count + 1,
    };
  } else {
    return product;
  }
});

console.log(result);
```

### 배열 안에 객체 삭제하기

```jsx
// 장바구니 -하고 0이면 없애는 코드
function handleDecreaseClick(productId) {
  const nextProducts = products.map(product => {
    if (product.id === productId) {
      return {
        ...product,
        count: product.count - 1,
      };
    } else {
      return product;
    }
  });

  setProducts(nextProducts.filter(product => product.count > 0));
}
// map 한다음에 filter 해서 count가 0인거 제외하기
```

---

### Immer 사용하기

https://github.com/immerjs/use-immer

# 요약

- React 렌더링 된다고 새로고침을 하듯 모든 컴포넌트들이 reset되는게 아닙니다.
  렌더링이 되면 React는 `업데이트 되어야 할 DOM만 업데이트`를 합니다.
- state도 마찬가지입니다. setState값이 호출된, `업데이트 되어야할 state값만이 업데이트`됩니다. 즉, 각각의 state들은 격리되고 완전히 독립적으로 작동합니다.

---

# Reference

[리엑트 공식문서 - Adding Interactivity](https://react.dev/learn/adding-interactivity)
