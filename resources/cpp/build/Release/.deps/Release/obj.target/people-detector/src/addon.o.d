cmd_Release/obj.target/people-detector/src/addon.o := g++ -o Release/obj.target/people-detector/src/addon.o ../src/addon.cpp '-DNODE_GYP_MODULE_NAME=people-detector' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DNAPI_DISABLE_CPP_EXCEPTIONS' '-DBUILDING_NODE_EXTENSION' -I/home/ws/.cache/node-gyp/12.18.3/include/node -I/home/ws/.cache/node-gyp/12.18.3/src -I/home/ws/.cache/node-gyp/12.18.3/deps/openssl/config -I/home/ws/.cache/node-gyp/12.18.3/deps/openssl/openssl/include -I/home/ws/.cache/node-gyp/12.18.3/deps/uv/include -I/home/ws/.cache/node-gyp/12.18.3/deps/zlib -I/home/ws/.cache/node-gyp/12.18.3/deps/v8/include -I/home/ws/techProject/node_modules/node-addon-api -I../`pkg-config --cflags opencv4` -I../-Isrc  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -std=c++11 -DJSON_IS_AMALGAMATION -O3 -fno-omit-frame-pointer -fno-rtti -std=gnu++1y -MMD -MF ./Release/.deps/Release/obj.target/people-detector/src/addon.o.d.raw   -c
Release/obj.target/people-detector/src/addon.o: ../src/addon.cpp \
 /home/ws/techProject/node_modules/node-addon-api/napi.h \
 /home/ws/.cache/node-gyp/12.18.3/include/node/node_api.h \
 /home/ws/.cache/node-gyp/12.18.3/include/node/js_native_api.h \
 /home/ws/.cache/node-gyp/12.18.3/include/node/js_native_api_types.h \
 /home/ws/.cache/node-gyp/12.18.3/include/node/node_api_types.h \
 /home/ws/techProject/node_modules/node-addon-api/napi-inl.h \
 /home/ws/techProject/node_modules/node-addon-api/napi-inl.deprecated.h \
 ../src/yolo_cpu.hpp /usr/local/include/opencv4/opencv2/core/mat.hpp \
 /usr/local/include/opencv4/opencv2/core/matx.hpp \
 /usr/local/include/opencv4/opencv2/core/cvdef.h \
 /usr/local/include/opencv4/opencv2/core/hal/interface.h \
 /usr/local/include/opencv4/opencv2/core/cv_cpu_dispatch.h \
 /usr/local/include/opencv4/opencv2/core/base.hpp \
 /usr/local/include/opencv4/opencv2/opencv_modules.hpp \
 /usr/local/include/opencv4/opencv2/core/cvstd.hpp \
 /usr/local/include/opencv4/opencv2/core/cvstd_wrapper.hpp \
 /usr/local/include/opencv4/opencv2/core/neon_utils.hpp \
 /usr/local/include/opencv4/opencv2/core/vsx_utils.hpp \
 /usr/local/include/opencv4/opencv2/core/check.hpp \
 /usr/local/include/opencv4/opencv2/core/traits.hpp \
 /usr/local/include/opencv4/opencv2/core/saturate.hpp \
 /usr/local/include/opencv4/opencv2/core/fast_math.hpp \
 /usr/local/include/opencv4/opencv2/core/types.hpp \
 /usr/local/include/opencv4/opencv2/core/bufferpool.hpp \
 /usr/local/include/opencv4/opencv2/core/mat.inl.hpp \
 /usr/local/include/opencv4/opencv2/dnn.hpp \
 /usr/local/include/opencv4/opencv2/dnn/dnn.hpp \
 /usr/local/include/opencv4/opencv2/core.hpp \
 /usr/local/include/opencv4/opencv2/core/version.hpp \
 /usr/local/include/opencv4/opencv2/core/persistence.hpp \
 /usr/local/include/opencv4/opencv2/core/operations.hpp \
 /usr/local/include/opencv4/opencv2/core/cvstd.inl.hpp \
 /usr/local/include/opencv4/opencv2/core/utility.hpp \
 /usr/local/include/opencv4/opencv2/core/optim.hpp \
 /usr/local/include/opencv4/opencv2/core/ovx.hpp \
 /usr/local/include/opencv4/opencv2/core/cvdef.h \
 /usr/local/include/opencv4/opencv2/core/async.hpp \
 /usr/local/include/opencv4/opencv2/dnn/../dnn/version.hpp \
 /usr/local/include/opencv4/opencv2/dnn/dict.hpp \
 /usr/local/include/opencv4/opencv2/dnn/layer.hpp \
 /usr/local/include/opencv4/opencv2/dnn/dnn.inl.hpp \
 /usr/local/include/opencv4/opencv2/dnn/utils/inference_engine.hpp \
 /usr/local/include/opencv4/opencv2/dnn/utils/../dnn.hpp \
 /usr/local/include/opencv4/opencv2/imgproc.hpp \
 /usr/local/include/opencv4/opencv2/highgui.hpp \
 /usr/local/include/opencv4/opencv2/imgcodecs.hpp \
 /usr/local/include/opencv4/opencv2/videoio.hpp ../src/json/json.h
