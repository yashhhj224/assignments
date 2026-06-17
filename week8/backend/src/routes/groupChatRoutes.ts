
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createGroupController,
  addGroupMemberController,
  removeGroupMemberController,
  updateGroupNameController,
  leaveGroupController
} from "../controllers/groupChatController";
import { upload } from "../config/multer";

const router = Router();

router.post(
  "/chat/groups",
  authMiddleware,
  upload.single("avatar"), 
  createGroupController
);

router.patch(
  "/chat/groups/:groupId/name",
  authMiddleware,
  updateGroupNameController
);

router.post(
  "/chat/groups/:groupId/members",
  authMiddleware,
  addGroupMemberController
);

router.delete(
  "/chat/groups/:groupId/members/:memberId",
  authMiddleware,
  removeGroupMemberController
);

router.delete(
  "/chat/groups/:groupId/leave",
  authMiddleware,
  leaveGroupController
);

export default router;
