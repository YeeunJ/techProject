all:
	g++ -o people-detector.out src/yolo_cpu.cpp src/main.cpp -std=c++11 `pkg-config --cflags --libs opencv4` `pkg-config --cflags --libs jsoncpp`

clean:
	rm -f people-detector.out
