import pymysql
import os


config = {
    'mysql_gallery': {
        'host':'localhost',
        'user':'root',
        'password':'123456',
        'database':'pinkcandy_gallery'
    },
    'mysql_chat': {
        'host':'localhost',
        'user':'root',
        'password':'123456',
        'database':'pinkcandy_chat'
    },
    'backend-files': {
        'files_path': '',
        'backimage':'/backimage',
        'gallery':'/gallery',
        'GalleryPreview':'/GalleryPreview',
        'headimage': '/headimage',
    },
}

db_connection_gallery = pymysql.connect(
    host=config['mysql_gallery']['host'],
    user=config['mysql_gallery']['user'],
    password=config['mysql_gallery']['password'],
    database=config['mysql_gallery']['database']
)
cursor_gallery = db_connection_gallery.cursor()
db_connection_chat = pymysql.connect(
    host=config['mysql_chat']['host'],
    user=config['mysql_chat']['user'],
    password=config['mysql_chat']['password'],
    database=config['mysql_chat']['database']
)
cursor_chat = db_connection_chat.cursor()

def clear_artwork_info(id):
    try:
        cursor_gallery.execute("UPDATE gallery SET title='[内容违规]', info='[内容违规]' WHERE id=%s", (id,))
        db_connection_gallery.commit()
        print(f"作品 {id} 信息违规")
    except Exception as e:
        print(f"和谐作品信息失败: {e}")
        db_connection_gallery.rollback()

def delete_artwork(id):
    try:
        cursor_gallery.execute("SELECT filename FROM gallery WHERE id=%s", (id,))
        result = cursor_gallery.fetchone()
        if result:
            filename = result[0]
            file_path = os.path.join(config['backend-files']['files_path'], config['backend-files']['gallery'], filename)
            preview_path = os.path.join(config['backend-files']['files_path'], config['backend-files']['GalleryPreview'], filename)
            if os.path.exists(file_path): os.remove(file_path)
            if os.path.exists(preview_path): os.remove(preview_path)
        cursor_gallery.execute("DELETE FROM gallery_star WHERE galleryid=%s", (id,))
        cursor_gallery.execute("DELETE FROM gallery_paw WHERE galleryid=%s", (id,))
        cursor_gallery.execute("DELETE FROM gallery_comment WHERE galleryid=%s", (id,))
        cursor_gallery.execute("DELETE FROM tag_gallery WHERE galleryid=%s", (id,))
        cursor_gallery.execute("DELETE FROM gallery WHERE id=%s", (id,))
        db_connection_gallery.commit()
        print(f"作品 {id} 已删除")
    except Exception as e:
        print(f"删除作品失败: {e}")
        db_connection_gallery.rollback()

def delete_room(id):
    try:
        cursor_chat.execute("DELETE FROM message WHERE room_id=%s", (id,))
        cursor_chat.execute("DELETE FROM room_member WHERE room_id=%s", (id,))
        cursor_chat.execute("DELETE FROM room WHERE id=%s", (id,))
        db_connection_chat.commit()
        print(f"房间 {id} 已删除")
    except Exception as e:
        print(f"删除房间失败: {e}")
        db_connection_chat.rollback()

def clear_room_message_content(id):
    try:
        cursor_chat.execute("UPDATE message SET content='[内容违规]' WHERE room_id=%s", (id,))
        db_connection_chat.commit()
        print(f"房间 {id} 的所有消息违规")
    except Exception as e:
        print(f"和谐房间消息失败: {e}")
        db_connection_chat.rollback()

def clear_user_info(username):
    try:
        cursor_gallery.execute("SELECT headimage, backimage FROM user WHERE username=%s", (username,))
        result = cursor_gallery.fetchone()
        if result:
            headimage, backimage = result
            if headimage:
                headimage_path = os.path.join(config['backend-files']['files_path'], config['backend-files']['headimage'], headimage)
                if os.path.exists(headimage_path): os.remove(headimage_path)
            if backimage:
                backimage_path = os.path.join(config['backend-files']['files_path'], config['backend-files']['backimage'], backimage)
                if os.path.exists(backimage_path): os.remove(backimage_path)
        cursor_gallery.execute("UPDATE user SET name='[粉糖账号违规]', info='[粉糖账号信息违规]', headimage=NULL, backimage=NULL, sex=NULL, species=NULL WHERE username=%s", (username,))
        cursor_gallery.execute("UPDATE board SET content='[内容违规]' WHERE username=%s", (username,))
        db_connection_gallery.commit()
        print(f"粉糖账号 {username} 信息违规")
    except Exception as e:
        print(f"和谐粉糖账号信息失败: {e}")
        db_connection_gallery.rollback()

def delete_user(username):
    try:
        cursor_chat.execute("DELETE FROM message WHERE username=%s", (username,))
        cursor_chat.execute("DELETE FROM room_member WHERE username=%s", (username,))
        cursor_chat.execute("SELECT id FROM room WHERE owner_username=%s", (username,))
        for room in cursor_chat.fetchall():
            delete_room(room[0])
        cursor_gallery.execute("SELECT id FROM gallery WHERE username=%s", (username,))
        for artwork in cursor_gallery.fetchall():
            delete_artwork(artwork[0])
        cursor_gallery.execute("DELETE FROM gallery_comment WHERE username=%s", (username,))
        cursor_gallery.execute("DELETE FROM gallery_star WHERE username=%s", (username,))
        cursor_gallery.execute("DELETE FROM gallery_paw WHERE username=%s", (username,))
        cursor_gallery.execute("DELETE FROM board WHERE username=%s", (username,))
        cursor_gallery.execute("DELETE FROM user_watch WHERE username=%s OR watcher=%s", (username, username))
        cursor_gallery.execute("DELETE FROM user_active WHERE username=%s", (username,))
        cursor_gallery.execute("DELETE FROM user WHERE username=%s", (username,))
        db_connection_gallery.commit()
        db_connection_chat.commit()
        print(f"粉糖账号 {username} 及其所有关联已删除")
    except Exception as e:
        print(f"删除粉糖账号失败: {e}")
        db_connection_gallery.rollback()
        db_connection_chat.rollback()

def change_tag(oldtag, newtag):
    try:
        cursor_gallery.execute("UPDATE tag SET tag=%s WHERE tag=%s", (newtag, oldtag))
        db_connection_gallery.commit()
        print(f"标签 '{oldtag}' 已修改为 '{newtag}'")
    except Exception as e:
        print(f"修改标签失败: {e}")
        db_connection_gallery.rollback()

if __name__=='__main__':
    print('===幻想动物画廊管理员命令行===')
    while True:
        print("\n1.和谐作品信息 2.删除作品 3.删除房间 4.和谐房间消息 5.和谐粉糖账号信息 6.删除粉糖账号 7.修改标签 0.退出")
        choice = input("选择: ").strip()
        if choice == '0': break
        elif choice == '1': clear_artwork_info(input("作品ID: "))
        elif choice == '2': delete_artwork(input("作品ID: "))
        elif choice == '3': delete_room(input("房间ID: "))
        elif choice == '4': clear_room_message_content(input("房间ID: "))
        elif choice == '5': clear_user_info(input("粉糖账号: "))
        elif choice == '6': delete_user(input("粉糖账号: "))
        elif choice == '7': change_tag(input("原标签: "), input("新标签: "))
        else: print("无效选择")
