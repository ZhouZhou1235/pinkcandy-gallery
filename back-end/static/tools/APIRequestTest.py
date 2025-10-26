# 接口请求测试

import requests
import json

host = "http://gallery-system.pinkcandy.top"

# 获取用户10002
res = requests.get(host+"/core/getUser/10002")
print(json.dumps(json.loads(res.text),indent=4))

# 获取作品 id=gallery7000756624
res = requests.get(host+"/core/getArtwork/?id=gallery7000756624")
print(json.dumps(json.loads(res.text),indent=4))

# 获取用户10002的最近3个作品
res = requests.get(host+"/core/getArtworks/?begin=0&num=3&username=10002")
print(json.dumps(json.loads(res.text),indent=4))

# 默认获取最近的作品
res = requests.get(host+"/core/getArtworks")
print(json.dumps(json.loads(res.text),indent=4))

# 默认获取最近的标签
res = requests.get(host+"/core/getTags")
print(json.dumps(json.loads(res.text),indent=4))

# 来点粉糖 搜索关键字“小蓝狗、白白、煎饼”
searchtext = '小蓝狗 白白 煎饼'
res = requests.get(host+f"/core/searchPinkCandy?searchtext={searchtext}")
print(json.dumps(json.loads(res.text),indent=4))
# 来点粉糖对搜索粉糖画廊全站资源 返回的数据包格式如下 {...}
# {
#     artwork: [{
#         id: '',
#         username: '',
#         filename: '',
#         title: '',
#         info: '',
#         time: '',
#     }],
#     plantpot: [{
#         id: '',
#         username: '',
#         filename: '',
#         title: '',
#         content: '',
#         createtime: '',
#         updatetime: '',
#     }],
#     user: [{
#         username: '',
#         name: '',
#         jointime: '',
#         info: '',
#         headimage: '',
#         backimage: '',
#         sex: '',
#         species: '',
#     }],
# }
