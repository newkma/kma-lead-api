function appendInputToForm(e, t, n) {
  var a = e.children;
  'object' == typeof n && (n = JSON.stringify(n));
  for (var r = 0; r < a.length; r++)
    if (a[r].getAttribute('name') === t) return (a[r].value = n), !1;
  var o = document.createElement('input');
  return (o.type = 'hidden'), (o.name = t), (o.value = n), e.appendChild(o), !0;
}
function appendInputToAllForms(e, t) {
  for (var n = document.getElementsByTagName('form'), a = 0; a < n.length; a++)
    appendInputToForm(n[a], e, t);
}
!(function (e, t, n) {
  'use strict';
  'undefined' != typeof window && 'function' == typeof define && define.amd
    ? define(n)
    : 'undefined' != typeof module && module.exports
    ? (module.exports = n())
    : t.exports
    ? (t.exports = n())
    : (t.Fingerprint2 = n());
})(0, this, function () {
  'use strict';
  var e = function (e, t) {
      (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
      var n = [0, 0, 0, 0];
      return (
        (n[3] += e[3] + t[3]),
        (n[2] += n[3] >>> 16),
        (n[3] &= 65535),
        (n[2] += e[2] + t[2]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[1] += e[1] + t[1]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[0] += e[0] + t[0]),
        (n[0] &= 65535),
        [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
      );
    },
    t = function (e, t) {
      (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
      var n = [0, 0, 0, 0];
      return (
        (n[3] += e[3] * t[3]),
        (n[2] += n[3] >>> 16),
        (n[3] &= 65535),
        (n[2] += e[2] * t[3]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[2] += e[3] * t[2]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[1] += e[1] * t[3]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[1] += e[2] * t[2]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[1] += e[3] * t[1]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
        (n[0] &= 65535),
        [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
      );
    },
    n = function (e, t) {
      return 32 == (t %= 64)
        ? [e[1], e[0]]
        : t < 32
        ? [(e[0] << t) | (e[1] >>> (32 - t)), (e[1] << t) | (e[0] >>> (32 - t))]
        : ((t -= 32),
          [
            (e[1] << t) | (e[0] >>> (32 - t)),
            (e[0] << t) | (e[1] >>> (32 - t))
          ]);
    },
    a = function (e, t) {
      return 0 == (t %= 64)
        ? e
        : t < 32
        ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
        : [e[1] << (t - 32), 0];
    },
    r = function (e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    },
    o = function (e) {
      return (
        (e = r(e, [0, e[0] >>> 1])),
        (e = t(e, [4283543511, 3981806797])),
        (e = r(e, [0, e[0] >>> 1])),
        (e = t(e, [3301882366, 444984403])),
        r(e, [0, e[0] >>> 1])
      );
    },
    i = function (i, l) {
      l = l || 0;
      for (
        var c = (i = i || '').length % 16,
          u = i.length - c,
          s = [0, l],
          d = [0, l],
          g = [0, 0],
          f = [0, 0],
          h = [2277735313, 289559509],
          m = [1291169091, 658871167],
          p = 0;
        p < u;
        p += 16
      )
        (g = [
          (255 & i.charCodeAt(p + 4)) |
            ((255 & i.charCodeAt(p + 5)) << 8) |
            ((255 & i.charCodeAt(p + 6)) << 16) |
            ((255 & i.charCodeAt(p + 7)) << 24),
          (255 & i.charCodeAt(p)) |
            ((255 & i.charCodeAt(p + 1)) << 8) |
            ((255 & i.charCodeAt(p + 2)) << 16) |
            ((255 & i.charCodeAt(p + 3)) << 24)
        ]),
          (f = [
            (255 & i.charCodeAt(p + 12)) |
              ((255 & i.charCodeAt(p + 13)) << 8) |
              ((255 & i.charCodeAt(p + 14)) << 16) |
              ((255 & i.charCodeAt(p + 15)) << 24),
            (255 & i.charCodeAt(p + 8)) |
              ((255 & i.charCodeAt(p + 9)) << 8) |
              ((255 & i.charCodeAt(p + 10)) << 16) |
              ((255 & i.charCodeAt(p + 11)) << 24)
          ]),
          (g = t(g, h)),
          (g = n(g, 31)),
          (g = t(g, m)),
          (s = r(s, g)),
          (s = n(s, 27)),
          (s = e(s, d)),
          (s = e(t(s, [0, 5]), [0, 1390208809])),
          (f = t(f, m)),
          (f = n(f, 33)),
          (f = t(f, h)),
          (d = r(d, f)),
          (d = n(d, 31)),
          (d = e(d, s)),
          (d = e(t(d, [0, 5]), [0, 944331445]));
      switch (((g = [0, 0]), (f = [0, 0]), c)) {
        case 15:
          f = r(f, a([0, i.charCodeAt(p + 14)], 48));
        case 14:
          f = r(f, a([0, i.charCodeAt(p + 13)], 40));
        case 13:
          f = r(f, a([0, i.charCodeAt(p + 12)], 32));
        case 12:
          f = r(f, a([0, i.charCodeAt(p + 11)], 24));
        case 11:
          f = r(f, a([0, i.charCodeAt(p + 10)], 16));
        case 10:
          f = r(f, a([0, i.charCodeAt(p + 9)], 8));
        case 9:
          (f = r(f, [0, i.charCodeAt(p + 8)])),
            (f = t(f, m)),
            (f = n(f, 33)),
            (f = t(f, h)),
            (d = r(d, f));
        case 8:
          g = r(g, a([0, i.charCodeAt(p + 7)], 56));
        case 7:
          g = r(g, a([0, i.charCodeAt(p + 6)], 48));
        case 6:
          g = r(g, a([0, i.charCodeAt(p + 5)], 40));
        case 5:
          g = r(g, a([0, i.charCodeAt(p + 4)], 32));
        case 4:
          g = r(g, a([0, i.charCodeAt(p + 3)], 24));
        case 3:
          g = r(g, a([0, i.charCodeAt(p + 2)], 16));
        case 2:
          g = r(g, a([0, i.charCodeAt(p + 1)], 8));
        case 1:
          (g = r(g, [0, i.charCodeAt(p)])),
            (g = t(g, h)),
            (g = n(g, 31)),
            (g = t(g, m)),
            (s = r(s, g));
      }
      return (
        (s = r(s, [0, i.length])),
        (d = r(d, [0, i.length])),
        (s = e(s, d)),
        (d = e(d, s)),
        (s = o(s)),
        (d = o(d)),
        (s = e(s, d)),
        (d = e(d, s)),
        ('00000000' + (s[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (s[1] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (d[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (d[1] >>> 0).toString(16)).slice(-8)
      );
    },
    l = {
      preprocessor: null,
      audio: { timeout: 1e3, excludeIOS11: !0 },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: !1
      },
      screen: { detectScreenOrientation: !0 },
      plugins: { sortPluginsFor: [/palemoon/i], excludeIE: !1 },
      extraComponents: [],
      excludes: {
        enumerateDevices: !0,
        pixelRatio: !0,
        doNotTrack: !0,
        fontsFlash: !0
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    },
    c = function (e, t) {
      if (Array.prototype.forEach && e.forEach === Array.prototype.forEach)
        e.forEach(t);
      else if (e.length === +e.length)
        for (var n = 0, a = e.length; n < a; n++) t(e[n], n, e);
      else for (var r in e) e.hasOwnProperty(r) && t(e[r], r, e);
    },
    u = function (e, t) {
      var n = [];
      return null == e
        ? n
        : Array.prototype.map && e.map === Array.prototype.map
        ? e.map(t)
        : (c(e, function (e, a, r) {
            n.push(t(e, a, r));
          }),
          n);
    },
    s = function (e) {
      if (null == navigator.plugins) return e.NOT_AVAILABLE;
      for (var t = [], n = 0, a = navigator.plugins.length; n < a; n++)
        navigator.plugins[n] && t.push(navigator.plugins[n]);
      return (
        d(e) &&
          (t = t.sort(function (e, t) {
            return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
          })),
        u(t, function (e) {
          var t = u(e, function (e) {
            return [e.type, e.suffixes];
          });
          return [e.name, e.description, t];
        })
      );
    },
    d = function (e) {
      for (var t = !1, n = 0, a = e.plugins.sortPluginsFor.length; n < a; n++) {
        var r = e.plugins.sortPluginsFor[n];
        if (navigator.userAgent.match(r)) {
          t = !0;
          break;
        }
      }
      return t;
    },
    g = function () {
      var e = document.createElement('canvas');
      return !(!e.getContext || !e.getContext('2d'));
    },
    f = function () {
      if (!g()) return !1;
      var e = h();
      return !!window.WebGLRenderingContext && !!e;
    },
    h = function () {
      var e = document.createElement('canvas'),
        t = null;
      try {
        t = e.getContext('webgl') || e.getContext('experimental-webgl');
      } catch (e) {}
      return t || (t = null), t;
    },
    m = [
      {
        key: 'userAgent',
        getData: function (e) {
          e(navigator.userAgent);
        }
      },
      {
        key: 'language',
        getData: function (e, t) {
          e(
            navigator.language ||
              navigator.userLanguage ||
              navigator.browserLanguage ||
              navigator.systemLanguage ||
              t.NOT_AVAILABLE
          );
        }
      },
      {
        key: 'colorDepth',
        getData: function (e, t) {
          e(window.screen.colorDepth || t.NOT_AVAILABLE);
        }
      },
      {
        key: 'deviceMemory',
        getData: function (e, t) {
          e(navigator.deviceMemory || t.NOT_AVAILABLE);
        }
      },
      {
        key: 'pixelRatio',
        getData: function (e, t) {
          e(window.devicePixelRatio || t.NOT_AVAILABLE);
        }
      },
      {
        key: 'hardwareConcurrency',
        getData: function (e, t) {
          e(
            (function (e) {
              return navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency
                : e.NOT_AVAILABLE;
            })(t)
          );
        }
      },
      {
        key: 'screenResolution',
        getData: function (e, t) {
          e(
            (function (e) {
              var t = [window.screen.width, window.screen.height];
              return e.screen.detectScreenOrientation && t.sort().reverse(), t;
            })(t)
          );
        }
      },
      {
        key: 'availableScreenResolution',
        getData: function (e, t) {
          e(
            (function (e) {
              if (window.screen.availWidth && window.screen.availHeight) {
                var t = [window.screen.availHeight, window.screen.availWidth];
                return (
                  e.screen.detectScreenOrientation && t.sort().reverse(), t
                );
              }
              return e.NOT_AVAILABLE;
            })(t)
          );
        }
      },
      {
        key: 'timezoneOffset',
        getData: function (e) {
          e(new Date().getTimezoneOffset());
        }
      },
      {
        key: 'timezone',
        getData: function (e, t) {
          window.Intl && window.Intl.DateTimeFormat
            ? e(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
            : e(t.NOT_AVAILABLE);
        }
      },
      {
        key: 'sessionStorage',
        getData: function (e, t) {
          e(
            (function (e) {
              try {
                return !!window.sessionStorage;
              } catch (t) {
                return e.ERROR;
              }
            })(t)
          );
        }
      },
      {
        key: 'localStorage',
        getData: function (e, t) {
          e(
            (function (e) {
              try {
                return !!window.localStorage;
              } catch (t) {
                return e.ERROR;
              }
            })(t)
          );
        }
      },
      {
        key: 'indexedDb',
        getData: function (e, t) {
          e(
            (function (e) {
              try {
                return !!window.indexedDB;
              } catch (t) {
                return e.ERROR;
              }
            })(t)
          );
        }
      },
      {
        key: 'addBehavior',
        getData: function (e) {
          e(!(!document.body || !document.body.addBehavior));
        }
      },
      {
        key: 'openDatabase',
        getData: function (e) {
          e(!!window.openDatabase);
        }
      },
      {
        key: 'cpuClass',
        getData: function (e, t) {
          e(
            (function (e) {
              return navigator.cpuClass || e.NOT_AVAILABLE;
            })(t)
          );
        }
      },
      {
        key: 'platform',
        getData: function (e, t) {
          e(
            (function (e) {
              return navigator.platform ? navigator.platform : e.NOT_AVAILABLE;
            })(t)
          );
        }
      },
      {
        key: 'doNotTrack',
        getData: function (e, t) {
          e(
            (function (e) {
              return navigator.doNotTrack
                ? navigator.doNotTrack
                : navigator.msDoNotTrack
                ? navigator.msDoNotTrack
                : window.doNotTrack
                ? window.doNotTrack
                : e.NOT_AVAILABLE;
            })(t)
          );
        }
      },
      {
        key: 'plugins',
        getData: function (e, t) {
          'Microsoft Internet Explorer' === navigator.appName ||
          ('Netscape' === navigator.appName &&
            /Trident/.test(navigator.userAgent))
            ? t.plugins.excludeIE
              ? e(t.EXCLUDED)
              : e(
                  (function (e) {
                    var t = [];
                    return (
                      (Object.getOwnPropertyDescriptor &&
                        Object.getOwnPropertyDescriptor(
                          window,
                          'ActiveXObject'
                        )) ||
                      'ActiveXObject' in window
                        ? (t = u(
                            [
                              'AcroPDF.PDF',
                              'Adodb.Stream',
                              'AgControl.AgControl',
                              'DevalVRXCtrl.DevalVRXCtrl.1',
                              'MacromediaFlashPaper.MacromediaFlashPaper',
                              'Msxml2.DOMDocument',
                              'Msxml2.XMLHTTP',
                              'PDF.PdfCtrl',
                              'QuickTime.QuickTime',
                              'QuickTimeCheckObject.QuickTimeCheck.1',
                              'RealPlayer',
                              'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
                              'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
                              'Scripting.Dictionary',
                              'SWCtl.SWCtl',
                              'Shell.UIHelper',
                              'ShockwaveFlash.ShockwaveFlash',
                              'Skype.Detection',
                              'TDCCtl.TDCCtl',
                              'WMPlayer.OCX',
                              'rmocx.RealPlayer G2 Control',
                              'rmocx.RealPlayer G2 Control.1'
                            ],
                            function (t) {
                              try {
                                return new window.ActiveXObject(t), t;
                              } catch (t) {
                                return e.ERROR;
                              }
                            }
                          ))
                        : t.push(e.NOT_AVAILABLE),
                      navigator.plugins && (t = t.concat(s(e))),
                      t
                    );
                  })(t)
                )
            : e(s(t));
        }
      },
      {
        key: 'canvas',
        getData: function (e, t) {
          g()
            ? e(
                (function (e) {
                  var t = [],
                    n = document.createElement('canvas');
                  (n.width = 2e3),
                    (n.height = 200),
                    (n.style.display = 'inline');
                  var a = n.getContext('2d');
                  return (
                    a.rect(0, 0, 10, 10),
                    a.rect(2, 2, 6, 6),
                    t.push(
                      'canvas winding:' +
                        (!1 === a.isPointInPath(5, 5, 'evenodd') ? 'yes' : 'no')
                    ),
                    (a.textBaseline = 'alphabetic'),
                    (a.fillStyle = '#f60'),
                    a.fillRect(125, 1, 62, 20),
                    (a.fillStyle = '#069'),
                    e.dontUseFakeFontInCanvas
                      ? (a.font = '11pt Arial')
                      : (a.font = '11pt no-real-font-123'),
                    a.fillText('Cwm fjordbank glyphs vext quiz, ðŸ˜ƒ', 2, 15),
                    (a.fillStyle = 'rgba(102, 204, 0, 0.2)'),
                    (a.font = '18pt Arial'),
                    a.fillText('Cwm fjordbank glyphs vext quiz, ðŸ˜ƒ', 4, 45),
                    (a.globalCompositeOperation = 'multiply'),
                    (a.fillStyle = 'rgb(255,0,255)'),
                    a.beginPath(),
                    a.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                    a.closePath(),
                    a.fill(),
                    (a.fillStyle = 'rgb(0,255,255)'),
                    a.beginPath(),
                    a.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                    a.closePath(),
                    a.fill(),
                    (a.fillStyle = 'rgb(255,255,0)'),
                    a.beginPath(),
                    a.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                    a.closePath(),
                    a.fill(),
                    (a.fillStyle = 'rgb(255,0,255)'),
                    a.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                    a.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                    a.fill('evenodd'),
                    n.toDataURL && t.push('canvas fp:' + n.toDataURL()),
                    t
                  );
                })(t)
              )
            : e(t.NOT_AVAILABLE);
        }
      },
      {
        key: 'webgl',
        getData: function (e, t) {
          f()
            ? e(
                (function () {
                  var e,
                    t = function (t) {
                      return (
                        e.clearColor(0, 0, 0, 1),
                        e.enable(e.DEPTH_TEST),
                        e.depthFunc(e.LEQUAL),
                        e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                        '[' + t[0] + ', ' + t[1] + ']'
                      );
                    };
                  if (!(e = h())) return null;
                  var n = [],
                    a = e.createBuffer();
                  e.bindBuffer(e.ARRAY_BUFFER, a);
                  var r = new Float32Array([
                    -0.2,
                    -0.9,
                    0,
                    0.4,
                    -0.26,
                    0,
                    0,
                    0.732134444,
                    0
                  ]);
                  e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW),
                    (a.itemSize = 3),
                    (a.numItems = 3);
                  var o = e.createProgram(),
                    i = e.createShader(e.VERTEX_SHADER);
                  e.shaderSource(
                    i,
                    'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
                  ),
                    e.compileShader(i);
                  var l = e.createShader(e.FRAGMENT_SHADER);
                  e.shaderSource(
                    l,
                    'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
                  ),
                    e.compileShader(l),
                    e.attachShader(o, i),
                    e.attachShader(o, l),
                    e.linkProgram(o),
                    e.useProgram(o),
                    (o.vertexPosAttrib = e.getAttribLocation(o, 'attrVertex')),
                    (o.offsetUniform = e.getUniformLocation(
                      o,
                      'uniformOffset'
                    )),
                    e.enableVertexAttribArray(o.vertexPosArray),
                    e.vertexAttribPointer(
                      o.vertexPosAttrib,
                      a.itemSize,
                      e.FLOAT,
                      !1,
                      0,
                      0
                    ),
                    e.uniform2f(o.offsetUniform, 1, 1),
                    e.drawArrays(e.TRIANGLE_STRIP, 0, a.numItems);
                  try {
                    n.push(e.canvas.toDataURL());
                  } catch (t) {}
                  n.push(
                    'extensions:' + (e.getSupportedExtensions() || []).join(';')
                  ),
                    n.push(
                      'webgl aliased line width range:' +
                        t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))
                    ),
                    n.push(
                      'webgl aliased point size range:' +
                        t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))
                    ),
                    n.push('webgl alpha bits:' + e.getParameter(e.ALPHA_BITS)),
                    n.push(
                      'webgl antialiasing:' +
                        (e.getContextAttributes().antialias ? 'yes' : 'no')
                    ),
                    n.push('webgl blue bits:' + e.getParameter(e.BLUE_BITS)),
                    n.push('webgl depth bits:' + e.getParameter(e.DEPTH_BITS)),
                    n.push('webgl green bits:' + e.getParameter(e.GREEN_BITS)),
                    n.push(
                      'webgl max anisotropy:' +
                        (function (e) {
                          var t =
                            e.getExtension('EXT_texture_filter_anisotropic') ||
                            e.getExtension(
                              'WEBKIT_EXT_texture_filter_anisotropic'
                            ) ||
                            e.getExtension(
                              'MOZ_EXT_texture_filter_anisotropic'
                            );
                          if (t) {
                            var n = e.getParameter(
                              t.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                            );
                            return 0 === n && (n = 2), n;
                          }
                          return null;
                        })(e)
                    ),
                    n.push(
                      'webgl max combined texture image units:' +
                        e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
                    ),
                    n.push(
                      'webgl max cube map texture size:' +
                        e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)
                    ),
                    n.push(
                      'webgl max fragment uniform vectors:' +
                        e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)
                    ),
                    n.push(
                      'webgl max render buffer size:' +
                        e.getParameter(e.MAX_RENDERBUFFER_SIZE)
                    ),
                    n.push(
                      'webgl max texture image units:' +
                        e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
                    ),
                    n.push(
                      'webgl max texture size:' +
                        e.getParameter(e.MAX_TEXTURE_SIZE)
                    ),
                    n.push(
                      'webgl max varying vectors:' +
                        e.getParameter(e.MAX_VARYING_VECTORS)
                    ),
                    n.push(
                      'webgl max vertex attribs:' +
                        e.getParameter(e.MAX_VERTEX_ATTRIBS)
                    ),
                    n.push(
                      'webgl max vertex texture image units:' +
                        e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
                    ),
                    n.push(
                      'webgl max vertex uniform vectors:' +
                        e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)
                    ),
                    n.push(
                      'webgl max viewport dims:' +
                        t(e.getParameter(e.MAX_VIEWPORT_DIMS))
                    ),
                    n.push('webgl red bits:' + e.getParameter(e.RED_BITS)),
                    n.push('webgl renderer:' + e.getParameter(e.RENDERER)),
                    n.push(
                      'webgl shading language version:' +
                        e.getParameter(e.SHADING_LANGUAGE_VERSION)
                    ),
                    n.push(
                      'webgl stencil bits:' + e.getParameter(e.STENCIL_BITS)
                    ),
                    n.push('webgl vendor:' + e.getParameter(e.VENDOR)),
                    n.push('webgl version:' + e.getParameter(e.VERSION));
                  try {
                    var u = e.getExtension('WEBGL_debug_renderer_info');
                    u &&
                      (n.push(
                        'webgl unmasked vendor:' +
                          e.getParameter(u.UNMASKED_VENDOR_WEBGL)
                      ),
                      n.push(
                        'webgl unmasked renderer:' +
                          e.getParameter(u.UNMASKED_RENDERER_WEBGL)
                      ));
                  } catch (t) {}
                  return (
                    e.getShaderPrecisionFormat &&
                      c(['FLOAT', 'INT'], function (t) {
                        c(['VERTEX', 'FRAGMENT'], function (a) {
                          c(['HIGH', 'MEDIUM', 'LOW'], function (r) {
                            c(
                              ['precision', 'rangeMin', 'rangeMax'],
                              function (o) {
                                var i = e.getShaderPrecisionFormat(
                                  e[a + '_SHADER'],
                                  e[r + '_' + t]
                                )[o];
                                'precision' !== o && (o = 'precision ' + o);
                                var l = [
                                  'webgl ',
                                  a.toLowerCase(),
                                  ' shader ',
                                  r.toLowerCase(),
                                  ' ',
                                  t.toLowerCase(),
                                  ' ',
                                  o,
                                  ':',
                                  i
                                ].join('');
                                n.push(l);
                              }
                            );
                          });
                        });
                      }),
                    n
                  );
                })()
              )
            : e(t.NOT_AVAILABLE);
        }
      },
      {
        key: 'webglVendorAndRenderer',
        getData: function (e) {
          f()
            ? e(
                (function () {
                  try {
                    var e = h(),
                      t = e.getExtension('WEBGL_debug_renderer_info');
                    return (
                      e.getParameter(t.UNMASKED_VENDOR_WEBGL) +
                      '~' +
                      e.getParameter(t.UNMASKED_RENDERER_WEBGL)
                    );
                  } catch (e) {
                    return null;
                  }
                })()
              )
            : e();
        }
      },
      {
        key: 'adBlock',
        getData: function (e) {
          e(
            (function () {
              var e = document.createElement('div');
              e.innerHTML = '&nbsp;';
              var t = !(e.className = 'adsbox');
              try {
                document.body.appendChild(e),
                  (t =
                    0 ===
                    document.getElementsByClassName('adsbox')[0].offsetHeight),
                  document.body.removeChild(e);
              } catch (e) {
                t = !1;
              }
              return t;
            })()
          );
        }
      },
      {
        key: 'hasLiedLanguages',
        getData: function (e) {
          e(
            (function () {
              if (void 0 !== navigator.languages)
                try {
                  if (
                    navigator.languages[0].substr(0, 2) !==
                    navigator.language.substr(0, 2)
                  )
                    return !0;
                } catch (e) {
                  return !0;
                }
              return !1;
            })()
          );
        }
      },
      {
        key: 'hasLiedResolution',
        getData: function (e) {
          e(
            window.screen.width < window.screen.availWidth ||
              window.screen.height < window.screen.availHeight
          );
        }
      },
      {
        key: 'hasLiedOs',
        getData: function (e) {
          e(
            (function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                n = navigator.oscpu,
                a = navigator.platform.toLowerCase();
              if (
                ((e =
                  0 <= t.indexOf('windows phone')
                    ? 'Windows Phone'
                    : 0 <= t.indexOf('win')
                    ? 'Windows'
                    : 0 <= t.indexOf('android')
                    ? 'Android'
                    : 0 <= t.indexOf('linux')
                    ? 'Linux'
                    : 0 <= t.indexOf('iphone') || 0 <= t.indexOf('ipad')
                    ? 'iOS'
                    : 0 <= t.indexOf('mac')
                    ? 'Mac'
                    : 'Other'),
                ('ontouchstart' in window ||
                  0 < navigator.maxTouchPoints ||
                  0 < navigator.msMaxTouchPoints) &&
                  'Windows Phone' !== e &&
                  'Android' !== e &&
                  'iOS' !== e &&
                  'Other' !== e)
              )
                return !0;
              if (void 0 !== n) {
                if (
                  0 <= (n = n.toLowerCase()).indexOf('win') &&
                  'Windows' !== e &&
                  'Windows Phone' !== e
                )
                  return !0;
                if (0 <= n.indexOf('linux') && 'Linux' !== e && 'Android' !== e)
                  return !0;
                if (0 <= n.indexOf('mac') && 'Mac' !== e && 'iOS' !== e)
                  return !0;
                if (
                  (-1 === n.indexOf('win') &&
                    -1 === n.indexOf('linux') &&
                    -1 === n.indexOf('mac')) !=
                  ('Other' === e)
                )
                  return !0;
              }
              return (
                (0 <= a.indexOf('win') &&
                  'Windows' !== e &&
                  'Windows Phone' !== e) ||
                ((0 <= a.indexOf('linux') ||
                  0 <= a.indexOf('android') ||
                  0 <= a.indexOf('pike')) &&
                  'Linux' !== e &&
                  'Android' !== e) ||
                ((0 <= a.indexOf('mac') ||
                  0 <= a.indexOf('ipad') ||
                  0 <= a.indexOf('ipod') ||
                  0 <= a.indexOf('iphone')) &&
                  'Mac' !== e &&
                  'iOS' !== e) ||
                (-1 === a.indexOf('win') &&
                  -1 === a.indexOf('linux') &&
                  -1 === a.indexOf('mac')) !=
                  ('Other' === e) ||
                (void 0 === navigator.plugins &&
                  'Windows' !== e &&
                  'Windows Phone' !== e)
              );
            })()
          );
        }
      },
      {
        key: 'hasLiedBrowser',
        getData: function (e) {
          e(
            (function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                n = navigator.productSub;
              if (
                ('Chrome' ==
                  (e =
                    0 <= t.indexOf('firefox')
                      ? 'Firefox'
                      : 0 <= t.indexOf('opera') || 0 <= t.indexOf('opr')
                      ? 'Opera'
                      : 0 <= t.indexOf('chrome')
                      ? 'Chrome'
                      : 0 <= t.indexOf('safari')
                      ? 'Safari'
                      : 0 <= t.indexOf('trident')
                      ? 'Internet Explorer'
                      : 'Other') ||
                  'Safari' === e ||
                  'Opera' === e) &&
                '20030107' !== n
              )
                return !0;
              var a,
                r = eval.toString().length;
              if (
                37 === r &&
                'Safari' !== e &&
                'Firefox' !== e &&
                'Other' !== e
              )
                return !0;
              if (39 === r && 'Internet Explorer' !== e && 'Other' !== e)
                return !0;
              if (33 === r && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e)
                return !0;
              try {
                throw 'a';
              } catch (e) {
                try {
                  e.toSource(), (a = !0);
                } catch (e) {
                  a = !1;
                }
              }
              return a && 'Firefox' !== e && 'Other' !== e;
            })()
          );
        }
      },
      {
        key: 'touchSupport',
        getData: function (e) {
          e(
            (function () {
              var e,
                t = 0;
              void 0 !== navigator.maxTouchPoints
                ? (t = navigator.maxTouchPoints)
                : void 0 !== navigator.msMaxTouchPoints &&
                  (t = navigator.msMaxTouchPoints);
              try {
                document.createEvent('TouchEvent'), (e = !0);
              } catch (t) {
                e = !1;
              }
              return [t, e, 'ontouchstart' in window];
            })()
          );
        }
      },
      {
        key: 'fonts',
        getData: function (e, t) {
          var n = ['monospace', 'sans-serif', 'serif'],
            a = [
              'Andale Mono',
              'Arial',
              'Arial Black',
              'Arial Hebrew',
              'Arial MT',
              'Arial Narrow',
              'Arial Rounded MT Bold',
              'Arial Unicode MS',
              'Bitstream Vera Sans Mono',
              'Book Antiqua',
              'Bookman Old Style',
              'Calibri',
              'Cambria',
              'Cambria Math',
              'Century',
              'Century Gothic',
              'Century Schoolbook',
              'Comic Sans',
              'Comic Sans MS',
              'Consolas',
              'Courier',
              'Courier New',
              'Geneva',
              'Georgia',
              'Helvetica',
              'Helvetica Neue',
              'Impact',
              'Lucida Bright',
              'Lucida Calligraphy',
              'Lucida Console',
              'Lucida Fax',
              'LUCIDA GRANDE',
              'Lucida Handwriting',
              'Lucida Sans',
              'Lucida Sans Typewriter',
              'Lucida Sans Unicode',
              'Microsoft Sans Serif',
              'Monaco',
              'Monotype Corsiva',
              'MS Gothic',
              'MS Outlook',
              'MS PGothic',
              'MS Reference Sans Serif',
              'MS Sans Serif',
              'MS Serif',
              'MYRIAD',
              'MYRIAD PRO',
              'Palatino',
              'Palatino Linotype',
              'Segoe Print',
              'Segoe Script',
              'Segoe UI',
              'Segoe UI Light',
              'Segoe UI Semibold',
              'Segoe UI Symbol',
              'Tahoma',
              'Times',
              'Times New Roman',
              'Times New Roman PS',
              'Trebuchet MS',
              'Verdana',
              'Wingdings',
              'Wingdings 2',
              'Wingdings 3'
            ];
          t.fonts.extendedJsFonts &&
            (a = a.concat([
              'Abadi MT Condensed Light',
              'Academy Engraved LET',
              'ADOBE CASLON PRO',
              'Adobe Garamond',
              'ADOBE GARAMOND PRO',
              'Agency FB',
              'Aharoni',
              'Albertus Extra Bold',
              'Albertus Medium',
              'Algerian',
              'Amazone BT',
              'American Typewriter',
              'American Typewriter Condensed',
              'AmerType Md BT',
              'Andalus',
              'Angsana New',
              'AngsanaUPC',
              'Antique Olive',
              'Aparajita',
              'Apple Chancery',
              'Apple Color Emoji',
              'Apple SD Gothic Neo',
              'Arabic Typesetting',
              'ARCHER',
              'ARNO PRO',
              'Arrus BT',
              'Aurora Cn BT',
              'AvantGarde Bk BT',
              'AvantGarde Md BT',
              'AVENIR',
              'Ayuthaya',
              'Bandy',
              'Bangla Sangam MN',
              'Bank Gothic',
              'BankGothic Md BT',
              'Baskerville',
              'Baskerville Old Face',
              'Batang',
              'BatangChe',
              'Bauer Bodoni',
              'Bauhaus 93',
              'Bazooka',
              'Bell MT',
              'Bembo',
              'Benguiat Bk BT',
              'Berlin Sans FB',
              'Berlin Sans FB Demi',
              'Bernard MT Condensed',
              'BernhardFashion BT',
              'BernhardMod BT',
              'Big Caslon',
              'BinnerD',
              'Blackadder ITC',
              'BlairMdITC TT',
              'Bodoni 72',
              'Bodoni 72 Oldstyle',
              'Bodoni 72 Smallcaps',
              'Bodoni MT',
              'Bodoni MT Black',
              'Bodoni MT Condensed',
              'Bodoni MT Poster Compressed',
              'Bookshelf Symbol 7',
              'Boulder',
              'Bradley Hand',
              'Bradley Hand ITC',
              'Bremen Bd BT',
              'Britannic Bold',
              'Broadway',
              'Browallia New',
              'BrowalliaUPC',
              'Brush Script MT',
              'Californian FB',
              'Calisto MT',
              'Calligrapher',
              'Candara',
              'CaslonOpnface BT',
              'Castellar',
              'Centaur',
              'Cezanne',
              'CG Omega',
              'CG Times',
              'Chalkboard',
              'Chalkboard SE',
              'Chalkduster',
              'Charlesworth',
              'Charter Bd BT',
              'Charter BT',
              'Chaucer',
              'ChelthmITC Bk BT',
              'Chiller',
              'Clarendon',
              'Clarendon Condensed',
              'CloisterBlack BT',
              'Cochin',
              'Colonna MT',
              'Constantia',
              'Cooper Black',
              'Copperplate',
              'Copperplate Gothic',
              'Copperplate Gothic Bold',
              'Copperplate Gothic Light',
              'CopperplGoth Bd BT',
              'Corbel',
              'Cordia New',
              'CordiaUPC',
              'Cornerstone',
              'Coronet',
              'Cuckoo',
              'Curlz MT',
              'DaunPenh',
              'Dauphin',
              'David',
              'DB LCD Temp',
              'DELICIOUS',
              'Denmark',
              'DFKai-SB',
              'Didot',
              'DilleniaUPC',
              'DIN',
              'DokChampa',
              'Dotum',
              'DotumChe',
              'Ebrima',
              'Edwardian Script ITC',
              'Elephant',
              'English 111 Vivace BT',
              'Engravers MT',
              'EngraversGothic BT',
              'Eras Bold ITC',
              'Eras Demi ITC',
              'Eras Light ITC',
              'Eras Medium ITC',
              'EucrosiaUPC',
              'Euphemia',
              'Euphemia UCAS',
              'EUROSTILE',
              'Exotc350 Bd BT',
              'FangSong',
              'Felix Titling',
              'Fixedsys',
              'FONTIN',
              'Footlight MT Light',
              'Forte',
              'FrankRuehl',
              'Fransiscan',
              'Freefrm721 Blk BT',
              'FreesiaUPC',
              'Freestyle Script',
              'French Script MT',
              'FrnkGothITC Bk BT',
              'Fruitger',
              'FRUTIGER',
              'Futura',
              'Futura Bk BT',
              'Futura Lt BT',
              'Futura Md BT',
              'Futura ZBlk BT',
              'FuturaBlack BT',
              'Gabriola',
              'Galliard BT',
              'Gautami',
              'Geeza Pro',
              'Geometr231 BT',
              'Geometr231 Hv BT',
              'Geometr231 Lt BT',
              'GeoSlab 703 Lt BT',
              'GeoSlab 703 XBd BT',
              'Gigi',
              'Gill Sans',
              'Gill Sans MT',
              'Gill Sans MT Condensed',
              'Gill Sans MT Ext Condensed Bold',
              'Gill Sans Ultra Bold',
              'Gill Sans Ultra Bold Condensed',
              'Gisha',
              'Gloucester MT Extra Condensed',
              'GOTHAM',
              'GOTHAM BOLD',
              'Goudy Old Style',
              'Goudy Stout',
              'GoudyHandtooled BT',
              'GoudyOLSt BT',
              'Gujarati Sangam MN',
              'Gulim',
              'GulimChe',
              'Gungsuh',
              'GungsuhChe',
              'Gurmukhi MN',
              'Haettenschweiler',
              'Harlow Solid Italic',
              'Harrington',
              'Heather',
              'Heiti SC',
              'Heiti TC',
              'HELV',
              'Herald',
              'High Tower Text',
              'Hiragino Kaku Gothic ProN',
              'Hiragino Mincho ProN',
              'Hoefler Text',
              'Humanst 521 Cn BT',
              'Humanst521 BT',
              'Humanst521 Lt BT',
              'Imprint MT Shadow',
              'Incised901 Bd BT',
              'Incised901 BT',
              'Incised901 Lt BT',
              'INCONSOLATA',
              'Informal Roman',
              'Informal011 BT',
              'INTERSTATE',
              'IrisUPC',
              'Iskoola Pota',
              'JasmineUPC',
              'Jazz LET',
              'Jenson',
              'Jester',
              'Jokerman',
              'Juice ITC',
              'Kabel Bk BT',
              'Kabel Ult BT',
              'Kailasa',
              'KaiTi',
              'Kalinga',
              'Kannada Sangam MN',
              'Kartika',
              'Kaufmann Bd BT',
              'Kaufmann BT',
              'Khmer UI',
              'KodchiangUPC',
              'Kokila',
              'Korinna BT',
              'Kristen ITC',
              'Krungthep',
              'Kunstler Script',
              'Lao UI',
              'Latha',
              'Leelawadee',
              'Letter Gothic',
              'Levenim MT',
              'LilyUPC',
              'Lithograph',
              'Lithograph Light',
              'Long Island',
              'Lydian BT',
              'Magneto',
              'Maiandra GD',
              'Malayalam Sangam MN',
              'Malgun Gothic',
              'Mangal',
              'Marigold',
              'Marion',
              'Marker Felt',
              'Market',
              'Marlett',
              'Matisse ITC',
              'Matura MT Script Capitals',
              'Meiryo',
              'Meiryo UI',
              'Microsoft Himalaya',
              'Microsoft JhengHei',
              'Microsoft New Tai Lue',
              'Microsoft PhagsPa',
              'Microsoft Tai Le',
              'Microsoft Uighur',
              'Microsoft YaHei',
              'Microsoft Yi Baiti',
              'MingLiU',
              'MingLiU_HKSCS',
              'MingLiU_HKSCS-ExtB',
              'MingLiU-ExtB',
              'Minion',
              'Minion Pro',
              'Miriam',
              'Miriam Fixed',
              'Mistral',
              'Modern',
              'Modern No. 20',
              'Mona Lisa Solid ITC TT',
              'Mongolian Baiti',
              'MONO',
              'MoolBoran',
              'Mrs Eaves',
              'MS LineDraw',
              'MS Mincho',
              'MS PMincho',
              'MS Reference Specialty',
              'MS UI Gothic',
              'MT Extra',
              'MUSEO',
              'MV Boli',
              'Nadeem',
              'Narkisim',
              'NEVIS',
              'News Gothic',
              'News GothicMT',
              'NewsGoth BT',
              'Niagara Engraved',
              'Niagara Solid',
              'Noteworthy',
              'NSimSun',
              'Nyala',
              'OCR A Extended',
              'Old Century',
              'Old English Text MT',
              'Onyx',
              'Onyx BT',
              'OPTIMA',
              'Oriya Sangam MN',
              'OSAKA',
              'OzHandicraft BT',
              'Palace Script MT',
              'Papyrus',
              'Parchment',
              'Party LET',
              'Pegasus',
              'Perpetua',
              'Perpetua Titling MT',
              'PetitaBold',
              'Pickwick',
              'Plantagenet Cherokee',
              'Playbill',
              'PMingLiU',
              'PMingLiU-ExtB',
              'Poor Richard',
              'Poster',
              'PosterBodoni BT',
              'PRINCETOWN LET',
              'Pristina',
              'PTBarnum BT',
              'Pythagoras',
              'Raavi',
              'Rage Italic',
              'Ravie',
              'Ribbon131 Bd BT',
              'Rockwell',
              'Rockwell Condensed',
              'Rockwell Extra Bold',
              'Rod',
              'Roman',
              'Sakkal Majalla',
              'Santa Fe LET',
              'Savoye LET',
              'Sceptre',
              'Script',
              'Script MT Bold',
              'SCRIPTINA',
              'Serifa',
              'Serifa BT',
              'Serifa Th BT',
              'ShelleyVolante BT',
              'Sherwood',
              'Shonar Bangla',
              'Showcard Gothic',
              'Shruti',
              'Signboard',
              'SILKSCREEN',
              'SimHei',
              'Simplified Arabic',
              'Simplified Arabic Fixed',
              'SimSun',
              'SimSun-ExtB',
              'Sinhala Sangam MN',
              'Sketch Rockwell',
              'Skia',
              'Small Fonts',
              'Snap ITC',
              'Snell Roundhand',
              'Socket',
              'Souvenir Lt BT',
              'Staccato222 BT',
              'Steamer',
              'Stencil',
              'Storybook',
              'Styllo',
              'Subway',
              'Swis721 BlkEx BT',
              'Swiss911 XCm BT',
              'Sylfaen',
              'Synchro LET',
              'System',
              'Tamil Sangam MN',
              'Technical',
              'Teletype',
              'Telugu Sangam MN',
              'Tempus Sans ITC',
              'Terminal',
              'Thonburi',
              'Traditional Arabic',
              'Trajan',
              'TRAJAN PRO',
              'Tristan',
              'Tubular',
              'Tunga',
              'Tw Cen MT',
              'Tw Cen MT Condensed',
              'Tw Cen MT Condensed Extra Bold',
              'TypoUpright BT',
              'Unicorn',
              'Univers',
              'Univers CE 55 Medium',
              'Univers Condensed',
              'Utsaah',
              'Vagabond',
              'Vani',
              'Vijaya',
              'Viner Hand ITC',
              'VisualUI',
              'Vivaldi',
              'Vladimir Script',
              'Vrinda',
              'Westminster',
              'WHITNEY',
              'Wide Latin',
              'ZapfEllipt BT',
              'ZapfHumnst BT',
              'ZapfHumnst Dm BT',
              'Zapfino',
              'Zurich BlkEx BT',
              'Zurich Ex BT',
              'ZWAdobeF'
            ])),
            (a = (a = a.concat(t.fonts.userDefinedFonts)).filter(function (
              e,
              t
            ) {
              return a.indexOf(e) === t;
            }));
          var r = document.getElementsByTagName('body')[0],
            o = document.createElement('div'),
            i = document.createElement('div'),
            l = {},
            c = {},
            u = function () {
              var e = document.createElement('span');
              return (
                (e.style.position = 'absolute'),
                (e.style.left = '-9999px'),
                (e.style.fontSize = '72px'),
                (e.style.fontStyle = 'normal'),
                (e.style.fontWeight = 'normal'),
                (e.style.letterSpacing = 'normal'),
                (e.style.lineBreak = 'auto'),
                (e.style.lineHeight = 'normal'),
                (e.style.textTransform = 'none'),
                (e.style.textAlign = 'left'),
                (e.style.textDecoration = 'none'),
                (e.style.textShadow = 'none'),
                (e.style.whiteSpace = 'normal'),
                (e.style.wordBreak = 'normal'),
                (e.style.wordSpacing = 'normal'),
                (e.innerHTML = 'mmmmmmmmmmlli'),
                e
              );
            },
            s = function (e) {
              for (var t = !1, a = 0; a < n.length; a++)
                if (
                  (t =
                    e[a].offsetWidth !== l[n[a]] ||
                    e[a].offsetHeight !== c[n[a]])
                )
                  return t;
              return t;
            },
            d = (function () {
              for (var e = [], t = 0, a = n.length; t < a; t++) {
                var r = u();
                (r.style.fontFamily = n[t]), o.appendChild(r), e.push(r);
              }
              return e;
            })();
          r.appendChild(o);
          for (var g = 0, f = n.length; g < f; g++)
            (l[n[g]] = d[g].offsetWidth), (c[n[g]] = d[g].offsetHeight);
          var h = (function () {
            for (var e, t, r, o = {}, l = 0, c = a.length; l < c; l++) {
              for (var s = [], d = 0, g = n.length; d < g; d++) {
                var f =
                  ((e = a[l]),
                  (t = n[d]),
                  (r = void 0),
                  ((r = u()).style.fontFamily = "'" + e + "'," + t),
                  r);
                i.appendChild(f), s.push(f);
              }
              o[a[l]] = s;
            }
            return o;
          })();
          r.appendChild(i);
          for (var m = [], p = 0, v = a.length; p < v; p++)
            s(h[a[p]]) && m.push(a[p]);
          r.removeChild(i), r.removeChild(o), e(m);
        },
        pauseBefore: !0
      },
      {
        key: 'fontsFlash',
        getData: function (e, t) {
          return void 0 !== window.swfobject
            ? window.swfobject.hasFlashPlayerVersion('9.0.0')
              ? t.fonts.swfPath
                ? void (function (e, t) {
                    var n = '___fp_swf_loaded';
                    window[n] = function (t) {
                      e(t);
                    };
                    var a,
                      r = t.fonts.swfContainerId;
                    (a = document.createElement('div')).setAttribute(
                      'id',
                      (void 0).fonts.swfContainerId
                    ),
                      document.body.appendChild(a);
                    var o = { onReady: n };
                    window.swfobject.embedSWF(
                      t.fonts.swfPath,
                      r,
                      '1',
                      '1',
                      '9.0.0',
                      !1,
                      o,
                      { allowScriptAccess: 'always', menu: 'false' },
                      {}
                    );
                  })(function (t) {
                    e(t);
                  }, t)
                : e('missing options.fonts.swfPath')
              : e('flash not installed')
            : e('swf object not loaded');
        },
        pauseBefore: !0
      },
      {
        key: 'audio',
        getData: function (e, t) {
          var n = t.audio;
          if (
            n.excludeIOS11 &&
            navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)
          )
            return e(t.EXCLUDED);
          var a =
            window.OfflineAudioContext || window.webkitOfflineAudioContext;
          if (null == a) return e(t.NOT_AVAILABLE);
          var r = new a(1, 44100, 44100),
            o = r.createOscillator();
          (o.type = 'triangle'), o.frequency.setValueAtTime(1e4, r.currentTime);
          var i = r.createDynamicsCompressor();
          c(
            [
              ['threshold', -50],
              ['knee', 40],
              ['ratio', 12],
              ['reduction', -20],
              ['attack', 0],
              ['release', 0.25]
            ],
            function (e) {
              void 0 !== i[e[0]] &&
                'function' == typeof i[e[0]].setValueAtTime &&
                i[e[0]].setValueAtTime(e[1], r.currentTime);
            }
          ),
            o.connect(i),
            i.connect(r.destination),
            o.start(0),
            r.startRendering();
          var l = setTimeout(function () {
            return (
              console.warn(
                'Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' +
                  navigator.userAgent +
                  '".'
              ),
              (r.oncomplete = function () {}),
              (r = null),
              e('audioTimeout')
            );
          }, n.timeout);
          r.oncomplete = function (t) {
            var n;
            try {
              clearTimeout(l),
                (n = t.renderedBuffer
                  .getChannelData(0)
                  .slice(4500, 5e3)
                  .reduce(function (e, t) {
                    return e + Math.abs(t);
                  }, 0)
                  .toString()),
                o.disconnect(),
                i.disconnect();
            } catch (t) {
              return void e(t);
            }
            e(n);
          };
        }
      },
      {
        key: 'enumerateDevices',
        getData: function (e, t) {
          if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.enumerateDevices
          )
            return e(t.NOT_AVAILABLE);
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (t) {
              e(
                t.map(function (e) {
                  return (
                    'id=' +
                    e.deviceId +
                    ';gid=' +
                    e.groupId +
                    ';' +
                    e.kind +
                    ';' +
                    e.label
                  );
                })
              );
            })
            .catch(function (t) {
              e(t);
            });
        }
      }
    ],
    p = function (e) {
      throw new Error(
        "'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200"
      );
    };
  return (
    (p.get = function (e, t) {
      t ? e || (e = {}) : ((t = e), (e = {})),
        (function (e, t) {
          var n, a;
          if (null != t)
            for (a in t)
              null == (n = t[a]) ||
                Object.prototype.hasOwnProperty.call(e, a) ||
                (e[a] = n);
        })(e, l),
        (e.components = e.extraComponents.concat(m));
      var n = {
          data: [],
          addPreprocessedComponent: function (t, a) {
            'function' == typeof e.preprocessor && (a = e.preprocessor(t, a)),
              n.data.push({ key: t, value: a });
          }
        },
        a = -1,
        r = function (o) {
          if ((a += 1) >= e.components.length) t(n.data);
          else {
            var i = e.components[a];
            if (e.excludes[i.key]) r(!1);
            else {
              if (!o && i.pauseBefore)
                return (
                  (a -= 1),
                  void setTimeout(function () {
                    r(!0);
                  }, 1)
                );
              try {
                i.getData(function (e) {
                  n.addPreprocessedComponent(i.key, e), r(!1);
                }, e);
              } catch (o) {
                n.addPreprocessedComponent(i.key, String(o)), r(!1);
              }
            }
          }
        };
      r(!1);
    }),
    (p.getPromise = function (e) {
      return new Promise(function (t, n) {
        p.get(e, t);
      });
    }),
    (p.getV18 = function (e, t) {
      return (
        null == t && ((t = e), (e = {})),
        p.get(e, function (n) {
          for (var a = [], r = 0; r < n.length; r++) {
            var o = n[r];
            if (o.value === (e.NOT_AVAILABLE || 'not available'))
              a.push({ key: o.key, value: 'unknown' });
            else if ('plugins' === o.key)
              a.push({
                key: 'plugins',
                value: u(o.value, function (e) {
                  var t = u(e[2], function (e) {
                    return e.join ? e.join('~') : e;
                  }).join(',');
                  return [e[0], e[1], t].join('::');
                })
              });
            else if (-1 !== ['canvas', 'webgl'].indexOf(o.key))
              a.push({ key: o.key, value: o.value.join('~') });
            else if (
              -1 !==
              [
                'sessionStorage',
                'localStorage',
                'indexedDb',
                'addBehavior',
                'openDatabase'
              ].indexOf(o.key)
            ) {
              if (!o.value) continue;
              a.push({ key: o.key, value: 1 });
            } else
              o.value
                ? a.push(
                    o.value.join ? { key: o.key, value: o.value.join(';') } : o
                  )
                : a.push({ key: o.key, value: o.value });
          }
          var l = i(
            u(a, function (e) {
              return e.value;
            }).join('~~~'),
            31
          );
          t(l, a);
        })
      );
    }),
    (p.x64hash128 = i),
    (p.VERSION = '2.0.6'),
    p
  );
}),
  (function (e, t, n) {
    'use strict';
    function a() {
      for (var e = 1; e < arguments.length; e++)
        for (var t in arguments[e])
          arguments[e].hasOwnProperty(t) && (arguments[0][t] = arguments[e][t]);
      return arguments[0];
    }
    function r(e, t) {
      for (var n = 0; n < e.length; n++) if (e[n] === t) return !0;
      return !1;
    }
    function o(e) {
      return '[object Array]' === Object.prototype.toString.call(e);
    }
    function i() {
      return Math.max(
        t.documentElement.scrollHeight,
        t.body.scrollHeight,
        t.documentElement.offsetHeight,
        t.body.offsetHeight,
        t.documentElement.clientHeight
      );
    }
    function l() {
      return (
        e.innerHeight || t.documentElement.clientHeight || t.body.clientHeight
      );
    }
    function c() {
      return (
        e.pageYOffset ||
        ('CSS1Compat' === t.compatMode
          ? t.documentElement.scrollTop
          : t.body.scrollTop)
      );
    }
    function u(e) {
      return e.getBoundingClientRect().top + c();
    }
    function s(a) {
      return void 0 !== e.jQuery
        ? e.jQuery(a).get(0)
        : void 0 !== t.querySelector
        ? t.querySelector(a)
        : '#' == a.charAt(0)
        ? t.getElementById(a.substr(1))
        : n;
    }
    function d(t) {
      (w = !0),
        (function (e, t, n) {
          e.addEventListener
            ? e.addEventListener(t, n, !1)
            : e.attachEvent
            ? e.attachEvent('on' + t, n)
            : (e['on' + t] = n);
        })(e, 'scroll', t);
    }
    function g(t) {
      (w = !1),
        (function (e, t, n) {
          e.removeEventListener
            ? e.removeEventListener(t, n, !1)
            : e.detachEvent
            ? e.detachEvent('on' + t, n)
            : (e['on' + type] = null);
        })(e, 'scroll', t);
    }
    var f,
      h,
      m,
      p,
      v,
      T = {
        minHeight: 0,
        elements: [],
        percentage: !0,
        userTiming: !0,
        pixelDepth: !0,
        nonInteraction: !0,
        gaGlobal: !1,
        gtmOverride: !1
      },
      S = a({}, T),
      y = [],
      w = !1,
      A = 0,
      C = function (t) {
        function n(t, n, a, r) {
          p
            ? (p({
                event: 'ScrollDistance',
                eventCategory: 'Scroll Depth',
                eventAction: t,
                eventLabel: n,
                eventValue: 1,
                eventNonInteraction: S.nonInteraction
              }),
              S.pixelDepth &&
                arguments.length > 2 &&
                a > A &&
                ((A = a),
                p({
                  event: 'ScrollDistance',
                  eventCategory: 'Scroll Depth',
                  eventAction: 'Pixel Depth',
                  eventLabel: C(a),
                  eventValue: 1,
                  eventNonInteraction: S.nonInteraction
                })),
              S.userTiming &&
                arguments.length > 3 &&
                p({
                  event: 'ScrollTiming',
                  eventCategory: 'Scroll Depth',
                  eventAction: t,
                  eventLabel: n,
                  eventTiming: r
                }))
            : (f &&
                (e[m]('send', 'event', 'Scroll Depth', t, n, 1, {
                  nonInteraction: S.nonInteraction
                }),
                S.pixelDepth &&
                  arguments.length > 2 &&
                  a > A &&
                  ((A = a),
                  e[m](
                    'send',
                    'event',
                    'Scroll Depth',
                    'Pixel Depth',
                    C(a),
                    1,
                    { nonInteraction: S.nonInteraction }
                  )),
                S.userTiming &&
                  arguments.length > 3 &&
                  e[m]('send', 'timing', 'Scroll Depth', t, r, n)),
              h &&
                (_gaq.push([
                  '_trackEvent',
                  'Scroll Depth',
                  t,
                  n,
                  1,
                  S.nonInteraction
                ]),
                S.pixelDepth &&
                  arguments.length > 2 &&
                  a > A &&
                  ((A = a),
                  _gaq.push([
                    '_trackEvent',
                    'Scroll Depth',
                    'Pixel Depth',
                    C(a),
                    1,
                    S.nonInteraction
                  ])),
                S.userTiming &&
                  arguments.length > 3 &&
                  _gaq.push(['_trackTiming', 'Scroll Depth', t, r, n, 100])));
        }
        function o(e, t, a) {
          for (var o in e)
            if (e.hasOwnProperty(o)) {
              var i = e[o];
              !r(y, o) && t >= i && (n('Percentage', o, t, a), y.push(o));
            }
        }
        function w(e, t, a) {
          for (var o = 0; o < e.length; o++) {
            var i = e[o];
            if (!r(y, i)) {
              var l = 'string' == typeof i ? s(i) : i;
              l && t >= u(l) && (n('Elements', i, t, a), y.push(i));
            }
          }
        }
        function C(e) {
          return (250 * Math.floor(e / 250)).toString();
        }
        var E = +new Date();
        (S = a({}, T, t)),
          i() < S.minHeight ||
            (S.gaGlobal
              ? ((f = !0), (m = S.gaGlobal))
              : 'function' == typeof ga
              ? ((f = !0), (m = 'ga'))
              : 'function' == typeof __gaTracker &&
                ((f = !0), (m = '__gaTracker')),
            'undefined' != typeof _gaq &&
              'function' == typeof _gaq.push &&
              (h = !0),
            'function' == typeof S.eventHandler
              ? (p = S.eventHandler)
              : 'undefined' == typeof dataLayer ||
                'function' != typeof dataLayer.push ||
                S.gtmOverride ||
                (p = function (e) {
                  dataLayer.push(e);
                }),
            d(
              (v = (function (e, t) {
                var n,
                  a,
                  r,
                  o = null,
                  i = 0,
                  l = function () {
                    (i = new Date()), (o = null), (r = e.apply(n, a));
                  };
                return function () {
                  var t = new Date();
                  i || (i = t);
                  var c = 500 - (t - i);
                  return (
                    (n = this),
                    (a = arguments),
                    0 >= c
                      ? (clearTimeout(o),
                        (o = null),
                        (i = t),
                        (r = e.apply(n, a)))
                      : o || (o = setTimeout(l, c)),
                    r
                  );
                };
              })(function () {
                var e = i(),
                  t = l(),
                  n = c() + t,
                  a = (function (e) {
                    return {
                      '10%': parseInt(0.1 * e, 10),
                      '20%': parseInt(0.2 * e, 10),
                      '30%': parseInt(0.3 * e, 10),
                      '40%': parseInt(0.4 * e, 10),
                      '50%': parseInt(0.5 * e, 10),
                      '60%': parseInt(0.6 * e, 10),
                      '70%': parseInt(0.7 * e, 10),
                      '80%': parseInt(0.8 * e, 10),
                      '90%': parseInt(0.9 * e, 10),
                      '100%': e - 5
                    };
                  })(e),
                  r = +new Date() - E;
                return y.length >= 10 + S.elements.length
                  ? void g()
                  : (S.elements && w(S.elements, n, r),
                    void (S.percentage && o(a, n, r)));
              }))
            ));
      };
    (e.gascrolldepth = {
      init: C,
      reset: function () {
        (y = []), (A = 0), void 0 !== v && (g(v), d(v));
      },
      addElements: function (e) {
        if (void 0 !== e && o(e)) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            -1 == S.elements.indexOf(n) && S.elements.push(n);
          }
          w || d();
        }
      },
      removeElements: function (e) {
        if (void 0 !== e && o(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
              a = S.elements.indexOf(n);
            a > -1 && S.elements.splice(a, 1);
            var r = y.indexOf(n);
            r > -1 && y.splice(r, 1);
          }
      }
    }),
      void 0 !== e.jQuery && (e.jQuery.gascrolldepth = C);
  })(window, document),
  (function () {
    (window.userData = {
      fingerprint: {},
      document: { initTime: void 0, totalTime: void 0, scroll: {} }
    }),
      (window.userData.document.initTime = new Date());
    var e = {
        screen_resolution: !0,
        excludes: {
          webgl: !0,
          canvas: !0,
          audio: !0,
          fonts: !0,
          fontsFlash: !0,
          colorDepth: !0,
          deviceMemory: !0,
          hardwareConcurrency: !0,
          cpuClass: !0,
          plugins: !0,
          enumerateDevices: !0,
          hasLiedLanguages: !0,
          hasLiedResolution: !0,
          hasLiedOs: !0,
          hasLiedBrowser: !0,
          webglVendorAndRenderer: !0,
          userAgent: !0,
          language: !0
        }
      },
      t = {
        pixelDepth: !1,
        eventHandler: function (e) {
          window.userData.document.scroll[e.eventLabel] = e.eventTiming;
        }
      };
    window.requestIdleCallback
      ? requestIdleCallback(function () {
          Fingerprint2.get(e, function (e) {
            e.map(function (e) {
              window.userData.fingerprint[e.key] = e.value;
            });
          });
        })
      : setTimeout(function () {
          Fingerprint2.get(e, function (e) {
            e.map(function (e) {
              window.userData.fingerprint[e.key] = e.value;
            });
          });
        }, 500),
      gascrolldepth.init(t),
      document.addEventListener('submit', function (e) {
        (window.userData.document.totalTime =
          new Date() - window.userData.document.initTime),
          appendInputToForm(e.target, 'client_data', window.userData);
      });
    let n = document.getElementsByTagName('form');
    for (let e = 0; e < n.length; e++) {
      let t = n[e].querySelectorAll('a.order-btn');
      for (let e = 0; e < t.length; e++)
        t[e].addEventListener(
          'click',
          function (e) {
            (window.userData.document.totalTime =
              new Date() - window.userData.document.initTime),
              appendInputToForm(
                document.querySelector('form'),
                'client_data',
                window.userData
              );
          },
          !0
        );
    }
    document.referrer && appendInputToAllForms('referer', document.referrer);
  })();
