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

  if(playBar.showPreview) {
    previewEl = document.querySelector(playBar.previewId);
  };

  var buttonProgress = playBar.progress;
  if(playBar.showPreview&&playBar.previewProgress!==0 && playBar.previewProgress>= playBar.progress) buttonProgress = playBar.previewProgress;

  if(playBar.barType==="horizontal")
  {
    var buttonOffset = playBar.buttonOffset.x;
    var progress = wrapperEl.offsetWidth / 100 * playBar.progress;
    var previewProgress = wrapperEl.offsetWidth / 100 * playBar.previewProgress;
    var progressMAX = wrapperEl.offsetWidth;
    var buttonMAX = wrapperEl.offsetWidth - buttonEl.offsetWidth;
    var buttonMIN = 0;

    var buttonLeftInPX = (wrapperEl.offsetWidth / 100 * buttonProgress) ;
    if(playBar.enableButtonOffset) {
      buttonLeftInPX = buttonLeftInPX + ( -buttonEl.offsetWidth - buttonOffset);
      buttonMIN += buttonOffset;
      buttonMAX += buttonOffset + buttonEl.offsetWidth;
    } else {
      buttonLeftInPX -= buttonEl.offsetWidth/2
    };

    progressEl.style.width = progress.clamp(0, progressMAX)+"px";
    buttonEl.style.left = buttonLeftInPX.clamp(buttonMIN, buttonMAX)+"px";

    if(playBar.previewProgress===0) previewProgress=0;
    if(playBar.showPreview) previewEl.style.width = previewProgress.clamp(0, progressMAX)+"px";
  }
  else if (playBar.barType==="vertical")
  {
    var buttonOffset = playBar.buttonOffset.y;
    var progress = wrapperEl.offsetHeight / 100 * playBar.progress;
    var previewProgress = wrapperEl.offsetHeight / 100 * playBar.previewProgress;
    var progressMAX = wrapperEl.offsetHeight;
    var buttonMAX = wrapperEl.offsetHeight - buttonEl.offsetHeight;
    var buttonMIN = 0;

    var buttonBottomInPX = (wrapperEl.offsetHeight / 100 * buttonProgress);
    if(playBar.enableButtonOffset) {
      buttonBottomInPX = buttonBottomInPX + ( -buttonEl.offsetHeight - buttonOffset);
      buttonMIN += buttonOffset;
      buttonMAX += buttonOffset + buttonEl.offsetWidth;
    } else {
      buttonBottomInPX -= buttonEl.offsetHeight/2
    };

    progressEl.style.height = progress.clamp(0, progressMAX)+"px";
    buttonEl.style.bottom = buttonBottomInPX.clamp(buttonMIN, buttonMAX)+"px";

    if(playBar.previewProgress===0) previewProgress=0;
    if(playBar.showPreview) previewEl.style.height = previewProgress.clamp(0, progressMAX)+"px";
  };
};

var playBar = function (id, options) {
  var pb = {
    id: id, //e.g. #playBarWrapper
    buttonId: "#playBarButton",
    progressId: "#playBarProgress",
    previewId: "#playBarProgressPreview",
    buttonOffset: {
      x: 0, //e.g. 6 OR -10 IN PX
      y: 0
    },
    enableButtonOffset: false,
    barType: "horizontal", //horizontal or vertical
    progress: 0, //in %
    previewProgress: 0, //in %,
    showPreview: false,
    setProgress: function(newProgressPercent) {
      if(typeof newProgressPercent === "number") {
        this.progress = newProgressPercent;
        updateDOM(this);
      }
    },
    setPreviewProgress: function(newProgressPercent) {
      if(typeof newProgressPercent === "number") this.previewProgress = newProgressPercent;
      updateDOM(this);
    }
  };

  if(typeof options.buttonId !== "undefined" && typeof options.buttonId === "string") pb.buttonId = options.buttonId;
  if(typeof options.progressId !== "undefined" && typeof options.progressId === "string") pb.progressId = options.progressId;
  if(typeof options.previewId !== "undefined" && typeof options.previewId === "string") pb.previewId = options.previewId;

  if(typeof options.enableButtonOffset !== "undefined" && typeof options.enableButtonOffset === "boolean") pb.enableButtonOffset = options.enableButtonOffset;
  if(typeof options.buttonOffset !== "undefined") pb.buttonOffset = options.buttonOffset;
  if(typeof options.barType !== "undefined") {
    if(options.barType === "horizontal") pb.barType = options.barType;
    if(options.barType === "vertical") pb.barType = options.barType;
    if(options.barType !== "horizontal" && options.barType !== "vertical")
      console.error("New Playbar barType is defined wrong! Has to be 'horizontal' or 'vertical'!");
  };

  if(typeof options.showPreview !== "undefined" && typeof options.showPreview === "boolean") pb.showPreview = options.showPreview;
  return pb;
};

// exports.playBar = function(id, options) {
//   return playBar(id,options);
// }
