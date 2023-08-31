---
date: '2023-07-05'
title: 'React State Update와 Rendering'
categories: ['React']
summary: '리엑트 공식문서를 스터디하고 State Update와 Rendering 관련 사항을 기록합니다.'
thumbnail: './thumbnail/react-state.png'
---

# State란?

- 시간이 지남에 따라 **변하는 데이터**
- 컴포넌트의 **메모리**
- 모든 컴포넌트에 state를 추가하고 업데이트를 할 수 있습니다.

---

# 선언 방법

```jsx
const [index, setIndex] = useState(0);
```

---

# 특징

## 독립적, private

동일한 컴포넌트 두 군데에서 렌더링하면 각 컴포넌트는 **완전히 독립된 state를 갖게 됩니다.** 이 중 하나를 변경해도 다른 컴포넌트에는 영향을 미치지 않습니다.

```jsx
import { useState } from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

export default function App() {
  return (
    <>
      <ComponentA />
      <ComponentB />
    </>
  );
}
```

ComponentA에서 state가 변경되어도 ComponentB는 영향을 미치지 않습니다.
<br/>
<br/>
또한, state a, b 둘은 **완전히 독립된 메모리**입니다. 둘 중 하나의 값이 변해도 나머지 하나는 영향을 받지 않습니다.

```jsx
import { useState } from 'react';

export default function App() {
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

---

## Snapshot & Batching(일괄처리)

### Snapshot

state는 스냅샷처럼 동작합니다. setState를 해도 **이미 가지고 있는 state변수는 변경되지 않고, 리렌더링이 실행**됩니다.

렌더링이란 React가 컴포넌트, 즉 함수를 호출한다는 뜻입니다. 해당 함수에서 반환하는 JSX는 시간상 UI의 스냅샷과 같습니다. **prop, 이벤트 핸들러, 로컬 변수는 모두 렌더링 당시의 state를 사용해 계산됩니다.**
<br/>
<br/>

**React는 컴포넌트를 다시 렌더링할 때 일어나는 일**

1. React가 함수를 다시 호출합니다.
2. 함수가 새로운 JSX 스냅샷을 반환합니다.
3. React가 반환한 스냅샷과 일치하도록 화면을 업데이트 합니다.

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

이 number는 클릭당 한번만 증가합니다. 그 이유는 이벤트 핸들러 내에서 state.값을 고정시키기 떄문입니다. 즉 number가 0으로 지정되어 있기 때문입니다. 순서는 다음과 같습니다.

setNumber(number + 1) : number는 0이므로 setNumber(1)입니다. 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

setNumber(number + 1) : number는 0이므로 setNumber(1)입니다. 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

setNumber(number + 1) : number는 0이므로 setNumber(1)입니다. 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

setNumber(number + 1)를 3번 호출했지만, 이 렌더링에서 **이벤트 핸들러의 number는 항상 0이므로 state를 1로 세번 설정했습니다.**
<br/>
<br/>

### Batching(일괄처리)

state를 세팅하면 다음 렌더링이 큐에 들어갑니다. 위의 예제에서 setNumber(number + 1)을 세번 작성하여도 state는 1이었습니다. **그 이유는 React는 state를 업데이트 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다립니다.** 이 때문에 리렌더링은 모든 setNumber() 호출이 완료된 이후에만 일어납니다.

### 일괄처리 해소하기 - **updater function (업데이터 함수)**

그러나 다음 렌더링이 일어나기 전에 state를 업데이트 할 수 있습니다.

```jsx
setNumber(n => n + 1);
```

n => n + 1는 업데이터 함수(updater function)이라고 부릅니다. React는 이전 업데이터 함수의 `반환값`을 가져와서 다음 업데이터 함수에 n으로 전달하는 식으로 반복합니다.

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

6을 반환합니다. 그 이유는 첫번째 setNumber(number + 5);에서 5를 반환하고, setNumber(n => n + 1);에서 6이 반환되기 때문입니다.

---

## State 구조화 원칙

### 1. 관련 state를 그룹화하기

항상 두개 이상의 state 변수를 동시에 업데이트 하는 경우, **단일 state 변수로 병합**하는 것이 좋습니다.

```jsx
// ❌
const [x, setX] = useState(0);
const [y, setY] = useState(0);

