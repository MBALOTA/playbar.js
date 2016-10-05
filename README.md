# playbar.js
A small and simple playbar written in pure js. Check the example [website] (https://mbalota.github.io/playbar.js/).

HOW TO USE:

1. script source the minified playbar.js (playbar.min.js)
2. initialize a custom playBar, e.g.:
```js
  var newPlayBar = new playBar ("#wrapperId", {
                                                buttonId: "#bid",     //default: "#pb-Button"
                                                progressId: "#pid",   //default: "#pb-Progress"
                                                previewId: "#ppid",   //default: "#pb-Progress-Preview"
                                                loadedId: "#plid",   //default: "#pb-Progress-Loaded"
                                                moveButtonToPreview: true, //if 'true', button will move to preview progress
                                                enableButtonOffset: true, //to enable out of range button offset, incl. custom offset
                                                buttonOffset: {5,0},  //x,y IN PX
                                                barType: "horizontal",//can be "vertical"
                                                showPreview: true, //enables previewProgress
                                                showLoaded: true //enables loadedProgress
                                                });
```
Don't worry, a lot of the options are "optional" *badum tsss*.

FOR MORE DOCUMENTATION READ THE DEV-COMMENTS IN THE NORMAL playbar.js!

There are 3 functions:
```js
playBar.setProgress(number); //0-100, progressId.style.width/height & buttonId.style.left/bottom will be set to px
playBar.setPreviewProgress(number); /* 0-100, the button will update its position, if moveButtonToPreview is set to true ,
                                              if the preview progress option is enabled and if the preview progress isn't 0 */
playBar.setLoadedProgress(number); // 0-100, it is like the normal progress
```

For more information check out the pretty version! playbar.js

THIS PROJECT USES THE UNLICENSE.

-[Matthias Balota] (http://balota.me/)
