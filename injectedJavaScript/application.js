var content = (penColor, backgroundColor, dataURL, penMinWidth, penMaxWidth, useFont, name, height, width) => `

  var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {
    var width = bodyWidth;
    var height = bodyHeight;

    var sizeSignaturePad = function () {
      var devicePixelRatio = window.devicePixelRatio || 1;
      var canvasWidth = width * devicePixelRatio;
      var canvasHeight = height * devicePixelRatio;
      signaturePadCanvas.width = canvasWidth;
      signaturePadCanvas.height = canvasHeight;
      signaturePadCanvas.getContext("2d").scale(devicePixelRatio, devicePixelRatio);
    };

    var enableSignaturePadFunctionality = function () {
      var signaturePad = new SignaturePad(signaturePadCanvas, {
        penColor: "${penColor || "black"}",
        backgroundColor: "${backgroundColor || "white"}",
        onEnd: function() { finishedStroke(signaturePad.toDataURL()); }
      });
      signaturePad.minWidth = ${penMinWidth || 1};
      signaturePad.maxWidth = ${penMaxWidth || 4};
      if ("${dataURL}") {
        signaturePad.fromDataURL("${dataURL}");
      }
    };

    sizeSignaturePad();
    enableSignaturePadFunctionality();
  };

  var bodyWidth = document.body.clientWidth * 2;
  var bodyHeight = document.body.clientHeight * 2;
  if(!bodyWidth) {
    bodyWidth = window.innerWidth ? window.innerWidth : ${width};
  }
  if(!bodyHeight) {
    bodyHeight = window.innerHeight ? window.innerHeight : ${height};
  }

  var canvasElement = document.querySelector("canvas");

  var finishedStroke = function(base64DataUrl) {
    executeNativeFunction('finishedStroke', { base64DataUrl: base64DataUrl });
  };

  if (${useFont}) {
    var context = canvasElement.getContext("2d");
    var devicePixelRatio = 1; /* window.devicePixelRatio || 1; */
    canvasElement.width = bodyWidth * devicePixelRatio;
    canvasElement.height = bodyHeight * devicePixelRatio;

    var w = bodyWidth;
    var h = bodyHeight;
    canvasElement.width = canvasElement.offsetWidth * 2;
    canvasElement.height = canvasElement.offsetHeight * 2;

    var fontToHeightRatio = 45 / 159;
    var fontSize = canvasElement.height * fontToHeightRatio;
    var textHeight = 18;
    var textWidth = -1;
    do {
      context.font = fontSize + "px SignatureFont, cursive";
      textWidth = context.measureText("${name}").width;
      fontSize = 7 * fontSize / 8;
    } while (textWidth + (w * 0.05) > w);

    var textPosition = {
      x: ((w - textWidth) / 2),
      y: ((3 * h / 4) - textHeight)
    };

    context.fillStyle = "${penColor}";
    context.fillText("${name}", textPosition.x, textPosition.y);

    /* Fire a finishedStroke function to update the state */
    setTimeout(function () {
      finishedStroke(canvasElement.toDataURL());
    }, 75);
  } else {
    showSignaturePad(canvasElement, bodyWidth / 2, bodyHeight / 2);
  }
`;

export default content;
