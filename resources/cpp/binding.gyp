{
  "targets": [
    {
      'target_name': "people-detector",
      'cflags!': [ "-fno-exceptions" ],
      'cflags': [ "-std=c++11", "-DJSON_IS_AMALGAMATION" ], 
      'cflags_cc!': [ "-fno-exceptions" ],
      'sources': [ "src/addon.cpp", "src/yolo_cpu.cpp", "src/jsoncpp.cpp" ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")", "`pkg-config --cflags opencv4`", "-Isrc" ],
      'libraries': [ "`pkg-config --libs opencv4`" ], 
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
