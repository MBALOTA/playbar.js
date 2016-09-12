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

function updateDOM (playBar) {
  var wrapperEl = document.querySelector(playBar.id);
  var wrapperPosition = getPosition(wrapperEl);

  var buttonEl = document.querySelector(playBar.buttonId);
  var progressEl = document.querySelector(playBar.progressId);
  var previewEl;

  if(playBar.showPreview) {
    previewEl = document.querySelector(playBar.previewId);
  };

  if(playBar.barType==="horizontal") {
    progressEl.style.width = playBar.progress+"%";
    var buttonLeftInPX = wrapperEl.offsetWidth / 100 * playBar.progress + playBar.buttonOffset.x;
    var buttonLeftInPR = 100.00 / wrapperEl.offsetWidth * buttonLeftInPX;
    //console.log(buttonLeftInPX+ "px, "+buttonLeftInPR+"%");

    buttonEl.style.left = buttonLeftInPR+"%";
    if(playBar.showPreview) previewEl.style.width = playBar.previewProgress+"%";

  } else if (playBar.barType==="vertical") {
    progressEl.style.height = playBar.progress+"%";
    var buttonBottomInPX = wrapperEl.offsetHeight / 100 * playBar.progress + playBar.buttonOffset.y;
    var buttonBottomInPR = 100.00 / wrapperEl.offsetHeight * buttonBottomInPX;

    buttonEl.style.bottom = buttonBottomInPR+"%";
    if(playBar.showPreview) previewEl.style.height = playBar.previewProgress+"%";
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
