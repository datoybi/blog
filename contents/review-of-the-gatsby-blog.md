---
date: '2022-09-05'
title: 'Gatsby로 블로그 만든 후기'
categories: ['회고']
summary: '블로그를 만든 이유와 목적, 만들면서 느낀점과 알게된 것들을 공유합니다.'
thumbnail: './thumbnail/just-do-it.png'
---

## 블로그를 만든 이유?

프론트앤드 개발자가 되기로 결심을 한 뒤로 React.js와 TypeScript에 관련된 강의를 구매했습니다. 그러나 강의를 듣기 앞서, 앞으로 배울 것들을 맛보고 싶었습니다. 그래서 `Gatsby.js로 블로그`를 만들어보자는 생각을 하게 되었습니다. 웹 개발자라면 본인이 만든 블로그 하나 쯤은 있어야 한다는 생각을 하기도 했고, 기존에 티스토리를 사용했었는데 뭔가 마음에 들지 않았었고, 앞으로도 꾸준히 블로그를 작성할 건데 내가 만든 블로그가 있으면 좋겠다고 생각하여 구현을 하게 되었습니다.

## 그래서 어느정도 수준인데?

저는 [ReactJS로 영어 단어 앱](https://www.youtube.com/playlist?list=PLZKTXPmaJk8J_fHAzPLH8CJ_HO_M33e7-)을 만들어보았고, 프로그래머스에서 [프론트엔드 개발을 위한 자바스크립트](https://school.programmers.co.kr/learn/courses/14723)를 참여하여 상태관리에 대해 익혔으며, [TypeScript는 대충 이렇게 사용하는거구나~](https://www.youtube.com/playlist?list=PLZKTXPmaJk8KhKQ_BILr1JKCJbR0EGlx0)라는걸 음미만 해본 상태입니다. 또한 [gatsby 공식 홈페이지에서 제공하는 튜토리얼](https://www.gatsbyjs.com/docs/tutorial/)도 따라해봤습니다. 그래도 아직 많은 개념들이 헷갈리는 상황이였습니다. 할까 말까 망설이다가 이 말이 생각났습니다.

<p align="center">
<img src="./thumbnail/just-do-it.png" alt="just do it image">
</p>

`네.. 그냥 해보자!` 라는 말입니다. 그래서 그냥 만들게 되었습니다.

## 사용한 툴

구현은 **Gatsby.js**

스타일은 **Emotion**

sql은 **GraphQL**

배포는 **Netlify**

코멘트는 **Utterances**

코드 스타일은 **Prism** 을 사용하였습니다.

## 느낀점 & 알게된 것

1. 재미있어서 시간 가는 줄 모르고 코딩했습니다. 제가 직접 원하는대로 디자인을 하고 구현하니 굉장히 즐겼고 오랜만에 몰입했던 것 같습니다. 앞으로 자주 많은 것들을 만들어보고 싶습니다.
2. JS와 HTML, CSS를 모두 한 JSX 파일에서 한다는 점이 굉장히 신선했습니다. 컴포넌트 단위로 나눈다는게 이런거구나 느꼈고 유지보수 비용이 굉장히 세이브 될것 같다는 생각을 했습니다.
3. Emtion을 처음 사용해보았기 때문에 전역으로 선언하는 방법이나 pseudo-element 같은 것들은 어떻게 선언해야 하는지 잘 몰라서 공식문서를 참고해가며 개발을 진행했습니다.
4. 도메인을 가비아에서 구매한 뒤 Netlify로 배포를 했습니다. Netlify는 커스텀 도메인을 연결하면 HTTPS를 자동으로 만들어주고 깃헙에 Push만 하면 알아서 업데이트를 해주었습니다. 꽤나 간편했습니다.
5. Gatsby와 React의 모든 기능들을 잘 알고 사용하진 않았습니다. 아직도 헷갈리는 개념들이 있고 여러가지 에러때문에 애도 많이 먹었습니다. 그러나 모던 웹개발을 찍먹하기엔 정말 충분했던 것 같습니다.

## 앞으로 개선할 점

1. ~~성능 최적화 - lighthouse 점수 최적화~~
2. Dark Mode 기능
3. 검색 엔진 개선
