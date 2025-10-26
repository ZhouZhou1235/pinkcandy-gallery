// ORM 数据模型

import { DataTypes } from "sequelize";
import sqllize from "./orm_sequelize.js";

export const tableName = {
    user: 'user',
    gallery: 'gallery',
    tag: 'tag',
    tag_gallery: 'tag_gallery',
    garden: 'garden',
    tag_garden: 'tag_garden',
    board: 'board',
    gallery_comment: 'gallery_comment',
    gallery_paw: 'gallery_paw',
    gallery_star: 'gallery_star',
    user_watch: 'user_watch',
    garden_comment: 'garden_comment',
    garden_paw: 'garden_paw',
    garden_star: 'garden_star',
    garden_comment_reply: 'garden_comment_reply',
    user_active: 'user_active',
};

export const User = sqllize.define(tableName.user,
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jointime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        headimage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        backimage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    // 禁用时间戳
    {timestamps: false,tableName: tableName.user},
);

export const Gallery = sqllize.define(tableName.gallery,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.gallery},
);

export const Tag = sqllize.define(tableName.tag,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {timestamps: false,tableName: tableName.tag},
);

export const TagGallery = sqllize.define(tableName.tag_gallery,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        tagid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        galleryid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.tag_gallery},
);

export const Garden = sqllize.define(tableName.garden,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createtime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatetime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.garden},
);

export const TagGarden = sqllize.define(tableName.tag_garden,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        tagid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gardenid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.tag_garden},
);

export const Board = sqllize.define(tableName.board,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.board},
);

export const GalleryComment = sqllize.define(tableName.gallery_comment,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        galleryid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.gallery_comment},
);

export const GalleryPaw = sqllize.define(tableName.gallery_paw,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        galleryid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.gallery_paw},
);

export const GalleryStar = sqllize.define(tableName.gallery_star,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        galleryid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.gallery_star},
);

export const UserWatch = sqllize.define(tableName.user_watch,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        watcher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.user_watch},
);

export const GardenComment = sqllize.define(tableName.garden_comment,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        gardenid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.garden_comment},
);

export const GardenPaw = sqllize.define(tableName.garden_paw,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gardenid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.garden_paw},
);

export const GardenStar = sqllize.define(tableName.garden_star,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gardenid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.garden_star},
);

export const GardenCommentReply = sqllize.define(tableName.garden_comment_reply,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        commentid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.garden_comment_reply},
);

export const UserActive = sqllize.define(tableName.user_active,
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        noticetime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        trendstime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        mediatime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {timestamps: false,tableName: tableName.user_active},
);
