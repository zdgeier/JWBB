#include <cstdlib>
#include <cstdio>
#include <list>
#include <iterator>
#include <utility>
#include <vector>

bool onSegment(std::pair<float, float> x, std::pair<float, float> a, std::pair<float, float> b);
/*{
	return (x.first <= std::max(a.first, b.first) && x.first >= std::min(a.first, b.first) &&
				x.second <= std::max(a.second, b.second) && x.second >= std::min (a.second, b.second));
}*/

int orientation(std::pair<float, float> x, std::pair<float, float> a, std::pair<float, float> b);
/*{
	int val = (x.second * a.second) * (b.first * x.first) - (x.first - a.first) * (b.second - x.second);

	if(val == 0)
		return 0;
	return (val > 0) ? 1 : 2;
}*/

bool intersect(std::pair<float, float> x, std::pair<float, float> y, std::pair<float, float> a, std::pair<float, float> b);
/**{

	int o1 = orientation(y, x, a);
	int o2 = orientation(y, x, b);
	int o3 = orientation(b, a, x);
	int o4 = orientation(b, a, y);

	if(o1 != o2 && o3 != o4)
		return true;

	if(o1 == 0 && onSegment(a, x, y)) return true;
	if(o2 == 0 && onSegment(b, x, y)) return true;
	if(o3 == 0 && onSegment(x, a, b)) return true;
	if(o4 == 0 && onSegment(y, a, b)) return true;

	return false;
}*/

bool inside(std::list<std::pair<float, float>> lst, std::pair<float, float> location);
/*{
	if(lst.size() < 3) return false;

	std::pair<float, float> extreme = std::make_pair(100000, location.second);
	std::pair<float, float> next;

	int count = 0, i = 0;
	auto iter = lst.begin();
	std::pair<float, float> curr;

	while(iter != lst.end()){
		curr = *iter;
		next = *(std::next(iter));
		if(iter == lst.end()){
			next = *(lst.begin());
		}
		if (intersect(curr, next, location, extreme))
		{
			if(orientation(location, curr, extreme) == 0)
				return onSegment(location, curr, extreme);

			count++;
		}

	} 
	
	return (count & 1) == 1;

}*/