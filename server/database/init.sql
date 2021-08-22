/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯云轻量应用服务器
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 81.70.194.45:3306
 Source Schema         : april

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 18/08/2021 21:55:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_element
-- ----------------------------
DROP TABLE IF EXISTS `system_element`;
CREATE TABLE `system_element`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-页面元素表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_element
-- ----------------------------

-- ----------------------------
-- Table structure for system_file
-- ----------------------------
DROP TABLE IF EXISTS `system_file`;
CREATE TABLE `system_file`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-文件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_file
-- ----------------------------

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '父菜单Id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单地址',
  `type` enum('directory','menu') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型，directory：目录、menu：菜单',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '对应图标',
  `order_num` int NULL DEFAULT NULL COMMENT '排序',
  `view_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视图地址，对应vue文件',
  `keepalive` tinyint(1) NULL DEFAULT NULL COMMENT '路由是否缓存',
  `is_hidden` tinyint(1) NULL DEFAULT NULL COMMENT '是否显示在菜单栏',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-菜单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES ('0a23246d-81f8-4ac7-91e4-6a9bf1a485f3', '2e6f67b1-8b5f-4e41-b042-ecf698123648', '权限管理', '/system/power', 'directory', 'documentation', 0, NULL, 0, 0, '2021-07-22 15:18:23', '2021-07-22 15:18:23', NULL);
INSERT INTO `system_menu` VALUES ('2330595e-d765-47f9-a2a5-cce9c626a502', '0a23246d-81f8-4ac7-91e4-6a9bf1a485f3', '菜单管理', '/system/power/menu', 'menu', 'documentation', 0, 'views/system/power/menu', 0, 0, '2021-07-22 15:18:53', '2021-07-22 15:18:53', NULL);
INSERT INTO `system_menu` VALUES ('2e6f67b1-8b5f-4e41-b042-ecf698123648', NULL, '系统管理', '/system', 'directory', 'dashboard', 0, NULL, 0, 0, '2021-07-22 15:07:35', '2021-07-22 15:07:35', NULL);
INSERT INTO `system_menu` VALUES ('3c6b46cc-be72-4d1b-9ec2-fd3bca050efd', '2e6f67b1-8b5f-4e41-b042-ecf698123648', '角色管理', '/system/role', 'menu', 'chart', 0, 'views/system/role', 0, 0, '2021-07-22 15:12:10', '2021-07-22 15:12:10', NULL);
INSERT INTO `system_menu` VALUES ('70edbb32-9836-4a74-8926-75f251c06f9c', '2e6f67b1-8b5f-4e41-b042-ecf698123648', '用户管理', '/system/user', 'menu', 'documentation', 0, 'views/system/user', 0, 0, '2021-07-22 15:17:59', '2021-07-22 15:17:59', NULL);

-- ----------------------------
-- Table structure for system_operation
-- ----------------------------
DROP TABLE IF EXISTS `system_operation`;
CREATE TABLE `system_operation`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-操作表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_operation
-- ----------------------------

-- ----------------------------
-- Table structure for system_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `system_operation_log`;
CREATE TABLE `system_operation_log`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-操作日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for system_power
-- ----------------------------
DROP TABLE IF EXISTS `system_power`;
CREATE TABLE `system_power`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ref_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '外表Id',
  `type` enum('menu','file','element','operation') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限类型：menu:菜单的访问权限、file:文件的修改权限、element:页面元素的可见性控制、operation:功能模块的操作权限、',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_power
-- ----------------------------
INSERT INTO `system_power` VALUES ('1', '0a23246d-81f8-4ac7-91e4-6a9bf1a485f3', 'menu', '2021-07-22 15:33:57', '2021-07-22 15:34:00', NULL);
INSERT INTO `system_power` VALUES ('2', '2330595e-d765-47f9-a2a5-cce9c626a502', 'menu', '2021-07-22 15:33:57', '2021-07-22 15:34:00', NULL);
INSERT INTO `system_power` VALUES ('3', '2e6f67b1-8b5f-4e41-b042-ecf698123648', 'menu', '2021-07-22 15:33:57', '2021-07-22 15:34:00', NULL);
INSERT INTO `system_power` VALUES ('4', '3c6b46cc-be72-4d1b-9ec2-fd3bca050efd', 'menu', '2021-07-22 15:33:57', '2021-07-22 15:34:00', NULL);
INSERT INTO `system_power` VALUES ('5', '70edbb32-9836-4a74-8926-75f251c06f9c', 'menu', '2021-07-22 15:33:57', '2021-07-22 15:34:00', NULL);

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES ('1', '1', '2021-07-22 15:27:42', '2021-07-22 15:27:45', NULL);

-- ----------------------------
-- Table structure for system_role_power
-- ----------------------------
DROP TABLE IF EXISTS `system_role_power`;
CREATE TABLE `system_role_power`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '角色Id',
  `power_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '权限Id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-角色权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_role_power
-- ----------------------------
INSERT INTO `system_role_power` VALUES ('1', '1', '1', '2021-07-22 15:28:14', '2021-07-22 15:28:17', NULL);
INSERT INTO `system_role_power` VALUES ('2', '1', '2', '2021-07-22 15:28:14', '2021-07-22 15:28:17', NULL);
INSERT INTO `system_role_power` VALUES ('3', '1', '3', '2021-07-22 15:28:14', '2021-07-22 15:28:17', NULL);
INSERT INTO `system_role_power` VALUES ('4', '1', '4', '2021-07-22 15:28:14', '2021-07-22 15:28:17', NULL);
INSERT INTO `system_role_power` VALUES ('5', '1', '5', '2021-07-22 15:28:14', '2021-07-22 15:28:17', NULL);

-- ----------------------------
-- Table structure for system_session
-- ----------------------------
DROP TABLE IF EXISTS `system_session`;
CREATE TABLE `system_session`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户Id',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'key',
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-用户会话表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_session
-- ----------------------------

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '显示名称',
  `real_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '真实名称',
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职位',
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '公司',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机',
  `sex` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '性别：1:男 2：女',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '简介',
  `is_enabled` tinyint(1) NULL DEFAULT 1 COMMENT '是否可用',
  `github_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'githubId',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('49fb2680-60a9-42f1-83b5-6d994ec0bf56', 'admin', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, 1, NULL, '2021-07-20 15:19:25', '2021-07-20 15:19:25', NULL);

-- ----------------------------
-- Table structure for system_user_role
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户Id',
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '角色Id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-用户角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO `system_user_role` VALUES ('1', '49fb2680-60a9-42f1-83b5-6d994ec0bf56', '1', '2021-07-22 15:32:25', '2021-07-22 15:32:27', NULL);

SET FOREIGN_KEY_CHECKS = 1;
