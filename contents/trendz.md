---
date: '2023-04-02'
title: '개인 프로젝트 trendz 회고'
categories: ['회고']
summary: '개인 프로젝트인 trendz 개발하며 느낀점을 회고합니다.'
thumbnail: './thumbnail/trendz.png'
---

![background trendz](./images/20230402/bg_trendz.gif)
[🚩trendz 보러가기](https://trendmz.netlify.app/)

trendz는 제가 취업 포트폴리오용 프로젝트 뿐만 아니라, 정말 만들어보고 싶었던 아이디어 중 하나였습니다. 잘 만들었다고 말하기엔 아직 무리가 있지만 추후에 로그인 기능과 다른 크롤링들도 추가해서 고도화를 진행해 나가고 싶습니다. 아래는 제가 trendz를 개발하며 느꼈던 느낀점을 짧게 기록한 내용입니다.

### 서버의 중요성

puppeteer를 적용하려다가 말았습니다. 그 이유는 서버가 없기 때문입니다. puppeteer는 서버에서만 동작 가능합니다. 프록시도 그렇고 개발하면서 서버의 중요성을 많 이 느꼈습니다. 혹시 다음에 이것보다 규모가 좀 더 큰 프로젝트를 한다면 작게나마 nodeJS로 서버를 구축하는게 서버없이 개발하는 것 보다 훨씬 편하고 옳을 것 같다는 생각이 들었습니다.

### 가변폰트

가변폰트라는 걸 알게 되었습니다. 폰트 굵기를 내 멋대로 조절할 수 있었습니다.(신세계…) 블로그 만들 때 마땅한 굵기의 폰트가 없어서 이런 폰트 저런 폰트 다 적용해보고 노가다를 했던 지난날이 스쳐지나갔습니다. 솔직히 폰트 굵기, 사이즈같은거 조절 안하고도 코딩이 가능하나, 디테일에 집착한다면 폰트가 얼마나 굵은지, 얼마나 넓은지는 무시할 수 없는 요소입니다. 무튼.. 이렇게 한가지 더 알게되었습니다.

### 크롤링에 대한 고찰

어떤 블로그를 읽었는데.. 그 내용이 뭐였냐면.. 요즘의 동영상 강의를 찍고 포스팅을 하는 크롤링은 다 크롤링의 ㅋ자도 모른다는 것이었습니다. 크롤링은 자동적으로 정보를 수집하게 만들어야 하고, 이렇게 끌어오는 데이터중 dom이 하나라도 바뀐다면 못가져오는 그런게 크롤링이 아니라는 것입니다… 흠.. 자극적인 글이었지만 어느정도 공감은 했습니다. 그래서 dom selector로 크롤링 하는 것 보다는 구조적으로 가져와야 할 것 같고 dom이 변경되어도 크롤링에 영향이 가지 않게끔 구현하는게 관건인 것 같습니다.

### transition

transition3d 같은걸 맛보기로 해보았는데 나중에 각잡고 좀 딥하게 공부해보고 싶다는 생각을 했습니다. 애플 사이트처럼 예쁘게 3d로 사이트를 구축할 줄 안다면 멋잇을 것 같다는 생각입니다. 이번 기회에 transition이랑 animation 관련 기능들을 구현해보고 쪼오오오금 손에 익히는 계기가 되었습니다. 재미있었지만 아직도 모호한 느낌이고 클린하게 짰다라기보다는 구현 되는대로 짠 느낌입니다. 이렇게 알아가는거지 뭐!

### forwardRef

forwardRef이란걸 써봤습니다. nav tab에 맞춰 해당 섹션으로 스크롤을 이동할 수 있게끔 하기 위해 DOM이 필요했습니다. DOM은 useRef라는 훅을 이용할 수 있었습니다. 그런데 ref를 부모나 자식으로 이동하려면 forwardRef라는 게 필요했고 강의 들을 때 사용했던 건데 이제야 제대로 뭔지 용도를 알게 되었습니다. 컴포넌트에서 app으로 ref를 가져와서 app에서 nav로 ref를 prop으로 넘겨주었습니다. 그렇게 한 이유는 nav 일은 최대한 nav 에서 처리했으면 싶어서 였습니다.

### BEM

BEM을 배워서 적용시켜보았는데 웬걸.. 유지보수는 쉬워도 너무 지저분해졌습니다. (아래 코드를 첨부했습니다) BEM을 쓰면 클래스 명이 길어지는 건 어쩔 수 없이 받아들여야 하는 단점일까요?

**기존 HTML**

```jsx
<table className="{classes.song_table}">
  <colgroup>
    <col className="{classes.cover_col}" />
    <col className="{classes.rating_col}" />
    <col className="{classes.title_col}" />
  </colgroup>
  <thead>
    <tr>
      <th colspan="3" className="{classes.title_tr}">
        노래
      </th>
      <th className="{classes.singer_tr}">가수</th>
      <th className="{classes.album_tr}">앨범</th>
    </tr>
  </thead>
  <tbody>{songList.length === 0 ? emptyHtml : getSongElement(songList)}</tbody>
</table>
```

**BEM 적용한 HTML**

```jsx
<table className={classes['music-table']}>
  <colgroup>
    <col className={classes['music-table__col--cover']} />
    <col className={classes['music-table__col--rating']} />
    <col className={classes['music-table__col--title']} />
  </colgroup>
  <thead>
    <tr>
      <th
        colSpan="3"
        className={`${classes['music-table__th']} ${classes['music-table__th--title']}`}
      >
        노래
      </th>
      <th
        className={`${classes['music-table__th']} ${classes['music-table__th--singer']}`}
      >
        가수
      </th>
      <th
        className={`${classes['music-table__th']} ${classes['music-table__th--album']}`}
      >
        앨범
      </th>
    </tr>
  </thead>
  <tbody>{musicList.length === 0 ? emptyHtml : musicElement(musicList)}</tbody>
</table>
```

이렇게 무지막지하게 길어져서 가독성을 해쳤습니다. 그런데 생각해보면 css modules을 사용하면 BEM이 필요하진 않습니다. BEM이 길어지는 이유도 전역적인 환경에서 중복을 피하기 위해서입니다. 그래서 emotion과 components styled 둘 중 가독성을 높일 수 있는 것으로 마이그레이션을 해야겠다고 생각을 했습니다.

그리고는 emotion으로 마이그레이션을 하고 난 뒤 가독성이 이렇게 좋아졌습니다.

**emotion 적용**

```jsx
<Table>
  <colgroup>
    <Col />
    <Col />
    <Col />
  </colgroup>
  <thead>
    <tr>
      <Th colSpan="3">노래</Th>
      <Th>가수</Th>
      <Th>앨범</Th>
    </tr>
  </thead>
  <tbody>{musicList.length === 0 ? emptyHtml : musicElement(musicList)}</tbody>
</Table>
```

훨씬 깔끔하긴 하네요. (너무 많은 걸 축약했나..🤔)

### 🚨반응형 크롤링 문제

문제가 생겼습니다. 웹은 어느정도 디자인과 기능구현을 해서 이제 슬슬 반응형을 개발하려는 도중에 반응형으로 개발자도구를 적용시킨 후 크롤링을 해보니 크롤링이 안되었습니다. 그 이유는 즉슨, 요청 api를 보낼때 크롤링하는 사이트에서 viewport가 모바일 사이즈면 모바일 버전으로 주소를 redirect 해버리기 때문이었습니다. 그래서 크롤링이 안되고 또다시 CORS에러를 뿜었습니다.. 처음에는 그새 DOM 구조가 변했나? 했는데 이렇게 예상치 못한 복병이 있을 줄 몰랐습니다. 그래서 생각해본 점은

1. 프록시 요청할때 viewport를 웹으로 고정하고 보낼 수 있을까?
2. 프록시에서 redirect를 막을 수 있을까?
3. puppeteer를 이용하면 headless 브라우저를 띄울 수 있어서 viewport도 설정할 수 있다고 합니다. → 이것의 단점은 서버를 붙여야 한다는 것입니다..

이러한 방법들로 찾아보고 적용해보고 이것저것 씨름하다가 결국 3번 방법인 puppeteer를 사용하는 걸로 눈길을 돌렸습니다. 서버, 프록시 설정, 서버 호스팅까지 해줘야할것 같습니다.

### 1인 개발을 하며 느낀점

혼자 모든걸 하려니 협업하는 것에 비해 시간이 많이 소요된다는 것을 느꼈습니다. 시간이 무한정 있다면 상관없지만 아무래도 취업을 해야되는 입장이라.. 마음이 조금 조급해지는건 사실이었습니다. 취업을 한 뒤에 고도화를 꼭 해나가고 싶습니다.

### 현재 서버 문제점

heroku로 서버 호스팅을 하고 있는데요. 로컬 서버에서는 모든 데이터를 잘 크롤링하는데 heroku에서는 특정 데이터들을 못가져오는 이슈가 생겼습니다. 제가 유추하는 원인은 puppeteer를 이용하여 크롤링하는 과정이 시간이 오래걸려서 heroku가 기다려주지 않고 api를 반환하는 거라고 생각하고 있습니다. 나중에 해결해보아야 겠습니다.

---

보기엔 정말 간단한 사이트인것 같은데 크롤링을 처음 해보면서 나름의 트러블 슈팅도 경험해보았고, 처음으로 React를 학습하며 만든 완성된 프로젝트라 뿌듯합니다. 나중에 꼭 고도화를 해서 사용성있는 프로젝트로 업그레이드하고 싶습니다.
