
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { HTTP_STATUS } from "../constants/httpStatus";
import { addGroupMemberService, createGroupService, leaveGroupService, removeGroupMemberService, updateGroupNameService } from "../services/groupChatService";

export const createGroupController = asyncHandler(
  async (req: Request, res: Response) => {

    const userId = req.userId as string;
    const { name, members } = req.body;

    const avatar = req.file?.path;

    const group = await createGroupService(
      userId,
      name,
      members,
      avatar,
    );

    successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Group created successfully",
      group
    );

  }
);

export const addGroupMemberController = asyncHandler(
  async (req: Request, res: Response) => {

    const adminId = req.userId as string;
    const { groupId } = req.params;
    const { memberId } = req.body;

    const group = await addGroupMemberService(
      groupId,
      adminId,
      memberId
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      "Member added successfully",
      group
    );

  }
);

export const removeGroupMemberController = asyncHandler(
  async (req: Request, res: Response) => {

    const adminId = req.userId as string;
    const { groupId, memberId } = req.params;

    const group = await removeGroupMemberService(
      groupId,
      adminId,
      memberId
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      "Member removed successfully",
      group
    );

  }
);

export const updateGroupNameController = asyncHandler(
  async (req: Request, res: Response) => {

    const adminId = req.userId as string;
    const { groupId } = req.params;
    const { name } = req.body;

    const group = await updateGroupNameService(
      groupId,
      adminId,
      name
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      "Group name updated successfully",
      group
    );

  }
);

export const leaveGroupController = asyncHandler(
  async (req: Request, res: Response) => {

    const userId = req.userId as string;
    const { groupId } = req.params;

    const group = await leaveGroupService(
      groupId,
      userId
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      "Left group successfully",
      group
    );

  }
);
