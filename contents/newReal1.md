---
date: '2022-09-02'
title: '까다로웠던 JSON 조작'
categories: ['Web']
summary: 'Dev-Mactching을 하면서 어디에서 시간을 많이 빼앗기는지 보니 json조작이 그 원인중 한가지 였습니다. 그래서 정리해보았습니다.'
thumbnail: './json.png'
---

## []나 [{…}]에 객체를 추가하여 합치기 [{…}, {…}, {…}]

```jsx
const origin = [{ fruitName: 'strawberry', quantity: 444 }];

const newJson = [
  { id: 1, fruitName: 'apple', quantity: 20 },
  { id: 2, fruitName: 'banana', quantity: 49 },
  { id: 3, fruitName: 'kiwi', quantity: 100 },
];

const result = newJson.map(fruit => {
  return {
    fruitName: fruit.fruitName,
    quantity: fruit.quantity,
  };
});

console.log([...origin, ...result]);
```

## 새로운 객체 추가하기 (animals)

```jsx
const json = {
  fruits: [
    { id: 1, name: 'apple', quantity: 20 },
    { id: 2, name: 'banana', quantity: 49 },
    { id: 3, name: 'kiwi', quantity: 100 },
  ],
  animals: [
    { id: 1, name: 'dog', quantity: 20 },
    { id: 2, name: 'cat', quantity: 49 },
    { id: 3, name: 'bird', quantity: 100 },
  ],
};

// 1. animal에 새로운 newAnimal 생성
const newAnimal = [...json.animals, { id: 4, name: 'monkey', quantity: 1 }];
console.log(newAnimal);

// 2. json에 붙이기
console.log({ ...json, animals: newAnimal });
```

## 객체 값 수정

```jsx
const json = {
  fruits: [
    { id: 1, name: 'apple', quantity: 20 },
    { id: 2, name: 'banana', quantity: 49 },
    { id: 3, name: 'kiwi', quantity: 100 },
  ],
  animals: [
    { id: 1, name: 'dog', quantity: 20 },
    { id: 2, name: 'cat', quantity: 49 },
    { id: 3, name: 'bird', quantity: 100 },
  ],
};

// 인덱스를 찾아서 수정해주기
const index = json.animals.findIndex(animal => animal.id === 3);
json.animals[index].quantity = 1;
console.log(json);
```

## 키값이 존재하는지 판단 여부

```jsx
const json = [
  {
    fruits: [
      {
        sweet: [
          { name: 'apple', quantity: 30 },
          { name: 'watermelon', quantity: 100 },
        ],
        sour: [
          { name: 'lemon', quantity: 4 },
          { name: 'kiwi', quantity: 10 },
        ],
      },
    ],
  },
];
// 이런 경우에서 sweet 항목을 추출하고 싶을때 보통 이렇게 한번 찍어본다.
console.log(json.fruits.sweet);
// 그러나 이렇게 시도하면 에러가 난다.
```

이유가 뭘까?

이유는 `배열`이 감싸고 있기 떄문에 .으로 접근할 수 없다.

```jsx
const json = {
  fruits: {
    sweet: [
      { name: 'apple', quantity: 30 },
      { name: 'watermelon', quantity: 100 },
    ],
  },
};

console.log(json.fruits.sweet); // 이렇게 시도하면 값이 잘 나온다.
```

배열로 감싸는 이유는 다수의 JSON 객체를 Value값으로 지정하고 싶어서다. 그래서 이러한 객체는 배열을 벗겨주고 JSON에 .이나 []로 접근해야한다.

나는 주로 배열을 벗길 때 이방법을 사용한다.

```jsx
const [newJson] = [...json];
console.log(newJson)
/*
{
	sweet: [
		{ name: "apple", quantity: 30 },
		{ name: "watermelon", quantity: 100 },
	],
	sour: [
		{ name: "lemon", quantity: 4 },
		{ name: "kiwi", quantity: 10 },
	]
}
```

이렇게 원본 json을 얄은 복사 후, newJson에 배열을 벗겨내어 저장하였다.

같은 예시이다.

```jsx
const test = [{ id: 3, name: 'bird', quantity: 100 }];
// json 안에는 키 value 쌍이 들어있어야만 한다고 생각하면 조금 더 쉽다.
console.log(test);
console.log([test]); // 배열이 벗겨진다.
```

결론적으로 앞서 설명했던 방법들을 토대로 이렇게 뽑아낼 수 있다.

```jsx
const json = [
  {
    fruits: [
      {
        sweet: [
          { name: 'apple', quantity: 30 },
          { name: 'watermelon', quantity: 100 },
        ],
        sour: [
          { name: 'lemon', quantity: 4 },
          { name: 'kiwi', quantity: 10 },
        ],
      },
    ],
  },
];

const [newJson] = [...json];
const [fruit] = newJson.fruits;
console.log(fruit.sour);
/*
[
	{ name: "lemon", quantity: 4 },
	{ name: "kiwi", quantity: 10 },
]
*/
```
