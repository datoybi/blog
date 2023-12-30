---
date: '2023-12-15'
title: 'boolean parameter를 너무 사랑하지마세요.'
categories: ['최적화']
summary: 'tkdodo의 No love for boolean parameters를 번역한 글입니다. boolean parameter를 왜 사용하면 안되는지 설명합니다.'
thumbnail: './thumbnail/boolean-parameter.jpg'
---

이 포스팅은 [클린 코드](https://github.com/qkraudghgh/clean-code-javascript-ko)에 대해 읽다가 boolean flag paramter를 사용하지 말라는 이유에 대해 궁금해져 구글링하던 찰나, 관련된 좋은 글을 발견하여 번역한 게시글입니다.

[tkdodo의 No love for boolean parameters](https://tkdodo.eu/blog/no-love-for-boolean-parameters)를 번역하였습니다.

---

# boolean parameter를 너무 사랑하지마세요.

boolean은 0, 1 이거나 true, false로 항상 두 값중 하나입니다. 너무나 간단하고 예측이 가능하지요. 결국 우리가 작성하는 모든 코드는 수많은 0과 1로 끝납니다.

boolean자체는 아무런 문제가 없습니다. 우리는 항상 다음과 같이 boolean을 사용합니다.

```jsx
// ✅ boolean 조건문
if (user.age() < legalAge) {
  return 'Sorry, you are too young to use this service';
}
```

그러나 함수의 매개변수로 불리언을 사용하는 것은 다음과 같은 이유로 잘못된 디자인을 나타낼 수 있습니다.

---

# 단일 책임 원칙

함수는 오직 한가지 일만 해야합니다. 매개변수로 flag를 전달하는 것은 동시에 두가지 작업을 수행하여 [단일 책임 원칙](https://en.wikipedia.org/wiki/Single_responsibility_principle)을 위반합니다.

```jsx
// 🚨 boolean을 함수의 파라미터로 사용하는 경우
function createReport(user: User, sendEmail: boolean) {
  // 보고서를 만든다
  const reportData = ...

  if (sendEmail) {
    sendReport(user.email, reportData)
  }
  return reportData
}
```

보고서를 작성 후 바로 이메일을 보내고 싶은 경우도 있고, 그렇지 않은 경우도 있는 것 같습니다. 그런데 왜 이것을 createReport 함수 안에 작성을 하는 걸까요? 해당 함수는 보고서만 생성해야 하며 다른 것은 생성하지 않아야 합니다. 그래야 함수를 호출할 때 무엇을 원하는지 결정할 수 있습니다.

---

# 혼란을 유발합니다.

flag 변수는 특히 이름이 지정되지 않은 파라미터에서 혼란을 유발합니다. Kotlin 표준 라이브러리에서 사용하는 [equals](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/equals.html)를 예로 들어보겠습니다.

```kotlin
fun String?.equals(other: String?, ignoreCase: Boolean): Boolean

// 해당 string이 other과 같으면 true를 반환하고, 선택적으로 대소문자를 무시합니다.
```

첫 번째 예와 달리 이 함수는 한번에 두 가지 작업을 수행하지 않고 두 가지 다른 변형으로 한 가지 작업을 수행합니다. 이는 중요한 차이점입니다. 다음과 같은 호출 측을 읽어야 할 때 매우 혼란스러울 수 있습니다.

```kotlin
"foo".equals("bar", true)
"foo".equals("bar", false)
```

이 코드에서 `true`가 무엇을 의미하는지 어떻게 알까요? 더 나쁜 점은 `false`는 무엇을 의미하나요? Scala는 [eqals](<https://www.scala-lang.org/api/2.12.3/scala/collection/immutable/StringOps.html#equals(x$1:Any):Boolean>)와 [equalsignorecase](<https://www.scala-lang.org/api/2.12.3/scala/collection/immutable/StringOps.html#equalsIgnoreCase(x$1:String):Boolean>)라는 두 가지 함수를 제공하여 이 문제를 해결하였습니다. 두 함수는 단 한가지 일만 수행합니다. 추측할 필요가 없습니다.

## 더 많은 추측

[여기](<https://docs.groovy-lang.org/latest/html/groovy-jdk/java/lang/Iterable.html#sort(boolean,%20groovy.lang.Closure)>)에서 찾아보기 전에 Groovy List.sort 메서드의 이 boolean flag가 무엇을 의미한다고 생각하나요?

```kotlin
["hello","hi","hey"].sort(false) { it.length() }
```

명확한 역할을 나타내지 않습니다 :

- `mutate` : false는 항상 새 목록을 생성하고, true는 목록을 변경합니다.

완전히 논리적이고 직관적인 API로 전혀 혼란스럽지 않습니다. 🤷‍♂️

---

# 불가능한 상태

Boolean을 사용하면 불가능한 State를 쉽게 만들 수 있습니다. 어떤 수가 있고 이를 포멧화 한다고 가정해 보겠습니다. 이는 “일반”숫자일 수도 있지만 백분율 값일 수도 있습니다. 따라서 아래와 같이 퍼센트 포멧으로 모델링하기로 결정했습니다.

```tsx
function formatMetric(value: number, isPercent: boolean): string {
  if (isPercent) {
    return `${value * 100}%`;
  }
  return String(metric);
}
```

다소 간단한 퍼센트 포멧 함수이지만, 그 외에는 나쁘지 않아 보입니다. 솔직히 말해서, 함수에 추가하는 첫 번째 ‘flag’는 일반적으로 매우 순수해보입니다.

## 두번째 flag

흔히 그렇듯이 요구 사항은 시간이 지남에 따라 변경됩니다. 이제 값에 통화 포멧도 지정하고 싶습니다. 위의 기존 함수에 `isCurrency`라는 다른 flag를 추가하고 싶은 유혹을 받습니다.

```tsx
function formatMetric(
  value: number,
  isPercent: boolean,
  isCurrency: boolean,
): string {
  if (isPercent) {
    return `${value * 100}%`;
  }
  if (isCurrency) {
    return; // imagine some currency formatting is returned here
  }
  return String(metric);
}
```

코드는 작동하고, 테스트를 작성하고, 통화 flag를 추가하면 모든 것이 정상인 것처럼 보입니다.

하지만 그렇지 않습니다.

<br/>

_boolean 하나를 추가한다고 해서 상태가 한가지만 더 추가되는 것은 아닙니다._ 상태의 양은 기하급수적으로 늘어납니다. 두개의 boolean은 4개의 상태를 의미하고, 3개의 boolean은 8개의 상태를 의미합니다. 위 함수를 다음과 같이 호출하면 어떻게 될까요?

```tsx
formatMetric(100, true, true);
```

질문에 대한 대답은 ‘어떻게 될지 모릅니다.’ 입니다. 어떤 플래그가 먼저 체크되는지는 구현 세부 사항입니다. 또한 *불가능한 상태*이기도 합니다. 수는 백분율과 통화가 동시에 될 수 없습니다. 이러한 불가능한 상태는 Boolean 매개변수를 사용하여 자주 도입됩니다. 저는 최근에 8개의 Boolean 입력으로 사용하는 함수를 접했습니다. 알고보니 실제 상태는 3개뿐이었고, 나머지는 그에 따른 변형이었습니다.

## 충동을 참으세요.

불가능한 상태를 피하려면 첫 번째 Boolean 매개변수를 추가하려는 충동을 억제하세요. 인간이 안티 패턴을 인식하고 리펙토링 하는 대신 기존 패턴을 확장하는 것이 훨씬 쉽습니다. 하나의 Boolean이 있으면 두 번째도 있을 것입니다. boolean을 사용하는 대신, 가능한 상태의 나열로 명시한다면, 확장될 가능성이 훨씬 더 높습니다:

```jsx
function formatMetric(value: number, variant?: 'percent'): string {
  if (variant === 'percent') {
    return `${value * 100}%`;
  }
  return String(metric);
}
```

이제 변형을 `‘percent’ | ‘currency’`로 확장할 수 있으며 4개가 아닌 3개의 상태만 활용할 수 있습니다. 물론 undefined를 사용하는 대신 기본 변형을 명시적으로 포함할 수도 있습니다.

## 모아의 장점

단일 번형(single variant)의 장점은 다음과 같습니다.

- 타입에 안전하다.

  우리는 이미 가독성을 다루었지만 flag를 혼합하는 것도 매우 쉽고 동일한 유형(Boolean)을 갖기 떄문에 컴파일러는 이에 대해 알려주지 않습니다. Javascript에서 매우 널리 사용되는 단일 옵션 객체를(single options object) 사용하여 이 문제를 해결할 수 있습니다.

- 정확한 매칭

  저는 이전에 [Exhaustive matching in TypeScript](https://tkdodo.eu/blog/exhaustive-matching-in-type-script)대해 작성한 적이 있으며 이 예제에서도 매우 유용합니다. 컴파일러는 새 변형을 추가할 때 코드를 조정해야 하는 위치를 알려줍니다. CDD, 컴파일러 중심 개발:

  ```tsx
  type MetricVariant = 'standard' | 'percent' | 'currency';

  function formatMetric(
    value: number,
    variant: MetricVariant = 'standard',
  ): string {
    switch (variant) {
      case 'percent':
        return `${value * 100}%`;
      case 'currency':
        return; // imagine some currency formatting is returned here
      case 'standard':
        return String(metric);
    }
  }
  ```

React 컴포넌트를 생성할 때에도 동일할 작업을 수행합니다. *isPrimary* 및 *isSecondary* flag가 있는 버튼을 본 적이 있습니까? 아마 없을겁니다.

```jsx
// 🚨 Don't do this
<Button isPrimary isSecondary />

// ✅ Do this
<Button variant="primary" />
```

---

# 잘못된 추상화

종종 기존 코드와의 유사성을 확인하고 모든 것을 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)하게 유지하면서 반복하고 싶지 않기 때문에 플래그가 추가됩니다.

- 여기에 내가 원하는 것과 거의 유사한 함수가 있습니다. 약간 다르기 때문에 flag 매개변수 하나만 추가하면 됩니다.
- 이 컴포넌트는 제 경우에도 사용할 수 있을 것 같습니다. 적합하도록 *withPadding 속성을 추가하면 됩니다.*

이 주제에 대해 사용할 수 있는 좋은 문헌이 많이 있으며, 왜 이렇게 하면 안 되고 대신 무엇을 할 수 있는지 보여줍니다.

- [Wet codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase)
- [제어의 역전](https://kentcdodds.com/blog/inversion-of-control)
- [AHA 프로그래밍](https://kentcdodds.com/blog/aha-programming)
- [잘못된 추상화](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

나는 위의 모든 아티클을 추천합니다. 코드베이스에 Bolean 파라미터를 추가하지 마세요.

---

# 요약

## boolean parameter를 사용하면 안되는 이유

1. 단일 책임 원칙 위배

   ```tsx
   // ❌
   function createReport(user: User, sendEmail: boolean) {
     // 보고서 만들기
   	const reportData = ...

   	// 이메일 보내기
     if (sendEmail) {
       sendReport(user.email, reportData)
     }
     return reportData
   }


   // ⭕️
   // 보고서 만들기
   function createReport(user: User) {
   	const reportData = ...
     return reportData
   }

   // 이메일 보내기
   function sendEmail(user: User) {
   	 sendReport(user.email, reportData)
   }

   ```

2. 혼란 유발

   ```tsx
   // ❌
   function formatMetric(
     value: number,
     isPercent: boolean,
     isCurrency: boolean,
   ): string {
     if (isPercent) {
       return `${value * 100}%`;
     }
     if (isCurrency) {
       return; // imagine some currency formatting is returned here
     }
     return String(metric);
   }

   formatMetric(100, true, true); // 각각의 true들이 뭘 의미하는지 모름, 값은 isPercent와 isCurreny 둘다 true가 될 수 없음(불가능한 상태)

   // ⭕️
   type MetricVariant = 'standard' | 'percent' | 'currency';

   function formatMetric(
     value: number,
     variant: MetricVariant = 'standard',
   ): string {
     switch (variant) {
       case 'percent':
         return `${value * 100}%`;
       case 'currency':
         return; // imagine some currency formatting is returned here
       case 'standard':
         return String(metric);
     }
   }

   formatMetric(100, 'percent');
   ```
