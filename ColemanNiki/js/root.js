    window.onload = function () {
        var visualizer = new Visualizer();
        visualizer.ini();
        visualizer.loadDefaultAndPlay(visualizer.url);
    };
var Visualizer = function () {
    this.file = null,
            this.audioContext = null,
            this.source = null,
            this.state = false,
            this.animationId = null,
            this.url ='/source/default.mp3';
};
Visualizer.prototype = {
    ini: function () {
        this._prepareAPI();
        this._addEventListner();
    },
    _prepareAPI: function () {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            console.log(e);
        }
    },
    _addEventListner: function () {
        var that = this,
                audioInput = document.getElementById('uploadedFile');
        audioInput.onchange = function () {
            if (audioInput.files.length !== 0) {
                //获取到选择的文件内容
                that.file = audioInput.files[0];
                that.fileName = that.file.name;
                that._start();
            }
            ;
        };
    },
    _start: function () {
        var that = this,
                file = this.file,
                fr = new FileReader();
        fr.onload = function (e) {
            var fileResult = e.target.result;
            var audioContext = that.audioContext;
            if (audioContext === null) {
                return;
            };
            audioContext.decodeAudioData(fileResult, function (buffer) {
                that._visualize(audioContext, buffer);
            }, function (e) {
                console.log(e);
            });
        };
        fr.onerror = function (e) {
            console.log(e);
        };
        fr.readAsArrayBuffer(file);
    },
    play:function (audio) {
        var that = this;
        this.audioContext.decodeAudioData(audio, function(buffer) {
            var audioContext = that.audioContext;
            that._visualize(audioContext,buffer);
        },function (e) {
            console.log(e);
        });
    },
    _visualize: function (audioContext, buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
                analyser = audioContext.createAnalyser(),
                that = this;
        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn;
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff;
        };
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        audioBufferSouceNode.start(0);
        audioBufferSouceNode.onended = function () {
            that._audioEnd();
        };
        audioBufferSouceNode
        //stop the previous sound if any
        if (this.source !== null) {
            this.forceStop = true;
            this.source.stop(0);
        }
        this.state = true;
        this.source = audioBufferSouceNode;
        document.getElementById('fileWrapper').style.opacity = 0.2;
        this._drawSpectrum(analyser,that);
    },
    _drawSpectrum: function (analyser) {
        var that = this,
            canvas = document.getElementById('canvas'),
                cwidth = canvas.width,
                cheight = canvas.height,
                meterWidth = 8,
                capStyle = '#fff',
                meterNum = 80,
                capYPositionArray = [],
                 ctx = canvas.getContext('2d');
        ctx.restore();
        ctx.save();
        ctx.translate(400,400);
        var drawMeter = function () {
            if (that.state === false) {
                var isToZero = true;
                for(var i = 0; i<meterNum; i++){
                    if(capYPositionArray[i]>0){
                        isToZero = false;
                        break;
                    }
                }
                if(isToZero){
                    console.log("end");
                    ctx.clearRect(-400, -400, cwidth, cheight);
                    cancelAnimationFrame(that.animationId);
                    return;
                }
                else{
                    
                    ctx.clearRect(-400, -400, cwidth, cheight);
                    for (var i = 0; i < meterNum; i++) {
                        ctx.rotate(2 * Math.PI / meterNum);
                        ctx.fillRect(-3, -350 + (--capYPositionArray[i]), meterWidth - 2, 2);
                    }
                    that.animationId = requestAnimationFrame(drawMeter);
                }
            }
            else {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var step = Math.round(array.length * 0.78 / meterNum);
                ctx.clearRect(-400, -400, cwidth, cheight);
                var YnowArray = new Array(meterNum);
                for (var t = 0; t < meterNum; t++) {
                    var x = t / 2 * 4 + t % 2;
                    if (x > meterNum) {
                        break;
                    }
                    else {
                        YnowArray[t] = x;
                    }
                }
                for (var t = meterNum - 1; t > 0; t--) {
                    var x = 2 + (meterNum - 1 - t) / 2 * 4 + (meterNum - 1 - t) % 2;
                    if (x > meterNum) {
                        break;
                    }
                    else {
                        YnowArray[t] = x;
                    }
                }
                for (var i = 0; i < meterNum; i++) {
                    var value = array[YnowArray[i] * step] * 0.6;
                    if (capYPositionArray.length < Math.round(meterNum)) {
                        capYPositionArray.push(value);
                    }
                    ctx.fillStyle = "#fff";
                    ctx.rotate(2 * Math.PI / meterNum);
                    ctx.globalAlpha = value / 180;
                    ctx.fillRect(-4, -350, meterWidth, value);
                    ctx.globalAlpha = 0.15;
                    ctx.fillStyle = capStyle;
                    if (value < capYPositionArray[i]) {
                        ctx.fillRect(-3, -350 + (--capYPositionArray[i]), meterWidth - 2, 2);
                    }
                    else {
                        if (value !== 0) {
                            ctx.fillRect(-3, -350 + value, meterWidth - 2, 2);
                            capYPositionArray[i] = value;
                        }
                    }
                }
                that.animationId = requestAnimationFrame(drawMeter);
            }
        }
       this.animationId = requestAnimationFrame(drawMeter);
    },
    _audioEnd: function () {
        this.state = false;
        document.getElementById('fileWrapper').style.opacity = 1;
        document.getElementById('uploadedFile').value = '';
    },
    loadDefaultAndPlay:function (url) {
        var that = this,
                xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            var result = xhr.response;
            that.play(result);
        }
        xhr.onerror = xhr.onabord = function () {
            console.log("加载失败了");
        }
        xhr.send();
    },
}