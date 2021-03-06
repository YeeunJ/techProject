#ifndef YOLO_CPU
#define YOLO_CPU

#include <cstdio>
#include <cstdlib>
#include <vector>
#include <string>

#include <opencv2/core/mat.hpp>
#include <opencv2/dnn.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgcodecs.hpp>

#include <jsoncpp/json/json.h>

using namespace std;
using namespace cv;
using namespace dnn;

class Yolo_cpu {
    private:
        string MODEL_PATH;
        string CFG_PATH;
        string CLASSES_PATH;
        float confThreshold = 0.4;
        float nmsThreshold = 0.5;
        Net net;
        vector<cv::String> outNames;
        
    public:
        Yolo_cpu(const string rootPath);
        int doInference(const string inputImagePath, const string outputImagePath, const int resize, const string roiInfo);

    private:
        void preProcess(Mat& frame, const int& camID, const int& resize, const string& roiInfo);
        int postProcess(Mat& frame, const vector<Mat>& outs);
};

#endif