../src/addon.cpp:
/home/ws/techProject/node_modules/node-addon-api/napi.h:
/home/ws/.cache/node-gyp/12.18.3/include/node/node_api.h:
/home/ws/.cache/node-gyp/12.18.3/include/node/js_native_api.h:
/home/ws/.cache/node-gyp/12.18.3/include/node/js_native_api_types.h:
/home/ws/.cache/node-gyp/12.18.3/include/node/node_api_types.h:
/home/ws/techProject/node_modules/node-addon-api/napi-inl.h:
/home/ws/techProject/node_modules/node-addon-api/napi-inl.deprecated.h:
../src/yolo_cpu.hpp:
/usr/local/include/opencv4/opencv2/core/mat.hpp:
/usr/local/include/opencv4/opencv2/core/matx.hpp:
/usr/local/include/opencv4/opencv2/core/cvdef.h:
/usr/local/include/opencv4/opencv2/core/hal/interface.h:
/usr/local/include/opencv4/opencv2/core/cv_cpu_dispatch.h:
/usr/local/include/opencv4/opencv2/core/base.hpp:
/usr/local/include/opencv4/opencv2/opencv_modules.hpp:
/usr/local/include/opencv4/opencv2/core/cvstd.hpp:
/usr/local/include/opencv4/opencv2/core/cvstd_wrapper.hpp:
/usr/local/include/opencv4/opencv2/core/neon_utils.hpp:
/usr/local/include/opencv4/opencv2/core/vsx_utils.hpp:
/usr/local/include/opencv4/opencv2/core/check.hpp:
/usr/local/include/opencv4/opencv2/core/traits.hpp:
/usr/local/include/opencv4/opencv2/core/saturate.hpp:
/usr/local/include/opencv4/opencv2/core/fast_math.hpp:
/usr/local/include/opencv4/opencv2/core/types.hpp:
/usr/local/include/opencv4/opencv2/core/bufferpool.hpp:
/usr/local/include/opencv4/opencv2/core/mat.inl.hpp:
/usr/local/include/opencv4/opencv2/dnn.hpp:
/usr/local/include/opencv4/opencv2/dnn/dnn.hpp:
/usr/local/include/opencv4/opencv2/core.hpp:
/usr/local/include/opencv4/opencv2/core/version.hpp:
/usr/local/include/opencv4/opencv2/core/persistence.hpp:
/usr/local/include/opencv4/opencv2/core/operations.hpp:
/usr/local/include/opencv4/opencv2/core/cvstd.inl.hpp:
/usr/local/include/opencv4/opencv2/core/utility.hpp:
/usr/local/include/opencv4/opencv2/core/optim.hpp:
/usr/local/include/opencv4/opencv2/core/ovx.hpp:
/usr/local/include/opencv4/opencv2/core/cvdef.h:
/usr/local/include/opencv4/opencv2/core/async.hpp:
/usr/local/include/opencv4/opencv2/dnn/../dnn/version.hpp:
/usr/local/include/opencv4/opencv2/dnn/dict.hpp:
/usr/local/include/opencv4/opencv2/dnn/layer.hpp:
/usr/local/include/opencv4/opencv2/dnn/dnn.inl.hpp:
/usr/local/include/opencv4/opencv2/dnn/utils/inference_engine.hpp:
/usr/local/include/opencv4/opencv2/dnn/utils/../dnn.hpp:
/usr/local/include/opencv4/opencv2/imgproc.hpp:
/usr/local/include/opencv4/opencv2/highgui.hpp:
/usr/local/include/opencv4/opencv2/imgcodecs.hpp:
/usr/local/include/opencv4/opencv2/videoio.hpp:
../src/json/json.h:
