---
date: '2024-12-03'
title: 'TypeScript의 Generic'
categories: ['TIL']
summary: 'React.js의 관련 강의들을 완강하고, 직접 구현해보는 시간을 가졌습니다. 전에 vanilla javascript로 구현해뒀던 고양이 사진첩을 react로 마이그레이션 한 뒤, 알게된 점을 기록합니다.
'
thumbnail: './thumbnail/TIL.png'
---

# 제네릭(Generic)타입이란?

- 제네릭이란 `타입을 유연하게 제공해야할 때 사용`하는 타입입니다.
  - 타입의 유연성이란 여러 타입을 사용할 수 있게 해주는 것입니다.
  - 제네릭은 함수가 호출될 때 동적으로 타입이 결정되기 때문에 타입의 유연성을 제공합니다.
- 제네릭은 타입을 직접적으로 명시하지 않고 변수를 통해 언제든지 변할 수 있는 타입으로 만드는 것입니다. 즉 `타입을 변수화` 하는것입니다.

---

# 선언과 해석

```tsx
// 기본적인 제네릭 선언 방식
function add<T>(a: T): T {
  return a + a;
}
```

T가 어떤 타입인지는 모르겠지만, 파라미터 a의 타입이 T 라는 것과, 리턴타입의 타입이 T라는 것을 알 수 있습니다. 즉, add 함수는 string 타입의 값을 넣으면 string 타입이 반환되고, number 타입의 값을 넣으면 number 타입이 반환된다는 것을 확인할 수 있습니다.

아래는 제네릭의 기본적인 사용 예시입니다.

```tsx
function getText<T>(arg: T): T {
  return arg;
}

// 호출방법1. 함수에 파라미터 타입을 명시하는 방법
getText<string>('string');
getText<number>(123);
getText<boolean>(true);

// 호출방법2. 컴파일러가 타입을 자동으로 정하게 하는 방법 (타입 인수 추론 이용)
// 보편적인 방식
getText('string');
getText(123);
getText(true);
```

getText 함수에 T라는 타입변수를 추가했습니다. T의 타입은 `getText("string");`이 호출되면 T의 타입변수 값으로 `string`을 전달합니다. 즉, 아래와 같이 정의됩니다.

```tsx
function getText<string>(text: string): string {
  return text;
}
```

이쯤에서 궁금증이 생겼습니다. 타입의 유연성을 제공하는 다양한 타입들이 이미 존재하는데, 왜 제네릭이 필요한걸까요?

---

# 제네릭을 사용해야 하는 이유?

## any를 사용하면 안되는 이유

any를 사용하게 되면 함수가 반환할 때 어떤 타입인지에 대한 정보는 잃게 됩니다. number 타입을 넘긴다고 해도 any타입이 반환이 됩니다.

반면 제네릭을 사용하게 되면 함수를 호출할때 넘긴 타입에 대해 타입스크립트가 추정할 수 있게 됩니다.

```tsx
function func1(arg: any): any {
  return arg;
}

const example1 = func1(1); // example1: any
example1.split('');
// any type이기 때문에 컴파일 에러가 발생하지 않는다.
// ❗️ Uncaught Error: example1.split is not a function: 런타임 에러 발생

function func2<T>(arg: T): T {
  return arg;
}

const example2 = func2(1); // example2: 1
example2.split('');
// ❗️ error: Property 'split' does not exist on type '1': 컴파일 에러 발생
```

example1의 타입은 any이고, example2의 type은 1(number)입니다. 그래서 컴파일 단계에서 example2.split(""); 에러가 표출됩니다.

반면 example1의 경우, 타입이 any로 세팅되어 컴파일 에러가 발생하지 않습니다. 그러나 `런타임 에러(Uncaught Error: example1.split is not a function)가 발생`합니다. ts를 사용하는 이유는 컴파일 단계에서 타입을 검사하여 오류를 미리 잡아내는 것인데 any를 사용하면 타입스크립트를 사용하는 의미 자체가 없어집니다.

## union을 사용하면 되지 않을까?

1. 인자와 리턴타입 간의 연결성이 유지되지 않습니다.

```tsx
// union으로 구현한 경우 value의 값이 number인지 string인지 알 수 없음
function wrapUnion(value: number | string): { value: number | string } {
  return { value };
}

const result = wrapUnion(123); // { value: number | string }

// 제네릭으로 구현한 경우 정확한 값을 추론 가능
function func<T>(value: T): { value: T } {
  return { value };
}

const wrappedNumber = func(123); // { value: number }
const wrappedString = func('hello'); // { value: string }
```

2. 코드 재사용성과 확장성 부족

