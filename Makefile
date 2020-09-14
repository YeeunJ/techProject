all:
	g++ -o resources/cpp/people-detector/people-detector.out resources/cpp/people-detector/src/yolo_cpu.cpp resources/cpp/people-detector/src/main.cpp -std=c++11 `pkg-config --cflags --libs opencv4` `pkg-config --cflags --libs jsoncpp`

clean:
	rm -f resources/cpp/people-detector/people-detector.out
