---
date: '2023-04-19'
title: 'React Context API 톺아보기'
categories: ['react']
summary: 'React Context API에 대해 스터디한 것을 공유합니다.'
thumbnail: './thumbnail/react.jpg'
---

# 선행 지식

## 💡Prop drilling

리엑트는 단방향으로 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달합니다. 이 과정을 prop drilling이라고 합니다. 깊숙히 위치한 컴포넌트에 데이터를 전달해야 하는 경우에는 여러 컴포넌트를 거쳐 연달아서 props를 설정해주어야 하는데 이럴때는 불편하고 실수할 가능성이 있습니다. 아래는 prop drilling의 문제점을 나타내는 예제코드 입니다.

```jsx
// App.jsx
function App() {
  return (
    <div className="App">
      <div className="card">
        <GrandParent name="dasom" />
      </div>
    </div>
  );
}

// GrandParent.jsx
function GrandParent({ name }) {
  return <Parent name={name} />;
}

// Parent.jsx
function Parent({ name }) {
  return <Child name={name} />;
}

// Child.jsx
function Child({ name }) {
  return <div>name is {name}</div>;
}
```

가령 prop의 네이밍(name)을 바꿔야 한다면 여러 컴포넌트를 수정해야 해서 불편하고, 하위 컴포넌트(Child)에서 이 prop값이 어디서 오는지 파악하려면 상위 컴포넌트로 계속 거슬러 올라가야 하기 때문에 매우 불편하다는 단점이 있습니다.

---

# Context API

- Context는 리액트 컴포넌트 간에 `어떠한 값을 공유`할 수 있게 해주는 기능입니다. 주로 Context는 전역적으로 필요한 값을 다룰 때 사용하긴 하지만 꼭 전역적일 필요는 없습니다. 리액트 컴포넌트에서 `props가 아닌 또 다른 방식으로 컴포넌트 간에 값을 전달하는 방법`입니다.

## 사용법

prop drilling의 예제에 Context API를 적용하였습니다.

```jsx
// App.jsx
import { useState, createContext } from 'react';
import GrandParent from './components/GrandParent';

export const MyContext = createContext(); // context 생성

function App() {
  return (
    <div className="App">
      <div className="card">
        <MyContext.Provider value="dasom">
          // value 바인딩
          <GrandParent />
        </MyContext.Provider>
      </div>
    </div>
  );
}

// GrandParent.jsx
function GrandParent() {
  return <Parent />;
}

// Parent.jsx
function Parent() {
  return <Child />;
}

// Child.jsx
import { useContext } from 'react';
import { MyContext } from '../App';

function Child() {
  const value = useContext(MyContext); // context value
  return <div>name is {value}</div>;
}
```

context를 사용하여 사용하는 컴포넌트만 prop을 전달하면 되어 훨씬 가독성이 좋아졌습니다.

---

## context를 사용하지 않고 컴포넌트를 개선해보기

**context를 사용하면 컴포넌트를 재사용하기 어려워집니다**. 그러므로 꼭 필요할 때만 쓸 것을 권장합니다. context를 사용하기 이전에 컴포넌트를 개선할 수 있는지 먼저 생각하는 것이 중요합니다.

```jsx
export default function App({ user }) {
  const { username, avatarSrc } = user;
  return (
    <main>
      <Navbar username={username} avatarSrc={avatarSrc} />
    </main>
  );
}

function Navbar({ username, avatarSrc }) {
  return (
    <nav>
      <Avatar username={username} avatarSrc={avatarSrc} />
    </nav>
  );
}

function Avatar({ username, avatarSrc }) {
  return <img src={avatarSrc} alt={username} />;
}
```

props가 필요없는 컴포넌트들에게 여러개의 props를 굳이 전달하고 싶진 않고, prop drilling을 하고있는 경우에도 context를 바로 사용하는 것보다는 아래처럼 수정해볼 수 있습니다.

```jsx
export default function App({ user }) {
  const { username, avatarSrc } = user;
  const avatar = <img src={avatarSrc} alt={username} />;
  return (
    <main>
      <Navbar avatar={avatar} />
    </main>
  );
}

function Navbar({ avatar }) {
  return <nav>{avatar}</nav>;
}
```

<br/>

또 다른 예제로 **컴포넌트 합성**을 사용할 수 있습니다. 기존의 prop drilling 예제를 수정해보겠습니다.

```jsx
// App.jsx
function App() {
  return (
    <div className="App">
      <div className="card">
        <GrandParent>
          <Parent>
            <Child name="dasom" />
          </Parent>
        </GrandParent>
      </div>
    </div>
  );
}

// GrandParent.jsx
function GrandParent({ children }) {
  return children;
}

// Parent.jsx
function Parent({ children }) {
  return children;
}

// Child.jsx
function Child({ name }) {
  return <div>name is {name}</div>;
}
```

---

## Context API 장점

- prop drilling을 피할 수 있습니다.
- 전역에서 상태관리가 가능합니다.

## Context API 단점

- `잦은 업데이트를 위해서는 최적화되어있지 않습니다.`
  Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop이 바뀔 때마다 다시 렌더링 됩니다.

## **Context API VS Redux**

- `Context API`는 high-frequency updates에 좋지 않은 성능을 보이지만 Redux는 그렇지 않습니다.
  앞서 말했듯이 Provider 하위에서 context를 구독하는 모든 컴포넌트는 **Provider의 value prop이 바뀔 때마다 다시 렌더링** 됩니다. 반면 `Redux`는 스토어의 특정 값이 변화하였을 때 **해당 값을 구독하고 있는 컴포넌트만 리렌더**가 발생합니다.
- Redux는 미들웨어와 다양한 툴이 있습니다. (redux-saga, redux-thunk, redux-devtools) 다양한 추가 라이브러리를 사용해야 한다면 redux가 좋은 대안입니다. 물론 context를 사용할 때에도 context 분리, useCallback, useMemo, React.memo으로도 Redux와 동일한 급의 최적화가 가능하지만 그정도로 최적화가 필요하고 복잡한 상태관리가 필요하다면 Redux가 현명한 대안이 될 수 있습니다.

---

## 느낀점

찾아보면서 [Kent C Dodds의 글](https://kentcdodds.com/blog/application-state-management-with-react)을 읽어봤는데 오버 엔지니어링을 방지하기 위해 다방면으로 생각하는 것이 인상깊었습니다.

Michael Jackson은 트위터에서 Context API를 남용하면 안되는 이유에 대해 뜨거운 논쟁을 벌이고 그것을 설명하는 [유튜브](https://www.youtube.com/watch?v=3XaXKiXtNjw)를 올리고 토론하는 것도 신기했습니다. 이런 세부적인 것들까지 고려하며 설계하고, 그 사용성에 대해서 고민하고 또 내 프로덕트에 더 적합한 것과 더 최적화 된 것들을 생각하는 힘을 기르는 것이 중요함을 느끼는 계기가 되었습니다.

---

## Reference

[https://velog.io/@velopert/react-context-tutorial](https://velog.io/@velopert/react-context-tutorial)

[https://www.freecodecamp.org/korean/news/cobojareul-wihan-riaegteu-context-wanbyeog-gaideu-2021/](https://www.freecodecamp.org/korean/news/cobojareul-wihan-riaegteu-context-wanbyeog-gaideu-2021/)
