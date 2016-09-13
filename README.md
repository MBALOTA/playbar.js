# playbar.js
A small and simple playbar written in pure js. Check the example [website] (https://mbalota.github.io/playbar.js/).

HOW TO USE:

1. script source the minified playbar.js (playbar.min.js)
2. initialize a custom playBar:
```js
  var newPlayBar = new playBar ("#wrapperId", {
                                                buttonId: "#bid",     //default: "#playBarButton"
                                                progressId: "#pid",   //default: "#playBarProgress"
                                                previewId: "#ppid",   //default: "#playBarProgressPreview"
                                                buttonOffset: {5,0},  //x,y IN PX
                                                barType: "horizontal",//can be "vertical"
                                                showPreview: true
                                                });
```
Don't worry, a lot of the options are "optional" *badum tsss*.

There are 2 functions:
```js
  playBar.setProgress(number); // 0-100, progressId.style.width/height & buttonId.style.left/bottom will be set to px
  playBar.setPreviewProgress(number); /* 0-100, the button will update its position, 
                                                if the preview progress isn't equal to progress nor 0 */
```

For more information check out the pretty version! playbar.js
  
THIS PROJECT USES THE UNLICENSE.

-[Matthias Balota] (http://balota.me/)