// ⭕
const [position, setPosition] = useState({ x: 0, y: 0 });
```

### 2. state가 서로 모순되지 않기

여러 state 조각이 서로 모순되거나 불일치 할 수 있는 방식으로 state를 구성하면 실수가 발생할 여지가 생깁니다.

```jsx
// ❌
const [text, setText] = useState('');
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);

// ⭕
const [status, setStatus] = useState('typing');

const isSending = status === 'sending';
const isSent = status === 'sent';
```

### 3. 불필요한 state 피하기

렌더링 중에 컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있는지 파악하기

```jsx
// ❌
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

// ⭕
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const fullName = firstName + ' ' + lastName;
```

### 4. state 중복을 피하기

동일한 데이터가 여러 state 변수 간에 중복되면 state를 유지하기 어렵습니다.

```jsx
// ❌
const [selectedItem, setSelectedItem] = useState(items[0]);

// ⭕
const [selectedId, setSelectedId] = useState(0);

const selectedItem = items.find(item => item.id === selectedId);
```

### 5. 깊게 중첩된 state는 피하기

깊게 계층화된 state는 업데이트하기 쉽지 않습니다. **가능하면 평평하게** 구현하는 것이 좋습니다.

```jsx
// ❌
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [
    {
      id: 1,
      title: 'Earth',
      childPlaces: [
        {
          id: 2,
          title: 'Africa',
          childPlaces: [
            {
              id: 3,
              title: 'Botswana',
              childPlaces: [],
            },
          ],
        },
      ],
    },
  ],
};

// ⭕
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35],
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6, 7, 8, 9],
  },
};
```

---

## 동일 위치의 동일 컴포넌트의 state 유지

```jsx
export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

체크박스를 선택하거나 선택 취소해도 카운터 state는 재설정되지 않습니다. isFancy가 true이든 false이든, **루트 App 컴포넌트에서 반환된 div의 첫 번째 자식에는 항상 Counter가 있기 때문입니다.**

→ `같은 위치에 있는 같은 컴포넌트`이므로 React의 관점에서 보면 같은 카운터입니다. 즉, React에서 이 두 카운터는 루트의 첫 번째 자식의 첫 번째 자식이라는 동일한 “주소”를 갖기 때문에 같은 컴포넌트로 인식합니다.

### 동일한 위치의 다른 컴포넌트는 state를 초기화합니다.