새로운 타입을 추가하거나 변경하려면 유니언 타입은 코드를 수정해야 하지만 제네릭은 특정 타입에 의존하지 않으므로 더 높은 재사용성과 확장성을 제공합니다.

```tsx
function identity<T>(value: T): T {
  return value;
}

identity(42); // number
identity('hello'); // string
identity(true); // boolean

function identityUnion(
  value: number | string | boolean,
): number | string | boolean {
  return value;
}
```

3. 제약조건 적용 불가

유니언으로는 아래와 같은 제약사항을 구현하기 어렵습니다.

```tsx
interface HasId {
  id: number;
}

function processWithId<T extends HasId>(value: T): number {
  return value.id;
}

processWithId({ id: 1, name: 'Item' }); // 정상 작동
processWithId({ name: 'Item' }); // 컴파일 에러: 'id' 속성이 없음
```

위와 이유로 제네릭의 사용을 권장합니다.

---

# 주의할 점

배열 제네릭은 배열임을 명시해야합니다.

```tsx
function func<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

const firstArr = func([1, 2, 3]); // 💡 firstArr: number[]
const secondArr = func(['a', 'b', 'c']); // 💡 secondArr: string[]
```

---

# 제네릭의 활용

## 인터페이스 + 제네릭

인터페이스와 제네릭을 함께 사용하면 코드 유연성과 타입 안전성을 강화할 수 있습니다.

아래의 코드는 metadata를 제네릭으로 타입 지정하여 다양한 타입으로 선언 가능한 코드입니다.

```tsx
interface MetaData {
  sex: string;
  height: 'tall' | 'short';
  favouriteNumber: number;
}

interface Person<T> {
  id: number;
  name: string;
  age: number;
  metadata: T; // 💡 metadata를 제네릭으로 선언
}

const personOne: Person<(number | string)[]> = {
  id: 1,
  name: 'Jeff',
  age: 31,
  metadata: ['male', 'tall', 22], // 💡 다양한 값 선언 가능
};

const personTwo: Person<MetaData> = {
  id: 1,
  name: 'Jeff',
  age: 31,
  // 💡 다양한 값 선언 가능
  metadata: {
    sex: 'female',
    height: 'tall',
    favouriteNumber: 45,
  },
};
```

아래는 조금 더 실용적인 예시입니다. ApiResponse의 data값을 제네릭으로 선언하여 유연한 타입을 명시하였습니다.

```tsx
interface ApiResponse<T> {
  data: T; // 💡 data를 제네릭으로 선언
  success: boolean;
  error?: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'Alice' }, // 💡 다양한 값 선언 가능
  success: true,
};

const stringResponse: ApiResponse<string> = {
  data: 'Operation Successful', // 💡 다양한 값 선언 가능
  success: true,
};
```

---

# 제네릭 제약조건 **(Generic Constraints)**

특정 타입들로만 동작하는 제네릭 함수를 만들고 싶을 때 사용합니다.

아래는 length의 값을 number type으로 제약조건을 주는 예시입니다.

```tsx
interface Length {
  length: number;
}

// 💡 interface를 extends하기
function func<T extends Length>(arg: T): T {
  console.log(arg.length);
  return arg;
}

func(3); // Argument of type 'number' is not assignable to parameter of type 'Length'.ts(2345)
func({ length: 10, value: 3 }); // 10
func([1, 2, 3]); // 3
```

객체의 키값을 제약조건으로 활용한 예시입니다.

```tsx
// K는 T의 key로 제약조건
function func<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3, d: 4 };

func(x, 'a');
// m은 x의 key로 존재하지 않는다
func(x, 'm'); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.ts
```

아래는 key값에 제약을 두는 제네릭 인터페이스의 예시입니다.

```tsx
interface Dictionary<K extends string | number, V> {
  // 키 값이 string이거나 number로 제약조건
  key: K;
  value: V;
}

const numberToString: Dictionary<number, string> = { key: 1, value: 'One' };
const stringToBoolean: Dictionary<string, boolean> = {
  key: 'isActive',
  value: true,
};
```

아래는 type alias 사용한 예시입니다.

```tsx
type TG<T> = T[] | T;

const number_arr: TG<number> = [1, 2, 3, 4, 5];
const number_arr2: TG<number> = 12345;

const string_arr: TG<string> = ['1', '2', '3', '4', '5'];
const string_arr2: TG<string> = '12345';
```

---

# Generic 이름 규칙

보편적으로 통용되는 generic 이름 규칙입니다.

| 인자 | 설명          |
| ---- | ------------- |
| T    | Type, 타입    |
| E    | Element, 요소 |
| K    | Key, 키       |
| V    | Value, 값     |
| N    | Number, 숫자  |

---

## Reference

https://www.typescriptlang.org/ko/docs/handbook/2/generics.html
