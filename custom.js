/*fingerprintjs*/
(function(name,context,definition){'use strict'
    if(typeof window!=='undefined'&&typeof define==='function'&&define.amd){define(definition)}else if(typeof module!=='undefined'&&module.exports){module.exports=definition()}else if(context.exports){context.exports=definition()}else{context[name]=definition()}})('Fingerprint2',this,function(){'use strict'
    var x64Add=function(m,n){m=[m[0]>>>16,m[0]&0xffff,m[1]>>>16,m[1]&0xffff]
        n=[n[0]>>>16,n[0]&0xffff,n[1]>>>16,n[1]&0xffff]
        var o=[0,0,0,0]
        o[3]+=m[3]+n[3]
        o[2]+=o[3]>>>16
        o[3]&=0xffff
        o[2]+=m[2]+n[2]
        o[1]+=o[2]>>>16
        o[2]&=0xffff
        o[1]+=m[1]+n[1]
        o[0]+=o[1]>>>16
        o[1]&=0xffff
        o[0]+=m[0]+n[0]
        o[0]&=0xffff
        return[(o[0]<<16)|o[1],(o[2]<<16)|o[3]]}
    var x64Multiply=function(m,n){m=[m[0]>>>16,m[0]&0xffff,m[1]>>>16,m[1]&0xffff]
        n=[n[0]>>>16,n[0]&0xffff,n[1]>>>16,n[1]&0xffff]
        var o=[0,0,0,0]
        o[3]+=m[3]*n[3]
        o[2]+=o[3]>>>16
        o[3]&=0xffff
        o[2]+=m[2]*n[3]
        o[1]+=o[2]>>>16
        o[2]&=0xffff
        o[2]+=m[3]*n[2]
        o[1]+=o[2]>>>16
        o[2]&=0xffff
        o[1]+=m[1]*n[3]
        o[0]+=o[1]>>>16
        o[1]&=0xffff
        o[1]+=m[2]*n[2]
        o[0]+=o[1]>>>16
        o[1]&=0xffff
        o[1]+=m[3]*n[1]
        o[0]+=o[1]>>>16
        o[1]&=0xffff
        o[0]+=(m[0]*n[3])+(m[1]*n[2])+(m[2]*n[1])+(m[3]*n[0])
        o[0]&=0xffff
        return[(o[0]<<16)|o[1],(o[2]<<16)|o[3]]}
    var x64Rotl=function(m,n){n%=64
        if(n===32){return[m[1],m[0]]}else if(n<32){return[(m[0]<<n)|(m[1]>>>(32-n)),(m[1]<<n)|(m[0]>>>(32-n))]}else{n-=32
            return[(m[1]<<n)|(m[0]>>>(32-n)),(m[0]<<n)|(m[1]>>>(32-n))]}}
    var x64LeftShift=function(m,n){n%=64
        if(n===0){return m}else if(n<32){return[(m[0]<<n)|(m[1]>>>(32-n)),m[1]<<n]}else{return[m[1]<<(n-32),0]}}
    var x64Xor=function(m,n){return[m[0]^n[0],m[1]^n[1]]}
    var x64Fmix=function(h){h=x64Xor(h,[0,h[0]>>>1])
        h=x64Multiply(h,[0xff51afd7,0xed558ccd])
        h=x64Xor(h,[0,h[0]>>>1])
        h=x64Multiply(h,[0xc4ceb9fe,0x1a85ec53])
        h=x64Xor(h,[0,h[0]>>>1])
        return h}
    var x64hash128=function(key,seed){key=key||''
        seed=seed||0
        var remainder=key.length%16
        var bytes=key.length-remainder
        var h1=[0,seed]
        var h2=[0,seed]
        var k1=[0,0]
        var k2=[0,0]
        var c1=[0x87c37b91,0x114253d5]
        var c2=[0x4cf5ad43,0x2745937f]
        for(var i=0;i<bytes;i=i+16){k1=[((key.charCodeAt(i+4)&0xff))|((key.charCodeAt(i+5)&0xff)<<8)|((key.charCodeAt(i+6)&0xff)<<16)|((key.charCodeAt(i+7)&0xff)<<24),((key.charCodeAt(i)&0xff))|((key.charCodeAt(i+1)&0xff)<<8)|((key.charCodeAt(i+2)&0xff)<<16)|((key.charCodeAt(i+3)&0xff)<<24)]
            k2=[((key.charCodeAt(i+12)&0xff))|((key.charCodeAt(i+13)&0xff)<<8)|((key.charCodeAt(i+14)&0xff)<<16)|((key.charCodeAt(i+15)&0xff)<<24),((key.charCodeAt(i+8)&0xff))|((key.charCodeAt(i+9)&0xff)<<8)|((key.charCodeAt(i+10)&0xff)<<16)|((key.charCodeAt(i+11)&0xff)<<24)]
            k1=x64Multiply(k1,c1)
            k1=x64Rotl(k1,31)
            k1=x64Multiply(k1,c2)
            h1=x64Xor(h1,k1)
            h1=x64Rotl(h1,27)
            h1=x64Add(h1,h2)
            h1=x64Add(x64Multiply(h1,[0,5]),[0,0x52dce729])
            k2=x64Multiply(k2,c2)
            k2=x64Rotl(k2,33)
            k2=x64Multiply(k2,c1)
            h2=x64Xor(h2,k2)
            h2=x64Rotl(h2,31)
            h2=x64Add(h2,h1)
            h2=x64Add(x64Multiply(h2,[0,5]),[0,0x38495ab5])}
        k1=[0,0]
        k2=[0,0]
        switch(remainder){case 15:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+14)],48))
            case 14:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+13)],40))
            case 13:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+12)],32))
            case 12:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+11)],24))
            case 11:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+10)],16))
            case 10:k2=x64Xor(k2,x64LeftShift([0,key.charCodeAt(i+9)],8))
            case 9:k2=x64Xor(k2,[0,key.charCodeAt(i+8)])
                k2=x64Multiply(k2,c2)
                k2=x64Rotl(k2,33)
                k2=x64Multiply(k2,c1)
                h2=x64Xor(h2,k2)
            case 8:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+7)],56))
            case 7:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+6)],48))
            case 6:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+5)],40))
            case 5:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+4)],32))
            case 4:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+3)],24))
            case 3:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+2)],16))
            case 2:k1=x64Xor(k1,x64LeftShift([0,key.charCodeAt(i+1)],8))
            case 1:k1=x64Xor(k1,[0,key.charCodeAt(i)])
                k1=x64Multiply(k1,c1)
                k1=x64Rotl(k1,31)
                k1=x64Multiply(k1,c2)
                h1=x64Xor(h1,k1)}
        h1=x64Xor(h1,[0,key.length])
        h2=x64Xor(h2,[0,key.length])
        h1=x64Add(h1,h2)
        h2=x64Add(h2,h1)
        h1=x64Fmix(h1)
        h2=x64Fmix(h2)
        h1=x64Add(h1,h2)
        h2=x64Add(h2,h1)
        return('00000000'+(h1[0]>>>0).toString(16)).slice(-8)+('00000000'+(h1[1]>>>0).toString(16)).slice(-8)+('00000000'+(h2[0]>>>0).toString(16)).slice(-8)+('00000000'+(h2[1]>>>0).toString(16)).slice(-8)}
    var defaultOptions={preprocessor:null,audio:{timeout:1000,excludeIOS11:true},fonts:{swfContainerId:'fingerprintjs2',swfPath:'flash/compiled/FontList.swf',userDefinedFonts:[],extendedJsFonts:false},screen:{detectScreenOrientation:true},plugins:{sortPluginsFor:[/palemoon/i],excludeIE:false},extraComponents:[],excludes:{'enumerateDevices':true,'pixelRatio':true,'doNotTrack':true,'fontsFlash':true},NOT_AVAILABLE:'not available',ERROR:'error',EXCLUDED:'excluded'}
    var each=function(obj,iterator){if(Array.prototype.forEach&&obj.forEach===Array.prototype.forEach){obj.forEach(iterator)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++){iterator(obj[i],i,obj)}}else{for(var key in obj){if(obj.hasOwnProperty(key)){iterator(obj[key],key,obj)}}}}
    var map=function(obj,iterator){var results=[]
        if(obj==null){return results}
        if(Array.prototype.map&&obj.map===Array.prototype.map){return obj.map(iterator)}
        each(obj,function(value,index,list){results.push(iterator(value,index,list))})
        return results}
    var extendSoft=function(target,source){if(source==null){return target}
        var value
        var key
        for(key in source){value=source[key]
            if(value!=null&&!(Object.prototype.hasOwnProperty.call(target,key))){target[key]=value}}
        return target}
    var enumerateDevicesKey=function(done,options){if(!isEnumerateDevicesSupported()){return done(options.NOT_AVAILABLE)}
        navigator.mediaDevices.enumerateDevices().then(function(devices){done(devices.map(function(device){return'id='+device.deviceId+';gid='+device.groupId+';'+device.kind+';'+device.label}))}).catch(function(error){done(error)})}
    var isEnumerateDevicesSupported=function(){return(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}
    var audioKey=function(done,options){var audioOptions=options.audio
        if(audioOptions.excludeIOS11&&navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)){return done(options.EXCLUDED)}
        var AudioContext=window.OfflineAudioContext||window.webkitOfflineAudioContext
        if(AudioContext==null){return done(options.NOT_AVAILABLE)}
        var context=new AudioContext(1,44100,44100)
        var oscillator=context.createOscillator()
        oscillator.type='triangle'
        oscillator.frequency.setValueAtTime(10000,context.currentTime)
        var compressor=context.createDynamicsCompressor()
        each([['threshold',-50],['knee',40],['ratio',12],['reduction',-20],['attack',0],['release',0.25]],function(item){if(compressor[item[0]]!==undefined&&typeof compressor[item[0]].setValueAtTime==='function'){compressor[item[0]].setValueAtTime(item[1],context.currentTime)}})
        oscillator.connect(compressor)
        compressor.connect(context.destination)
        oscillator.start(0)
        context.startRendering()
        var audioTimeoutId=setTimeout(function(){console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "'+navigator.userAgent+'".')
            context.oncomplete=function(){}
            context=null
            return done('audioTimeout')},audioOptions.timeout)
        context.oncomplete=function(event){var fingerprint
            try{clearTimeout(audioTimeoutId)
                fingerprint=event.renderedBuffer.getChannelData(0).slice(4500,5000).reduce(function(acc,val){return acc+Math.abs(val)},0).toString()
                oscillator.disconnect()
                compressor.disconnect()}catch(error){done(error)
                return}
            done(fingerprint)}}
    var UserAgent=function(done){done(navigator.userAgent)}
    var languageKey=function(done,options){done(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||options.NOT_AVAILABLE)}
    var colorDepthKey=function(done,options){done(window.screen.colorDepth||options.NOT_AVAILABLE)}
    var deviceMemoryKey=function(done,options){done(navigator.deviceMemory||options.NOT_AVAILABLE)}
    var pixelRatioKey=function(done,options){done(window.devicePixelRatio||options.NOT_AVAILABLE)}
    var screenResolutionKey=function(done,options){done(getScreenResolution(options))}
    var getScreenResolution=function(options){var resolution=[window.screen.width,window.screen.height]
        if(options.screen.detectScreenOrientation){resolution.sort().reverse()}
        return resolution}
    var availableScreenResolutionKey=function(done,options){done(getAvailableScreenResolution(options))}
    var getAvailableScreenResolution=function(options){if(window.screen.availWidth&&window.screen.availHeight){var available=[window.screen.availHeight,window.screen.availWidth]
        if(options.screen.detectScreenOrientation){available.sort().reverse()}
        return available}
        return options.NOT_AVAILABLE}
    var timezoneOffset=function(done){done(new Date().getTimezoneOffset())}
    var timezone=function(done,options){if(window.Intl&&window.Intl.DateTimeFormat){done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
        return}
        done(options.NOT_AVAILABLE)}
    var sessionStorageKey=function(done,options){done(hasSessionStorage(options))}
    var localStorageKey=function(done,options){done(hasLocalStorage(options))}
    var indexedDbKey=function(done,options){done(hasIndexedDB(options))}
    var addBehaviorKey=function(done){done(!!(document.body&&document.body.addBehavior))}
    var openDatabaseKey=function(done){done(!!window.openDatabase)}
    var cpuClassKey=function(done,options){done(getNavigatorCpuClass(options))}
    var platformKey=function(done,options){done(getNavigatorPlatform(options))}
    var doNotTrackKey=function(done,options){done(getDoNotTrack(options))}
    var canvasKey=function(done,options){if(isCanvasSupported()){done(getCanvasFp(options))
        return}
        done(options.NOT_AVAILABLE)}
    var webglKey=function(done,options){if(isWebGlSupported()){done(getWebglFp())
        return}
        done(options.NOT_AVAILABLE)}
    var webglVendorAndRendererKey=function(done){if(isWebGlSupported()){done(getWebglVendorAndRenderer())
        return}
        done()}
    var adBlockKey=function(done){done(getAdBlock())}
    var hasLiedLanguagesKey=function(done){done(getHasLiedLanguages())}
    var hasLiedResolutionKey=function(done){done(getHasLiedResolution())}
    var hasLiedOsKey=function(done){done(getHasLiedOs())}
    var hasLiedBrowserKey=function(done){done(getHasLiedBrowser())}
    var flashFontsKey=function(done,options){if(!hasSwfObjectLoaded()){return done('swf object not loaded')}
        if(!hasMinFlashInstalled()){return done('flash not installed')}
        if(!options.fonts.swfPath){return done('missing options.fonts.swfPath')}
        loadSwfAndDetectFonts(function(fonts){done(fonts)},options)}
    var jsFontsKey=function(done,options){var baseFonts=['monospace','sans-serif','serif']
        var fontList=['Andale Mono','Arial','Arial Black','Arial Hebrew','Arial MT','Arial Narrow','Arial Rounded MT Bold','Arial Unicode MS','Bitstream Vera Sans Mono','Book Antiqua','Bookman Old Style','Calibri','Cambria','Cambria Math','Century','Century Gothic','Century Schoolbook','Comic Sans','Comic Sans MS','Consolas','Courier','Courier New','Geneva','Georgia','Helvetica','Helvetica Neue','Impact','Lucida Bright','Lucida Calligraphy','Lucida Console','Lucida Fax','LUCIDA GRANDE','Lucida Handwriting','Lucida Sans','Lucida Sans Typewriter','Lucida Sans Unicode','Microsoft Sans Serif','Monaco','Monotype Corsiva','MS Gothic','MS Outlook','MS PGothic','MS Reference Sans Serif','MS Sans Serif','MS Serif','MYRIAD','MYRIAD PRO','Palatino','Palatino Linotype','Segoe Print','Segoe Script','Segoe UI','Segoe UI Light','Segoe UI Semibold','Segoe UI Symbol','Tahoma','Times','Times New Roman','Times New Roman PS','Trebuchet MS','Verdana','Wingdings','Wingdings 2','Wingdings 3']
        if(options.fonts.extendedJsFonts){var extendedFontList=['Abadi MT Condensed Light','Academy Engraved LET','ADOBE CASLON PRO','Adobe Garamond','ADOBE GARAMOND PRO','Agency FB','Aharoni','Albertus Extra Bold','Albertus Medium','Algerian','Amazone BT','American Typewriter','American Typewriter Condensed','AmerType Md BT','Andalus','Angsana New','AngsanaUPC','Antique Olive','Aparajita','Apple Chancery','Apple Color Emoji','Apple SD Gothic Neo','Arabic Typesetting','ARCHER','ARNO PRO','Arrus BT','Aurora Cn BT','AvantGarde Bk BT','AvantGarde Md BT','AVENIR','Ayuthaya','Bandy','Bangla Sangam MN','Bank Gothic','BankGothic Md BT','Baskerville','Baskerville Old Face','Batang','BatangChe','Bauer Bodoni','Bauhaus 93','Bazooka','Bell MT','Bembo','Benguiat Bk BT','Berlin Sans FB','Berlin Sans FB Demi','Bernard MT Condensed','BernhardFashion BT','BernhardMod BT','Big Caslon','BinnerD','Blackadder ITC','BlairMdITC TT','Bodoni 72','Bodoni 72 Oldstyle','Bodoni 72 Smallcaps','Bodoni MT','Bodoni MT Black','Bodoni MT Condensed','Bodoni MT Poster Compressed','Bookshelf Symbol 7','Boulder','Bradley Hand','Bradley Hand ITC','Bremen Bd BT','Britannic Bold','Broadway','Browallia New','BrowalliaUPC','Brush Script MT','Californian FB','Calisto MT','Calligrapher','Candara','CaslonOpnface BT','Castellar','Centaur','Cezanne','CG Omega','CG Times','Chalkboard','Chalkboard SE','Chalkduster','Charlesworth','Charter Bd BT','Charter BT','Chaucer','ChelthmITC Bk BT','Chiller','Clarendon','Clarendon Condensed','CloisterBlack BT','Cochin','Colonna MT','Constantia','Cooper Black','Copperplate','Copperplate Gothic','Copperplate Gothic Bold','Copperplate Gothic Light','CopperplGoth Bd BT','Corbel','Cordia New','CordiaUPC','Cornerstone','Coronet','Cuckoo','Curlz MT','DaunPenh','Dauphin','David','DB LCD Temp','DELICIOUS','Denmark','DFKai-SB','Didot','DilleniaUPC','DIN','DokChampa','Dotum','DotumChe','Ebrima','Edwardian Script ITC','Elephant','English 111 Vivace BT','Engravers MT','EngraversGothic BT','Eras Bold ITC','Eras Demi ITC','Eras Light ITC','Eras Medium ITC','EucrosiaUPC','Euphemia','Euphemia UCAS','EUROSTILE','Exotc350 Bd BT','FangSong','Felix Titling','Fixedsys','FONTIN','Footlight MT Light','Forte','FrankRuehl','Fransiscan','Freefrm721 Blk BT','FreesiaUPC','Freestyle Script','French Script MT','FrnkGothITC Bk BT','Fruitger','FRUTIGER','Futura','Futura Bk BT','Futura Lt BT','Futura Md BT','Futura ZBlk BT','FuturaBlack BT','Gabriola','Galliard BT','Gautami','Geeza Pro','Geometr231 BT','Geometr231 Hv BT','Geometr231 Lt BT','GeoSlab 703 Lt BT','GeoSlab 703 XBd BT','Gigi','Gill Sans','Gill Sans MT','Gill Sans MT Condensed','Gill Sans MT Ext Condensed Bold','Gill Sans Ultra Bold','Gill Sans Ultra Bold Condensed','Gisha','Gloucester MT Extra Condensed','GOTHAM','GOTHAM BOLD','Goudy Old Style','Goudy Stout','GoudyHandtooled BT','GoudyOLSt BT','Gujarati Sangam MN','Gulim','GulimChe','Gungsuh','GungsuhChe','Gurmukhi MN','Haettenschweiler','Harlow Solid Italic','Harrington','Heather','Heiti SC','Heiti TC','HELV','Herald','High Tower Text','Hiragino Kaku Gothic ProN','Hiragino Mincho ProN','Hoefler Text','Humanst 521 Cn BT','Humanst521 BT','Humanst521 Lt BT','Imprint MT Shadow','Incised901 Bd BT','Incised901 BT','Incised901 Lt BT','INCONSOLATA','Informal Roman','Informal011 BT','INTERSTATE','IrisUPC','Iskoola Pota','JasmineUPC','Jazz LET','Jenson','Jester','Jokerman','Juice ITC','Kabel Bk BT','Kabel Ult BT','Kailasa','KaiTi','Kalinga','Kannada Sangam MN','Kartika','Kaufmann Bd BT','Kaufmann BT','Khmer UI','KodchiangUPC','Kokila','Korinna BT','Kristen ITC','Krungthep','Kunstler Script','Lao UI','Latha','Leelawadee','Letter Gothic','Levenim MT','LilyUPC','Lithograph','Lithograph Light','Long Island','Lydian BT','Magneto','Maiandra GD','Malayalam Sangam MN','Malgun Gothic','Mangal','Marigold','Marion','Marker Felt','Market','Marlett','Matisse ITC','Matura MT Script Capitals','Meiryo','Meiryo UI','Microsoft Himalaya','Microsoft JhengHei','Microsoft New Tai Lue','Microsoft PhagsPa','Microsoft Tai Le','Microsoft Uighur','Microsoft YaHei','Microsoft Yi Baiti','MingLiU','MingLiU_HKSCS','MingLiU_HKSCS-ExtB','MingLiU-ExtB','Minion','Minion Pro','Miriam','Miriam Fixed','Mistral','Modern','Modern No. 20','Mona Lisa Solid ITC TT','Mongolian Baiti','MONO','MoolBoran','Mrs Eaves','MS LineDraw','MS Mincho','MS PMincho','MS Reference Specialty','MS UI Gothic','MT Extra','MUSEO','MV Boli','Nadeem','Narkisim','NEVIS','News Gothic','News GothicMT','NewsGoth BT','Niagara Engraved','Niagara Solid','Noteworthy','NSimSun','Nyala','OCR A Extended','Old Century','Old English Text MT','Onyx','Onyx BT','OPTIMA','Oriya Sangam MN','OSAKA','OzHandicraft BT','Palace Script MT','Papyrus','Parchment','Party LET','Pegasus','Perpetua','Perpetua Titling MT','PetitaBold','Pickwick','Plantagenet Cherokee','Playbill','PMingLiU','PMingLiU-ExtB','Poor Richard','Poster','PosterBodoni BT','PRINCETOWN LET','Pristina','PTBarnum BT','Pythagoras','Raavi','Rage Italic','Ravie','Ribbon131 Bd BT','Rockwell','Rockwell Condensed','Rockwell Extra Bold','Rod','Roman','Sakkal Majalla','Santa Fe LET','Savoye LET','Sceptre','Script','Script MT Bold','SCRIPTINA','Serifa','Serifa BT','Serifa Th BT','ShelleyVolante BT','Sherwood','Shonar Bangla','Showcard Gothic','Shruti','Signboard','SILKSCREEN','SimHei','Simplified Arabic','Simplified Arabic Fixed','SimSun','SimSun-ExtB','Sinhala Sangam MN','Sketch Rockwell','Skia','Small Fonts','Snap ITC','Snell Roundhand','Socket','Souvenir Lt BT','Staccato222 BT','Steamer','Stencil','Storybook','Styllo','Subway','Swis721 BlkEx BT','Swiss911 XCm BT','Sylfaen','Synchro LET','System','Tamil Sangam MN','Technical','Teletype','Telugu Sangam MN','Tempus Sans ITC','Terminal','Thonburi','Traditional Arabic','Trajan','TRAJAN PRO','Tristan','Tubular','Tunga','Tw Cen MT','Tw Cen MT Condensed','Tw Cen MT Condensed Extra Bold','TypoUpright BT','Unicorn','Univers','Univers CE 55 Medium','Univers Condensed','Utsaah','Vagabond','Vani','Vijaya','Viner Hand ITC','VisualUI','Vivaldi','Vladimir Script','Vrinda','Westminster','WHITNEY','Wide Latin','ZapfEllipt BT','ZapfHumnst BT','ZapfHumnst Dm BT','Zapfino','Zurich BlkEx BT','Zurich Ex BT','ZWAdobeF']
            fontList=fontList.concat(extendedFontList)}
        fontList=fontList.concat(options.fonts.userDefinedFonts)
        fontList=fontList.filter(function(font,position){return fontList.indexOf(font)===position})
        var testString='mmmmmmmmmmlli'
        var testSize='72px'
        var h=document.getElementsByTagName('body')[0]
        var baseFontsDiv=document.createElement('div')
        var fontsDiv=document.createElement('div')
        var defaultWidth={}
        var defaultHeight={}
        var createSpan=function(){var s=document.createElement('span')
            s.style.position='absolute'
            s.style.left='-9999px'
            s.style.fontSize=testSize
            s.style.fontStyle='normal'
            s.style.fontWeight='normal'
            s.style.letterSpacing='normal'
            s.style.lineBreak='auto'
            s.style.lineHeight='normal'
            s.style.textTransform='none'
            s.style.textAlign='left'
            s.style.textDecoration='none'
            s.style.textShadow='none'
            s.style.whiteSpace='normal'
            s.style.wordBreak='normal'
            s.style.wordSpacing='normal'
            s.innerHTML=testString
            return s}
        var createSpanWithFonts=function(fontToDetect,baseFont){var s=createSpan()
            s.style.fontFamily="'"+fontToDetect+"',"+baseFont
            return s}
        var initializeBaseFontsSpans=function(){var spans=[]
            for(var index=0,length=baseFonts.length;index<length;index++){var s=createSpan()
                s.style.fontFamily=baseFonts[index]
                baseFontsDiv.appendChild(s)
                spans.push(s)}
            return spans}
        var initializeFontsSpans=function(){var spans={}
            for(var i=0,l=fontList.length;i<l;i++){var fontSpans=[]
                for(var j=0,numDefaultFonts=baseFonts.length;j<numDefaultFonts;j++){var s=createSpanWithFonts(fontList[i],baseFonts[j])
                    fontsDiv.appendChild(s)
                    fontSpans.push(s)}
                spans[fontList[i]]=fontSpans}
            return spans}
        var isFontAvailable=function(fontSpans){var detected=false
            for(var i=0;i<baseFonts.length;i++){detected=(fontSpans[i].offsetWidth!==defaultWidth[baseFonts[i]]||fontSpans[i].offsetHeight!==defaultHeight[baseFonts[i]])
                if(detected){return detected}}
            return detected}
        var baseFontsSpans=initializeBaseFontsSpans()
        h.appendChild(baseFontsDiv)
        for(var index=0,length=baseFonts.length;index<length;index++){defaultWidth[baseFonts[index]]=baseFontsSpans[index].offsetWidth
            defaultHeight[baseFonts[index]]=baseFontsSpans[index].offsetHeight}
        var fontsSpans=initializeFontsSpans()
        h.appendChild(fontsDiv)
        var available=[]
        for(var i=0,l=fontList.length;i<l;i++){if(isFontAvailable(fontsSpans[fontList[i]])){available.push(fontList[i])}}
        h.removeChild(fontsDiv)
        h.removeChild(baseFontsDiv)
        done(available)}
    var pluginsComponent=function(done,options){if(isIE()){if(!options.plugins.excludeIE){done(getIEPlugins(options))}else{done(options.EXCLUDED)}}else{done(getRegularPlugins(options))}}
    var getRegularPlugins=function(options){if(navigator.plugins==null){return options.NOT_AVAILABLE}
        var plugins=[]
        for(var i=0,l=navigator.plugins.length;i<l;i++){if(navigator.plugins[i]){plugins.push(navigator.plugins[i])}}
        if(pluginsShouldBeSorted(options)){plugins=plugins.sort(function(a,b){if(a.name>b.name){return 1}
            if(a.name<b.name){return-1}
            return 0})}
        return map(plugins,function(p){var mimeTypes=map(p,function(mt){return[mt.type,mt.suffixes]})
            return[p.name,p.description,mimeTypes]})}
    var getIEPlugins=function(options){var result=[]
        if((Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(window,'ActiveXObject'))||('ActiveXObject'in window)){var names=['AcroPDF.PDF','Adodb.Stream','AgControl.AgControl','DevalVRXCtrl.DevalVRXCtrl.1','MacromediaFlashPaper.MacromediaFlashPaper','Msxml2.DOMDocument','Msxml2.XMLHTTP','PDF.PdfCtrl','QuickTime.QuickTime','QuickTimeCheckObject.QuickTimeCheck.1','RealPlayer','RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)','RealVideo.RealVideo(tm) ActiveX Control (32-bit)','Scripting.Dictionary','SWCtl.SWCtl','Shell.UIHelper','ShockwaveFlash.ShockwaveFlash','Skype.Detection','TDCCtl.TDCCtl','WMPlayer.OCX','rmocx.RealPlayer G2 Control','rmocx.RealPlayer G2 Control.1']
            result=map(names,function(name){try{new window.ActiveXObject(name)
                return name}catch(e){return options.ERROR}})}else{result.push(options.NOT_AVAILABLE)}
        if(navigator.plugins){result=result.concat(getRegularPlugins(options))}
        return result}
    var pluginsShouldBeSorted=function(options){var should=false
        for(var i=0,l=options.plugins.sortPluginsFor.length;i<l;i++){var re=options.plugins.sortPluginsFor[i]
            if(navigator.userAgent.match(re)){should=true
                break}}
        return should}
    var touchSupportKey=function(done){done(getTouchSupport())}
    var hardwareConcurrencyKey=function(done,options){done(getHardwareConcurrency(options))}
    var hasSessionStorage=function(options){try{return!!window.sessionStorage}catch(e){return options.ERROR}}
    var hasLocalStorage=function(options){try{return!!window.localStorage}catch(e){return options.ERROR}}
    var hasIndexedDB=function(options){try{return!!window.indexedDB}catch(e){return options.ERROR}}
    var getHardwareConcurrency=function(options){if(navigator.hardwareConcurrency){return navigator.hardwareConcurrency}
        return options.NOT_AVAILABLE}
    var getNavigatorCpuClass=function(options){return navigator.cpuClass||options.NOT_AVAILABLE}
    var getNavigatorPlatform=function(options){if(navigator.platform){return navigator.platform}else{return options.NOT_AVAILABLE}}
    var getDoNotTrack=function(options){if(navigator.doNotTrack){return navigator.doNotTrack}else if(navigator.msDoNotTrack){return navigator.msDoNotTrack}else if(window.doNotTrack){return window.doNotTrack}else{return options.NOT_AVAILABLE}}
    var getTouchSupport=function(){var maxTouchPoints=0
        var touchEvent
        if(typeof navigator.maxTouchPoints!=='undefined'){maxTouchPoints=navigator.maxTouchPoints}else if(typeof navigator.msMaxTouchPoints!=='undefined'){maxTouchPoints=navigator.msMaxTouchPoints}
        try{document.createEvent('TouchEvent')
            touchEvent=true}catch(_){touchEvent=false}
        var touchStart='ontouchstart'in window
        return[maxTouchPoints,touchEvent,touchStart]}
    var getCanvasFp=function(options){var result=[]
        var canvas=document.createElement('canvas')
        canvas.width=2000
        canvas.height=200
        canvas.style.display='inline'
        var ctx=canvas.getContext('2d')
        ctx.rect(0,0,10,10)
        ctx.rect(2,2,6,6)
        result.push('canvas winding:'+((ctx.isPointInPath(5,5,'evenodd')===false)?'yes':'no'))
        ctx.textBaseline='alphabetic'
        ctx.fillStyle='#f60'
        ctx.fillRect(125,1,62,20)
        ctx.fillStyle='#069'
        if(options.dontUseFakeFontInCanvas){ctx.font='11pt Arial'}else{ctx.font='11pt no-real-font-123'}
        ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03',2,15)
        ctx.fillStyle='rgba(102, 204, 0, 0.2)'
        ctx.font='18pt Arial'
        ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03',4,45)
        ctx.globalCompositeOperation='multiply'
        ctx.fillStyle='rgb(255,0,255)'
        ctx.beginPath()
        ctx.arc(50,50,50,0,Math.PI*2,true)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle='rgb(0,255,255)'
        ctx.beginPath()
        ctx.arc(100,50,50,0,Math.PI*2,true)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle='rgb(255,255,0)'
        ctx.beginPath()
        ctx.arc(75,100,50,0,Math.PI*2,true)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle='rgb(255,0,255)'
        ctx.arc(75,75,75,0,Math.PI*2,true)
        ctx.arc(75,75,25,0,Math.PI*2,true)
        ctx.fill('evenodd')
        if(canvas.toDataURL){result.push('canvas fp:'+canvas.toDataURL())}
        return result}
    var getWebglFp=function(){var gl
        var fa2s=function(fa){gl.clearColor(0.0,0.0,0.0,1.0)
            gl.enable(gl.DEPTH_TEST)
            gl.depthFunc(gl.LEQUAL)
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
            return'['+fa[0]+', '+fa[1]+']'}
        var maxAnisotropy=function(gl){var ext=gl.getExtension('EXT_texture_filter_anisotropic')||gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')||gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
            if(ext){var anisotropy=gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                if(anisotropy===0){anisotropy=2}
                return anisotropy}else{return null}}
        gl=getWebglCanvas()
        if(!gl){return null}
        var result=[]
        var vShaderTemplate='attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
        var fShaderTemplate='precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
        var vertexPosBuffer=gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexPosBuffer)
        var vertices=new Float32Array([-0.2,-0.9,0,0.4,-0.26,0,0,0.732134444,0])
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW)
        vertexPosBuffer.itemSize=3
        vertexPosBuffer.numItems=3
        var program=gl.createProgram()
        var vshader=gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vshader,vShaderTemplate)
        gl.compileShader(vshader)
        var fshader=gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fshader,fShaderTemplate)
        gl.compileShader(fshader)
        gl.attachShader(program,vshader)
        gl.attachShader(program,fshader)
        gl.linkProgram(program)
        gl.useProgram(program)
        program.vertexPosAttrib=gl.getAttribLocation(program,'attrVertex')
        program.offsetUniform=gl.getUniformLocation(program,'uniformOffset')
        gl.enableVertexAttribArray(program.vertexPosArray)
        gl.vertexAttribPointer(program.vertexPosAttrib,vertexPosBuffer.itemSize,gl.FLOAT,!1,0,0)
        gl.uniform2f(program.offsetUniform,1,1)
        gl.drawArrays(gl.TRIANGLE_STRIP,0,vertexPosBuffer.numItems)
        try{result.push(gl.canvas.toDataURL())}catch(e){}
        result.push('extensions:'+(gl.getSupportedExtensions()||[]).join(';'))
        result.push('webgl aliased line width range:'+fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
        result.push('webgl aliased point size range:'+fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
        result.push('webgl alpha bits:'+gl.getParameter(gl.ALPHA_BITS))
        result.push('webgl antialiasing:'+(gl.getContextAttributes().antialias?'yes':'no'))
        result.push('webgl blue bits:'+gl.getParameter(gl.BLUE_BITS))
        result.push('webgl depth bits:'+gl.getParameter(gl.DEPTH_BITS))
        result.push('webgl green bits:'+gl.getParameter(gl.GREEN_BITS))
        result.push('webgl max anisotropy:'+maxAnisotropy(gl))
        result.push('webgl max combined texture image units:'+gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
        result.push('webgl max cube map texture size:'+gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
        result.push('webgl max fragment uniform vectors:'+gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
        result.push('webgl max render buffer size:'+gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
        result.push('webgl max texture image units:'+gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
        result.push('webgl max texture size:'+gl.getParameter(gl.MAX_TEXTURE_SIZE))
        result.push('webgl max varying vectors:'+gl.getParameter(gl.MAX_VARYING_VECTORS))
        result.push('webgl max vertex attribs:'+gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
        result.push('webgl max vertex texture image units:'+gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
        result.push('webgl max vertex uniform vectors:'+gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
        result.push('webgl max viewport dims:'+fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
        result.push('webgl red bits:'+gl.getParameter(gl.RED_BITS))
        result.push('webgl renderer:'+gl.getParameter(gl.RENDERER))
        result.push('webgl shading language version:'+gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
        result.push('webgl stencil bits:'+gl.getParameter(gl.STENCIL_BITS))
        result.push('webgl vendor:'+gl.getParameter(gl.VENDOR))
        result.push('webgl version:'+gl.getParameter(gl.VERSION))
        try{var extensionDebugRendererInfo=gl.getExtension('WEBGL_debug_renderer_info')
            if(extensionDebugRendererInfo){result.push('webgl unmasked vendor:'+gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
                result.push('webgl unmasked renderer:'+gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))}}catch(e){}
        if(!gl.getShaderPrecisionFormat){return result}
        each(['FLOAT','INT'],function(numType){each(['VERTEX','FRAGMENT'],function(shader){each(['HIGH','MEDIUM','LOW'],function(numSize){each(['precision','rangeMin','rangeMax'],function(key){var format=gl.getShaderPrecisionFormat(gl[shader+'_SHADER'],gl[numSize+'_'+numType])[key]
            if(key!=='precision'){key='precision '+key}
            var line=['webgl ',shader.toLowerCase(),' shader ',numSize.toLowerCase(),' ',numType.toLowerCase(),' ',key,':',format].join('')
            result.push(line)})})})})
        return result}
    var getWebglVendorAndRenderer=function(){try{var glContext=getWebglCanvas()
        var extensionDebugRendererInfo=glContext.getExtension('WEBGL_debug_renderer_info')
        return glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL)+'~'+glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL)}catch(e){return null}}
    var getAdBlock=function(){var ads=document.createElement('div')
        ads.innerHTML='&nbsp;'
        ads.className='adsbox'
        var result=false
        try{document.body.appendChild(ads)
            result=document.getElementsByClassName('adsbox')[0].offsetHeight===0
            document.body.removeChild(ads)}catch(e){result=false}
        return result}
    var getHasLiedLanguages=function(){if(typeof navigator.languages!=='undefined'){try{var firstLanguages=navigator.languages[0].substr(0,2)
        if(firstLanguages!==navigator.language.substr(0,2)){return true}}catch(err){return true}}
        return false}
    var getHasLiedResolution=function(){return window.screen.width<window.screen.availWidth||window.screen.height<window.screen.availHeight}
    var getHasLiedOs=function(){var userAgent=navigator.userAgent.toLowerCase()
        var oscpu=navigator.oscpu
        var platform=navigator.platform.toLowerCase()
        var os
        if(userAgent.indexOf('windows phone')>=0){os='Windows Phone'}else if(userAgent.indexOf('win')>=0){os='Windows'}else if(userAgent.indexOf('android')>=0){os='Android'}else if(userAgent.indexOf('linux')>=0){os='Linux'}else if(userAgent.indexOf('iphone')>=0||userAgent.indexOf('ipad')>=0){os='iOS'}else if(userAgent.indexOf('mac')>=0){os='Mac'}else{os='Other'}
        var mobileDevice=(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0))
        if(mobileDevice&&os!=='Windows Phone'&&os!=='Android'&&os!=='iOS'&&os!=='Other'){return true}
        if(typeof oscpu!=='undefined'){oscpu=oscpu.toLowerCase()
            if(oscpu.indexOf('win')>=0&&os!=='Windows'&&os!=='Windows Phone'){return true}else if(oscpu.indexOf('linux')>=0&&os!=='Linux'&&os!=='Android'){return true}else if(oscpu.indexOf('mac')>=0&&os!=='Mac'&&os!=='iOS'){return true}else if((oscpu.indexOf('win')===-1&&oscpu.indexOf('linux')===-1&&oscpu.indexOf('mac')===-1)!==(os==='Other')){return true}}
        if(platform.indexOf('win')>=0&&os!=='Windows'&&os!=='Windows Phone'){return true}else if((platform.indexOf('linux')>=0||platform.indexOf('android')>=0||platform.indexOf('pike')>=0)&&os!=='Linux'&&os!=='Android'){return true}else if((platform.indexOf('mac')>=0||platform.indexOf('ipad')>=0||platform.indexOf('ipod')>=0||platform.indexOf('iphone')>=0)&&os!=='Mac'&&os!=='iOS'){return true}else if((platform.indexOf('win')===-1&&platform.indexOf('linux')===-1&&platform.indexOf('mac')===-1)!==(os==='Other')){return true}
        return typeof navigator.plugins==='undefined'&&os!=='Windows'&&os!=='Windows Phone'}
    var getHasLiedBrowser=function(){var userAgent=navigator.userAgent.toLowerCase()
        var productSub=navigator.productSub
        var browser
        if(userAgent.indexOf('firefox')>=0){browser='Firefox'}else if(userAgent.indexOf('opera')>=0||userAgent.indexOf('opr')>=0){browser='Opera'}else if(userAgent.indexOf('chrome')>=0){browser='Chrome'}else if(userAgent.indexOf('safari')>=0){browser='Safari'}else if(userAgent.indexOf('trident')>=0){browser='Internet Explorer'}else{browser='Other'}
        if((browser==='Chrome'||browser==='Safari'||browser==='Opera')&&productSub!=='20030107'){return true}
        var tempRes=eval.toString().length
        if(tempRes===37&&browser!=='Safari'&&browser!=='Firefox'&&browser!=='Other'){return true}else if(tempRes===39&&browser!=='Internet Explorer'&&browser!=='Other'){return true}else if(tempRes===33&&browser!=='Chrome'&&browser!=='Opera'&&browser!=='Other'){return true}
        var errFirefox
        try{throw'a'}catch(err){try{err.toSource()
            errFirefox=true}catch(errOfErr){errFirefox=false}}
        return errFirefox&&browser!=='Firefox'&&browser!=='Other'}
    var isCanvasSupported=function(){var elem=document.createElement('canvas')
        return!!(elem.getContext&&elem.getContext('2d'))}
    var isWebGlSupported=function(){if(!isCanvasSupported()){return false}
        var glContext=getWebglCanvas()
        return!!window.WebGLRenderingContext&&!!glContext}
    var isIE=function(){if(navigator.appName==='Microsoft Internet Explorer'){return true}else if(navigator.appName==='Netscape'&&/Trident/.test(navigator.userAgent)){return true}
        return false}
    var hasSwfObjectLoaded=function(){return typeof window.swfobject!=='undefined'}
    var hasMinFlashInstalled=function(){return window.swfobject.hasFlashPlayerVersion('9.0.0')}
    var addFlashDivNode=function(options){var node=document.createElement('div')
        node.setAttribute('id',options.fonts.swfContainerId)
        document.body.appendChild(node)}
    var loadSwfAndDetectFonts=function(done,options){var hiddenCallback='___fp_swf_loaded'
        window[hiddenCallback]=function(fonts){done(fonts)}
        var id=options.fonts.swfContainerId
        addFlashDivNode()
        var flashvars={onReady:hiddenCallback}
        var flashparams={allowScriptAccess:'always',menu:'false'}
        window.swfobject.embedSWF(options.fonts.swfPath,id,'1','1','9.0.0',false,flashvars,flashparams,{})}
    var getWebglCanvas=function(){var canvas=document.createElement('canvas')
        var gl=null
        try{gl=canvas.getContext('webgl')||canvas.getContext('experimental-webgl')}catch(e){}
        if(!gl){gl=null}
        return gl}
    var components=[{key:'userAgent',getData:UserAgent},{key:'language',getData:languageKey},{key:'colorDepth',getData:colorDepthKey},{key:'deviceMemory',getData:deviceMemoryKey},{key:'pixelRatio',getData:pixelRatioKey},{key:'hardwareConcurrency',getData:hardwareConcurrencyKey},{key:'screenResolution',getData:screenResolutionKey},{key:'availableScreenResolution',getData:availableScreenResolutionKey},{key:'timezoneOffset',getData:timezoneOffset},{key:'timezone',getData:timezone},{key:'sessionStorage',getData:sessionStorageKey},{key:'localStorage',getData:localStorageKey},{key:'indexedDb',getData:indexedDbKey},{key:'addBehavior',getData:addBehaviorKey},{key:'openDatabase',getData:openDatabaseKey},{key:'cpuClass',getData:cpuClassKey},{key:'platform',getData:platformKey},{key:'doNotTrack',getData:doNotTrackKey},{key:'plugins',getData:pluginsComponent},{key:'canvas',getData:canvasKey},{key:'webgl',getData:webglKey},{key:'webglVendorAndRenderer',getData:webglVendorAndRendererKey},{key:'adBlock',getData:adBlockKey},{key:'hasLiedLanguages',getData:hasLiedLanguagesKey},{key:'hasLiedResolution',getData:hasLiedResolutionKey},{key:'hasLiedOs',getData:hasLiedOsKey},{key:'hasLiedBrowser',getData:hasLiedBrowserKey},{key:'touchSupport',getData:touchSupportKey},{key:'fonts',getData:jsFontsKey,pauseBefore:true},{key:'fontsFlash',getData:flashFontsKey,pauseBefore:true},{key:'audio',getData:audioKey},{key:'enumerateDevices',getData:enumerateDevicesKey}]
    var Fingerprint2=function(options){throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")}
    Fingerprint2.get=function(options,callback){if(!callback){callback=options
        options={}}else if(!options){options={}}
        extendSoft(options,defaultOptions)
        options.components=options.extraComponents.concat(components)
        var keys={data:[],addPreprocessedComponent:function(key,value){if(typeof options.preprocessor==='function'){value=options.preprocessor(key,value)}
                keys.data.push({key:key,value:value})}}
        var i=-1
        var chainComponents=function(alreadyWaited){i+=1
            if(i>=options.components.length){callback(keys.data)
                return}
            var component=options.components[i]
            if(options.excludes[component.key]){chainComponents(false)
                return}
            if(!alreadyWaited&&component.pauseBefore){i-=1
                setTimeout(function(){chainComponents(true)},1)
                return}
            try{component.getData(function(value){keys.addPreprocessedComponent(component.key,value)
                chainComponents(false)},options)}catch(error){keys.addPreprocessedComponent(component.key,String(error))
                chainComponents(false)}}
        chainComponents(false)}
    Fingerprint2.getPromise=function(options){return new Promise(function(resolve,reject){Fingerprint2.get(options,resolve)})}
    Fingerprint2.getV18=function(options,callback){if(callback==null){callback=options
        options={}}
        return Fingerprint2.get(options,function(components){var newComponents=[]
            for(var i=0;i<components.length;i++){var component=components[i]
                if(component.value===(options.NOT_AVAILABLE||'not available')){newComponents.push({key:component.key,value:'unknown'})}else if(component.key==='plugins'){newComponents.push({key:'plugins',value:map(component.value,function(p){var mimeTypes=map(p[2],function(mt){if(mt.join){return mt.join('~')}
                        return mt}).join(',')
                        return[p[0],p[1],mimeTypes].join('::')})})}else if(['canvas','webgl'].indexOf(component.key)!==-1){newComponents.push({key:component.key,value:component.value.join('~')})}else if(['sessionStorage','localStorage','indexedDb','addBehavior','openDatabase'].indexOf(component.key)!==-1){if(component.value){newComponents.push({key:component.key,value:1})}else{continue}}else{if(component.value){newComponents.push(component.value.join?{key:component.key,value:component.value.join(';')}:component)}else{newComponents.push({key:component.key,value:component.value})}}}
            var murmur=x64hash128(map(newComponents,function(component){return component.value}).join('~~~'),31)
            callback(murmur,newComponents)})}
    Fingerprint2.x64hash128=x64hash128
    Fingerprint2.VERSION='2.0.0'
    return Fingerprint2})

/*scrolldepthjs*/
/*!
 * @preserve
 * gascrolldepth.js | v0.9
 * Copyright (c) 2015 Rob Flaherty (@robflaherty), Leigh McCulloch (@___leigh___)
 * Licensed under the MIT and GPL licenses.
 */
!function(e,n,t){"use strict";function r(){for(var e=1;e<arguments.length;e++)for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(arguments[0][n]=arguments[e][n]);return arguments[0]}function o(e,n){for(var t=0;t<e.length;t++)if(e[t]===n)return!0;return!1}function i(e){return"[object Array]"===Object.prototype.toString.call(e)}function a(){return Math.max(n.documentElement.scrollHeight,n.body.scrollHeight,n.documentElement.offsetHeight,n.body.offsetHeight,n.documentElement.clientHeight)}function l(){return e.innerHeight||n.documentElement.clientHeight||n.body.clientHeight}function u(){return e.pageYOffset||("CSS1Compat"===n.compatMode?n.documentElement.scrollTop:n.body.scrollTop)}function c(e){return e.getBoundingClientRect().top+u()}function f(r){return"undefined"!=typeof e.jQuery?e.jQuery(r).get(0):"undefined"!=typeof n.querySelector?n.querySelector(r):"#"==r.charAt(0)?n.getElementById(r.substr(1)):t}function g(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent?e.attachEvent("on"+n,t):e["on"+n]=t}function s(e,n,t){e.removeEventListener?e.removeEventListener(n,t,!1):e.detachEvent?e.detachEvent("on"+n,t):e["on"+type]=null}function p(n){b=!0,g(e,"scroll",n)}function h(n){b=!1,s(e,"scroll",n)}var v,m,d,y,D,E={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0,nonInteraction:!0,gaGlobal:!1,gtmOverride:!1},S=r({},E),I=[],b=!1,T=0,H=function(n){function t(n,t,r,o){y?(y({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:n,eventLabel:t,eventValue:1,eventNonInteraction:S.nonInteraction}),S.pixelDepth&&arguments.length>2&&r>T&&(T=r,y({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:b(r),eventValue:1,eventNonInteraction:S.nonInteraction})),S.userTiming&&arguments.length>3&&y({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:n,eventLabel:t,eventTiming:o})):(v&&(e[d]("send","event","Scroll Depth",n,t,1,{nonInteraction:S.nonInteraction}),S.pixelDepth&&arguments.length>2&&r>T&&(T=r,e[d]("send","event","Scroll Depth","Pixel Depth",b(r),1,{nonInteraction:S.nonInteraction})),S.userTiming&&arguments.length>3&&e[d]("send","timing","Scroll Depth",n,o,t)),m&&(_gaq.push(["_trackEvent","Scroll Depth",n,t,1,S.nonInteraction]),S.pixelDepth&&arguments.length>2&&r>T&&(T=r,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",b(r),1,S.nonInteraction])),S.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",n,o,t,100])))}function i(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function g(e,n,r){for(var i in e)if(e.hasOwnProperty(i)){var a=e[i];!o(I,i)&&n>=a&&(t("Percentage",i,n,r),I.push(i))}}function s(e,n,r){for(var i=0;i<e.length;i++){var a=e[i];if(!o(I,a)){var l="string"==typeof a?f(a):a;if(l){var u=c(l);n>=u&&(t("Elements",a,n,r),I.push(a))}}}}function b(e){return(250*Math.floor(e/250)).toString()}function H(e,n){var t,r,o,i=null,a=0,l=function(){a=new Date,i=null,o=e.apply(t,r)};return function(){var u=new Date;a||(a=u);var c=n-(u-a);return t=this,r=arguments,0>=c?(clearTimeout(i),i=null,a=u,o=e.apply(t,r)):i||(i=setTimeout(l,c)),o}}var _=+new Date;S=r({},E,n),a()<S.minHeight||(S.gaGlobal?(v=!0,d=S.gaGlobal):"function"==typeof ga?(v=!0,d="ga"):"function"==typeof __gaTracker&&(v=!0,d="__gaTracker"),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(m=!0),"function"==typeof S.eventHandler?y=S.eventHandler:"undefined"==typeof dataLayer||"function"!=typeof dataLayer.push||S.gtmOverride||(y=function(e){dataLayer.push(e)}),D=H(function(){var e=a(),n=l(),t=u()+n,r=i(e),o=+new Date-_;return I.length>=4+S.elements.length?void h():(S.elements&&s(S.elements,t,o),void(S.percentage&&g(r,t,o)))},500),p(D))},_=function(){I=[],T=0,"undefined"!=typeof D&&(h(D),p(D))},x=function(e){if("undefined"!=typeof e&&i(e)){for(var n=0;n<e.length;n++){var t=e[n],r=S.elements.indexOf(t);-1==r&&S.elements.push(t)}b||p()}},L=function(e){if("undefined"!=typeof e&&i(e))for(var n=0;n<e.length;n++){var t=e[n],r=S.elements.indexOf(t);r>-1&&S.elements.splice(r,1);var o=I.indexOf(t);o>-1&&I.splice(o,1)}};e.gascrolldepth={init:H,reset:_,addElements:x,removeElements:L},"undefined"!=typeof e.jQuery&&(e.jQuery.gascrolldepth=H)}(window,document);


/*here we are*/
if (window.requestIdleCallback) {
    requestIdleCallback(function () {
        Fingerprint2.get(function (components) {
            console.log(components) // an array of components: {key: ..., value: ...}
        })
    })
} else {
    setTimeout(function () {
        Fingerprint2.get(function (components) {
            console.log(components) // an array of components: {key: ..., value: ...}
        })
    }, 500)
}


(function() {
    const referer = document.referrer;
    let forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "referer";
        input.value = referer;
        forms[i].appendChild(input);
    }
}());

(function() {
    const xhr = new XMLHttpRequest();
    // TODO: добавить маппинг utm меток в data1-data5
    let query = "data1=test";
    xhr.open("GET", "/api/success.php?" + query, true);
    xhr.setRequestHeader('X-Kma-Api', 'click');
    xhr.setRequestHeader('X-Referer', document.referrer);
    xhr.send();
    xhr.onload = function() {
        let array;
        try { array = JSON.parse(this.response); } catch (e) { return; }
        if (array.click === 'undefined') return;
        let forms = document.getElementsByTagName("form");
        for (let i = 0; i < forms.length; i++) {
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = "click";
            input.value = array.click;
            forms[i].appendChild(input);
        }
    };
}());