```jsx
export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

counter가 재설정됩니다. 그 이유는 Counter를 랜더링 하면 div의 첫번째 자식은 div에서 section으로 변경되기 때문에 자식 div가 **DOM에서 제거되면 그 아래의 전체 트리(카운터 및 해당 state포함)도 함께 제거됩니다.**

---

## State 동작 원리 - React Rendering

State 동작 원리를 이해하려면 React가 어떻게 렌더링이 되는지 알아야 합니다. 컴포넌트를 화면에 표시하기 이전에 React에서는 렌더링을 합니다. 각 단계는 아래와 같습니다.

### 1. 렌더링 trigger

렌더링이 trigger 되는 경우는 2가지가 있습니다.

1. 컴포넌트의 첫 렌더링인 경우

   ```jsx
   import Image from './Image.js';
   import { createRoot } from 'react-dom/client';

   const root = createRoot(document.getElementById('root'));
   root.render(<Image />);
   ```

   대상 DOM으로 createRoot를 호출한 다음 컴포넌트로 render 메서드를 호출하면 첫 렌더링이 됩니다.

2. 컴포넌트의 state (또는 상위 요소중 하나)가 업데이트된 경우

   컴포넌트가 처음 렌더링 되면 setState를 업데이트하여 추가 렌더링을 trigger할 수 있습니다. 컴포넌트의 state를 업데이트하면 자동으로 렌더링이 대기열에 추가됩니다.

### 2. 컴포넌트 렌더링

렌더링이 trigger되면, React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악합니다. **렌더링은 React에서 컴포넌트를 호출하는 것입니다**.

- 첫 렌더링에서 React는 루트 컴포넌트를 호출합니다.
- 이후 렌더링에서 React는 state 업데이트에 의해 렌더링이 trigger된 함수 컴포넌트를 호출합니다.

이 과정들은 `재귀적`입니다. 업데이트된 컴포넌트가 다른 컴포넌트를 반환하면 React는 다음으로 해당 컴포넌트를 렌더링하고 해당 컴포넌트를 반환하면 반환된 컴포넌트를 다음에 렌더링하는 방식입니다.

### 3, DOM에 변경사항을 커밋

React는 컴포넌트를 렌더링한 후 React는 DOM을 수정합니다.

- 초기 렌더링의 경우 React는 appendChild()를 사용하여 생성한 모든 DOM 노드를 화면에 표시합니다.
- 리렌더링의 경우 React는 필요한 최소한의 작업(렌더링 하는동안 계산된 것)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 합니다.

`React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경합니다.`

```jsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

매 초 부모로 전달된 다른 props로 다시 렌더링하는 컴포넌트가 있습니다. input태그에 텍스트를 입력하여 **value를 업데이트 하지만 컴포넌트가 리렌더링될 때 텍스트가 사라지지 않습니다.**

그 이유는 React가 h1태그의 내용만 새로운 time으로 업데이트하기 때문입니다. **input태그가 JSX에서 이전과 같으므로 React는 input태그 또는 value를 건드리지 않습니다.**

이 단계를 **브라우저 렌더링**이라고 합니다.

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

보통 이전 state에 prev를 붙여 사용합니다.

---

## State 객체, 배열 업데이트 특징

### 복사본 이용하기

mutation이란 객체, 배열 자체의 내용을 변경하는 것을 의미합니다. React state 객체는 기술적으로 변이할 수 있지만, **객체를 직접 변이하는 대신, 항상 교체해야합니다.**

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

// 전개구문을 사용하여 객체 복사하기
// 주의할 것 : 전개구문은 얕은 복사를 하여 한단계 깊이만 복사합니다.
// ❌
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email,
});

// ⭕
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value, // But override this one
});

// 중첩된 객체 업데이트하기
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

// Immer사용하기
// https://github.com/immerjs/use-immer
```

### 배열에서의 추천 메서드

|      | 비추천(mutates the array) | 추천(returns a new array) |
| ---- | ------------------------- | ------------------------- |
| 추가 | push, unshift             | concat, […arr]            |
| 삭제 | pop, shift, splice        | filter, slice             |
| 교체 | splice, arr[i] = a        | map                       |
| 정렬 | reverse, sort             | 배열을 복사한 다음 처리   |

---

# 요약

## State의 렌더링 과정

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

버튼을 클릭합니다. 그러면 setNumber(number + 1);가 실행됩니다. setNumber의 호출은 렌더링을 촉발시킵니다. 그러나 setNumber를 호출하더라도 state는 바로 업데이트가 되지 않습니다. React는 큐에 업데이트 할 setNumber를 등록시켜 놓고, onClick 핸들러가 끝나기를 기다립니다. (batching)

큐에 3개의 setNumber(number + 1);가 담겼습니다. onClick 핸들러가 끝나면 렌더링이 시작됩니다. 렌더링은 새로운 함수, 즉 컴포넌트를 호출하는 걸 뜻합니다. 호출된 함수는 새로운 JSX 스냅샷을 반환합니다.

React는 반환된 그 스냅샷과 일치하도록 변화가 필요한 DOM만 화면에 업데이트합니다.

---

# Reference

https://react.dev/
