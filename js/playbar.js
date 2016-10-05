//------------------------   CREDITS   ------------------------//
/*
  first contributor:
  - MATTHIAS BALOTA

  THIS PROJECT USES THE UNLICENSE, have fun!
*/
//------------------------ CREDITS END ------------------------//

//------------------------ HERE IS WHERE THE MAGIC HAPPENS ------------------------//
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
};

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function updateDOM (playBar) {
  var wrapperEl = document.querySelector(playBar.id);
  var wrapperPosition = getPosition(wrapperEl);

  var buttonEl = document.querySelector(playBar.buttonId);
  var progressEl = document.querySelector(playBar.progressId);
  var previewEl;
  var loadedEl;

  if(playBar.showPreview) previewEl = document.querySelector(playBar.previewId);
  if(playBar.showLoaded) loadedEl = document.querySelector(playBar.loadedId);

  var buttonProgress = playBar.progress;
  if(playBar.showPreview && playBar.previewProgress!==0 && playBar.moveButtonToPreview) buttonProgress = playBar.previewProgress;

  if(playBar.barType==="horizontal")
  {
    var wDivided = wrapperEl.offsetWidth / 100;

    var buttonOffset = playBar.buttonOffset.x;
    var progress = wDivided * playBar.progress;
    var previewProgress = wDivided * playBar.previewProgress;
    var loadedProgress = wDivided * playBar.loadedProgress;
    var progressMAX = wrapperEl.offsetWidth;
    var buttonMAX = wrapperEl.offsetWidth - buttonEl.offsetWidth;
    var buttonMIN = 0;

    var buttonLeftInPX = (wDivided * buttonProgress) ;
    if(playBar.enableButtonOffset) {
      buttonLeftInPX = buttonLeftInPX + ( -buttonEl.offsetWidth - buttonOffset);
      buttonMIN += buttonOffset;
      buttonMAX += buttonOffset + buttonEl.offsetWidth;
      //buttonEl.style.bottom = playBar.buttonOffset.y+"px";
    } else {
      buttonLeftInPX -= buttonEl.offsetWidth/2
    };

    progressEl.style.width = progress.clamp(0, progressMAX)+"px";
    buttonEl.style.left = buttonLeftInPX.clamp(buttonMIN, buttonMAX)+"px";

    if(playBar.previewProgress===0) previewProgress=0;
    if(playBar.showPreview) previewEl.style.width = previewProgress.clamp(0, progressMAX)+"px";
    if(playBar.showLoaded) loadedEl.style.width = loadedProgress.clamp(0, progressMAX)+"px";
  }
  else if (playBar.barType==="vertical")
  {
    var hDivided = wrapperEl.offsetHeight / 100;

    var buttonOffset = playBar.buttonOffset.y;
    var progress = hDivided * playBar.progress;
    var previewProgress = hDivided * playBar.previewProgress;
    var progressMAX = wrapperEl.offsetHeight;
    var buttonMAX = wrapperEl.offsetHeight - buttonEl.offsetHeight;
    var buttonMIN = 0;

    var buttonBottomInPX = (hDivided * buttonProgress);
    if(playBar.enableButtonOffset) {
      buttonBottomInPX = buttonBottomInPX + ( -buttonEl.offsetHeight - buttonOffset);
      buttonMIN += buttonOffset;
      buttonMAX += buttonOffset + buttonEl.offsetWidth;
      //buttonEl.style.left = playBar.buttonOffset.x+"px";
    } else {
      buttonBottomInPX -= buttonEl.offsetHeight/2
    };

    progressEl.style.height = progress.clamp(0, progressMAX)+"px";
    buttonEl.style.bottom = buttonBottomInPX.clamp(buttonMIN, buttonMAX)+"px";

    if(playBar.previewProgress===0) previewProgress=0;
    if(playBar.showPreview) previewEl.style.height = previewProgress.clamp(0, progressMAX)+"px";
    if(playBar.showLoaded) loadedEl.style.height = loadedProgress.clamp(0, progressMAX)+"px";
  };
};
//------------------------ MAGIC END ------------------------//

//------------------------ PLAYBAR ------------------------//
var playBar = function (id, options) {
  var pb = {
    id: id, //e.g. '#pb-Wrapper'
    buttonId: "#pb-Button",
    progressId: "#pb-Progress",
    previewId: "#pb-ProgressPreview",
    loadedId: "#pb-ProgressLoaded",
    moveButtonToPreview: true, //if 'true', button will move to preview progress
    enableButtonOffset: false, //buttonOffset will only work if this is set to 'true'
    buttonOffset: {
      x: 0, //e.g. 6 OR -10 IN PX
      y: 0
    },
    barType: "horizontal", //horizontal or vertical ELSE IT WON'T WORK!
    progress: 0, //in %
    previewProgress: 0, //in %,
    loadedProgress: 0, //in %
    showPreview: false, //if 'true', this will show the previewProgress
    showLoaded: false, //if 'true', this will show the loadedProgress
    setProgress: function(newProgressPercent) {
      if(typeof newProgressPercent !== "number") return;
      this.progress = newProgressPercent;
      updateDOM(this);
    },
    setPreviewProgress: function(newProgressPercent) {
      if(typeof newProgressPercent !== "number") return;
      this.previewProgress = newProgressPercent;
      updateDOM(this);
    },
    setLoadedProgress: function(newLoadedPercent) {
      if(typeof newLoadedPercent !== "number") return;
      this.loadedProgress = newLoadedPercent;
      updateDOM(this);
    }
  };

  //------------------------ Update PlayBar to custom Options ------------------------//
  if(typeof options.buttonId !== "undefined" && typeof options.buttonId === "string") pb.buttonId = options.buttonId;
  if(typeof options.progressId !== "undefined" && typeof options.progressId === "string") pb.progressId = options.progressId;
  if(typeof options.previewId !== "undefined" && typeof options.previewId === "string") pb.previewId = options.previewId;
  if(typeof options.loadedId !== "undefined" && typeof options.loadedId === "string") pb.loadedId = options.loadedId;

  if(typeof options.moveButtonToPreview !== "undefined" && typeof options.moveButtonToPreview === "boolean") pb.moveButtonToPreview = options.moveButtonToPreview;
  if(typeof options.enableButtonOffset !== "undefined" && typeof options.enableButtonOffset === "boolean") pb.enableButtonOffset = options.enableButtonOffset;
  if(typeof options.buttonOffset !== "undefined") pb.buttonOffset = options.buttonOffset;
  if(typeof options.barType !== "undefined") {
    if(options.barType === "horizontal") pb.barType = options.barType;
    if(options.barType === "vertical") pb.barType = options.barType;
    if(options.barType !== "horizontal" && options.barType !== "vertical")
      console.error("New Playbar barType is defined wrong! Has to be 'horizontal' or 'vertical'!");
  };

  if(typeof options.showPreview !== "undefined" && typeof options.showPreview === "boolean") pb.showPreview = options.showPreview;
  if(typeof options.showLoaded !== "undefined" && typeof options.showLoaded === "boolean") pb.showLoaded = options.showLoaded;
  return pb;
};
//------------------------  PLAYBAR END  ------------------------//

/*
//Used for nodejs in a small project
exports.playBar = function(id, options) {
  return playBar(id,options);
}
*/
