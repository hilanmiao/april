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

 Date: 29/08/2021 21:25:52
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
INSERT INTO `system_menu` VALUES ('1', NULL, '系统管理', '/system', 'directory', 'dashboard', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('2', '1', '权限管理', '/system/power', 'directory', 'documentation', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('3', '2', '菜单管理', '/system/power/menu', 'menu', 'documentation', 0, 'views/system/power/menu', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('4', '1', '角色管理', '/system/role', 'menu', 'chart', 0, 'views/system/role', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('5', '1', '用户管理', '/system/user', 'menu', 'documentation', 0, 'views/system/user', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_power
-- ----------------------------
INSERT INTO `system_power` VALUES ('1', '1', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('2', '2', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('3', '3', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('4', '4', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('5', '5', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES ('1', '超级管理员', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_role` VALUES ('2', '测试', '2021-04-01 00:00:00', '2021-04-01 00:00:00', '');
INSERT INTO `system_role` VALUES ('3', '游客', '2021-04-01 00:00:00', '2021-04-01 00:00:00', '');
INSERT INTO `system_role` VALUES ('4', '运维', '2021-04-01 00:00:00', '2021-04-01 00:00:00', '');

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-角色权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_role_power
-- ----------------------------
INSERT INTO `system_role_power` VALUES ('1', '1', '1', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_role_power` VALUES ('2', '1', '2', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_role_power` VALUES ('3', '1', '3', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_role_power` VALUES ('4', '1', '4', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_role_power` VALUES ('5', '1', '5', '2021-04-01 00:00:00', '2021-04-01 00:00:00');

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
INSERT INTO `system_session` VALUES ('37ed3724-4004-4808-a3b4-3cf9d35aae6f', '1', 'f644071f-6317-4825-9fc7-f36f822355ef', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 20:46:07', '2021-08-29 20:46:07', '2021-08-29 20:46:24');
INSERT INTO `system_session` VALUES ('49126087-b963-427c-ba20-1c7e08f35194', '9bbe38c2-ccf4-4c73-8917-b3881e979870', '868ecbc7-ba2a-401e-a302-992f6e6ca8f2', '$2a$10$PthNLNQciVwYQJ0nvDi96u5vkuki8HocOKmEyO2rH5LYTi5O5x76e', '2021-08-29 20:45:34', '2021-08-29 20:45:34', NULL);
INSERT INTO `system_session` VALUES ('49aedae3-0177-4716-b172-2301513c3738', '1', '7daca517-89bc-4907-84c1-ccb9737fc114', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 20:20:46', '2021-08-29 20:20:46', '2021-08-29 20:46:07');
INSERT INTO `system_session` VALUES ('51074186-774b-4ec2-be4c-b7ca297cbf79', '1', 'e1824b94-db84-47b3-b21b-149775be41b9', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 20:46:24', '2021-08-29 20:46:24', '2021-08-29 20:54:35');
INSERT INTO `system_session` VALUES ('5a77325b-3b6f-485c-98d8-8430306a0d34', '1', 'f0125da1-c236-4e18-9e5d-c624ccd1be6f', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 16:22:26', '2021-08-29 16:22:26', '2021-08-29 18:44:15');
INSERT INTO `system_session` VALUES ('6a22f580-66bd-4bf7-b1ab-50da05b9bfa9', '1', '4d89924a-26ca-4422-ae70-33a8cefc7583', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 19:47:52', '2021-08-29 19:47:52', '2021-08-29 20:08:46');
INSERT INTO `system_session` VALUES ('7ccdb073-a657-4fff-9af9-d03c0b672706', '1', '7dd5b34e-8c8c-4569-9edc-c38d4cc19870', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-26 21:09:19', '2021-08-26 21:09:19', '2021-08-29 16:22:27');
INSERT INTO `system_session` VALUES ('9795a231-7186-43e2-92cf-3bb281282db6', '1', '1daef9d4-6d35-4665-90cf-cc723aaaf670', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 20:08:46', '2021-08-29 20:08:46', '2021-08-29 20:20:46');
INSERT INTO `system_session` VALUES ('b0bd9257-4644-44bd-90a9-381063cb0b74', '6fbbc36a-50f4-447d-b854-ada86c28af86', '6d093814-edd4-474f-94e8-312276b5484a', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 21:21:41', '2021-08-29 21:21:41', NULL);
INSERT INTO `system_session` VALUES ('d6680829-0126-4627-85ad-4e3b441e6c6f', '6fbbc36a-50f4-447d-b854-ada86c28af86', 'a5225f71-e517-4c47-86bf-53002acb4aa4', '$2a$10$5ezhY9918O9YVpEhPSXRueDuu.pZqYAsu1THx5PISR3Gj7s5Leg9S', '2021-08-29 20:56:59', '2021-08-29 20:56:59', '2021-08-29 21:21:41');
INSERT INTO `system_session` VALUES ('e150b5c1-2f47-4132-9d26-124dda3ee504', '1', '4e940082-bbf9-4acd-8926-7b5f8cc0ea2a', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 18:44:15', '2021-08-29 18:44:15', '2021-08-29 19:47:52');
INSERT INTO `system_session` VALUES ('f0c757f3-3fc9-4e5e-9498-de951b66d85a', '1', '01dac17b-302a-4036-b361-4293adaedcb6', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-29 20:54:35', '2021-08-29 20:54:35', NULL);
INSERT INTO `system_session` VALUES ('f1b81057-f4f1-4164-aa7a-9bc05ab2f879', '1', '873cda6e-9119-43c7-9c33-dddd8e039e35', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-26 19:53:52', '2021-08-26 19:53:52', '2021-08-26 21:07:36');
INSERT INTO `system_session` VALUES ('faee59fb-bb1b-4feb-ad98-9e015a7b8c4b', '1', 'b6d35e82-0fe1-46a8-9bcd-f033703eaba8', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2021-08-26 21:07:35', '2021-08-26 21:07:35', '2021-08-26 21:09:19');

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
  `github_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'githubId',
  `status` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '状态：1:启用 2：禁用',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统-用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('1', 'admin', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '超级管理员', '超级管理员', NULL, NULL, 'hilanmiao@126.com', '18353674768', '1', NULL, '超级管理员', NULL, '1', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_user` VALUES ('6fbbc36a-50f4-447d-b854-ada86c28af86', '111111', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '', '', NULL, NULL, '', '1', '1', '', '', NULL, '1', '2021-08-29 20:56:26', '2021-08-29 21:23:28', '2021-08-29 21:23:28');

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
INSERT INTO `system_user_role` VALUES ('1', '1', '1', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
