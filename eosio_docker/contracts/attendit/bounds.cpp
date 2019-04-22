#include <algorithm>
#include <iterator>
#include <list>
#include <stdio.h>
#include <time.h>
#include <utility>
#include <vector>

// Given three colinear points x, a, b,
// Check is point x lies on line segment ab
bool onSegment(std::pair<float, float> x, std::pair<float, float> a,
               std::pair<float, float> b) {
    return (x.first <= std::max(a.first, b.first) &&
            x.first >= std::min(a.first, b.first) &&
            x.second <= std::max(a.second, b.second) &&
            x.second >= std::min(a.second, b.second));
}

// To find orientation of oredered triplet (x, a, b).
// The function returns following values
// 0 --> x, a, b, are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
float orientation(std::pair<float, float> x, std::pair<float, float> a,
                  std::pair<float, float> b) {
    float val = (x.second - a.second) * (b.first - x.first) -
                (x.first - a.first) * (b.second - x.second);

    if (val == 0)
        return 0;
    return (val > 0) ? 1 : 2;
}

bool intersect(std::pair<float, float> x, std::pair<float, float> y,
               std::pair<float, float> a, std::pair<float, float> b) {

    float o1 = orientation(y, x, a);
    float o2 = orientation(y, x, b);
    float o3 = orientation(b, a, x);
    float o4 = orientation(b, a, y);

    if (o1 != o2 && o3 != o4)
        return true;

    if (o1 == 0 && onSegment(a, x, y))
        return true;
    if (o2 == 0 && onSegment(b, x, y))
        return true;
    if (o3 == 0 && onSegment(x, a, b))
        return true;
    if (o4 == 0 && onSegment(y, a, b))
        return true;

    return false;
}

bool inside(std::list<std::pair<float, float>> lst,
            std::pair<float, float> location) {
    if (lst.size() < 3)
        return false;

    std::pair<float, float> extreme = std::make_pair(100000.0, location.second);
    std::pair<float, float> next;

    float count = 0, i = 0;
    auto iter = lst.begin();
    std::pair<float, float> curr;

    do {
        curr = *iter;
        if (std::next(iter) == lst.end()) {
            next = *(lst.begin());
        } 
        else {
            next = *(std::next(iter));
        }
        
        if (intersect(curr, next, location, extreme)) {
            if (orientation(location, curr, next) == 0)
                return onSegment(location, curr, next);

            count++;
        }
        std::advance(iter, 1);
    } while (iter != lst.end());
    return (int(count) % 2) == 1;
}
