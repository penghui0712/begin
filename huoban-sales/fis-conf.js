/*var config = {
  release: {
    assets: "",
    page: "",
    base: "pkg/base_pkg.js"
  },
  idMaps: [{
    reg: /^\/page\/((?:[^\/]+\/)*)([^\/]+)\/\2\..*$/i,
    id: 'page/$1$2'
  }, {
    reg: /^\/page\/(.*)\..*$/i,
    id: 'page/$1'
  }, {
    reg: /^\/widget\/((?:[^\/]+\/)*)([^\/]+)\/\2\..*$/i,
    id: '$1$2'
  }, {
    reg: /^\/widget\/(.*)\..*$/i,
    id: '$1'
  }]
};

fis.hook('commonjs', {});
fis.match('::packager', {
  postpackager: [fis.plugin('ousiri-loader', {
    allInOne: false,
    resourceType: 'mod',
    processor: {
      '.html': 'html'
    },
    useInlineMap: true
  })]
});
fis.set('project.ignore', ['node_modules/!**', 'output/!**', '.git/!**', 'fis-conf.js', 'dist/!**', 'docs/!**', 'falseData/!**']);
fis.match('**!/!*',{
  release: config.release.assets + '$0'
});
fis.match("backup/!**", {
  release: false
});

fis.match("**!/!*.{bat,md,sh,conf}", {
  release: false
});
fis.match("tasvir.config.js", {
  release: false
});
fis.match("gulpfile.js", {
  release: false
});
fis.match("package.json", {
  release: false
});

fis.match('{widget,page}/!**!/!*.html', {
  postprocessor: fis.plugin('bem-replace', {
    rules: config.idMaps
  }),
  release: config.release.page + '$0'
});

//fis.match('page/index/index.html', {
//    release: config.release.page + 'index.html'
//});

fis.match('**!/!*.scss', {
  rExt: '.css',
  parser: [fis.plugin('node-sass'), fis.plugin('cssnext', {
    features: {
      rem: false
    }
  })],
  postprocessor: [fis.plugin('bem-replace', {
    rules: config.idMaps
  })]
});

//fis.match('**!/!*.less', {
//    rExt: '.css',
//    parser: [fis.plugin('less'), fis.plugin('cssnext', {
//        features: {
//            rem: false
//        }
//    })],
//    postprocessor: [fis.plugin('bem-replace', {
//        rules: config.idMaps
//    })]
//});

fis.match(/^\/((widget|page)\/(.*)(Async.scss))$/i, {
  isMod: false,
  useMap: true,
  //isJsLike: true,
  //type: 'js',
  //rExt: 'js',
  release: config.release.assets+'$0.js',
  useSameNameRequire: true,
  parser: [
    fis.plugin('less'),
    fis.plugin('cssnext', {
      features: {
        rem: false
      }
    })
  ],
  postprocessor: [
    fis.plugin('csswrapper', {
      isMod: true
    }),
    fis.plugin('bem-replace', {
      rules: config.idMaps
    })
  ],
  id: '$1',
  moduleId: '$1'
});

fis.match('{page,widget}/{**!/!*.js,*.js}', {
  isMod: true,
  useMap: true,
  useSameNameRequire: true,
  postprocessor: fis.plugin('bem-replace', {
    rules: config.idMaps
  })
});

fis.match('**!/!*.inline.js', {
  isMod: false
});

fis.match('{page,widget,static}/{**!/!*.js,*.js}', {
  optimizer: fis.plugin('babel', {
    compact: false,
    sourceMaps: true,
    blacklist: ["useStrict"]
  })
});

fis.match('{jquery,vue,highcharts,moment,swiper,easyAutocomplete,polyfill,mod,echarts}.js', {
  isES6: false
});

fis.match('{widget/webim/!**!/!*,im.core,protobuf.min}.js', {
  isMod: false,
  isES6: false
});

fis.match('widget/webuploader/!*.js', {
  isES6: false
});

fis.match(/^\/page\/(.*)\.(js|coffee)$/i, {
  id: 'page/$1'
});

fis.match(/^\/page\/((?:[^\/]+\/)*)([^\/]+)\/\2\.(js|coffee)$/i, {
  id: 'page/$1$2'
});

fis.match(/^\/widget\/(.*)\.(js|coffee)$/i, {
  id: '$1'
});

fis.match(/^\/widget\/((?:[^\/]+\/)*)([^\/]+)\/\2\.(js|coffee)$/i, {
  id: '$1$2'
});
//
//fis.match(/^\/((widget|page)\/(.*)\.(tpl))$/i, {
//    postprocessor: fis.plugin('bem-replace', {
//        rules: config.idMaps
//    })
//});

fis.match(/^\/((widget|page)\/(.*)\.(tpl))$/i, {
  isMod: true,
  useMap: true,
  isJsLike: true,
  type: 'js',
  rExt: 'js',
  release: config.release.assets+'$0.js',
  useSameNameRequire: true,
  parser: fis.plugin('rabbitpre-tpl'),
  postprocessor: fis.plugin('bem-replace', {
    rules: config.idMaps
  }),
  id: '$1',
  moduleId: '$1'
});
fis.match(/^\/widget\/(.*)\.(tpl)$/i, {
  id: '$1.tpl',
  moduleId: '$1.tpl'
});

// here goes the publish config

fis.media('publish').match('::package', {
  postpackager: fis.plugin('ousiri-loader', {
    allInOne: {
      ignore: ['widget/vue/vue.js', 'static/mod.js', 'widget/zepto/zepto.js'],
      noJsComment: true
    },
    resourceType: 'mod',
    processor: {
      '.html': 'html'
    },
    useInlineMap: true,
    cssInline: true
  })
}).match('*.{js,tpl}', {
  optimizer: [fis.plugin('babel', {
    blacklist: ["useStrict"]
  }), fis.plugin('uglify-js')]
}).match('widget/echarts.js', {
  optimizer: []
}).match('*.{css,scss,less}', {
  optimizer: fis.plugin('clean-css', {
    keepSpecialComments: 0
  })
}).match('*.{png}', {
  optimizer: fis.plugin('png-compressor')
}).match('*.{html,jade}', {
  optimizer: fis.plugin('html-minifier')
}).match('*.{js,css,scss,less,png,jpg,gif,tpl}', {
  useHash: true
}).match('*.{mp3,eot,svg,ttf,woff}', {
  useHash: true
}).match('static/mod.js', {
  packTo: config.release.base,
  packOrder: -100
})/!*.match('static/polyfill.js', {
 packTo: config.release.base,
 packOrder: -99
 })*!/.match('widget/jquery/jquery.js', {
    packTo: config.release.base
  }).match('widget/webim/!**!/!*', {
    useHash: false
  })/!*.match('widget/vue/vue.js', {
 packTo: config.release.base
 })/!*.match('widget/vue/router.js', {
 packTo: config.release.base
 })*!/;*/
// default settings. fis3 release

// Global start
fis.match('*.{js,css,gif}', {
  useHash: true
}).match('libs/**', {
  useHash: false
});

/*fis.match('::image', {
  useHash: true
});*/

/*fis.match("laydate.css", {
  useHash: false
});
fis.match("laydate.css", {
  release: false
});
fis.match("laydate_default.css", {
  useHash: false
});
fis.match("laydate_default.css", {
  release: false
});*/



/*fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});*/


/*
fis.match("laydate.css", {
  release: false
});
fis.match("laydate_default.css", {
  useHash: false
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});
*/


// Global end

// default media is `dev`
/*
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');
*/








/*fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});*/


fis.match('::packager', {
  postpackager: [fis.plugin('ousiri-loader', {
    allInOne: false,
    resourceType: 'mod',
    processor: {
      '.html': 'html'
    },
    useInlineMap: true
  })]
});


/*
fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});
*/










