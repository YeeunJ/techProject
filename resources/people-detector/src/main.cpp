#include "yolo_cpu.hpp"

int main(int argc, char* argv[]) {
    if (argc != 5 && argc != 6) {
        printf("people-detector: Wrong number of arguments\n");
        printf(" ./people-detector.out <arg1> <arg2> <arg3> <arg4>\n");
        printf("  <arg1>- relative path of \"people-detector\" directory (don't put \"/\")\n");
        printf("  <arg2>- input image path + file name\n");
        printf("  <arg3>- output image path + file name\n");
        printf("  <arg4>- ROI information with json form\n");
        return -1;
    }
    string rootPath = string(argv[1]);
    string inputImagePath = string(argv[2]);
    string outputImagePath = string(argv[3]);
    int resize = atoi(argv[4]);
    string roiInfo = " ";
    if (argc == 6)
        roiInfo = string(argv[5]);
    
    Yolo_cpu yolo(rootPath);
    return yolo.doInference(inputImagePath, outputImagePath, resize, roiInfo);
}