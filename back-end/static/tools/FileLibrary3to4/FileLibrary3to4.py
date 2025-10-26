# 文件结构第三版迁移至第四版

import os
import shutil

os.mkdir('./files')
os.mkdir('./files/backimage')
os.mkdir('./files/gallery')
os.mkdir('./files/GalleryPreview')
os.mkdir('./files/garden')
os.mkdir('./files/headimage')
os.mkdir('./files/tmp')

files3_backImage = os.listdir('./fileLibrary/backImage')
files3_gallery = os.listdir('./fileLibrary/gallery')
files3_galleryThumb = os.listdir('./fileLibrary/galleryThumb')
files3_headImage = os.listdir('./fileLibrary/headImage')
files3_posts = os.listdir('./fileLibrary/posts')

for file in files3_backImage:
    oldpath = './fileLibrary/backImage/'+file
    newpath = './files/backimage/'+file
    shutil.copy(oldpath,newpath)

for file in files3_headImage:
    oldpath = './fileLibrary/headImage/'+file
    newpath = './files/headimage/'+file
    shutil.copy(oldpath,newpath)

for username in files3_gallery:
    for file in os.listdir('./fileLibrary/gallery/'+username):
        oldpath = './fileLibrary/gallery/'+username+'/'+file
        newpath = './files/gallery/'+file
        shutil.copy(oldpath,newpath)

for username in files3_galleryThumb:
    for file in os.listdir('./fileLibrary/galleryThumb/'+username):
        oldpath = './fileLibrary/galleryThumb/'+username+'/'+file
        newpath = './files/GalleryPreview/'+file
        shutil.copy(oldpath,newpath)

for username in files3_posts:
    for file in os.listdir('./fileLibrary/posts/'+username):
        oldpath = './fileLibrary/posts/'+username+'/'+file
        newpath = './files/garden/'+file
        shutil.copy(oldpath,newpath)
